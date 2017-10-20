import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class PatientService {

    createUserUrl = 'http://localhost:9000/opd-api/v1/patients';

    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.createUserUrl, this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.createUserUrl + '/' + id, this.jwt()).map((response: Response) => response.json());
    }

    save(data: any) {
        return this.http.post(this.createUserUrl, data, this.jwt()).map((response: Response) => response.json());
    }

    update(data: any) {
        return this.http.put(this.createUserUrl + '/' + data._id, data, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.createUserUrl + "/" + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let token = JSON.parse(localStorage.getItem('currentUser'));
        if (token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + token,  'token': token });
            return new RequestOptions({ headers: headers });
        }
    }
}