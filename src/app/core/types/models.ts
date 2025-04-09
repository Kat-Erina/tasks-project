export type Priority= {
    id: number,
    name: string,
    icon: string,
    surname?:string,
    avatar?: string
  }

  export type Status= {
    id: number,
    name: string,
    icon?:string,
    surname?:string,
    avatar?: string
  }
  
  export type Department= {
    id: number,
    name: string,
    icon?:string,
    surname?:string,
    avatar?: string
  }

  export interface Employee {
    name: string,
    avatar: string
    surname:string
    department_id: number,
  }

  export interface ReceivedEmployee {
    id:number,
    name: string,
    avatar: string,
    surname:string,
department:Department,
icon?:string
  }


  export interface Comment
    {
        id: number,
        text: string,
        task_id: number,
        parent_id: number
      }

      export interface Task{
        id: number,
        name: string,
        description: string,
        due_date: string,
        status: Status,
        priority:Priority
        department: Department,
        employee:Employee, 
        total_comments:number
      }
  