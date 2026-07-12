package com.scrms.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;





    @Entity
    @Table(name = "admins")
    public class Admin extends Person {

        private String employeeNumber;
        private String username;
        private String password;

        public Admin() {
        }

        public Admin(Long id, String firstName, String lastName, String gender,
                     String phone, String email, LocalDate dateOfBirth,
                     String employeeNumber, String username, String password) {

            super(id, firstName, lastName, gender, phone, email, dateOfBirth);

            this.employeeNumber = employeeNumber;
            this.username = username;
            this.password = password;
        }

        public String getEmployeeNumber() {
            return employeeNumber;
        }

        public void setEmployeeNumber(String employeeNumber) {
            this.employeeNumber = employeeNumber;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        @Override
        public String getRole() {
            return "Administrator";
        }
    }

