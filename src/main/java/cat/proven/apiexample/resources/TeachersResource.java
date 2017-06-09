package cat.proven.apiexample.resources;

import java.util.Collection;
import java.util.List;

import javax.servlet.ServletContext;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;

import cat.proven.apiexample.dao.DAOFactory;
import cat.proven.apiexample.dao.TeacherDAO;
import cat.proven.apiexample.entities.Course;
import cat.proven.apiexample.entities.Teacher;
import cat.proven.apiexample.exception.ApplicationException;
import cat.proven.apiexample.service.CourseService;
import cat.proven.apiexample.service.TeacherService;
import javax.ws.rs.PUT;


@Path("teachers")
@Produces("application/json")
public class TeachersResource {

    TeacherService teacherService;
    CourseService courseService;

    public TeachersResource(@Context ServletContext context) {

        if (context.getAttribute("studentService") != null)
                teacherService = (TeacherService) context.getAttribute("studentService");
        else {
                teacherService = new TeacherService();
                context.setAttribute("studentService", teacherService);
        }

        if (context.getAttribute("courseService") != null)
                courseService = (CourseService) context.getAttribute("courseService");
        else {
                courseService = new CourseService();
                context.setAttribute("courseService", courseService);
        }

    }

    @GET
    public Response students() {
        Collection<Teacher> students = teacherService.getStudents();
        GenericEntity<Collection<Teacher>> result = new GenericEntity<Collection<Teacher>>(students) {
        };
        return Response.ok().entity(result).build();
    }

    @Path("{id}")
    @GET
    public Response getStudentById(@PathParam("id") int id) {
        Teacher student = teacherService.getStudentById(id);
        if (student == null)
            return Response.status(Response.Status.NOT_FOUND).build();
        else
            return Response.ok(student).build();
    }

    @POST
    public Response addStudent(@FormParam("name") String name, 
                               @FormParam("lastname") String lastname,
                               @FormParam("department") String department) {
        System.out.println(name);
        System.out.println(lastname);

        if (name == null || name.equals("")) {
            ApplicationException ex = new ApplicationException("Parameter name is mandatory");
            return Response.status(Response.Status.BAD_REQUEST).entity(ex).build();
        }

        if (lastname == null || lastname.equals("")) {
            ApplicationException ex = new ApplicationException("Parameter lastname is mandatory");
            return Response.status(Response.Status.BAD_REQUEST).entity(ex).build();
        }
        
        if (!Teacher.isNumeric(department)) {
                ApplicationException ex = new ApplicationException("Parameter department must be number");
                return Response.status(Response.Status.BAD_REQUEST).entity(ex).build();
        }
        

        int id = teacherService.addStudent(new Teacher(0, name, lastname,Integer.parseInt(department)));
        String idToPrint=""+id+"";
        return Response.ok().entity(idToPrint).build();
    }

    @Path("{id}")
    @PUT
    public Response updateStudent(@FormParam("name") String name, 
                                  @FormParam("lastname") String lastname,
                                  @FormParam("department") String department,
                                  @PathParam("id") int id) {

        if (name == null || name.equals("")) {
                ApplicationException ex = new ApplicationException("Parameter name is mandatory");
                return Response.status(Response.Status.BAD_REQUEST).entity(ex).build();
        }

        if (lastname == null || lastname.equals("")) {
                ApplicationException ex = new ApplicationException("Parameter lastname is mandatory");
                return Response.status(Response.Status.BAD_REQUEST).entity(ex).build();
        }
        
        if (!Teacher.isNumeric(department)) {
                ApplicationException ex = new ApplicationException("Parameter department must be number");
                return Response.status(Response.Status.BAD_REQUEST).entity(ex).build();
        }
        
        Teacher student = teacherService.getStudentById(id);

        if (student == null)
                return Response.status(Response.Status.NOT_FOUND).build();

        student.setName(name);
        student.setLastname(lastname);
        student.setDepartment(Integer.parseInt(department));
        student = teacherService.updateStudent(student);

        return Response.ok(student).build();

    }

    @DELETE
    @Path("{id}")
    public Response deleteStudent(@PathParam("id") int id) {
        Teacher student = teacherService.getStudentById(id);
        if (student == null)
            return Response.status(Response.Status.NOT_FOUND).build();
        else {
            teacherService.deleteStudent(student);
            return Response.ok().build();
        }
    }

    @Path("{id}/courses")
    @GET
    public Response getStudentCourses(@PathParam("id") int id) {
        List<Course> studentCourses = (List<Course>) teacherService.getStudentCourses(id);

        if (studentCourses == null)
                return Response.status(Response.Status.NOT_FOUND).build();
        else {

            GenericEntity<List<Course>> entity = new GenericEntity<List<Course>>(studentCourses) {
            };

            return Response.ok(entity).build();
        }
    }


    @Path("{id_teacher}/courses/{id_course}")
    @POST
    public Response addStudentToCourse(@PathParam("id_teacher") int idStudent, 
                                       @PathParam("id_course") int idCourse) {

        Teacher student = teacherService.getStudentById(idStudent);
        if (student == null)
                return Response.status(Response.Status.NOT_FOUND).build();

        Course course = courseService.getCourseById(idCourse);
        if (course == null)
                return Response.status(Response.Status.NOT_FOUND).build();

        Course c = teacherService.addStudentToCourse(student, course);
        return Response.ok(c).build();
    }
    
    @Path("{id_teacher}/courses/{id_course}")
    @DELETE
    public Response removeStudentToCourse(@PathParam("id_teacher") int idStudent, 
                                       @PathParam("id_course") int idCourse) {

        Teacher student = teacherService.getStudentById(idStudent);
        if (student == null)
                return Response.status(Response.Status.NOT_FOUND).build();

        Course course = courseService.getCourseById(idCourse);
        if (course == null)
                return Response.status(Response.Status.NOT_FOUND).build();

        Course c = teacherService.removeStudentToCourse(student, course);
        return Response.ok(c).build();
    }

}
