const jwt = require('jsonwebtoken')
const {JWT_PASS} = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
//authorization === Bearer sdjfgjsddsjfbdfsj
    if(!authorization){
        res.status(401).json({error:"You must login first"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_PASS,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must login first"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        

    })

}