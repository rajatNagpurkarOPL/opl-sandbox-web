import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import { Metadata, Payload } from '../model/common-payload-model';
import { Utils } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AesGcmEncryptionService {

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

  getPayload(data: any){
    const sKey = this.getSecretKey()
    const sKeyEnc = forge.util.encode64(sKey);
    const iv = this.getIV();
    const ivEnc = forge.util.encode64(iv);
    return new Payload(
      new Metadata(sKeyEnc, ivEnc,"1.0", new Date(), Utils.getUUID()), 
      this.encryptAesGcm(sKey, iv, data));
  }

}
