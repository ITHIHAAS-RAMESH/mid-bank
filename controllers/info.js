const express = require('express')
const bank = require('../models/schema')

const info = async (req,res)=>{
    const user = await bank.findOne({username : req.session.user})
    req.session.balance = user.balance
    req.session.email = user.email
    req.session.sent = user.sentTo
    req.session.amount = user.Amount
    res.status(201).render('about.ejs',{name:req.session.user,email:req.session.email,bal :req.session.balance,sentto : req.session.sent,amount : req.session.amount})
}

module.exports = {info}