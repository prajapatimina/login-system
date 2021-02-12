const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

router.post('/signup', async(req,res,next)=>{
    try {
        let userObject = await User.find({username:req.body.username})
        if(userObject.length>=1){
            return res.status(409).json({
                message:'Username exists'
            })
        }else{
            bcrypt.hash(req.body.password,10,async(err,hash)=>{
                if(err){
                    return res.status(400).json({
                        error:err
                    })
                }
                let user = new User({
                    _id : new mongoose.Types.ObjectId(),
                    username : req.body.username,
                    password : hash
                    
                })
                console.log('newUser',user)
                let newUser = await user.save()
                return res.status(200).json({
                    message:'successful',
                    data : newUser
                })
            })
        }
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
        
    }
})

router.post('/login', async(req,res,next)=>{
    try {
        let name = await User.find({username : req.body.username})
        if(name.length<1){
            return res.status(401).json({
                message : 'Invalid Username'
            });
        }
        let userPassword = await bcrypt.compare(req.body.password,name[0].password)

        if(userPassword){
            return res.status(200).json({
                message :'Success'
            })
        }else{
            return res.status(400).json({
                message : 'Invalid password'
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:'Auth fail',
            error
        })
    }
})

module.exports = router;