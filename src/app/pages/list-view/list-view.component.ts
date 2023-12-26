import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskStorageService } from '../../task-storage.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



interface Task {
  name: string;
  description: string;
  dueDate: string;
}

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule
  ],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent implements OnInit {
  tasks: Task[] = [];
  page = 1;
  pageSize = 5;

  constructor(
    private toastr: ToastrService,
    private taskService: TaskStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.sort_due_date();
  }

  editTask(name:string) {
    this.router.navigate(['side_nav/edit_task', name]);
  }

  sort_due_date(){
    this.tasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
    
      // Compare dates
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });
  }

  deleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.tasks = this.taskService.getTasks();
    this.sort_due_date();
    this.toastr.warning("The task is deleted.")
  }

  getMax() {
    return Math.min(this.page * this.pageSize, this.tasks?.length ?? 0);
  }

  isPastDue(dateString: string): number {
    const currentDate = new Date();
    const dueDate = new Date(dateString);
    currentDate.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0); 
    if(dueDate < currentDate) return -1;
    else if(dueDate > currentDate) return 1;
    else return 0;
  }
}
