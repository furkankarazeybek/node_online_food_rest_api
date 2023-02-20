"use strict";
//email
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequestOTP = exports.GenerateOtp = void 0;
// notification
// OTP
const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); //random
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000)); //30 dk
    return { otp, expiry };
};
exports.GenerateOtp = GenerateOtp;
const onRequestOTP = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSid = "accountsid";
    const authToken = "authtoken";
    const client = require('twilio')(accountSid, authToken);
    const response = yield client.messages.create({
        body: `Your OTP is ${otp}`,
        from: "+16613472574",
        to: `+90${toPhoneNumber}`
    });
    return response;
});
exports.onRequestOTP = onRequestOTP;
// Payment notification or emails
//# sourceMappingURL=NotificationUtility.js.map