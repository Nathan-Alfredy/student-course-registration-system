package com.scrms.backend.service;

import com.scrms.backend.model.Registration;
import com.scrms.backend.repository.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;

    public RegistrationService(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public Optional<Registration> getRegistrationById(Long id) {
        return registrationRepository.findById(id);
    }

    public Registration saveRegistration(Registration registration) {
        return registrationRepository.save(registration);
    }

    public Registration updateRegistration(Long id, Registration registration) {
        Registration existingRegistration = registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        existingRegistration.setRegistrationDate(registration.getRegistrationDate());
        existingRegistration.setStatus(registration.getStatus());
        existingRegistration.setStudent(registration.getStudent());
        existingRegistration.setCourse(registration.getCourse());

        return registrationRepository.save(existingRegistration);
    }

    public void deleteRegistration(Long id) {
        registrationRepository.deleteById(id);
    }
}