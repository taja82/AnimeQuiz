const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const Anime = require('../models/Anime');

router.get("/", async function (req, res) {
    try {
        const animeResult = await Anime.find({}).exec();
        res.json({ response: { resultCode: 1, message: "성공" }, result: animeResult });
    } catch (error) {
        console.log(error);
    }
    //console.log(animeResult);
});

router.get("/:num", async function (req, res) {
    try {
        const Result = await Anime.findById(req.params.num);
        console.log(req.params.num);
        if(Result) {
            res.json({ response: { resultCode: 1, message: "성공" },  param: req.param, result: Result });
        } else {
            //res.json({ response : {reSultCode: 0, message: "결과가 없습니다", param: req.param}});
            console.log("결과가 없습니다")
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/tags", async function (req,res) {
    try {
        const animeResult = await Anime.find({}).exec();
        res.json({ response: { resultCode: 1, message: "성공" }, result: animeResult });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
