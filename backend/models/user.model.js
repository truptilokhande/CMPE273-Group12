const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    profilepicture:{
      type:String,
      required:true
    },
    lastLoginDate:{
      type:Date,
      required: true
    },
    about:{ 
      type: String, 
      required: true 
    },
    reputation:{
      type: Number,
      required: true
    },
    location: { 
      type: String,
      required: true 
    },
    tags:{
     type:[tagSchema.schema],
      
    },
    bookmarks:{
      type:[[Number]]
    },
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
