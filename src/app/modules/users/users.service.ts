import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiService: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('users');
  }

  getUserById(id: number): Observable<User> {
    return this.apiService.getById<User>('users', id);
  }

  updateUser(id: number, data: User): Observable<User> {
    return this.apiService.update<User>('users', id, data);
  }

  deleteUser(id: number): Observable<void> {
    return this.apiService.delete('users', id);
  }

  addUser(data: User): Observable<User> {
    return this.apiService.post('users', data);
  }

  getRoles(): Observable<any> {
    return this.apiService.get('roles');
  }
  
}
