import { Component, OnInit, inject } from '@angular/core';
import { StudentService } from '../../services/student';
import { CourseService } from '../../services/course';
import { DepartmentService } from '../../services/department';
import { RegistrationService } from '../../services/registration';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private departmentService = inject(DepartmentService);
  private registrationService = inject(RegistrationService);

  totalStudents = 0;
  totalCourses = 0;
  totalDepartments = 0;
  totalRegistrations = 0;

  ngOnInit(): void {

    this.studentService.getStudents().subscribe(data => {
      this.totalStudents = data.length;
    });

    this.courseService.getCourses().subscribe(data => {
      this.totalCourses = data.length;
    });

    this.departmentService.getDepartments().subscribe(data => {
      this.totalDepartments = data.length;
    });

    this.registrationService.getRegistrations().subscribe(data => {
      this.totalRegistrations = data.length;
    });

  }

}
