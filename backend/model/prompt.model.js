import mongoose  from "mongoose";
const  promptSchema = new mongoose.Schema({
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