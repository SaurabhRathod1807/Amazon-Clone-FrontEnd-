import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { window } from 'rxjs';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {


  constructor(private userService: UserService, private router:Router) { }

  logout() {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("userId");
    alert("User Logout successfully");

    // this.userService.logout().subscribe(
    //   response => {
    //     console.log('Logout successful');
    //     // Perform any additional actions after successful logout (e.g., redirect to login page)
    //     this.router.navigate(['product']);
       
    //   },
    //   error => {
    //     console.error('Logout failed', error);
    //     // Handle error cases if needed
    //   }
    // );
  }
  
}
