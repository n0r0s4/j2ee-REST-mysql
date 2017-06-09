/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cat.proven.apiexample.service;

import cat.proven.apiexample.dao.DAOFactory;
import cat.proven.apiexample.dao.TeacherDAO;
import cat.proven.apiexample.entities.Course;
import cat.proven.apiexample.entities.Teacher;

import java.util.Collection;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;

public class TeacherService {
    
    public TeacherDAO studentDAO;
    
    public TeacherService () {
        studentDAO = DAOFactory.getInstance().createStudentDAO();
    }
    
    public Teacher getStudentById(int idStudent) {
        Teacher student = studentDAO.findById(idStudent);
        return student;
    }
    
    public int addStudent(Teacher student) {
        int s = studentDAO.add(student);
        return s;
    }
    
    public Teacher updateStudent(Teacher student) {
        Teacher s = studentDAO.update(student);
        return s;
    }
    
    public int deleteStudent(Teacher student) {
        int result = studentDAO.delete(student);
        return result;
    }
    
    public Collection<Teacher> getStudents() { 
        Collection<Teacher> students = studentDAO.findAll();
        return students;
    }
    
    public Collection<Teacher> getStudentsByIdCourse(int idCourse) {
        Collection<Teacher> students = studentDAO.findByIdCourse(idCourse);
        return students;
    }
    
    public Collection<Course> getStudentCourses(int idStudent) {
        CourseService courseService = new CourseService();
        Collection<Course> courses = courseService.getCoursesByIdStudent(idStudent);
        return courses;
    }

    // http://stackoverflow.com/questions/6324547/how-to-handle-many-to-many-relationships-in-a-restful-api
    public Course addStudentToCourse(Teacher student, Course course) {       
        return studentDAO.addStudentToCourse(student, course);
    }

    public Course removeStudentToCourse(Teacher student, Course course) {
        return studentDAO.removeStudentToCourse(student, course);
    }
    
}
