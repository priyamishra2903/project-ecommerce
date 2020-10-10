var express = require('express');
var reviewcontroller = express.Router();
const {to} = require('await-to-js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const validation = require('../bin/src/joi');
const ReviewService = require('../services/review');

reviewcontroller.add_Reviews = async(req, res) => {
    let validate = await validation.add_review.validate(req.body);

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload" });
    }

    let [err, result] = await to(ReviewService.add_Reviews(req.params.id, req.body))
    if(err)
        return res.json({ data: null, error: err});
    
    return res.json({ data: result, err});
}

reviewcontroller.get_Reviews = async(req, res) => {
    let [err, result] = await to(ReviewService.get_Reviews(req.params.id))
    if(err)
        return res.json({ data: null, error: err});
    
    return res.json({ data: result, err});
}



module.exports = reviewcontroller;