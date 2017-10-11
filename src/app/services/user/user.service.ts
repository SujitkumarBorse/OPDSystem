import { create } from '@angular/language-service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserService {

    createUserUrl = 'http://localhost:9000/opd-api/v1/users';

    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: any) {
        return this.http.post(this.createUserUrl, user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: any) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let token = JSON.parse(localStorage.getItem('currentUser'));
        if (token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token,  'token': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        }
    }
}