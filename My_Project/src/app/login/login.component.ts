import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule, FormControl  } from '@angular/forms';
import { UserModel } from '../../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, RippleModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  user: UserModel = {
    userName: "",
    passWord: "",
    role: "",
    flag: ""
  }
  constructor(private router:Router, private users:UserService, private fb: FormBuilder, private msg: MessageService){
    this.loginForm = new FormGroup({
      userName: new FormControl<string | null>("", [Validators.required]),
      passWord: new FormControl<string | null>("", [Validators.required])
    });
  }

onSubmit(){
  this.user.userName = this.loginForm.value.userName;
  this.user.passWord = this.loginForm.value.passWord;
  this.users.login(this.user).subscribe({
    next: (res) => {
      console.log(res);
      if(res.message == "Login Success"){
        const JwtHelper = new JwtHelperService();
        var decodeValues = JwtHelper.decodeToken(res.tokken)
        if(decodeValues.Flag == "TRUE"){
          localStorage.setItem("username", this.loginForm.value.userName);
          localStorage.setItem("flag", decodeValues.Flag);
          localStorage.setItem("role", decodeValues.Role);
          this.router.navigate(["home"]);
          this.msg.add({ severity: 'success', summary: 'Success', detail: 'Login successfully' });
        }
      }
      else{
        this.msg.add({ severity: 'info', summary: 'Info', detail: 'Login failed' });
      }
    }
  });
}

}
