import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskStorageService } from '../../task-storage.service';
import { ActivatedRoute,Router } from '@angular/router';

interface Task {
  name: string;
  description: string;
  dueDate: string; 
}

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit{
  formData: Task = { name: '', description: '', dueDate: '' };
  tasks: Task[] = [];
  toUpdateName = '';
  constructor(
    private toastr: ToastrService,
    private taskService: TaskStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.route.params.subscribe(params => {
      for (let i=0;i<this.tasks.length;i++) {
        if (this.tasks[i].name === params['name']) {
          this.formData = this.tasks[i];
          this.toUpdateName= i.toString();
          break;
        }
      }
    });
  }

  updateTask(event: any): void {
    const selectedIndex = event.target.value;
    if (selectedIndex !== '' && selectedIndex >= 0 && selectedIndex < this.tasks.length) {
      this.formData.description = this.tasks[selectedIndex].description;
      this.formData.dueDate = this.tasks[selectedIndex].dueDate;
    }
  }

  editTask(): void {
    if (this.isValidTask(this.formData)) {
      this.taskService.editTask(Number(this.toUpdateName===''?this.formData.name:this.toUpdateName), this.formData);
      this.tasks = this.taskService.getTasks();
      this.toastr.success('The task has been successfully edited.');
      this.formData = { name: '', description: '', dueDate: '' };
      if(this.toUpdateName!==''){
        this.toUpdateName='';
        this.router.navigate(['side_nav/list_view']);
      }
    }else{
      this.toastr.error('An error occurred. Please try again.');
    }
  }
  private isValidTask(task: Task): boolean {
    return task.name.trim() !== '' && task.description.trim() !== '' && task.dueDate.trim() !== '';
  }
}
