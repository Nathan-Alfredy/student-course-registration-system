package com.scrms.backend.service;

import com.scrms.backend.model.Department;
import com.scrms.backend.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(Long id) {
        return departmentRepository.findById(id);
    }

    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department department) {
        Department existingDepartment = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        existingDepartment.setDepartmentName(department.getDepartmentName());
        existingDepartment.setFaculty(department.getFaculty());
        existingDepartment.setOfficeLocation(department.getOfficeLocation());

        return departmentRepository.save(existingDepartment);
    }

    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }
}