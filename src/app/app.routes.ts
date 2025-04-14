import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"", 
        loadComponent:()=>import('./tasks/tasks.component').then(m=>m.TasksComponent)
    },
    {
path:'new-task', 
loadComponent:()=>import('./new-task/new-task.component').then(m=>m.NewTaskComponent)
    },
    {
        path:'task/:id',
        loadComponent:()=>import('./item/item.component').then(m=>m.ItemComponent)
    }
];
