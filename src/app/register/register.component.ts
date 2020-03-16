import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { error } from 'protractor';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  @Output() cancelRegister = new EventEmitter();

  model :any ={};


  ngOnInit() {
  }

  constructor(private authService: AuthService,
              private alertify: AlertifyService) {
    console.log('runnig')
  }

  register(){
    this.authService
      .register(this.model)
      .subscribe(

        next =>{
          this.alertify.success('registration done!' )
        },
        error =>{
          this.alertify.error(error);
        }
      );
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
