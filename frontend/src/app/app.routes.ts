import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { Students } from './components/students/students';
import { Courses } from './components/courses/courses';
import { Departments } from './components/departments/departments';
import { Registrations } from './components/registrations/registrations';
import { Admins } from './components/admins/admins';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';



export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    component: Dashboard, canActivate: [authGuard]
  },
  {
    path: 'students',
    component: Students, canActivate: [authGuard]
  },
  {
    path: 'courses',
    component: Courses, canActivate: [authGuard]
  },
  {
    path: 'departments',
    component: Departments, canActivate: [authGuard]
  },
  {
    path: 'registrations', 
    component: Registrations, canActivate: [authGuard]
  },
  {
     path: 'admins',
     component: Admins, canActivate: [authGuard]
   }


];