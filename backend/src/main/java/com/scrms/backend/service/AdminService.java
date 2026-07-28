package com.scrms.backend.service;

import com.scrms.backend.model.Admin;
import com.scrms.backend.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Admin saveAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(Long id, Admin admin) {
        Admin existingAdmin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        existingAdmin.setFirstName(admin.getFirstName());
        existingAdmin.setLastName(admin.getLastName());
        existingAdmin.setGender(admin.getGender());
        existingAdmin.setPhone(admin.getPhone());
        existingAdmin.setEmail(admin.getEmail());
        existingAdmin.setDateOfBirth(admin.getDateOfBirth());
        existingAdmin.setEmployeeNumber(admin.getEmployeeNumber());
        existingAdmin.setUsername(admin.getUsername());

        // Only re-hash the password if a new one was actually provided.
        // Otherwise the edit form would re-hash the already-hashed value
        // every time you save, breaking login.
        if (admin.getPassword() != null && !admin.getPassword().isBlank()) {
            existingAdmin.setPassword(passwordEncoder.encode(admin.getPassword()));
        }

        return adminRepository.save(existingAdmin);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}
