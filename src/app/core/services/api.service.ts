import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Department, Employee, Priority, Status } from "../types/models";

@Injectable({
    'providedIn':"root"
})
export class ApiService{
    url="https://momentum.redberryinternship.ge/api"
    http=inject(HttpClient)

 getPriorities(part:string){
  return  this.http.get<Priority[]>(`${this.url}/${part}`)
 }

 getStatuses(part:string){
    return  this.http.get<Status[]>(`${this.url}/${part}`)
   }

   getDepartments(part:string){
    return  this.http.get<Department[]>(`${this.url}/${part}`)
   }

   getEmployees(part:string){
    const header=new HttpHeaders({
        Authorization: 'Bearer 9e902db0-6dbe-4dc2-9830-71358f9248f5' 
    })
    return  this.http.get<Employee[]>(`${this.url}/${part}`, {headers:header})
   }

}