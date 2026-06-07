import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRequestDTO } from '../models/user.interface';
import { Book } from '../models/book.interface';
import { Department } from '../models/department.interfcae';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
    basePath:string = "http://localhost:8080/";

    constructor(private http:HttpClient){

    }

    logingUser(req:any):Observable<any>{
      return this.http.post<any>(this.basePath+'auth/login', req);
    }

    refreshToken() {
      const refreshToken = localStorage.getItem('refreshToken');

      return this.http.post<any>(
        `${this.basePath}auth/refresh?refreshToken=${refreshToken}`,
        {}
      );
    }

    getAllUser():Observable<User[]>{
      return this.http.get<User[]>(this.basePath+"users");
    }

    createUser(userObj:UserRequestDTO):Observable<User>{
      return this.http.post<User>(this.basePath+"users/create", userObj);
    }

    updateUser( id:number, userObj:UserRequestDTO):Observable<User>{
      return this.http.put<User>(this.basePath+"users/"+id, userObj);
    }

    deleteUser(id:number):Observable<void>{
      return this.http.delete<void>(this.basePath+"users/"+id);
    }

    getAllBooks():Observable<Book[]>{
      return this.http.get<Book[]>(this.basePath+"books");
    }

    getAllAvailable():Observable<Book[]>{
      return this.http.get<Book[]>(this.basePath+"books/available")
    }


    createBook(reqObj:any):Observable<any>{
      return this.http.post<any>(this.basePath+"books/add", reqObj);
    }

    updateBook( id:number, reqObj:any):Observable<any>{
      return this.http.put<any>(this.basePath+"books/"+id, reqObj);
    }

    deleteBook(id:number):Observable<void>{
      return this.http.delete<void>(this.basePath+"books/"+id);
    }

    getAllBorroedBooks():Observable<any>{
      return this.http.get<any>(this.basePath+"borrows");
    }

    createBrrowed(reqObj:any):Observable<any>{
      return this.http.post<any>(this.basePath+"borrows/add", reqObj);
    }

    updateBorrowed( id:number, reqObj:any):Observable<any>{
      return this.http.put<any>(this.basePath+"borrows/"+id, reqObj);
    }

    deleteBorrowed(id:number):Observable<void>{
      return this.http.delete<void>(this.basePath+"borrows/"+id);
    }


    getAllDepartments():Observable<Department[]>{
      return this.http.get<Department[]>(this.basePath+"departments");
    }


     createDepartment(deptObj:any):Observable<Department>{
      return this.http.post<Department>(this.basePath+"departments/add", deptObj);
    }

    updateDeparment( id:number, deptObj:any):Observable<Department>{
      return this.http.patch<Department>(this.basePath+"departments/"+id, deptObj);
    }

    deleteDepartment(id:number):Observable<void>{
      return this.http.delete<void>(this.basePath+"departments/"+id);
    }





}
