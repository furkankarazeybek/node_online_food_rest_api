import mongoose, {ConnectOptions} from "mongoose";
import { MONGO_URI } from '../config';


export default async() => {

    try {
        await mongoose.connect(MONGO_URI, {
          /*   useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true */
            
        }).then(result=>{
            console.log("DB CONNECTED")
        })
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

}
  