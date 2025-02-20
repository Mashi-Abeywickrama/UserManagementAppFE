import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

// Import standalone components
import { UsersComponent } from './users.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersDeleteDialogComponent } from './users-delete/users-delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    NzTableModule,
    NzModalModule,
    NzButtonModule,
    // Import standalone components here
    UsersComponent,
    UsersTableComponent,
    UsersDeleteDialogComponent,
  ],
  providers: [UsersService],
  exports: [  ]
})
export class UsersModule { }
