export class AddressRequest {
    addressLine1: string;// Required
    pinCode: string;// Required
    stateCode: string;// Required
    addressType: string;// Required
    city: string;
    constructor(addressLine1: string, pinCode: string, stateCode: string, addressType: string, city: string) {
        this.addressLine1 = addressLine1;// Required
        this.pinCode = pinCode;// Required
        this.stateCode = stateCode;// Required
        this.addressType = addressType;// Required
        this.city = city;
    }
}
