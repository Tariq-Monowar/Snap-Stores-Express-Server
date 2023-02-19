const { default: mongoose } = require("mongoose");

const userSchame = new mongoose.Schema({ 
    title: {
        type: String,
        required: [true, "title is required"]
    },
    desc: {
        type: String,
        required: [true, "description is required"]
    },
    image: {
        data: Buffer,
        contentType: String,
        
    },
    createdOn:{
        type: Date,
        default: Date.now()
    }
    
})

module.exports = mongoose.model("User",userSchame)