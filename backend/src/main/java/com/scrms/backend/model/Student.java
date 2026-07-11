package com.scrms.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;



    @Entity
    @Table(name = "students")
    public class Student extends Person {

        private String registrationNumber;
        private String program;
        private String academicYear;
        private Integer admissionYear;

        public Student() {
        }

        public Student(String registrationNumber, String program,
                       String academicYear, Integer admissionYear) {
            this.registrationNumber = registrationNumber;
            this.program = program;
            this.academicYear = academicYear;
            this.admissionYear = admissionYear;
        }

        public String getRegistrationNumber() {
            return registrationNumber;
        }

        public void setRegistrationNumber(String registrationNumber) {
            this.registrationNumber = registrationNumber;
        }

        public String getProgram() {
            return program;
        }

        public void setProgram(String program) {
            this.program = program;
        }

        public String getAcademicYear() {
            return academicYear;
        }

        public void setAcademicYear(String academicYear) {
            this.academicYear = academicYear;
        }

        public Integer getAdmissionYear() {
            return admissionYear;
        }

        public void setAdmissionYear(Integer admissionYear) {
            this.admissionYear = admissionYear;
        }
    }

