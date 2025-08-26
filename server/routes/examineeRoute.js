const Examinee = require('../models/Examinee');
const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

router.post('/', async(req,res)=>{
    const {email} = req.body
    const ex = Examinee.findOne({email:email})
    if(ex){
        return res.json({message:"Details is already exist"})
    }
    const user = new Examinee(req.body);
    await user.save();
    return res.json({message:"Registered Successfully"});
});

// Login route (keep it before `/:id`)
router.post('/login',async(req,res)=>{
    const {email , password}=req.body;

    const user = await Examinee.findOne({email:email});
    if(!user){
        return res.status(400).json("User not found")
    }
    if(user.password == password){
        return res.status(200).json({
            message:"Login Successfully",
            user:{
                email:user.email,
                id:user._id,
                role:"user"
            }
        });
    } else {
        return res.status(400).json({message:"Password not Matched"});
    }
});

router.get('/', async(req,res)=>{
    const user = await Examinee.find();
    return res.json(user);
});

router.delete('/:id',async(req,res)=>{
    const {id}= req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message:"Invalid ID"});
    }
    const user = await Examinee.findByIdAndDelete(id);
    return res.json({message:"Deleted successfully"});
});

router.put('/:id', async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message:"Invalid ID"});
    }
    await Examinee.findByIdAndUpdate(id,req.body);
    return res.json({message:"Updated Successfully"});
});

router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message:"Invalid ID"});
    }
    const user = await Examinee.findById(id);
    return res.json(user);
});
router.put('/change/:id',async(req,res)=>{
    const {op,np,cnp} = req.body
    const {id} = req.params;
    const user =await Examinee.findById(req.params.id);
    if(!user){
        return res.json({message:"Details Not Matched"})
    }
    if(user.password==op){
       if(op==np){
        return res.json({message:"Your old and new passsword is same"})
       }
       else if(np==cnp){
        try {
            const ex =await Examinee.findByIdAndUpdate(req.params.id,{password:cnp});
            return res.json({message:"password change successfully"})
        } catch (error) {
            console.log(error)
            return res.json({message:"Sorry try again"})
        }
       }
    }else{
        return res.json({message:"Your old password not match"})
    }
})

module.exports = router;
