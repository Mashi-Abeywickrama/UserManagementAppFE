import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  @Input() isVisible: boolean = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  handleConfirm(): void {
    this.confirm.emit();
  }

  handleCancel(): void {
    this.cancel.emit();
  }
}