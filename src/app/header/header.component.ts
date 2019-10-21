import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ConfirmationService]
})

/**
 * Creating class for Header
 */
export class HeaderComponent implements OnInit {
  /**
   * @var :display
   */
  display: boolean;
  userName: string = "Admin"
  constructor(
    private _service: DataService,
    private confirmationService: ConfirmationService,
    private _router: Router
  ) { }

  /**
   * Method to subscribe the login status and assigning the response data to display variable
   * @var :display
   */
  getLoginStatus = () => {
    this._service.loginStatus.subscribe(data => {
      this.display = data;
    })
  }

  logout = () => {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Log-out?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        sessionStorage.removeItem('key');
        this._service.updateLoginStatus(false);
        this._router.navigate(['login']);
      }
    });
  }

  login = () => {
    this._router.navigate(['login']);
  }

  ngOnInit() {
    this.getLoginStatus();

  }

}
