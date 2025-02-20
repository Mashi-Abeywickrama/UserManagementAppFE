import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users-delete-dialog',
  templateUrl: './users-delete-dialog.component.html',
  styleUrls: ['./users-delete-dialog.component.css']
})
export class UsersDeleteDialogComponent {
  @Input() user: any;
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmDelete.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}