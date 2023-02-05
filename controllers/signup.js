const bank = require('../models/schema')
const bcrypt = require('bcrypt')
const loadPage = async (req,res)=>{
    try {
        res.status(201).sendFile(process.env.app_path + '/public/signup.html')
    } catch (error) {
        res.status(500).json(error)
    }
}

const postData = async (req,res)=>{
    try {
        const user = await bank.findOne({username : req.body.username})
        if(!user){
        const hashedpw = await bcrypt.hash(req.body.password,10)
        const data = await bank.create({username:req.body.username,email:req.body.email,password:hashedpw,balance:1000,sentTo:'--',Amount:0})
        res.redirect('/')
    }else{
        res.redirect('/')
    }} catch (error) {
        res.status(500).json(req.body)
    }
}

module.exports = {loadPage,postData}