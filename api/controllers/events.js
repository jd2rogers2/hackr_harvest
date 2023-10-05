const { GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { Events } = require('../models');
const { isAllowedFileType } = require('../helpers');
const { s3Client } = require('../clients/s3');
const { awsRegion } = require('../static');


const Bucket = process.env.S3_BUCKET_NAME;

const createEvent = async (req, res) => {
    
    // get user and make sure they're admin
    // get user and make sure they're admin
    // get user and make sure they're admin

    if (!isAllowedFileType(req.file.mimetype)) {
        return res.status(400).send('event image file type not allowed');
    }

    const file = fs.readFileSync(req.file.path);
    const Key = `${req.body.name}-eventImg`;
    const command = new PutObjectCommand({
        Bucket,
        Key,
        Body: file,
        ContentType: req.file.mimetype,
    });
    await s3Client.send(command);
    fs.unlink(req.file.path, () => {});

    const event = await Events.create({
        ...req.body,
        hostId: 1,
        imageUrl: `https://${Bucket}.s3.${awsRegion}.amazonaws.com/${Key}`,
    });

    const command2 = new GetObjectCommand({ Bucket, Key });
    const signed = await getSignedUrl(s3Client, command2, { expiresIn: 3600 });
    event.imageUrl = signed;

    res.send({ event });
};

const getEventById = async (req, res) => {
    const event = await Events.findOne({
        where: { id: req.params.eventId },
        include: ['host', 'attendees'],
    });

    if (!event) {
        return res.status(400).send('Event not found');
    }

    const Key = `${event.name}-eventImg`;
    const command = new GetObjectCommand({ Bucket, Key });
    const signed = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    event.imageUrl = signed;

    res.send({ event });
};

const getAllEvents = async (req, res) => {
    const { limit = 10, offset = 0 } = req.query;
    const events = await Events.findAll({
        include: ['host', 'attendees'],
        order: [
            ['startTime', 'DESC'],
            ['name', 'ASC'],
        ],
        limit,
        offset,
    });

    const urls = await Promise.all(events.map(e => {
        const Key = `${e.name}-eventImg`;
        const command = new GetObjectCommand({ Bucket, Key });
        return getSignedUrl(s3Client, command, { expiresIn: 3600 });
    }));
    events.forEach((e, i) => {
        e.imageUrl = urls[i];
    });

    res.send({ events });
};

const updateEvent = async (req, res) => {
    res.send();
};
const deleteEvent = async (req, res) => {
    res.send();
};

module.exports = {
    createEvent,
    getEventById,
    getAllEvents,
    updateEvent,
    deleteEvent,
};
