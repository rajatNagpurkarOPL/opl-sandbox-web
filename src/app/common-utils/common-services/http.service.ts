import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Utils } from './utils.service';
import { LoaderService } from './LoaderService';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private utils : Utils, private http: HttpClient, private loaderService: LoaderService) { }

  /**
   * For Post service url with data
   */
  header = new HttpHeaders();
  post(url: string, data: any, ignoreLoader?: string | string[]) {
    if (ignoreLoader !== undefined && !ignoreLoader) {
      this.header = this.header.append('ignoreLoader', ignoreLoader.toString());
      return this.http.post(url, data, { headers: this.header }).pipe(
        catchError((err: HttpErrorResponse) => {
          return this.utils.errorHandle(err);
        }));
    } else {
      this.loaderService.show();
      return this.http.post(url, data).pipe(
        catchError((err: HttpErrorResponse) => {
          return this.utils.errorHandle(err);
        }));
    }
  }


  /**
   * for get method call
   */
  get(url: any, responseType: any, ignoreLoader?: boolean) {
    if (responseType === true) {
      if (ignoreLoader !== undefined && !ignoreLoader) {
        this.header = this.header.append('ignoreLoader', ignoreLoader.toString());
        return this.http.get(url, { responseType: 'arraybuffer', headers: this.header }).pipe(
          catchError((err: HttpErrorResponse) => {
            return this.utils.errorHandle(err);
          }));
      } else {
        this.loaderService.show();
        return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
          catchError((err: HttpErrorResponse) => {
            return this.utils.errorHandle(err);
          }));
      }
    } else {
      if (ignoreLoader !== undefined && !ignoreLoader) {
        this.header = this.header.append('ignoreLoader', ignoreLoader.toString());
        return this.http.get(url, { headers: this.header }).pipe(
          catchError((err: HttpErrorResponse) => {
            return this.utils.errorHandle(err);
          }));
      } else {
        this.loaderService.show();
        return this.http.get(url).pipe(
          catchError((err: HttpErrorResponse) => {
            return this.utils.errorHandle(err);
          }));
      }
    }
  }

  /**
   * for delete method call
   */
  delete(url: any, ignoreLoader?: string | string[]) {
    if (ignoreLoader !== undefined && !ignoreLoader) {
      this.header = this.header.append('ignoreLoader', ignoreLoader.toString());
      return this.http.delete(url, { headers: this.header }).pipe(
        catchError((err: HttpErrorResponse) => {
          return this.utils.errorHandle(err);
        }));
    } else {
      this.loaderService.show();
      return this.http.delete(url).pipe(
        catchError((err: HttpErrorResponse) => {
          return this.utils.errorHandle(err);
        }));
    }
  }

  /**
   * For put method call
   */
  put(url: string, data: any, ignoreLoader?: string | string[]) {
    if (ignoreLoader !== undefined && !ignoreLoader) {
      this.header = this.header.append('ignoreLoader', ignoreLoader.toString());
      return this.http.put(url, data, { headers: this.header }).pipe(
        catchError((err: HttpErrorResponse) => {
          return this.utils.errorHandle(err);
        }));
    } else {
      this.loaderService.show();
      return this.http.put(url, data).pipe(
        catchError((err: HttpErrorResponse) => {
          return this.utils.errorHandle(err);
        }));
    }
  }

  upload(url: string, formData: any) {
    const headersData = new HttpHeaders({ 'Content-Type': 'multipart/form-data', enctype: 'multipart/form-data' });
    return this.http.post(url, formData, { reportProgress: true, observe: 'events', headers: headersData }).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.utils.errorHandle(err);
      }));
  }

}
