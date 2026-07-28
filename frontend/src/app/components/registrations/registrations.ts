import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegistrationService } from '../../services/registration';
import { StudentService } from '../../services/student';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-registrations',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './registrations.html',
  styleUrl: './registrations.css'
})
export class Registrations implements OnInit {

  private registrationService = inject(RegistrationService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);

  registrations: any[] = [];
  students: any[] = [];
  courses: any[] = [];

  isEditing = false;
  editingRegistrationId: number | null = null;

  searchText = '';

  newRegistration = {
    studentId: null,
    courseId: null,
    registrationDate: new Date().toISOString().substring(0, 10),
    status: 'PENDING'
  };

  ngOnInit(): void {

    this.registrationService.getRegistrations().subscribe({
      next: (data) => {
        this.registrations = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  filteredRegistrations() {
    return this.registrations.filter(reg => {
      const studentName = reg.student ? `${reg.student.firstName} ${reg.student.lastName}` : '';
      const courseName = reg.course ? `${reg.course.courseCode} ${reg.course.courseName}` : '';
      const text = this.searchText.toLowerCase();
      return studentName.toLowerCase().includes(text) || courseName.toLowerCase().includes(text);
    });
  }

  private buildPayload() {
    return {
      registrationDate: this.newRegistration.registrationDate,
      status: this.newRegistration.status,
      student: { id: this.newRegistration.studentId },
      course: { id: this.newRegistration.courseId }
    };
  }

  saveRegistration(): void {

    this.registrationService.addRegistration(this.buildPayload()).subscribe({

      next: (response) => {
        alert('Registration saved successfully!');
        this.registrations.push(response);
        this.resetForm();
      },

      error: (err) => {
        console.error(err);
        alert('Failed to save registration.');
      }

    });

  }

  deleteRegistration(id: number): void {

    if (!confirm('Cancel this registration?')) {
      return;
    }

    this.registrationService.deleteRegistration(id).subscribe({

      next: () => {
        this.registrations = this.registrations.filter(r => r.id !== id);
        alert('Registration cancelled.');
      },

      error: (err) => {
        console.error(err);
        alert('Failed to cancel registration.');
      }

    });

  }

  editRegistration(reg: any): void {

    this.isEditing = true;
    this.editingRegistrationId = reg.id;

    this.newRegistration = {
      studentId: reg.student ? reg.student.id : null,
      courseId: reg.course ? reg.course.id : null,
      registrationDate: reg.registrationDate,
      status: reg.status
    };

  }

  updateRegistration(): void {

    if (this.editingRegistrationId === null) {
      return;
    }

    this.registrationService.updateRegistration(this.editingRegistrationId, this.buildPayload()).subscribe({

      next: (response) => {

        const index = this.registrations.findIndex(r => r.id === this.editingRegistrationId);
        if (index !== -1) {
          this.registrations[index] = response;
        }

        alert('Registration updated successfully!');
        this.isEditing = false;
        this.editingRegistrationId = null;
        this.resetForm();

      },

      error: (err) => {
        console.error(err);
        alert('Failed to update registration.');
      }

    });

  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingRegistrationId = null;
    this.resetForm();
  }

  private resetForm(): void {
    this.newRegistration = {
      studentId: null,
      courseId: null,
      registrationDate: new Date().toISOString().substring(0, 10),
      status: 'PENDING'
    };
  }

}
