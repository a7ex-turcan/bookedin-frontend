import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../core/users/user.model';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.sass']
})
export class UserProfileEditComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nickName: ['']
    });
  }

  ngOnInit() {
    // TODO: Load user data from service
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const userData: User = {
        ...this.profileForm.value,
        dateOfBirth: new Date(this.profileForm.value.dateOfBirth),
        collections: [] // Preserve existing collections
      };
      console.log('Saving user data:', userData);
      // TODO: Save user data via service
    }
  }
}
