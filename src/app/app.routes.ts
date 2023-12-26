import { Routes } from '@angular/router';
import { SideNavComponent } from './pages/side-nav/side-nav.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { ListViewComponent } from './pages/list-view/list-view.component';
import { ChartViewComponent } from './pages/chart-view/chart-view.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: '',redirectTo:"side_nav/home", pathMatch: "full"},
    {path: 'side_nav', component: SideNavComponent,children:[
        {path: 'home',component: HomeComponent},
        {path: 'add_task', component: AddTaskComponent},
        {path: 'edit_task', component: EditTaskComponent},
        {path: 'edit_task/:name', component: EditTaskComponent},
        {path: 'list_view', component: ListViewComponent},
        {path: 'chart_view', component: ChartViewComponent}
    ]}
];
