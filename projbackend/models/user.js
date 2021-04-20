 var mongoose = require('mongoose')
 const crypto = require('crypto');
 const { v4: uuidv4 } = require('uuid');
 

 var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname:{
        type: String,
        maxlength: 32,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo:{
         type: String,
         trim: true
    },
    //TODO: Come back here
    encry_password:{
        type: String,
        required: true,

    },
    salt: String,
    role:{
        //for diffrent type of user we have number as students or guest user have number 0 and admin have number higher then all other users
         type: Number,
         default: 0
    },
    purchases:{
        type: Array,
        default: []
    }

  },{timestamps: true});

  
  userSchema.virtual("password")
            .get(function(){
                return this._password;
            })
            .set(function(password){
              this._password = password;
              this.salt =  uuidv4();
              this.encry_password = this.securePassword(password)
            })

  userSchema.methods = {
      authenticate: function(plainpassword){
          return this.securePassword(plainpassword) === this.encry_password;
      },
      securePassword: function(plainpassword){
          if(!plainpassword) return "";
          try{
             return crypto.createHmac('sha256', this.salt)
             .update(plainpassword)
             .digest('hex');
          }catch(err){
              return "";
          }
      }
  }

  module.exports = mongoose.model("User", userSchema)