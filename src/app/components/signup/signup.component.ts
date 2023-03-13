import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserStoreService } from 'src/app/services/userStore/user-store.service';
import ValidateForm from 'src/app/shared/helpers/validateForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = 'password';
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder,private auth: AuthService,
    private snackBar: MatSnackBar,private store: UserStoreService
    ) { }

  ngOnInit() {
    this.initializeForm();
  }

initializeForm() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  onSingUp(){
    if(this.signUpForm.valid){
      this.auth.signUp(this.signUpForm.value).pipe(
      map(x=> {
        this.signUpForm.reset();
        this.snackBar.open(x.message, 'Dismiss', {
          duration: 3000
        });
      
      }
      ),
      catchError(err => {
        return of(this.snackBar.open(err?.error.message, 'Dismiss', {
          duration: 3000
        }));
    })).subscribe();
    } else {
      ValidateForm.validateAllFormFiels(this.signUpForm)
    }
  }


}
