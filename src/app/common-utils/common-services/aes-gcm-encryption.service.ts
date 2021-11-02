import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import { SandboxService } from 'src/app/service/sandbox.service';
import { Metadata, Payload } from '../model/common-payload-model';
import { Utils } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AesGcmEncryptionService {

  sKey: any;
  iv: any;
  oplPublicKey: any;
  oplPrivateKey: any;
  BEGIN_PUBLIC_KEY: any = "-----BEGIN PUBLIC KEY-----";
  END_PUBLIC_KEY: any = "-----END PUBLIC KEY-----";
  BEGIN_PRIVATE_KEY: any = "-----BEGIN PRIVATE KEY-----";
  END_PRIVATE_KEY: any = "-----END PRIVATE KEY-----";
  HeaderEncryptionKey: any = "egyUmG7EHW49PpM7XUtJ2ogjulwWX1l1Az6QaCZp6Sw=";
  HeaderEncryptionIV: any = "4oGprBpOO6M1FcPNJDu2VQ==";

  constructor(private sandboxService : SandboxService, private utils : Utils) { 
    this.getOplPublicKey();
    this.getOplPrivateKey();
  }

   getSecretKey(){
    return forge.random.getBytesSync(32);
   }

   getIV(){
    return forge.random.getBytesSync(16);
   }

   encryptHeader(data : any){
    let keyByte = forge.util.decode64(this.HeaderEncryptionKey);
    let iv = forge.util.decode64(this.HeaderEncryptionIV);
    return this.encryptAesGcm(keyByte, iv, data);
   }

   encryptAesGcm(key: any, iv: any, data: any){
    let cipher = forge.cipher.createCipher("AES-GCM", key);
    cipher.start({iv : iv});
    cipher.update(forge.util.createBuffer(data));
    cipher.finish();

    let encrypted = cipher.output.data;
    let tag = cipher.mode.tag.data;
    let encryptedLoad = encrypted+tag;

    return forge.util.encode64(encryptedLoad);
  }

  decryptAesGcm(key: any, iv: any, data: any){
    const authTag = data.slice(data.length - 16);
    const encData = data.slice(0, data.length - 16);
    let cipher = forge.cipher.createDecipher("AES-GCM", key);
    cipher.start({iv : iv, tagLength: 128, tag: authTag});
    cipher.update(forge.util.createBuffer(encData));
    cipher.finish();

    let decrypted = cipher.output.data;
    return decrypted;
  }

  getEncPayload(data: any){
    this.sKey = this.getSecretKey()
    const sKeyEnc = this.encryptSecretKey(forge.util.encode64(this.sKey));
    const trasDate = this.getIvFromTimestamp();
    this.iv = this.getBytesFromString(trasDate);
    return new Payload(
      new Metadata(sKeyEnc,"1.0", trasDate, Utils.getUUID()), 
      this.encryptAesGcm(this.sKey, this.iv, data));
  }

  getDecPayload(payload: any){
    const byteData = forge.util.decode64(payload.data);
    const sKey = forge.util.decode64(payload.metadata.sKey);
    const iv = this.getBytesFromString(this.getBytesFromString(payload.metadata.timestamp));
    const sKeyDec = forge.util.decode64(this.decryptSecretKey(sKey));
    const decData = this.decryptAesGcm(sKeyDec, iv, byteData);
    payload.data = decData
    return payload;
  }

  getBytesFromString(data: any){
    return forge.util.createBuffer(data).getBytes(16);
  }

  getIvFromTimestamp(){
    return new DatePipe("en_IN").transform(new Date(), "dd-MM-yyyy hh:mm:ss");
  }

  encryptSecretKey(sKey: any){
    const rsa = forge.pki.publicKeyFromPem(this.BEGIN_PUBLIC_KEY + this.oplPublicKey + this.END_PUBLIC_KEY);
    const sKeyEnc = rsa.encrypt(sKey);
    return forge.util.encode64(sKeyEnc);
  }

  decryptSecretKey(sKey: any){
    const rsa = forge.pki.privateKeyFromPem(this.BEGIN_PRIVATE_KEY + this.oplPrivateKey + this.END_PRIVATE_KEY);
    const sKeyEnc = rsa.decrypt(sKey);
    return sKeyEnc;
  }

  getOplPublicKey(){
    this.sandboxService.getOplPublicKey().subscribe(res => {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        this.oplPublicKey = res.data;
      }
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

  getOplPrivateKey(){
    this.sandboxService.getOplPrivateKey().subscribe(res => {
      if(!Utils.isObjectNullOrEmpty(res.data)){
        this.oplPrivateKey = res.data;
      }
    }, (error: any) => {
      this.utils.errorSnackBar(error);
    });
  }

}
