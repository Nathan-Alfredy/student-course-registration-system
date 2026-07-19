
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentService } from '../../services/student';

@Component({
  selector: 'app-students',
  imports: [CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {

  private studentService = inject(StudentService);

  students: any[] = [];

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

}