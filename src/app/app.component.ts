import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule} from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  adminLoggedIn : boolean = false;
  clientLoggedIn : boolean = false;
  ngOnInit(): void {
   this.clientLoggedIn = sessionStorage.getItem("userId") ? true : false;
   this.adminLoggedIn = sessionStorage.getItem("name") ? true : false;
  }

  
  logout() {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("userId");
    window.location.reload()
  }

  title = 'Amazonclone';
}
