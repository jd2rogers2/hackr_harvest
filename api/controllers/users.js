const { Upload } = require('@aws-sdk/lib-storage');
const { S3Client } = require('@aws-sdk/client-s3');
const { Op } = require("sequelize");
const fs = require('fs');

const { Users } = require('../models');


const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: 'us-west-2',
});


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
    console.log('req.file', req.file);
    const file = fs.readFileSync(req.file.path);
    console.log('file', file);
    
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${req.body.username}-profileImg`,
            Body: file,
            ContentType: req.file.mimetype,
        },
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
      });
    
    const fileRes = await upload.done();
    fs.unlink(req.file.path, () => {});

    const user = await Users.create({
        ...req.body,
        role: 'attendee',
        imageUrl: fileRes.Location
    });

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
