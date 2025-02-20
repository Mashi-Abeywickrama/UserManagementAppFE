import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { NzTableModule } from 'ng-zorro-antd/table'; // Import NzTableModule
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  standalone: true,  // Marking this as a standalone component
  imports: [CommonModule, NzTableModule, NzIconModule]  // Import necessary modules
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit(userId: number): void {
    this.edit.emit(userId);
  }

  onDelete(userId: number): void {
    this.delete.emit(userId);
  }
}
