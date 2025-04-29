import { Component, DestroyRef, inject, Input,  WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-comment-area',
  imports: [FormsModule],
  templateUrl: './comment-area.component.html',
  styleUrl: './comment-area.component.scss'
})
export class CommentAreaComponent {
  @Input() id!:number
  @Input()  childOrParent!:string
  @Input() parentCommentId!:number
  @Input() show!:WritableSignal<boolean>
  destroyRef=inject(DestroyRef)
  
  apiService=inject(ApiService)
  commentBody=''
  validateCommentBody=/\S/
 
  handleCommentAdd(){
    if(this.commentBody.length===0 || !this.validateCommentBody.test(this.commentBody)){
      alert('გთხოვთ დაწეროთ კომენტარი')
      return
    }
    if(this.childOrParent==='parent'){    
     let sub=this.apiService.addComment(this.id, {text:this.commentBody}).subscribe({
    next:response=>{
      if(response){
        this.commentBody='';
        this.apiService.getAllcomments(this.id)
      }
    },
    error: error=>console.log(error)
  })

  this.destroyRef.onDestroy(()=>{
    sub.unsubscribe()
  })
      
      
    }
     else{
     let sub=this.apiService.addComment(this.id, {text:this.commentBody, parent_id:this.parentCommentId}).subscribe({
        next:response=>{
          if(response){
            this.commentBody='';
            this.apiService.getAllcomments(this.id)
            this.show.set(false)
          }
        },
        error: error=>console.log(error)
      })

      this.destroyRef.onDestroy(()=>{
        sub.unsubscribe()
      })
    }
  }

  
}
