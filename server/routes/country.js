const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const Country = require('../models/Country');

router.get("/", async function (req, res) {
    try {
        const countryResult = await Country.find({}).exec();
        res.json({ response: { resultCode: 1, message: "성공" }, result: countryResult });
    } catch (error) {
        console.log(error);
    }
    //console.log(animeResult);
});

router.post("/", async function (req, res) {
    try {
        const CountryResult = Country.updateOne({country:req.body.country}, req.body, {upsert:true});

    } catch (error) {
        if(error && error.code == 11000) {
            console.log(err);
            console.log("중복");
            res.json({ response: { resultCode: 0, message: "이미 값이 존재합니다." }});
        } else {
            console.log(err);
            console.log(error.code);
            res.json({ response: { resultCode: 0, message: err }});
        }
    }
})

module.exports = router;