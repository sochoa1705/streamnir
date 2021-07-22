import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResponseNumber } from 'src/app/Models/general/general.interface';
import { UserRequest } from 'src/app/Models/Request/UserRequest';
import { UserResponse } from 'src/app/Models/Response/UserResponse';
import { CoreService} from '../../Services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   userRequest : UserRequest = new UserRequest();
   userNom:string = 'Javier';

  constructor(
   private CoreService :CoreService,
  ) { }

  ngOnInit(): void {
   this.GetUserId();
  }

  GetUserId =() =>
  {
    debugger;
    this.userRequest.nomUser = this.userNom;
     this.CoreService.GetUserId(this.userRequest).subscribe(
            (data: ResponseNumber) => {
              if (data.Value ===0 )
              {
               // this.toastr.error('Ocurrió un error');
               //return false;;  
              }
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            }
          );
    return true;
  }

}
