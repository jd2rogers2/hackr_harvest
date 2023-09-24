const { GetObjectCommand, PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const { Op } = require("sequelize");
const fs = require('fs');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { CognitoIdentityProviderClient, SignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");

const { Users } = require('../models');


const region = 'us-west-2';
const clientConfig = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region,
};

const cognitoClient = new CognitoIdentityProviderClient({ region });

const Bucket = process.env.S3_BUCKET_NAME;
const s3Client = new S3Client(clientConfig);


const findDupUserErrors = async ({ email, username }) => {
    const users = await Users.findAll({ where: { [Op.or]: [{ username }, { email }] } });
    const existing = [];
    if (users.find(user => user.email === email)) {
        existing.push('email already exists')
    }
    if (users.find(user => user.username === username)) {
        existing.push('username already exists')
    }
    return existing;
}

const isAllowedFileType = fileType => {
    return fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png';
}


const createUser = async (req, res) => {
    const dupUserErrors = await findDupUserErrors(req.body);
    if (dupUserErrors.length) {
        return res.status(400).send(dupUserErrors.join(', '));
    }

    if (!isAllowedFileType(req.file.mimetype)) {
        return res.status(400).send('profile image file type not allowed');
    }

    const file = fs.readFileSync(req.file.path);
    const Key = `${req.body.username}-profileImg`;
    const command = new PutObjectCommand({
        Bucket,
        Key,
        Body: file,
        ContentType: req.file.mimetype,
    });
    await s3Client.send(command);
    fs.unlink(req.file.path, () => {});

    const user = await Users.create({
        ...req.body,
        role: 'attendee',
        imageUrl: `https://${Bucket}.s3.${region}.amazonaws.com/${Key}`,
    });

    const command2 = new SignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        SecretHash: process.env.COGNITO_SECRET_HASH,
        Username: req.body.username,
        Password: req.body.password,
        // UserAttributes: [{ Name: "email", Value: email }],
    });
    const res2 = await cognitoClient.send(command2);
    console.log('cognito res2', res2)

    const command3 = new GetObjectCommand({ Bucket, Key });
    const signed = await getSignedUrl(s3Client, command3, { expiresIn: 3600 });
    user.imageUrl = signed;

    res.send({ user });
};

const signIn = async (req, res) => {
    res.send();
};

// verfiy email?? lambda?!

const signOut = async (req, res) => {
    res.send();
};

const getUserById = async (req, res) => {
    const user = await Users.find();
    res.send({ user });
};

const updateUser = async (req, res) => {
    // hardcode attendee role
    res.send();
};


module.exports = {
    createUser,
    signIn,
    signOut,
    getUserById,
    updateUser,
};
