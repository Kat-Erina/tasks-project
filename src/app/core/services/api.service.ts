import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, OnInit, signal } from "@angular/core";
import {  Department, Employee, Priority, ReceivedEmployee, Status, Task } from "../types/models";
import { SharedStates } from "./sharedStates.service";

@Injectable({
    'providedIn':"root"
})

export class ApiService implements OnInit{

url="https://momentum.redberryinternship.ge/api"
http=inject(HttpClient)
sharedStatesService=inject(SharedStates)
departments=signal<Department[]|undefined>([])
tasks=signal<Task[]>([])
toBeStartedTasks=signal<Task[]>([])
inProgressTasks=signal<Task[]>([])
toBeTestedTasks=signal<Task[]>([])
finishedTasks=signal<Task[]>([])
chosenFilteringCriterias=this.sharedStatesService.chosenFilteringCriterias

    

ngOnInit(): void {
  let fetchedData=localStorage.getItem('criterias')
  if(fetchedData){
    let parsedCriterias=JSON.parse(fetchedData)
    this.chosenFilteringCriterias.set(parsedCriterias)
  }
}

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
      next:(response)=>{
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
    this.sortData()
  }, 
  error:error=>console.log(error)
 })

 }


 sortData(){
this.toBeStartedTasks.set(this.tasks().filter((task)=>{return task.status.name==="დასაწყები"}))
this.inProgressTasks.set(this.tasks().filter((task)=>{return task.status.name==="პროგრესში"}))
this.toBeTestedTasks.set(this.tasks().filter((task)=>{return task.status.name==="მზად ტესტირებისთვის"}))
this.finishedTasks.set(this.tasks().filter((task)=>{return task.status.name==="დასრულებული"}))

this.toBeStartedTasks.set(this.filterTasks(this.toBeStartedTasks(), this.chosenFilteringCriterias()))
this.inProgressTasks.set(this.filterTasks(this.inProgressTasks(), this.chosenFilteringCriterias()))
this.toBeTestedTasks.set(this.filterTasks(this.toBeTestedTasks(), this.chosenFilteringCriterias()))
this.finishedTasks.set(this.filterTasks(this.finishedTasks(), this.chosenFilteringCriterias()))
 }

 filterTasks(tasks: Task[], criteria: {departments?:Department[] | undefined, priorities?:Priority[] |undefined, employees?:ReceivedEmployee[] | undefined}): Task[] {
  return tasks.filter(task => {
    const matchesDepartment = !criteria.departments?.length || criteria.departments.some(dep =>{return dep.name === task.department.name});
    const matchesPriority = !criteria.priorities?.length || criteria.priorities.some(pr => pr.id === task.priority.id);
    const matchesEmployee = !criteria.employees?.length || criteria.employees.some(emp => emp.id === task.employee.id);
  return matchesDepartment && matchesPriority && matchesEmployee
  });
}

  postData(destination:string, data:any){
    const header=new HttpHeaders({
      Authorization: 'Bearer ' 
  })

  return  this.http.post<ReceivedEmployee>(`${this.url}/${destination}`,data, {headers:header})

  }


  getItemInfo(id:number){
    const header=new HttpHeaders({
      Authorization: 'Bearer ' 
  })
    return this.http.get<Task>(`${this.url}/tasks/${id}`, {headers:header})
  }

  updateTaskstatus(id:number, data:{'status_id':number|undefined}){
    const header=new HttpHeaders({
      Authorization: 'Bearer ' 
  })

  return this.http.put<Task>(`${this.url}/tasks/${id}`,data,{headers:header})
  }

}