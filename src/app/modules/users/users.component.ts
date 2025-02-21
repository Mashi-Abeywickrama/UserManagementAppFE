import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { User } from '../../shared/models/user.model';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';  // Import form module
import { NzInputModule } from 'ng-zorro-antd/input'; // Import input module
import { NzButtonModule } from 'ng-zorro-antd/button'; // Import button module
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';  // Import select module
import { UsersTableComponent } from './users-table/users-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    UsersTableComponent,
    ReactiveFormsModule,
    NzModalModule,
    FormsModule,
    CommonModule
  ] // Ensure the required Ant Design modules are imported
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;

  // User details for the modal
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  dateOfBirth: string = '';
  roleType = '';


  isEditModalVisible = false;
  searchQuery = '';  // Search query for filtering users
  roles: any[] = [];

  constructor(
    private usersService: UsersService,
    private modal: NzModalService,
    private fb: FormBuilder, // FormBuilder for creating form group
    private router: Router // Router for navigation
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchRoles();
  }

  fetchRoles() {
    this.usersService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  // Fetch users from the service
  fetchUsers(): void {
    this.usersService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }



  // Open the edit modal and pass the student details
  openEditModal(userId: number): void {
    const user = this.users.find((u) => u.userID === userId);
    if (user) {
      this.selectedUser = user;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.dateOfBirth = user.dateOfBirth;
      this.roleType = user.role.roleID.toString();
      this.isEditModalVisible = true;
    }
  }

  saveUser(): void {
    if (this.firstName && this.lastName && this.email && this.dateOfBirth && this.roleType) {
      var updatedUser: User;
      if (this.selectedUser) {
        updatedUser = {
          ...this.selectedUser,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          dateOfBirth: this.dateOfBirth,
          roleType: Number(this.roleType),
        };
        this.usersService.updateUser(updatedUser.userID, updatedUser).subscribe(() => {
          this.fetchUsers(); // Refresh the users list after update
          this.isEditModalVisible = false; // Close the modal
        });
      }

    }
  }

  // Close the modal without saving
  closeEditModal(): void {
    this.isEditModalVisible = false;
  }

  // Search users based on student name
  onSearch(): void {
    if (this.searchQuery) {
      this.users = this.users.filter(user =>
        user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fetchUsers(); // Fetch all users if search is empty
    }
  }

  // Confirm delete action before deleting the user
  confirmDelete(userId: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this user?',
      nzOnOk: () => this.deleteUser(userId),
    });
  }

  // Delete the user and refresh the users list
  deleteUser(userId: number): void {
    this.usersService.deleteUser(userId).subscribe(() => {
      this.fetchUsers();
    });
  }

  // Navigate to the add user route
  navigateToAddUser(): void {
    this.router.navigate(['/users/newuser']);
  }
}
