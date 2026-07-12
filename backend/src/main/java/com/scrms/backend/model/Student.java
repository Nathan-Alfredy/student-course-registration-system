package com.scrms.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
    @Table(name = "students")
    public class Student extends Person {

        private String registrationNumber;
        private String program;
        private String academicYear;
        private Integer admissionYear;

        @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
        private List<Registration> registrations = new ArrayList<>();

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


        public List<Registration> getRegistrations() {
        return registrations;
        }

        public void setRegistrations(List<Registration> registrations) {
        this.registrations = registrations;
    }

    @Override
    public String getRole() {
        return "Student";
    }

}


