import dbConnect from "@/lib/dbConnect";
import userModel from "@/lib/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
export async function POST(request: Request) {
  await dbConnect();
  try {
    // IF email verification already taken
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }
    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if(existingUserByEmail.isVerified){
     return  response.json({
    success:false,
    message "User already exist with this email"
    }
   { status: 400})
      } else {
     const hashedPassword = await bcrypt.hash(password,10)
     existingUserByEmail.password = hashedPassword;
     existingUserByEmail.verifyCode = verifyCode
     existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+36000000)
     await existingUserByEmail.save()
      }

      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHour(expiryDate.getHour() + 1);
      //       for save user data

      newUserModel({
        username: string,
        email: string,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }
    //     Send Verification Email
    const emailResponse = Email(email, username, verifyCode);
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailError.message,
        },
        { status: 500 }
      );
    }
    return Response.json({
      success: true,
      message: "User registered successfully | Please verify your email"
    },{status:201}),
  } catch (error) {
    console.log("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }

