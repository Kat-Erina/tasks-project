import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Priority, Status } from "../types/models";

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

}