const { GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Op } = require("sequelize");
const fs = require('fs');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
    AuthFlowType,
    CognitoIdentityProviderClient,
    ConfirmSignUpCommand,
    InitiateAuthCommand,
    SignUpCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const jwt = require('jsonwebtoken');

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
    });

    try {
        await cognitoClient.send(command2);
    } catch (e) {
        await Users.destroy({ where: { email: user.email } });
        return res.status(502).send('AWS user service failure');
    }

    user.imageUrl = signedImageUrl;

    res.send({ user });
};

const verifyEmail = async (req, res) => {
    const command = new ConfirmSignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: req.body.email,
        ConfirmationCode: req.body.verifyCode,
    });
    await cognitoClient.send(command);

    res.send();
};

const signIn = async (req, res) => {
    const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: {
           USERNAME: req.body.email,
           PASSWORD: req.body.password,
        },
        ClientId: process.env.COGNITO_CLIENT_ID,
    });

    try {
        const signInRes = await cognitoClient.send(command);
        const { AccessToken, ExpiresIn, RefreshToken } = signInRes.AuthenticationResult;

        const rdsRes = await Users.findOne({ where: { email: req.body.email } });
        const user = {
            ...rdsRes.dataValues,
            expiresInMs: ExpiresIn * 1000,
            token: AccessToken,
        };

        if (user.imageUrl) {
            const Key = `${user.username}-profileImg`;
            const command2 = new GetObjectCommand({ Bucket, Key });
            const signedImageUrl = await getSignedUrl(s3Client, command2, { expiresIn: 3600 });
            user.imageUrl = signedImageUrl;
        }

        // image and tokens could make jwt too big for cookie storage
        const userJwt = jwt.sign({ id: user.id, refreshToken: RefreshToken }, process.env.JWT_SECRET);

        res.cookie('hackr_harvest', userJwt, {
            signed: true,
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            secure: true,
            // sameSite: 'None',
        }).send({ user });
    } catch (e) {
        res.status(400).send('auth failed');
    }
};

const resetPassword = async (req, res) => {
    res.send();
};

const signOut = async (req, res) => {
    res.clearCookie('hackr_harvest').send();
};

const getUserById = async (req, res) => {
    const { userId } = req.params;
    const { dataValues: user } = await Users.findOne({ where: { id: userId } });

    if (user.imageUrl) {
        const Key = `${user.username}-profileImg`;
        const command2 = new GetObjectCommand({ Bucket, Key });
        const signedImageUrl = await getSignedUrl(s3Client, command2, { expiresIn: 3600 });
        user.imageUrl = signedImageUrl;
    }

    res.send({ user });
};

const updateUser = async (req, res) => {
    // need access token
    // hardcode attendee role
    res.send();
};

const getCurrent = async (req, res) => {
    const cookie = req.signedCookies.hackr_harvest;
    if (!cookie) {
        return res.status(404).send('user not found');
    }

    const { id: userId, refreshToken } = jwt.verify(cookie, process.env.JWT_SECRET);

    const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
        AuthParameters: {
           REFRESH_TOKEN: refreshToken,
        },
        ClientId: process.env.COGNITO_CLIENT_ID,
    });

    try {
        const signInRes = await cognitoClient.send(command);
        const { AccessToken, ExpiresIn } = signInRes.AuthenticationResult;

        const rdsRes = await Users.findOne({ where: { id: userId } });
        const user = {
            ...rdsRes.dataValues,
            expiresInMs: ExpiresIn * 1000,
            token: AccessToken,
        };

        if (user.imageUrl) {
            const Key = `${user.username}-profileImg`;
            const command2 = new GetObjectCommand({ Bucket, Key });
            const signedImageUrl = await getSignedUrl(s3Client, command2, { expiresIn: 3600 });
            user.imageUrl = signedImageUrl;
        }

        res.send({ user });
    } catch (e) {
        res.status(404).send('user not found');
    }
};


module.exports = {
    createUser,
    signIn,
    signOut,
    verifyEmail,
    resetPassword,
    getUserById,
    getCurrent,
    updateUser,
};
