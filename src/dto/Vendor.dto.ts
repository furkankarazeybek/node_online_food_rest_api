export interface CreateVendorInput{
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface EditVendorInput{
    name: string;
    address: string;
    phone: string;
    foodType:[string];
}


export interface VendorLoginInputs{
    email: string;
    password: string;
}

export interface VendorPayLoad {
    _id: string;
    email: string;
    name: string;
    foodTypes: [string];
}