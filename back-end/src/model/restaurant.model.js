const mongoose=require('mongoose');

const restaurantSchema=new mongoose.Schema({
    restaurantName:{
        type:String,
        required:true
    },

    categories:{
        type:[String]
    },

    address:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },

    pincode:{
        type:String,
        required:true,
        minlength:6,
        maxlength:6
    },

    contactNumber:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },

    ownerName:{
        type:String
    },

    email:{
        type:String,
        unique:true,
        required:true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    }

});

const Restaurant=mongoose.model("Restaurant",restaurantSchema);
module.exports=Restaurant;
