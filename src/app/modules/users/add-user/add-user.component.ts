import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , NzButtonModule, NzInputModule, NzFormModule, NzSelectModule, NzCardModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UsersService);
  
  addUserForm!: FormGroup;
  roles: any[] = []; 

  ngOnInit() {
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      roleType: ['', Validators.required],
      status: [1] // Default status to 1
    });

    this.fetchRoles();
  }

  fetchRoles() {
    this.userService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      this.userService.addUser(this.addUserForm.value).subscribe((res) => {
        console.log('User Added', res);
      });
    }
  }
}