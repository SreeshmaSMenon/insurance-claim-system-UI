import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * @var :email,password
   */
  email: string;
  password: string;
  constructor(private _service: DataService, private _route: Router, private _builder: FormBuilder, private messageService: MessageService) { }

  /**
   * Sending credentials to backend and getting response
   */
  logIn = () => {

    this._service.getLoginUser(this.email, this.password).subscribe((data) => {
      console.log(data);
      if (data['statusCode'] == 200) {
        sessionStorage.setItem("User", data['userId']);
        this._service.updateLoginStatus(true);
        this._route.navigate(['dashboard'])
      }
      else {
        // alert(data['message']);
        this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: data['message'] });
      }
    })
  }


  loginForm = this._builder.group({
    mail: ['', Validators.required],
    password: ['', Validators.required],
  })

  ngOnInit() {
  }

}
