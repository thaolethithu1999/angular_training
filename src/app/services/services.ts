import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { User } from './model/user';

@Injectable({
    providedIn: 'root', // Provides the service at the root level
})
  
export class ApiService {
    usersUrl = 'http://localhost:3000/users/';

    constructor(
        private http: HttpClient
    ) {}


    public getUsers(): Observable<User[]> { 
        return this.http.get<User[]>(this.usersUrl); 
    }

    public updateUser(data: User): Observable<any> {
        return this.http.put(this.usersUrl + `${data.id}`, data);
    }

    public deleteUser(params: any): Observable<any> {
        return this.http.delete(this.usersUrl + `${params}`);
    }

    public addUser(data: User): Observable<any> {
        return this.http.post(this.usersUrl, data);
    }
}