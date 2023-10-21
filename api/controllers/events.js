const { GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const { Events, EventAttendees, Users } = require('../models');
const { isAllowedFileType } = require('../helpers');
const { s3Client } = require('../clients/s3');
const { awsRegion } = require('../static');


const Bucket = process.env.S3_BUCKET_NAME;

const createEvent = async (req, res) => {
    const cookie = req.signedCookies.hackr_harvest;
    const { id: userId } = jwt.verify(cookie, process.env.JWT_SECRET);
    const { dataValues: user } = await Users.findOne({ where: { id: userId } });

    if (user.role !== 'admin') {
        return res.status(403).send('not authorized');
    }

    let imageUrl = null;
    let signed = null;
    if (req.file) {
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
        imageUrl = `https://${Bucket}.s3.${awsRegion}.amazonaws.com/${Key}`;
        const command2 = new GetObjectCommand({ Bucket, Key });
        signed = await getSignedUrl(s3Client, command2, { expiresIn: 3600 });
    }

    const event = await Events.create({
        ...req.body,
        hostId: userId,
        imageUrl,
    });

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

    if (event.imageUrl) {
        const Key = `${event.name}-eventImg`;
        const command = new GetObjectCommand({ Bucket, Key });
        const signed = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        event.imageUrl = signed;
    }

    const urls = await Promise.all(event.attendees.map(user => {
        if (!user.imageUrl) { return null; }

        const Key = `${user.username}-profileImg`;
        const command2 = new GetObjectCommand({ Bucket, Key });
        return getSignedUrl(s3Client, command2, { expiresIn: 3600 });
    }));
    event.attendees.forEach((user, i) => {
        user.imageUrl = urls[i];
    });

    if (event.host.imageUrl) {
        const Key = `${event.host.username}-profileImg`;
        const command3 = new GetObjectCommand({ Bucket, Key });
        const hostImage = await getSignedUrl(s3Client, command3, { expiresIn: 3600 });
        event.host.imageUrl = hostImage;
    }

    res.send({ event });
};

const getAllEvents = async (req, res) => {
    const { limit = 10, offset = 0, past = false, userId } = req.query;

    const cookie = req.signedCookies?.hackr_harvest;
    const { id: currentUserId } = cookie ? jwt.verify(cookie, process.env.JWT_SECRET) : {};
    if (userId && Number(userId) !== currentUserId) {
        return res.status(403).send('not authorized');
    }

    let events = await Events.findAll({
        include: ['host', 'attendees'],
        order: [
            ['startTime', 'DESC'],
            ['name', 'ASC'],
        ],
        where: { startTime: { [past ? Op.lt : Op.gt]: new Date(Date.now()) } },
        limit,
        offset,
    });
    if (userId) {
        // TODO figure out better filter with WHERE
        events = events.filter(e => e.attendees.find(u => u.id === Number(userId)));
    }

    const urls = await Promise.all(events.map(e => {
        if (!e.imageUrl) { return; }

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
