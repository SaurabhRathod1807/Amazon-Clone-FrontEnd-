import { Component } from '@angular/core';
import { Admin, AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
admin:Admin=new Admin('','','');
message:any="";

constructor(private adminservice:AdminService, private router:Router){}

checkadmin(){
  this.adminservice.checkadmin(this.admin).subscribe(answer=>{
    if(answer){
      this.router.navigate(['adminaction']);
      sessionStorage.setItem("name", this.admin.name);
      sessionStorage.setItem("message", "Admin sucessfully Login!")
      alert("admin Login successfully");

    }
    else{
      this.router.navigate(['admin']);
      this.message="Incorrect Username OR Password";
    }
  });
}
}
