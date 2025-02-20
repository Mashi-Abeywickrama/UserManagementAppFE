import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './auth.guard';
import { AddUserComponent } from './modules/users/add-user/add-user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Protect users route with AuthGuard
  {
    path: 'users',
    loadChildren: () => import('./modules/users/user.routes').then(m => m.USER_ROUTES),
    canActivate: [AuthGuard]
  },
  

  // Redirect empty path to login if not authenticated, otherwise to users
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // Catch all unknown routes and redirect to login
  { path: '**', redirectTo: 'login' }

];
