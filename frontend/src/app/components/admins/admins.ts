import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-admins',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admins.html',
  styleUrl: './admins.css'
})
export class Admins implements OnInit {

  private adminService = inject(AdminService);

  admins: any[] = [];

  isEditing = false;
  editingAdminId: number | null = null;

  searchText = '';

  newAdmin = {
    firstName: '',
    lastName: '',
    gender: 'Male',
    phone: '',
    email: '',
    dateOfBirth: '',
    employeeNumber: '',
    username: '',
    password: ''
  };

  ngOnInit(): void {

    this.adminService.getAdmins().subscribe({
      next: (data) => {
        this.admins = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  filteredAdmins() {
    return this.admins.filter(admin =>
      `${admin.firstName} ${admin.lastName}`.toLowerCase().includes(this.searchText.toLowerCase()) ||
      admin.username.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  saveAdmin(): void {

    this.adminService.addAdmin(this.newAdmin).subscribe({

      next: (response) => {
        alert('Admin added successfully!');
        this.admins.push(response);
        this.resetForm();
      },

      error: (err) => {
        console.error(err);
        alert('Failed to save admin.');
      }

    });

  }

  deleteAdmin(id: number): void {

    if (!confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    this.adminService.deleteAdmin(id).subscribe({

      next: () => {
        this.admins = this.admins.filter(a => a.id !== id);
        alert('Admin deleted successfully.');
      },

      error: (err) => {
        console.error(err);
        alert('Failed to delete admin.');
      }

    });

  }

  editAdmin(admin: any): void {

    this.isEditing = true;
    this.editingAdminId = admin.id;

    this.newAdmin = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      gender: admin.gender,
      phone: admin.phone,
      email: admin.email,
      dateOfBirth: admin.dateOfBirth,
      employeeNumber: admin.employeeNumber,
      username: admin.username,
      password: ''   // left blank on purpose — never pre-fill the stored hash.
                      // Admin only needs to type a password here if they want to change it.
    };

  }

  updateAdmin(): void {

    if (this.editingAdminId === null) {
      return;
    }

    this.adminService.updateAdmin(this.editingAdminId, this.newAdmin).subscribe({

      next: (response) => {

        const index = this.admins.findIndex(a => a.id === this.editingAdminId);
        if (index !== -1) {
          this.admins[index] = response;
        }

        alert('Admin updated successfully!');
        this.isEditing = false;
        this.editingAdminId = null;
        this.resetForm();

      },

      error: (err) => {
        console.error(err);
        alert('Failed to update admin.');
      }

    });

  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingAdminId = null;
    this.resetForm();
  }

  private resetForm(): void {
    this.newAdmin = {
      firstName: '',
      lastName: '',
      gender: 'Male',
      phone: '',
      email: '',
      dateOfBirth: '',
      employeeNumber: '',
      username: '',
      password: ''
    };
  }

}
