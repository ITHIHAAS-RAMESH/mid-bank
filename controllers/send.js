const express = require('express')
const bank = require('../models/schema')
const session = require('express-session')
const getSendMoney = async (req,res)=>{
    const user = await bank.findOne({username : req.session.user})
    req.session.balance = user.balance
    res.status(201).render('send.ejs',{name : req.session.user,balance: req.session.balance,error:"",success:""})
}

const updateReciever = async(reciever,amount)=>{
    try {
        const recieve = await bank.findOneAndUpdate({username : reciever},{$inc:{
            balance:amount
        }})
        console.log("recieved")
    } catch (err) {
        console.log(err)
    }
    
}
const updateSender = async(sender,amount)=>{
    try {
        const recieve = await bank.findOneAndUpdate({username : sender},{$inc:{
            balance: amount*(-1)
        }})
        console.log("sent")
    } catch (err) {
        console.log(err)
    }
    
}
const updateSent = async (sender,reciever,amount) =>{
    try {
        const recieve = await bank.findOneAndUpdate({username : sender},{$set:{'sentTo': reciever,'Amount' : amount}})
    } catch (error) {
        
    }
}

const postMoney = async (req,res)=>{
    try {
        const user = await bank.findOne({username : req.body.Sendusername})
        if(!user || req.body.Sendusername == req.session.user){
            res.status(201).render('send.ejs',{name : req.session.user,balance: req.session.balance,error:"User not found!",success:""})
        }else if(req.body.amount > req.session.balance){
            res.status(201).render('send.ejs',{name : req.session.user,balance: req.session.balance,error:"Insufficient Funds!",success:""})
        }else{
            updateReciever(req.body.Sendusername,req.body.amount)
            updateSent(req.session.user,req.body.Sendusername,req.body.amount)
            updateSender(req.session.user,req.body.amount)
            res.status(201).render('send.ejs',{name : req.session.user,balance: req.session.balance,error:"",success:"Transaction Successful!"})
        }
        
    } catch (error) {
        res.status(500).send("error")
    }
    
}
module.exports = {getSendMoney,postMoney}