const user=require("../model/user.model.js");
const SendData=async(req,res)=>{
    const formaData=req.body;
    // console.log(formData);

    try{
        await user.insertOne(
            {
                name:formaData.name,
                mobilenumber:formaData.mobilenumber,
                password:formaData.password,
                confirmPassword:formaData.confirmPassword
            }
            
        );
        if(password!=confirmPassword){
            return res.status(400).json({error:"Password and Confirm Password do not match"});
        }
        else{
            res.status(200).send("Data Inserted Successfully !")
        }
        
    }
    catch(err){
        res.status(402).send({msg:"Error Occured !",err:err});
        console.log(err);
        
    }
};
    module.exports=SendData;