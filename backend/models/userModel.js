const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');

const userSchema=mongoose.Schema({
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
        
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    
  },
  { timestaps: true, }
);

//match password
userSchema.methods.matchPassword=async function (enteredpass) {
  return await bcrypt.compare(enteredpass,this.password);
}


//before saving the password in database it will encypt the pass
userSchema.pre('save',async function (next) {
  if(this.modified)
  {
    next();
  }

  const salt= await bcrypt.genSalt(10);
  this.password= await bcrypt.hash(this.password,salt)
});

const User=mongoose.model("User",userSchema);
module.exports=User;