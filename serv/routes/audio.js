const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const Audio = require('../models/audio');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, `/../public/audio_tracks/${file.fieldname}`))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024}
});

router.get('/getTrackById/:id', async (request, response) => {
    response.send(await Audio.findOne({postedBy: mongoose.Types.ObjectId(request.params.id)}));
});

router.get('/getTracks/:id&:offset&:limit', async (request, response) => {
    let {limit, offset, id} = request.params;
    offset = parseInt(offset, 10);
    limit = parseInt(limit, 10);
    const postedBy = mongoose.Types.ObjectId(id);
    const tracks =await Audio.find(
            {postedBy},
            [],
            {skip: offset, limit}
        ).sort({createdAt: -1});
    const res = {
        data: tracks,
        count: await Audio.count({postedBy}),
        limit,
        offset
    };
    response.send(res)
});

router.post('/addTrack', upload.fields([
    {name: 'audio', maxCount: 1},
    {name: 'titleImage', maxCount: 1}]),
    async(request, response) => {
        const newTrack = {...request.body};
        newTrack.postedBy = request.user._id;
        if(request.files.titleImage) {
            newTrack.titleImage = `/audio_tracks/titleImage/${request.files.titleImage[0].filename}`;
        }
        newTrack.audioPath = `/audio_tracks/audio/${request.files.audio[0].filename}`;
        const res = {
            track: await Audio.create(newTrack),
            count: await Audio.count({postedBy: request.user._id}),
        };
        response.send(res);
});

router.put('/editTrack', async(request, response) => {

});

router.delete('/deleteTrack', async(request, response) => {

});

module.exports = router;