import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserStoreService } from 'src/app/services/userStore/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public fullName: string = '';

  constructor(private auth: AuthService,
    private store: UserStoreService) { }

    ngOnInit() {
      this.store.getFullName().subscribe(val=> {
       let fullNameFromToken = this.auth.getFullNameFromToken();
       this.fullName = val || fullNameFromToken;
      });
   }
 
   logOut(){
     this.auth.signOut();
   }
}
