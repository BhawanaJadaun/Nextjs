import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
export async function POST(request:Request){
await dbConnect()
try {
const{username,code} = await request.json() 
const decodedUsername = decodedURIComponent(username)  
const user = await UserModel.findOne({username:decodedUsername})  
if(!user){
return Response.json({
success:false,
message:"Username not found",
},{status:500})
}     
const isCodeValid = user.verifyCode === code    
const isCodeNotExpired = new Date(user.verifyCodeExpires)>newDate()
if (isCodeValid && isCodeNotExpired) {
user.isVerified = true;
await user.save()
return Response.json({
success:true,
message:"Account Verified successfully",
},{status:200})
} else if(!isCodeNotExpired){
return Response.json({
success:false,
message:"Verification code has expired, Pls signup again to get a new code",
},{status:400})
}    
}
} catch (error) {
console.error("Error verifying user",error)
return Response.json({
success:false,
message:"Username is already taken",
},{status:400})
}     
}
