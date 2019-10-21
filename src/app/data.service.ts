import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Users } from './models/User';


@Injectable({
  providedIn: 'root'
})

/**
 * dataservice class to communicate with the API
 *  @author: yatheesh
 */
export class DataService {

  constructor(private _http: HttpClient) { }

  /**
   * creating login status variable and assigning initial value as true
   * @param : loginStatus
   */
  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * updating the login status
   */
  updateLoginStatus = (status: boolean) => {

    this.loginStatus.next(status)
  }



  /**
   * getting all the users from the database
   */
  getLoginUser = (email: string, password: string) => {
    let userObj = {
      "email": email,
      "password": password,
    }
    return this._http.post("http://10.117.189.90:9090/insurance-claim-system/login", userObj)
  }

  /**
   * Uplaod Document 
   * @param:formdata
   */
  uplaodDocument = (formData) => {
    return this._http.post("", formData)
  }


  /**
   * Sending Claim details to backend
   * @param:user
   */
  claimYourInsure = (user: Users) => {
    return this._http.post("http://10.117.189.159:9090/insurance-claim-system/api/claims", user);
  }


  /**
   * getting all the claims from the backend
   * @param:userId
   */
  getAllClamis = (userId: number) => {
    return this._http.get(`http://10.117.189.90:9090/insurance-claim-system/api/users/${userId}/claims`)
  }





}
