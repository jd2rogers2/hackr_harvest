const { S3Client } = require('@aws-sdk/client-s3');

const { awsRegion } = require('../static');


const clientConfig = {
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: awsRegion,
};
const s3Client = new S3Client(clientConfig);

module.exports = {
    s3Client,
};
