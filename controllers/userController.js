
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
const User = require('../models/user.model')

exports.userSignup = async(req,res,next)=>{
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
}

exports.userLogin = async(req,res,next)=>{
    try {
        let name = await User.find({username : req.body.username})
        if(name.length<1){
            return res.status(401).json({
                message : 'Invalid Username'
            });
        }
        let userPassword = await bcrypt.compare(req.body.password,name[0].password)
        // console.log("log___",process.env.JWT_KEY)
        if(userPassword){
            const token= jwt.sign({
                username:name[0].username,
                userId:name[0]._id
            },
            process.env.JWT_KEY,
            // "secret",
            {
                expiresIn: "1h"
            }
            );
            return res.status(200).json({
                message :'Success',
                token : token
            })
        }else{
            return res.status(400).json({
                message : 'Invalid password'
            })
        }
    } catch (error) {
        console.log(error)

        return res.status(400).json({
            message:'Auth fail',
            error
        })
    }
}