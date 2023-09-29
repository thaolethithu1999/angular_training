import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './model/user';

@Injectable({
    providedIn: 'root', // Provides the service at the root level
})
  
export class ApiService {
    usersUrl = 'http://localhost:3000/users/';
    message: BehaviorSubject<string> = new BehaviorSubject<string>('');
    
    constructor(
        private http: HttpClient
    ) {}
    
    public getMessage(): Observable<string> {
        return this.message.asObservable();
    }

    public setMessage(message: string): void {
        this.message.next(message);
      }

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