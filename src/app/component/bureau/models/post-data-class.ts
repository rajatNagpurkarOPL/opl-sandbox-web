import { AddressRequest } from "./address-request";

export class PostDataClass {
    constitutionId: number;
    constitutionName: string;
    organisationName: string;
    enquiryType: string;
    enquiryAmount: string;
    enquiryPurpose: string;
    telephoneType: string;
    pan: string
    dateOfRegistration: Date;
    classOfActivity: string;
    companyAddress: AddressRequest;
    platFormId: string;
    orgId: number;

    constructor(constitutionId: number, constitutionName: string, organisationName: string, enquiryType: string, enquiryAmount: string, enquiryPurpose: string, telephoneType: string, pan: string, dateOfRegistration: Date, classOfActivity: string, companyAddress: AddressRequest, platFormId: string, orgId: number) {
        this.constitutionId = constitutionId;
        this.constitutionName = constitutionName;
        this.organisationName = organisationName;
        this.enquiryType = enquiryType;
        this.enquiryAmount = enquiryAmount;
        this.enquiryPurpose = enquiryPurpose;
        this.telephoneType = telephoneType;
        this.pan = pan;
        this.dateOfRegistration = dateOfRegistration;
        this.classOfActivity = classOfActivity;
        this.companyAddress = companyAddress;
        this.platFormId = platFormId;
        this.orgId = orgId;
    }

}

