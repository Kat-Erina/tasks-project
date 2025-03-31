export type Priority= {
    id: number,
    name: string,
    icon: string
  }

  export type Status= {
    id: number,
    name: string,
    icon?:string
  }
  
  export type Department= {
    id: number,
    name: string,
  }

  export interface CreateEmployee {
    name: string,
    avatar: string
    surname:string
    department_id: number
  }

  export interface Employee extends CreateEmployee{
    id:number
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
        employee:Employee
      }
  