package com.scrms.backend.service;

import com.scrms.backend.model.Course;
import com.scrms.backend.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course course) {
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        existingCourse.setCourseCode(course.getCourseCode());
        existingCourse.setCourseName(course.getCourseName());
        existingCourse.setCreditHours(course.getCreditHours());
        existingCourse.setSemester(course.getSemester());
        existingCourse.setDepartment(course.getDepartment());

        return courseRepository.save(existingCourse);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}