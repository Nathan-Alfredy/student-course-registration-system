import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseService } from '../../services/course';
import { DepartmentService } from '../../services/department';

@Component({
  selector: 'app-courses',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses implements OnInit {

  private courseService = inject(CourseService);
  private departmentService = inject(DepartmentService);

  courses: any[] = [];
  departments: any[] = [];

  isEditing = false;
  editingCourseId: number | null = null;

  searchText = '';

  newCourse = {
    courseCode: '',
    courseName: '',
    creditHours: null,
    semester: null,
    departmentId: null
  };

  ngOnInit(): void {

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  filteredCourses() {
    return this.courses.filter(course =>
      course.courseCode.toLowerCase().includes(this.searchText.toLowerCase()) ||
      course.courseName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  private buildPayload() {
    return {
      courseCode: this.newCourse.courseCode,
      courseName: this.newCourse.courseName,
      creditHours: this.newCourse.creditHours,
      semester: this.newCourse.semester,
      department: this.newCourse.departmentId ? { id: this.newCourse.departmentId } : null
    };
  }

  saveCourse(): void {

    this.courseService.addCourse(this.buildPayload()).subscribe({

      next: (response) => {
        alert('Course added successfully!');
        this.courses.push(response);
        this.resetForm();
      },

      error: (err) => {
        console.error(err);
        alert('Failed to save course.');
      }

    });

  }

  deleteCourse(id: number): void {

    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    this.courseService.deleteCourse(id).subscribe({

      next: () => {
        this.courses = this.courses.filter(course => course.id !== id);
        alert('Course deleted successfully.');
      },

      error: (err) => {
        console.error(err);
        alert('Failed to delete course.');
      }

    });

  }

  editCourse(course: any): void {

    this.isEditing = true;
    this.editingCourseId = course.id;

    this.newCourse = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      creditHours: course.creditHours,
      semester: course.semester,
      departmentId: course.department ? course.department.id : null
    };

  }

  updateCourse(): void {

    if (this.editingCourseId === null) {
      return;
    }

    this.courseService.updateCourse(this.editingCourseId, this.buildPayload()).subscribe({

      next: (response) => {

        const index = this.courses.findIndex(c => c.id === this.editingCourseId);
        if (index !== -1) {
          this.courses[index] = response;
        }

        alert('Course updated successfully!');
        this.isEditing = false;
        this.editingCourseId = null;
        this.resetForm();

      },

      error: (err) => {
        console.error(err);
        alert('Failed to update course.');
      }

    });

  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingCourseId = null;
    this.resetForm();
  }

  private resetForm(): void {
    this.newCourse = {
      courseCode: '',
      courseName: '',
      creditHours: null,
      semester: null,
      departmentId: null
    };
  }

}
