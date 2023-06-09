import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../common-utils/common-services/http.service';
import { URLS } from '../common-utils/urls';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {

  constructor(private http: HttpService) { }
  login(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.LOGIN, data);
  }
  logout(): Observable<any> {
    return this.http.get(URLS.SANDBOX_USER.LOG_OUT, false);
  }
  signUp(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.SIGN_UP, data);
  }
  forgotPassword(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.FORGOT_PASSWORD, data);
  }
  resetPassword(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.RESET_PASSWORD, data);
  }
  getLoggedInUserDetails(): Observable<any> {
    return this.http.get(URLS.SANDBOX_USER.USER_DETAILS, false);
  }

  getMasterListsByCodes(data : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.GET_MASTER_DATA,data);
  }
  //ECR APIs
  getCreditRating(url : string, data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }

  //
  //API Accee Keys APIs
  getAPIAccessKey(data : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.GET_API_ACCESS_KEYS,data);
  }

  generateAPIAccessKey(data : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.GENERATE_API_ACCESS_KEYS,data);
  }

  getUserLogs(data): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.USER_LOGS ,data , false);
  }

  getUserDetailedLogsByLogId(logId): Observable<any>{
    return this.http.get(URLS.SANDBOX_USER.USER_DETAILED_LOGS_BY_LOG_ID + '/' + logId , false);
  }

  getApiCreditLimit(data : any,requestHeader : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.GET_API_CREDIT_LIMIT,data,requestHeader);
  }

  getApiSchema(data): Observable<any>{
    return this.http.get(URLS.SANDBOX_USER.SCHEMA_DETAIL+ '/' + data, false);
  }

  getDomainSchema(data): Observable<any>{
    return this.http.get(URLS.SANDBOX_USER.DOMAIN_DETAIL+ '/' + data, false);
  }

    //PENNYDROP APIs
  panStatusCheck(url : string,data : any,requestHeader : any): Observable<any>{
      return this.http.post(url,data,requestHeader);
  }

  bankAccountVerification(url : string, data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }

  udhyamRegDetail(url : string,data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }
  udhyamRegDetailUsingOTP(url : string,data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }
  verifyUdhyamRegDetailUsingOTP(url : string,data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }
  caIndividualDetail(url : string,data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }

  caFirmDetail(url : string,data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }

  //NSDL Pan Inquiry APIs
  getPanDetails(url : string , data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }

  getOrganisationEmailsList(orgId: any): Observable<any> {
    return this.http.get(URLS.SANDBOX_USER.GET_ALL_EMAIL_IDS_OF_ORGANISATION + '/' + orgId, false);
  }

  saveOrUpdateApiTriggers(data : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.SAVE_OR_UPDATE_API_TRIGGERS,data);
  }

  getTriggersList(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.GET_TRIGGERS_LIST, data);
  }

  getAPICreditLogsListDateFilter(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.GET_API_CREDIT_LOGS_LIST, data);
  }

  getAPICreditLogsListDateFilterExportToExcel(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.GET_API_CREDIT_LOGS_LIST_EXPORT_TO_EXCEL, data);
  }

  deleteTriggerByTriggerId(data: any): Observable<any> {
    return this.http.post(URLS.SANDBOX_USER.DELETE_TRIGGER_BY_TRIGGER_ID, data);
  }

  async getMasterCodes(data : any): Promise<Observable<any>>{
    return await this.http.post(URLS.SANDBOX_USER.GET_CODES, data)
  }

  getDocumentationAPIDetails(apiMstrId: any, fieldType: any): Observable<any>{
    return this.http.get(URLS.SANDBOX_USER.GET_API_DOCUMENTATION_DETAILS + '/' + apiMstrId +'/'+fieldType, false);
  }

  //E Sign and E Stamping APIs
  getEsignAndEstamping(url : string , data : any,requestHeader : any): Observable<any>{
    return this.http.post(url,data,requestHeader);
  }

  //File APIs
  uploadDocuments(data : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.UPLOAD_DOCUMENTS,data);
  }

  getAllDocumentDetails(userId : any): Observable<any>{
    return this.http.get(URLS.SANDBOX_USER.GET_ALL_DOCUMENTS + '/' + userId, false);
  }

  getActiveCertificate(userId : any): Observable<any>{
    return this.http.get(URLS.SANDBOX_USER.GET_ACTIVE_CERTIFICATE + '/' + userId, false);
  }

  activateCertificate(userId : any, documentId: any): Observable<any>{
    return this.http.put(URLS.SANDBOX_USER.ACTIVATE_CERTIFICATE + '/' + userId + '/' + documentId, false);
  }

  getKeyPairList(data : any): Observable<any>{
    return this.http.post(URLS.SANDBOX_USER.GET_KEYPAIR_LIST,data);
 }

 downloadFile(referenceId: any, fileName: any,isOplCertificate: any): Observable<any>{
    if(isOplCertificate){
      return this.http.get(URLS.SANDBOX_DMS.DOWNLOAD_OPL_CERTIFIICATE + '/' + fileName, true, false);
    }else{
      return this.http.get(URLS.SANDBOX_DMS.DOWNLOAD_FILE + '/' + referenceId, true, false);
    }
 }

 generateFile(data:any): Observable<any>{
  return this.http.post(URLS.SANDBOX_USER.GET_Generate_Certificate,data);
}

 getOplPublicKey(): Observable<any>{
  return this.http.get(URLS.SANDBOX_DMS.GET_OPL_PUBLIC_KEY, false);
 }

 getOplPrivateKey(): Observable<any>{
  return this.http.get(URLS.SANDBOX_DMS.GET_OPL_PRIVATE_KEY, false);
 }

manualSslCertificate(data : any):Observable<any>{
 return this.http.post(URLS.SANDBOX_USER.GET_Manual_Certificate,data);
}


//ipvr service
getState(): Observable<any>{
  return this.http.get(URLS.PROPLEGIT.GET_STATE_MASTER, false);
 }

 getHeaderOfState(data:any):Observable<any> {
  return this.http.post(URLS.PROPLEGIT. GET_HEADER_OF_STATE,data,false);
 }

 getListOfLocations(data:any):Observable<any> {
  return this.http.post(URLS.PROPLEGIT. GET_LIST_OF_LOCATIONS,data,false);
 }

//  getListOfLocations(data:any):Observable<any> {
//   return this.http.post('http://localhost:1114/proplegit/application/getListOfLocations',data,false);
//  }

 getListByClassesMaster(data:any):Observable<any> {
  return this.http.post(URLS.PROPLEGIT.GET_LIST_BY_CLASSES,data,false);
 }

 getRegionMaster(data:any):Observable<any>{
  return this.http.get(URLS.PROPLEGIT.GET_REGION_MASTER + '/' + data,false);
}

getCitySurveyOfficeMaster(data:any):Observable<any>{
  return this.http.get(URLS.PROPLEGIT.GET_CITYSURVEY_OFFICE_MASTER + '/' + data,false);
}

getdistrictListByStateId(data:any):Observable<any>{
  return this.http.get(URLS.PROPLEGIT.GET_DISTRICTLIST_BY_STATEID_MASTER + '/' + data,false);
}

getdistrictListByRegionId(data:any,regionid:any):Observable<any>{
  return this.http.get(URLS.PROPLEGIT.GET_DISTRICTLIST_BY_STATEID_MASTER + '/' + data + '/' + regionid,false);
}

getTalukaListByDistrictIdMaster(data:any):Observable<any>{
  return this.http.get(URLS.PROPLEGIT.GET_TALUKALIST_BY_DISTRICTD_MASTER + '/' + data,false);
}

getvilageListByDistrictIdAndTalukaId(districtid:any,data:any):Observable<any>{
  return this.http.get(URLS.PROPLEGIT.GET_VILAGELIST_BY_DId_And_TId  + '/' + districtid + '/' + data ,false);
}

getvilageListByDistrictIdAndCofficeId(districtid:any,data:any):Observable<any>{
  return this.http.get(URLS.PROPLEGIT.GET_VILAGELIST_BY_DID_AND_CITYOFFICE_MASTER  + '/' + districtid + '/' + data ,false);
}

getWardListByDistrictIdMaster(data:any):Observable<any>{
  return this.http.get(URLS.PROPLEGIT.GET_WARDLIST_BY_DISTRICTID_MASTER + '/' + data,false);
}

getWardListByDidAndCofficeId(districtId:any,data:any):Observable<any>{
  return this.http.get(URLS.PROPLEGIT.GET_WARDLIST_BY_DISTRICTID_MASTER + '/' + districtId + '/' + data,false);
}

createPropertyLoanApplication(stateName:any ,data: any,requestHeader : any): Observable<any> {
  return this.http.post(URLS.PROPLEGIT.CREATE_LOAN_APPLICATION + '/' + stateName ,data,requestHeader ,false);
}

//notgetway
// createPropertyLoanApplication(stateName:any ,data: any): Observable<any> {
//   return this.http.post(URLS.PROPLEGIT.CREATE_LOAN_APPLICATION + '/' + stateName ,data ,false);
// }

ivprSaveForm(ipvrUrl: any, data: any): Observable<any> {
  return this.http.post(ipvrUrl, data, false);
}

// ipvrviewresponse(applicationId: any): Observable<any> {
//   return this.http.get(URLS.PROPLEGIT.GET_PROPLEGIT_REQ_VIEW +'/' + applicationId, false);
// }
ipvrviewresponse(url: any, applicationId: any, requestHeader : any) : Observable<any> {
  return this.http.getRequestWithHeaders(url +'/' + applicationId, false, requestHeader);
}

getGeneratedOtpOfGST(url : string, data : any,requestHeader : any): Observable<any> {
  return this.http.post(url ,data ,requestHeader ,false);
}

verifyOtpOfGST(url : string, data : any,requestHeader : any): Observable<any> {
  return this.http.post(url ,data ,requestHeader ,false);
}

getGstTaxPayersData(url : string, data : any,requestHeader : any): Observable<any> {
  return this.http.post(url ,data ,requestHeader ,false);
}

getNameMatchingData(url : string,data : any,requestHeader : any): Observable<any> {
  return this.http.post(url ,data,requestHeader,false);
}


// getWardListByDidAndCofficeId(districtId:any,data:any):Observable<any>{
//   return this.http.get(URLS.PROPLEGIT.GET_WARDLIST_BY_DISTRICTID_MASTER + '/' + districtId + '/' + data,false);
// }

// getsingleGCS(url : string,data:any,requestHeader : any):Observable<any>
//   return this.http.getRequestWithHeaders(url + '/' + data,requestHeader,false);
// }

getsingleGCS(url: any, data:any, requestHeader : any) : Observable<any> {
  return this.http.getRequestWithHeaders(url +'/' + data, false, requestHeader);
}


getmultipleGCSData(url : string,data : any,requestHeader : any): Observable<any> {
return this.http.post(url ,data,requestHeader,false);
}

getGstTaxPayersGSTR1B2BAData(url : string, data : any,requestHeader : any): Observable<any> {
  return this.http.post(url ,data ,requestHeader ,false);
}

getGstTaxPayersGSTR1B2BData(url : string, data : any,requestHeader : any): Observable<any> {
  return this.http.post(url ,data ,requestHeader ,false);
}

/**
 * KCC Vendor Apis
 */

 kccVendorApi(url : string,data : any,requestHeader : any): Observable<any>{
  return this.http.post(url,data,requestHeader);
}

/**
 * Name match API Karza
 */
nameMatchApiKarza(url : string,data : any,requestHeader : any): Observable<any>{
  return this.http.post(url,data,requestHeader);
}
 // get Cibil Commercial Score
 getCibilCommercialScore(url: string, data: any, requestHeader: any): Observable<any> {
  return this.http.post(url, data, requestHeader);
}

 // get Cibil Commercial Score
 getCibilConsumerScore(url: string, data: any, requestHeader: any): Observable<any> {
  return this.http.post(url, data, requestHeader);
}

 // get Cibil Commercial Score
 getGSTData(url: string, data: any, requestHeader: any): Observable<any> {
  return this.http.post(url, data, requestHeader);
}


}
