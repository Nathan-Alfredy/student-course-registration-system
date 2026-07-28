
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentService } from '../../services/student';

@Component({
  selector: 'app-students',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {

  private studentService = inject(StudentService);

  students: any[] = [];

  isEditing = false;
editingStudentId: number | null = null;

   searchText = '';

  newStudent = {
  firstName: '',
  lastName: '',
  registrationNumber: '',
  program: '',
  academicYear: '',
  gender: '',
  email: '',
  phone: ''
};
saveStudent(): void {

  this.studentService.addStudent(this.newStudent).subscribe({

    next: (response) => {

      alert('Student added successfully!');

      console.log(response);

      this.students.push(response);

      this.newStudent = {
        firstName: '',
        lastName: '',
        registrationNumber: '',
        program: '',
        academicYear: '',
        gender: '',
        email: '',
        phone: ''
      };

    },

    error: (err) => {
      console.error(err);
      alert('Failed to save student.');
    }

  });

}

deleteStudent(id: number): void {

  if (!confirm('Are you sure you want to delete this student?')) {
    return;
  }

  this.studentService.deleteStudent(id).subscribe({

    next: () => {

      this.students = this.students.filter(student => student.id !== id);

      alert('Student deleted successfully.');

    },

    error: (err) => {
      console.error(err);
      alert('Failed to delete student.');
    }

  });

}

editStudent(student: any): void {

  this.isEditing = true;

  this.editingStudentId = student.id;

  this.newStudent = {

    firstName: student.firstName,
    lastName: student.lastName,
    registrationNumber: student.registrationNumber,
    program: student.program,
    academicYear: student.academicYear,
    gender: student.gender,
    email: student.email,
    phone: student.phone

  };

}
updateStudent(): void {

  if (this.editingStudentId === null) {
    return;
  }

  this.studentService.updateStudent(this.editingStudentId, this.newStudent).subscribe({

    next: (response) => {

      const index = this.students.findIndex(
        s => s.id === this.editingStudentId
      );

      if (index !== -1) {
        this.students[index] = response;
      }

      alert('Student updated successfully!');

      this.isEditing = false;
      this.editingStudentId = null;

      this.newStudent = {
        firstName: '',
        lastName: '',
        registrationNumber: '',
        program: '',
        academicYear: '',
        gender: '',
        email: '',
        phone: ''
      };

    },

    error: (err) => {
      console.error(err);
      alert('Failed to update student.');
    }

  });

}

cancelEdit(): void {

  this.isEditing = false;
  this.editingStudentId = null;

  this.newStudent = {
    firstName: '',
    lastName: '',
    registrationNumber: '',
    program: '',
    academicYear: '',
    gender: '',
    email: '',
    phone: ''
  };

}

  ngOnInit(): void {

    console.log('Students component loaded');

    this.studentService.getStudents().subscribe({
      next: (data) => {
        console.log("Students from API:", data);
  this.students = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }
  
  filteredStudents() {
  return this.students.filter(student =>
    student.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
    student.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
    student.registrationNumber.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

}