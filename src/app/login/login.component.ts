import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  message:any="";
  user:User= new User('','','','');

  constructor(private userservice:UserService, private router:Router){}

  ngOnInit(): void {
    this.message=sessionStorage.getItem("message");
  }

  showregister(){
    this.router.navigate(['register']);
  }

  // login(){
  //   this.userservice.login(this.user).subscribe(answer => {
  //     if(answer){
  //       this.router.navigate(['product']);
  //       // sessionStorage.setItem("username", this.user.name);
  //       sessionStorage.setItem("userId",this.user.userId);
        
  //     }
  //     else{
  //       this.router.navigate(['login']);
  //       this.message="Incorrect Username or  Password";
  //     }
  //   });
  // }

  login(){
    this.userservice.login(this.user).subscribe(answer =>{
      if(answer){
        this.router.navigate(['product']);
        
        sessionStorage.setItem("userId", this.user.userId);
      }
      else{
        this.router.navigate(['login']);
        this.message="Incorrect username or password";
      }
    });
  }
}
