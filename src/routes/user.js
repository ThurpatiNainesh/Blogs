const router = require("express").Router();
const User = require("../modules/User")
const Post = require("../modules/post")
const bcrypt = require('bcrypt')
// POST ==> CREATE
// PUT ====> UPDATE
// DELETE====>DELETE
// GET ======> GET

// UPDATE USER
router.put("/:id",async(req,res)=>{
    if(req.body.userId==req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
             req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        try{
           const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
           res.status(200).json(updatedUser)
        } catch(err){
            res.status(500).json(err)
        }
    }else{
            res.status(401).json("you can update only your account")
    }
})
// DELETE USER 
router.delete("/:id",async(req,res)=>{
    if(req.body.userId==req.params.id){
        try{
            const user = await User.findById(req.param.id)
           try{
            await Post.deleteMany({username:user.username})
            await User.findByIdAndDelete(req.params.id)
           res.status(200).json("user has been deleted ....")
           }catch(err){
            res.status(500).json(err)
           }
        } catch(err){
            res.status(500).json("user not found")
        }
    }else{
            res.status(401).json("you can delete only your account")
    }
})

// GET User 
router.get("/:id",async (req,res) =>{
    try{
       const user = await User.findById(req.params.id)
       const {password,...other}= user._doc
       res.status(200).json(other)
    } catch(err){
      res.status(500).json(err)
    }
  })

module.exports = router