import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginI } from 'src/app/modelos/login.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  loginForm: any


  constructor(private api: ApiService, private router:Router) {}

  errorStatus: boolean = false;
  errorMsj: any = '';

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [Validators.required]),
    });

    this.checkLocalStorage();

  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  onLogin(form: LoginI) {
    this.api.loginByEmail(form).subscribe((data) => {
      console.log(data);
      let dataResponse:ResponseI = data;
      if(dataResponse.mensaje == "OK"){
        localStorage.setItem('token', dataResponse.response);
        this.router.navigate(['/dashboard']);
      }else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.mensaje;
        ;
      }
    });
  }
}
