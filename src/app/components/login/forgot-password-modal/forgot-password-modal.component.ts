import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forget-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgetPasswordModalComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ForgetPasswordModalComponent>) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Add your code here to send a password reset email to the user's email address
      alert('Password reset email sent to ' + this.form.value.email);
      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
