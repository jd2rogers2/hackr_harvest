const { Upload } = require('@aws-sdk/lib-storage');
const { S3Client } = require('@aws-sdk/client-s3');

const { Users } = require('../models');


const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: 'us-west-2',
});


const createUser = async (req, res) => {
    const user = Users.build({ ...req.body, role: 'attendee' });
    const validationErrors = Object.values(user.validate());
    if (validationErrors.length) {
        return res.status(404).send(validationErrors.join(', '));
    }

    const parallelUploads3 = new Upload({
        client: s3Client,
        params: {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${req.body.username}-profileImg`,
            Body: req.file,
        },
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
      });
    
    const fileRes = await parallelUploads3.done();

    user.imageUrl = fileRes.Location;
    await user.save();

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
