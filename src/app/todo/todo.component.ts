import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: any[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  inProgress: any[] = [];
  done: any[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      item: ["", Validators.required]
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addTask() {
    this.tasks.push(this.todoForm.value.item);
  }

}
