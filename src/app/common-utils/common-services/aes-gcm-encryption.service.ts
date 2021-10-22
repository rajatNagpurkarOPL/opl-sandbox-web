import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import { Metadata, Payload } from '../model/common-payload-model';
import { Utils } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AesGcmEncryptionService {

  sKey: any;
  iv: any;

  constructor() { }

   getSecretKey(){
    return forge.random.getBytesSync(32);
   }

   getIV(){
    return forge.random.getBytesSync(16);
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
    const sKeyEnc = forge.util.encode64(this.sKey);
    const trasDate = new DatePipe("en_IN").transform(new Date(), "dd-MM-yyyy hh:mm:ss");
    this.iv = this.getBytesFromString(trasDate);
    return new Payload(
      new Metadata(sKeyEnc,"1.0", trasDate, Utils.getUUID()), 
      this.encryptAesGcm(this.sKey, this.iv, data));
  }

  getDecPayload(payload: any){
    const byteData = forge.util.decode64(payload.data);
    const sKey = forge.util.decode64(payload.metadata.sKey);
    const iv = this.getBytesFromString(forge.util.decode64(payload.metadata.timestamp));
    const decData = this.decryptAesGcm(sKey, iv, byteData);
    payload.data = decData
    return payload;
  }

  getBytesFromString(data: any){
    return forge.util.createBuffer(data).getBytes(16);
  }

}
