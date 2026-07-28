import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DepartmentService } from '../../services/department';

@Component({
  selector: 'app-departments',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './departments.html',
  styleUrl: './departments.css'
})
export class Departments implements OnInit {

  private departmentService = inject(DepartmentService);

  departments: any[] = [];

  isEditing = false;
  editingDepartmentId: number | null = null;

  searchText = '';

  newDepartment = {
    departmentName: '',
    faculty: '',
    officeLocation: ''
  };

  ngOnInit(): void {

    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  filteredDepartments() {
    return this.departments.filter(dept =>
      dept.departmentName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      dept.faculty.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  saveDepartment(): void {

    this.departmentService.addDepartment(this.newDepartment).subscribe({

      next: (response) => {
        alert('Department added successfully!');
        this.departments.push(response);
        this.resetForm();
      },

      error: (err) => {
        console.error(err);
        alert('Failed to save department.');
      }

    });

  }

  deleteDepartment(id: number): void {

    if (!confirm('Are you sure you want to delete this department?')) {
      return;
    }

    this.departmentService.deleteDepartment(id).subscribe({

      next: () => {
        this.departments = this.departments.filter(d => d.id !== id);
        alert('Department deleted successfully.');
      },

      error: (err) => {
        console.error(err);
        alert('Failed to delete department.');
      }

    });

  }

  editDepartment(dept: any): void {

    this.isEditing = true;
    this.editingDepartmentId = dept.id;

    this.newDepartment = {
      departmentName: dept.departmentName,
      faculty: dept.faculty,
      officeLocation: dept.officeLocation
    };

  }

  updateDepartment(): void {

    if (this.editingDepartmentId === null) {
      return;
    }

    this.departmentService.updateDepartment(this.editingDepartmentId, this.newDepartment).subscribe({

      next: (response) => {

        const index = this.departments.findIndex(d => d.id === this.editingDepartmentId);
        if (index !== -1) {
          this.departments[index] = response;
        }

        alert('Department updated successfully!');
        this.isEditing = false;
        this.editingDepartmentId = null;
        this.resetForm();

      },

      error: (err) => {
        console.error(err);
        alert('Failed to update department.');
      }

    });

  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingDepartmentId = null;
    this.resetForm();
  }

  private resetForm(): void {
    this.newDepartment = {
      departmentName: '',
      faculty: '',
      officeLocation: ''
    };
  }

}
