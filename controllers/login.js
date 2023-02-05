const express = require('express')
const bcrypt = require('bcrypt')
const bank = require('../models/schema')

const getLogin =  (req,res)=>{
        res.status(201).sendFile(process.env.app_path + '/public/index.html')
        
}

const postLogin = async (req,res)=>{
    try {
        const user = await bank.findOne({username : req.body.username})
        if(user){
            const correct = await bcrypt.compare(req.body.password , user.password)
        if(correct){
                req.session.user = user.username
                req.session.balance = user.balance
                req.session.email = user.email
                req.session.sent = user.sentTo
                req.session.amount = user.Amount
                res.status(200).redirect('/info')
            }
        else{
            res.status(400).render('login.ejs' , {error : "Incorrect details!"})
        }}
        else{
            res.status(400).render('login.ejs' , {error : "Incorrect details!"})
        }
    } catch (error) {
        res.status(500).send("error")
    }
}

module.exports = {getLogin,postLogin}