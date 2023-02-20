//email

// notification

// OTP

export const GenerateOtp = () => {

    const otp = Math.floor(100000 + Math.random() * 900000) //random
    let expiry = new Date()
    expiry.setTime( new Date().getTime() + (30*60*1000)) //30 dk

    return { otp, expiry }
}

export const onRequestOTP = async (otp:number, toPhoneNumber:string) => {

    const accountSid = "twilio accountSid";
    const authToken = "twilio_token";
    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: "Telephone number",
        to: `+90${toPhoneNumber}` 
       }) 
      
    return response;
}



// Payment notification or emails