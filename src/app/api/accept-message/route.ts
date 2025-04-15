import {getServerSession} from "next-auth";
import {authOptions} from "../../(auth)/[...nextauth]";
import UserModel from "@/model/User";
import {User} from "next-auth";

// POST request
export async function POST(request:Request){
await dbConnect()
const session = await getServerSession(authOptions)
const user:User = session?.user
if (!session || !session.user) {
return Response.json(
{
success:false,
message:"Not Authenticated"
},
{status:401}
)
}
const userId = user._id;
const {acceptMessages} = await request.json()
try {
  const updatedUser =   await userModel.findByIdAndUpdate(
userId,
{isAcceptingMessages:acceptMessages(
userId,
{isAcceptingMessages:acceptMessages},
{new:true}
)})
 if (!updatedUser) {
 return Response.json({
{
success:false,
message:"failed to update user status to accept messages"
},
{status:401}
})}
 return Response.json({
{
success:true,
message:"Message acceptance updated successfully",
updatedUser
},
{status:200}
})
} catch (error) {
console.log("failed to update user status to accept messages");
return Response.json({
{
success:false,
message:"failed to update user status to accept messages"
},
{status:500}
})
}
}

// GET REQUEST
export async function GET(request:Request){
await dbConnect()
const session = await getServerSession(authOptions)
const user:User = session?.user
if (!session || !session.user) {
return Response.json(
{
success:false,
message:"Not Authenticated"
},
{status:401}
)
}
const userId = new mongoose.Types.ObjectId(user._id);
// try {
//   const foundUser = await UserModel.findById(userId)
//   if (!foundUser) {
//     return Response.json(
//       {
//         success:false,
//         message:"User not found"
//       },
//       {status:404}
//     )
//   }
//   return Response.json(
//     {
//       success:true,
//       isAcceptingMessages:foundUser.isAcceptingMessage
//     },
//     {status:200}
//   )
// } catch (error) {
  
// }
try {
  const user = await UserModel.aggregate([
    {$match:{id:userId}},
    {$unwind:'$messages'},
    {$sort:{'messages.createAt':-1}},
    {$group:{_id:'$_id',messages:{$push:'$messages'}}}
  ])
  if (!user || user.length === 0) {
    return Response.json(
      {
      success:false,
      message:"User not found"
      },
      {status:401}
      )
  }
  return Response.json(
    {
    success:true,
    message:user[0].messages
    },
    {status:200}
    )
} catch (error) {
  console.log("An Unexpected error occured",error);
  
  return Response.json(
    {
    success:false,
    message:"Not Authenticated"
    },
    {status:500}
    )
}
}

