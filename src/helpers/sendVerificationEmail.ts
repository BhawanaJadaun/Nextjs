import {resend} from "@/lib/resend";
import VerificationEmail  from "@/emails/VerificationEmail";
import {ApiResponse} from "@/type/ApiResponse"
export async function sendVerificationEmail(
email:string,
username:string,
verifyCode:string,
):Promise<ApiResponse>{
try {
   await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'my-next | Verification Code',
    react: VerificationEmail({username,otp:VerificationCode}),
  });
return{success:true,message:"Verification Email Successfully"}               
} catch (emailError) {
console.log("Error Sending Verification Email",error);
return{success:false,message:"Failed to send Verification Email"}
}
}