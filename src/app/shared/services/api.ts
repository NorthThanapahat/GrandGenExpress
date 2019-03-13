import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ConfigApi } from "./config";


@Injectable()
export class ApiProvider{

  headers = new HttpHeaders();
    constructor(public http:HttpClient){

    }
    setHeader(){
      let headers = new HttpHeaders();
       headers = headers.append("Accept", 'application/json');
       headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      
      return headers;
    }
    loginPost(data) {
        return new Promise((resolve, reject) => {
    
          let headers = this.setHeader();
    
          const req = JSON.stringify(data);
    
          console.log('login data ===>', data);
          console.log('login data json', req);
    
    
          this.http.post(ConfigApi.login_url, req, { headers: headers })
            .subscribe(res => {
              console.log('login response ===>', res);
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
    
      }
    
}