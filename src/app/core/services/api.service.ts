import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import {  Department, Employee, Priority, ReceivedEmployee, Status, Task } from "../types/models";

@Injectable({
    'providedIn':"root"
})

export class ApiService{

url="https://momentum.redberryinternship.ge/api"
http=inject(HttpClient)
departments=signal<Department[]|undefined>([])
tasks=signal<Task[]>([])
toBeStartedTasks=signal<Task[]>([])
inProgressTasks=signal<Task[]>([])
toBeTestedTasks=signal<Task[]>([])
finishedTasks=signal<Task[]>([])
    

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
    return  this.http.get<ReceivedEmployee[]>(`${this.url}/employees`, {headers:header})
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
 this.http.get<Task[]>(`${this.url}/tasks`, {headers:header}).subscribe({
  next:data=>{
    this.tasks.set(data)
    this.toBeStartedTasks.set(data.filter((task)=>{return task.status.name==="დასაწყები"}))
    this.inProgressTasks.set(data.filter((task)=>{return task.status.name==="პროგრესში"}))
    this.toBeTestedTasks.set(data.filter((task)=>{return task.status.name==="მზად ტესტირებისთვის"}))
    this.finishedTasks.set(data.filter((task)=>{return task.status.name==="დასრულებული"}))

  }, 
  error:error=>console.log(error)
 })

 }

  postData(destination:string, data:any){
    const header=new HttpHeaders({
      Authorization: 'Bearer ' 
  })

  return  this.http.post<ReceivedEmployee>(`${this.url}/${destination}`,data, {headers:header})

  }

}