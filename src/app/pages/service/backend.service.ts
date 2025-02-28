import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { json } from 'express';

interface UserSchema{
    fullname: string;
    email: string;
    password: string
}

@Injectable()
export class BackendService {
    constructor(private http: HttpClient) {}

    response!: any[];


    apiUrl = 'https://88k7cdg9-3000.inc1.devtunnels.ms';

    getUsers() {
        return this.http.get(this.apiUrl + "/users").pipe(
            map((response: any) => {
                this.response = response;
                return this.response;
            })
        );
    }
    createUser(userDetail: UserSchema){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              
            }),
          };
        return this.http.post(this.apiUrl + "/createUser",JSON.stringify(userDetail),httpOptions).pipe(
            map((response: any) => {
                this.response = response;
                return this.response;
            })
        );
    }
    validateOTPAuth(email: string,otpValue: number){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          };
        const otpparam = {
            mail: email,
            otp : otpValue
        }
        return this.http.post(this.apiUrl + "/validateOTP",JSON.stringify(otpparam),httpOptions).pipe(
            map((response: any) => {
                this.response = response;
                return this.response;
            })
        );
    }
}
