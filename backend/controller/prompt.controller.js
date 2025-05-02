import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.OPENAI_API_KEY
});
console.log(openai.apiKey)
export const sendPrompt = async (req, res) => {
   //just getting the content what ever the user types in the body
   const {content } = req.body

   //if the user didn't type the content in the body or if it is empty and hit enter then 
   if(!content || content.trim() === ""){
    return  res.status(400).json({errors:"Prompt content is required"})
   }
   try{

    //save user prompt what ever user enter inside prompt in db
    //with the help of create method we will post the data to database
      const userPrompt = await Prompt.create({
        role:"user",
        content
      })
      //send the data to openai
      //took this code from deepseek api doc
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content}],
        model: "deepseek-chat",
      });
      //the ai assistant ans we will get in below line of code
      const aiContent = completion.choices[0].message.content

      //save assistant prompt in Db
      const aiMessage = await Prompt.create({
        role:"user",
        content:aiContent
      })
      return res.status(200).json({reply:aiContent})
   }catch(error){
      console.log("Error in prompt:",error)
      return res.status(500).json({error:"Something went wrong with the Ai response"})
   }
  };
  