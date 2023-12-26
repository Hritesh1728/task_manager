import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskStorageService } from '../../task-storage.service';
import { Router } from '@angular/router';

interface Task {
  name: string;
  description: string;
  dueDate: string; 
}

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {
  formData: Task = { name: '', description: '', dueDate: '' };
  tasks: Task[] = [];
  constructor(
    private toastr: ToastrService,
    private taskService: TaskStorageService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  viewTasks() {
    this.router.navigate(['side_nav/list_view']);
  }

  onSubmit() {
    console.log(this.formData);
    if(this.isTaskExists(this.formData)){
      this.toastr.warning('This task name has already been created.');
    }else if (this.isValidTask(this.formData)) {
      this.taskService.addTask(this.formData);
      this.formData = { name: '', description: '', dueDate: '' };
      this.toastr.success('The task addition has been successfully completed.');
    }else{
      this.toastr.error('An error occurred. Please try again.');
    }
  }
  private isTaskExists(task:Task): boolean{
    if(!this.isValidTask(this.formData)  )return false;
    for(let tsk of this.tasks){
      if(tsk.name===task.name.trim()){
        return true;
      }
    }
    return false;
  }

  private isValidTask(task: Task): boolean {
    return task.name.trim() !== '' && task.description.trim() !== '' && task.dueDate.trim() !== '';
  }

}
