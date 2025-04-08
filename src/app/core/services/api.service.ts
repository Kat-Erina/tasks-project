import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { CreateEmployee, Department, Employee, Priority, Status, Task } from "../types/models";

@Injectable({
    'providedIn':"root"
})

export class ApiService{
    url="https://momentum.redberryinternship.ge/api"
    http=inject(HttpClient)
    departments=signal<Department[]|undefined>([])
    

 getPriorities(){
  return  this.http.get<Priority[]>(`${this.url}/priorities`)
 }

 getStatuses(){
    return  this.http.get<Status[]>(`${this.url}/statuses`)
   }

   getDepartments(part:string){
    return  this.http.get<Department[]>(`${this.url}/${part}`)
   }

   getEmployees(){
    const header=new HttpHeaders({
        Authorization: 'Bearer ' 
    })
    return  this.http.get<Employee[]>(`${this.url}/employees`, {headers:header})
   }


   getAllDepartments(){
    this.getDepartments('departments').subscribe({
      next:(response)=>{console.log(response)
        this.departments.set(response)
      },
      error:(error)=>{console.log(error)}
    })
  }

 getTasks(){
  const header=new HttpHeaders({
    Authorization: 'Bearer ' 
})
return  this.http.get<Task[]>(`${this.url}/tasks`, {headers:header})

 }

  postData(destination:string, data:any){
    const header=new HttpHeaders({
      Authorization: 'Bearer ' 
  })

  return  this.http.post<Employee[]>(`${this.url}/${destination}`,data, {headers:header})

  }

}