import { Component, input, Input, signal } from '@angular/core';
import { Comment } from '../../types/models';
import { CommentAreaComponent } from '../comment-area/comment-area.component';

@Component({
  selector: 'app-comment-item',
  imports: [CommentAreaComponent],
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.scss'
})
export class CommentItemComponent {
@Input() comment!:Comment;
show=signal(false)
id=input.required<number>()
}
