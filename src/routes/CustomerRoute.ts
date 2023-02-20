import express, {Request, Response, NextFunction} from 'express';
import { CustomerLogin, CustomerSignUp, CustomerVerify, EditCustomerProfile, GetCustomerProfile,RequestOtp } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();

/** --------------Sign Up / Create Customer --------- */
router.post('/signup',CustomerSignUp)

 /** -------------- Login -------------------- */
 router.post('/login',CustomerLogin)

 //authentication
//router.use(Authenticate)



/** -------------- Verify Customer Account --------- */
router.post('/verify',CustomerVerify)


/** -------------- OTP / Requesting OTP --------- */
router.post('/otp',RequestOtp)

 /** -------------- Profile ----------- */
router.get('/profile',GetCustomerProfile)

router.patch('/profile',EditCustomerProfile)


export { router as CustomerRoute };