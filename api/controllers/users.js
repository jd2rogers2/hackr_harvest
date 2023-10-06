const { GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Op } = require("sequelize");
const fs = require('fs');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { CognitoIdentityProviderClient, SignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");

const { Users } = require('../models');
const { awsRegion } = require('../static');
const { s3Client } = require('../clients/s3');
const { isAllowedFileType } = require('../helpers');


const cognitoClient = new CognitoIdentityProviderClient({ region: awsRegion });

const Bucket = process.env.S3_BUCKET_NAME;


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


const createUser = async (req, res) => {
    const dupUserErrors = await findDupUserErrors(req.body);
    if (dupUserErrors.length) {
        return res.status(400).send(dupUserErrors.join(', '));
    }

    let imageUrl = null;
    let signedImageUrl = null;
    if (req.file) {
        if (!isAllowedFileType(req.file.mimetype)) {
            return res.status(400).send('profile image file type not allowed');
        }

        const Key = `${req.body.username}-profileImg`;
        const file = fs.readFileSync(req.file.path);
        const command = new PutObjectCommand({
            Bucket,
            Key,
            Body: file,
            ContentType: req.file.mimetype,
        });
        await s3Client.send(command);
        fs.unlink(req.file.path, () => {});

        const command3 = new GetObjectCommand({ Bucket, Key });
        imageUrl = `https://${Bucket}.s3.${awsRegion}.amazonaws.com/${Key}`
        signedImageUrl = await getSignedUrl(s3Client, command3, { expiresIn: 3600 });
    }

    const user = await Users.create({
        ...req.body,
        role: 'attendee',
        // below is not the signed url but should be the permanent reisdence of our s3 object
        imageUrl,
    });

    const command2 = new SignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: req.body.email,
        Password: req.body.password,
        // UserAttributes: [{ Name: "email", Value: req.body.email }],
    });
    const res2 = await cognitoClient.send(command2);
    console.log('cognito res2', res2)

    user.imageUrl = signedImageUrl;

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
