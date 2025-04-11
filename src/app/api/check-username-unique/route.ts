import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import {usernameValidation} from "@/schemas/usernameValidation";
const UsernameQuerySchema = z.object({
username:usernameValidation
})
export async function GET(request:Request){
await dbConnect()
try {
const{searchParams} = new URL(request.url)   
const result = const queryParam = searchParams.get('username')
console.log(result);
if(!result.success){
const usernameErrors = result.error.format().username?._errors || []
return Response.json({
success:false,
message:usernameErrors?.length>0
?usernameErrors.join(',')
:'Invalid Query Parameters',
},{status:400})
}
const username = result.data
const existingVerifiedUser = await UserModel.findOne({username,isVerified:true});
if (existingVerifiedUser) {
return Response.json({
success:false,
message:"Username is already taken",
},{status:400})
}
return Response.json({
success:true,
message:"Username is unique",
},{status:400})
// validate with zod
UsernameQuerySchema.safeParse(queryParam)

} catch (error) {
console.error("Error checking username",error)
return Response.json(
{
success:false,
message:"Error checking username"
},
{status:500}
)
}
}
