const Admin = require('../models/Admin');
const express = require('express');

const router = express.Router();

router.get('/',async(req,res)=>{
    return res.json("api called")
});
router.post('/',async(req,res)=>{
    const reg = await new Admin(req.body)
    reg.save();

    return res.send("admin registration successfully")
});
router.post('/login',async(req,res)=>{
    const {email , password}=req.body;

    const admin = await Admin.findOne({email:email});
    if(!admin){
        return res.status(400).json("Admin not found")
    }
    if(admin.password == password){
        return res.status(200).json({message:"Login Successfully",admin:{
            email:admin.email,
            id:admin._id,
            role:"admin"
        }})
    }else{
        res.status({message:"Password not Matched"})
    }
})
router.put('/change/:id',async(req,res)=>{
    const {op,np,cnp} = req.body
    const {id} = req.params;
    const user =await Admin.findById(req.params.id);
    if(!user){
        return res.json({message:"Details Not Matched"})
    }
    if(user.password==op){
       if(op==np){
        return res.json({message:"Your old and new passsword is same"})
       }
       else if(np==cnp){
        try {
            const ex =await Admin.findByIdAndUpdate(req.params.id,{password:cnp});
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
module.exports = router