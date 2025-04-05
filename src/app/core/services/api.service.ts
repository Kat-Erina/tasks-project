import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { CreateEmployee, Department, Employee, Priority, Status } from "../types/models";

@Injectable({
    'providedIn':"root"
})

export class ApiService{
    url="https://momentum.redberryinternship.ge/api"
    http=inject(HttpClient)
    departments=signal<Department[]|undefined>([])
    

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
        Authorization: 'Bearer 9e96a874-0f36-4487-bf56-a254a0041569' 
    })
    return  this.http.get<Employee[]>(`${this.url}/${part}`, {headers:header})
   }


   getAllDepartments(){
    this.getDepartments('departments').subscribe({
      next:(response)=>{console.log(response)
        this.departments.set(response)
      },
      error:(error)=>{console.log(error)}
    })
  }

 

  postData(destination:string, data:any){
    const header=new HttpHeaders({
      Authorization: 'Bearer 9e96a874-0f36-4487-bf56-a254a0041569' 
  })

  return  this.http.post<Employee[]>(`${this.url}/${destination}`,data, {headers:header})

  }

}