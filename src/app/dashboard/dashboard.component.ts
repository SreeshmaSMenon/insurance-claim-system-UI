import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId;
  response;
  display: boolean = false;
  constructor(private _service: DataService, private confirmationService: ConfirmationService) { }

  getClaims = () => {
    this._service.getAllClamis(this.userId).subscribe((data) => {
      console.log("claim data", data);
      this.response = data;
    })
  }

  cancel(): void {
    this.display = true;
  }

  reject = () => {
    this.display = false;
  }

  approve = () => {

  }

  ngOnInit() {
    this.userId = sessionStorage.getItem("User");
    console.log(this.userId);
    this.getClaims();
  }

}
