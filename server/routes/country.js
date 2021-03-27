const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const Anime = require('../models/Country');

router.get("/", async function (req, res) {
    try {
        const countryResult = await Anime.find({}).exec();
        res.json({ response: { resultCode: 1, message: "성공" }, result: countryResult });
    } catch (error) {
        console.log(error);
    }
    //console.log(animeResult);
});

module.exports = router;