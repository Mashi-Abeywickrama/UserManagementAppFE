import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';

export const USER_ROUTES: Routes = [
  { path: '', component: UsersComponent },
  { path: 'newuser', component: AddUserComponent }
];
