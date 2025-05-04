import mongoose  from "mongoose";
const  promptSchema = new mongoose.Schema({
   //storing our userid in db
   userId :{
      //our id is OjbctId in our db go and see at users db
      type : mongoose.Schema.Types.ObjectId,
      //in our reference we are adding user model
      ref : "User",
      required : true
   },
   role:{
    type: String,
    enum:["user","assistant"],
    required:true
   },
   content:{
    type:String,
    required:true
   },
   //this will let us know at what time it was created
   createdAt :{
    type:Date,
    default:Date.now
   }
})

const Prompt = mongoose.model("Prompt", promptSchema); // Correct model name

export default Prompt;  // Use default export