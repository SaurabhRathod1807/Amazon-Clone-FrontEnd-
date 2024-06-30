import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
user:User = new User('','','','');

constructor(private userservice:UserService,private router:Router){}

loginhere(){
  this.router.navigate(['login']);
}

saveuser(){
  this.userservice.saveuser(this.user).subscribe();
  this.router.navigate(['login']);
  sessionStorage.setItem("message", "Registration Successful.please Login" );
}
}
