import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { Students } from './components/students/students';
import { Courses } from './components/courses/courses';
import { Departments } from './components/departments/departments';
import { Registrations } from './components/registrations/registrations';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'students',
    component: Students
  },
  {
    path: 'courses',
    component: Courses
  },
  {
    path: 'departments',
    component: Departments
  },
  {
    path: 'registrations',
    component: Registrations
  }
];