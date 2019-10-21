import { Component, OnInit } from '@angular/core';
import { Users } from '../models/User';
import { DataService } from '../data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  user: Users;
  dischargeDates;
  referenceId: string;

  msgs = [];


  constructor(private _service: DataService, private messageService: MessageService) {
    this.user = new Users();

  }

  dateValidation = () => {
    this.dischargeDates = this.user.admissionDate;
  }


  submitApplication = () => {
    console.log(this.user);
    this._service.claimYourInsure(this.user).subscribe((data) => {
      console.log(data);
      if (data['statusCode'] == 200) {
        this.referenceId = data['claimId'];
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Note Down Your Reference Id To Track the status of your application', detail: data['claimId'] });
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: data['message'] });
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Warn Message', detail: data['message'] });
      }
    })
  }

  // filechange = (event) => {
  //   const formData = new FormData();
  //   formData.append('file', event.target.files[0]);
  //   this._service.uplaodDocument(formData).subscribe((data) => {
  //     console.log("hellosssssssss", data);
  //   })
  // }

  ngOnInit() {

  }

}
