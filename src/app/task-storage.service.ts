import { Injectable } from '@angular/core';

interface Task {
  name: string;
  description: string;
  dueDate: string; // You can adjust the type based on your date format
}

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  private readonly storageKey = 'tasks';

  constructor() {}

  getTasks(): Task[] {
    const storedTasks = localStorage.getItem(this.storageKey);
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  editTask(index: number, updatedTask: Task): void {
    const tasks = this.getTasks();
    tasks[index].description = updatedTask.description;
    tasks[index].dueDate= updatedTask.dueDate;
    this.saveTasks(tasks);
  }

  deleteTask(index: number): void {
    const tasks = this.getTasks();
    tasks.splice(index, 1);
    this.saveTasks(tasks);
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
