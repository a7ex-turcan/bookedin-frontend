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
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nickName: [''],
      profilePicture: ['']
    });
  }

  ngOnInit() {
    // TODO: Load user data from service
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.createPreview(file);
    }
  }

  private createPreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.profileForm.get('profilePicture')?.setValue('');
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const userData: User = {
        ...this.profileForm.value,
        dateOfBirth: new Date(this.profileForm.value.dateOfBirth),
        collections: [], // Preserve existing collections
        profilePictureUrl: this.previewUrl // Add the profile picture URL
      };
      console.log('Saving user data:', userData);
      // TODO: Save user data and upload image via service
    }
  }
}
