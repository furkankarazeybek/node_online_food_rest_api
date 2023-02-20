import { Request, Response, NextFunction } from "express";
import { EditVendorInput, VendorLoginInputs } from "../dto";
import { CreateFoodInput } from "../dto/Food.dto";
import { Food } from "../models";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVendor } from "./AdminController";


export const VendorLogin = async (req: Request,res: Response, next: NextFunction) => {

  const { email, password } = <VendorLoginInputs>req.body;

  const existingVendor = await FindVendor('', email);

  if(existingVendor !== null){

    const signature = GenerateSignature({
      _id: existingVendor.id,
      email: existingVendor.email,
      foodTypes: existingVendor.foodType,
      name: existingVendor.name
    })

    
    return res.json(signature);

  }

  return res.json({'message': 'Login credential is not valid'})

}


export const GetVendorProfile = async (req: Request,res: Response, next: NextFunction) => {

  const user = req.user;
   
  if(user){

     const existingVendor = await FindVendor(user._id);
     return res.json(existingVendor);
  }

  return res.json({'message': 'vendor Information Not Found'})
}


export const UpdateVendorProfile = async (req: Request,res: Response, next: NextFunction) => {

  const { foodType,name,address,phone } = <EditVendorInput>req.body;

  const user = req.user;
   
  if(user){

     const existingVendor = await FindVendor(user._id);

     if(existingVendor !== null) {
       
      existingVendor.name= name;
      existingVendor.address= address;
      existingVendor.phone= phone;
      existingVendor.foodType = foodType

      const savedResult = await existingVendor.save()
      return res.json(savedResult)
     }

     return res.json(existingVendor);
  }

  return res.json({'message': 'vendor Information Not Found'})

}

export const UpdateVendorService = async (req: Request,res: Response, next: NextFunction) => {

  const user = req.user;

  if(user) {

    const existingVendor = await FindVendor(user._id);

     if(existingVendor !== null){


      existingVendor.serviceAvailable = !existingVendor.serviceAvailable;

      const saveResult = await existingVendor.save();

      return res.json(saveResult);


    }
  }

}


export const UpdateVendorCoverImage = async (req: Request,res: Response, next: NextFunction) => {

  const user = req.user;

   if(user){

     const vendor = await FindVendor(user._id);

     if(vendor !== null){

          const files = req.files as [Express.Multer.File];

          const images = files.map((file: Express.Multer.File) => file.filename);

          vendor.coverImages.push(...images);

          const saveResult = await vendor.save();
          
          return res.json(saveResult);
     }

  }
  return res.json({'message': 'Unable to Update vendor profile '})

}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {

  const user = req.user;

  const { name, description, category, foodType, readyTime, price } = <CreateFoodInput>req.body;
   
  if(user){

     const vendor = await FindVendor(user._id);

     if(vendor !== null){

          const files = req.files as [Express.Multer.File];

          const images = files.map((file: Express.Multer.File) => file.filename);
          
          const food = await Food.create({
              vendorId: vendor._id,
              name: name,
              description: description,
              category: category,
              price: price,
              rating: 0,
              readyTime: readyTime,
              foodType: foodType,
              images: images
          })
          
          vendor.foods.push(food);
          const result = await vendor.save();
          return res.json(result);
     }

  }
  return res.json({'message': 'Unable to Update vendor profile '})
}



export const GetFoods = async (req: Request,res: Response, next: NextFunction) => {

  const user = req.user;

  if(user) {

    const foods = await Food.find({ vandorId: user._id})

    if(foods !== null) {
      return res.json(foods)
    }

    
  }

  return res.json({'message': 'Food Information Not Found'})


}