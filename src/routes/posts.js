const router = require("express").Router();
const User = require("../modules/User")
const Post = require("../modules/post")
const bcrypt = require('bcrypt')
// POST ==> CREATE
// PUT ====> UPDATE
// DELETE====>DELETE
// GET ======> GET

// CREATE NEW POST 
router.post("/",async(req,res)=>{
    const newPost = new Post(req.body)
  try{
    const savedPost = await  newPost.save()
     res.status(200).json(savedPost)
    } catch(err){
          res.status(500).json(err)
   }
})
// UPDATE POST 
router.put("/:id",async(req,res)=>{
   try{
      const post = await  Post.findById(req.params.id)  
       if(post.username===req.body.username){
      try{
        const updatedpost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedpost)
       } catch(err){
              res.status(500).json("user not found")
     }   
    }else{
        res.status(401).json("you can't update you post ")
    }
     } catch(err){
            res.status(500).json("user not found")
   }  
})

// DELETE POST 
router.delete("/:id",async (req,res) =>{
    try{
        const post = await  Post.findById(req.params.id)  
         if(post.username===req.body.username){
        try{
           await post.delete()
          res.status(200).json("post has been deleted")
         } catch(err){
                res.status(500).json("user not found")
       }   
      }else{
          res.status(401).json("you can't delete you post ")
      }
       } catch(err){
              res.status(500).json("user not found")
     }  
  })
//   get post 
router.get("/:id",async(req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).json(post)
    } catch(err){
          res.status(500).json(err)
   }
})
// GET ALL POST
router.get("/",async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat
    try{
        let posts; 
       if(username){
         posts = await Post.find({username});
       }else if(catName){
         posts = await Post.find({categories:{$in:[catName]}})   
       }else{
        posts = await Post.find()
       }
       res.status(200).json(posts)
      } catch(err){
            res.status(500).json(err)
     }
  })

module.exports = router