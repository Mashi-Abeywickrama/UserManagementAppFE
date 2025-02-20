import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../../shared/models/user.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UsersTableComponent } from './users-table/users-table.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [UsersTableComponent, FormsModule]  // Include FormsModule in imports for ngModel
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';  // Store the search query
  selectedUser: User | null = null;
  isEditModalVisible: boolean = false;

  constructor(
    private usersService: UsersService, 
    private modal: NzModalService,
    private router: Router  // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Fetch users from the service
  fetchUsers(): void {
    this.usersService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.filteredUsers = users;  // Initialize filtered users with all users
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  // Open the edit modal with the selected user
  openEditModal(userId: number): void {
    const user = this.users.find(u => u.userID === userId);
    if (user) {
      this.selectedUser = { ...user };  // Clone to avoid direct mutations
      this.isEditModalVisible = true;
    }
  }

  // Handle save from the modal
  saveUser(updatedUser: User): void {
    this.usersService.updateUser(updatedUser.userID, updatedUser).subscribe(() => {
      this.fetchUsers();  // Refresh list after update
      this.isEditModalVisible = false;
    });
  }

  // Handle cancel action
  closeEditModal(): void {
    this.isEditModalVisible = false;
    this.selectedUser = null;
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

  // Search function to filter users based on the search query
  onSearch(): void {
    if (this.searchQuery) {
      this.filteredUsers = this.users.filter(user =>
        user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;  // Reset to all users when the search query is cleared
    }
  }

  // Navigate to the Add User page
  navigateToAddUser(): void {
    this.router.navigate(['/users/newuser']);
  }
}
