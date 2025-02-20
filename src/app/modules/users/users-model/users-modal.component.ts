// import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { NzModalModule } from 'ng-zorro-antd/modal';
// import { NzFormModule } from 'ng-zorro-antd/form';
// import { NzInputModule } from 'ng-zorro-antd/input';
// import { NzSelectModule } from 'ng-zorro-antd/select';
// import { NzButtonModule } from 'ng-zorro-antd/button';

// @Component({
//   selector: 'app-users-modal',
//   templateUrl: './users-modal.component.html',
//   styleUrls: ['./users-modal.component.scss'],
//   standalone: true,
//   imports: [ReactiveFormsModule, NzModalModule, NzFormModule, NzInputModule, NzSelectModule, NzButtonModule]
// })
// export class UsersModalComponent implements OnChanges {
//   @Input() user: any;
//   @Output() save = new EventEmitter<any>();
//   @Output() cancel = new EventEmitter<void>();

//   userForm: FormGroup;
//   isModalVisible: boolean = false;

//   constructor(private fb: FormBuilder) {
//     this.userForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       email: ['', [Validators.required, Validators.email]],
//       role: ['', Validators.required],
//       status: ['', Validators.required],
//     });
//   }

//   ngOnChanges(): void {
//     if (this.user) {
//       this.userForm.patchValue(this.user);
//     }
//   }

//   submitForm(): void {
//     if (this.userForm.valid) {
//       this.save.emit(this.userForm.value);
//     }
//   }

//   closeModal(): void {
//     this.isModalVisible = false;
//   }

//   openModal(): void {
//     this.isModalVisible = true;
//   }

// }
