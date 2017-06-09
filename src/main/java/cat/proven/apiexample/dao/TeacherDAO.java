package cat.proven.apiexample.dao;

import cat.proven.apiexample.entities.Course;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;

import cat.proven.apiexample.entities.Teacher;
import java.sql.Statement;
import static java.sql.Statement.RETURN_GENERATED_KEYS;
import java.util.List;

public class TeacherDAO {

    private Connection connection;

    public TeacherDAO(Connection connection) {
        this.connection = connection;
    }

    public Connection getConnection() {
        return connection;
    }

    public Collection<Teacher> findAll() {
        String sql = "SELECT * FROM Teacher";
        ArrayList<Teacher> list = new ArrayList<Teacher>();

        try {
            PreparedStatement statement = getConnection().prepareStatement(sql);
            ResultSet rs = statement.executeQuery();

            while (rs.next()) {
                Teacher student = new Teacher(rs.getInt("id"), rs.getString("name"), rs.getString("lastname"), rs.getInt("department"));
                //CourseDAO courseDAO = new CourseDAO(connection);
                //student.setCourses((List<Course>) courseDAO.findByIdStudent(student.getId()));
                
                list.add(student);
            }

        } catch (Exception e) {
                e.printStackTrace();
        }
        return list;

    }
    
     public Collection<Teacher> findByIdCourse(int idCourse) {
            String sql = "SELECT id, name, lastname FROM TeacherCourse sc INNER JOIN Teacher s ON sc.idTeacher = s.id WHERE idCourse= ?";

            ArrayList<Teacher> list = new ArrayList<Teacher>();

            try {
                    PreparedStatement statement = getConnection().prepareStatement(sql);
                    statement.setInt(1, idCourse);
                    ResultSet rs = statement.executeQuery();

                    while (rs.next()) {
                        Teacher student = new Teacher(rs.getInt("id"), rs.getString("name"), rs.getString("lastname"), rs.getInt("department"));
                        list.add(student);
                    }

            } catch (Exception e) {
                    e.printStackTrace();
            }
            return list;

	}

    public Teacher findById(int id) {
        String sql = "SELECT * FROM Teacher WHERE id= ?";
        Connection conn = null;

        try {
            PreparedStatement statement = getConnection().prepareStatement(sql);

            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();

            while (rs.next()) {
                Teacher student = new Teacher(rs.getInt("id"), rs.getString("name"), rs.getString("lastname"), rs.getInt("department"));
                CourseDAO courseDAO = new CourseDAO(connection);
                student.setCourses((List<Course>) courseDAO.findByIdStudent(student.getId()));
                
                return student;
            }

        } catch (SQLException e) {
                e.printStackTrace();
        }
        return null;

    }

    public int add(Teacher student) {
        String sql = "INSERT INTO Teacher VALUES (NULL,?,?,?)";
        int rs=0;
        int newId=-1;
        try {
            PreparedStatement statement = getConnection().prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, student.getName());
            statement.setString(2, student.getLastname());
            statement.setInt(3, student.getDepartment());
            rs = statement.executeUpdate();
            
            ResultSet res = statement.getGeneratedKeys();
            if (res.next()) {
              newId = res.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return newId;

    }

    public Course addStudentToCourse(Teacher student, Course course) {
        String sql = "INSERT INTO TeacherCourse (`idTeacher`, `idCourse`) VALUES (?,?)";

        try {
            PreparedStatement statement = getConnection().prepareStatement(sql);
            statement.setInt(1, student.getId());
            statement.setInt(2, course.getId());
            int rs = statement.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return course;        

    }
    
        public Course removeStudentToCourse(Teacher student, Course course) {
        String sql = "DELETE from TeacherCourse where idTeacher = ? and idCourse = ?";

        try {
            PreparedStatement statement = getConnection().prepareStatement(sql);
            statement.setInt(1, student.getId());
            statement.setInt(2, course.getId());
            int rs = statement.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return course;        

    }

    public Teacher update(Teacher student) {
        String sql = "UPDATE Teacher SET `name` = ?, `lastname` = ?, `department` = ? WHERE `id` = ?";

        try {
            PreparedStatement statement = getConnection().prepareStatement(sql);
            statement.setString(1, student.getName());
            statement.setString(2, student.getLastname());
            statement.setInt(3, student.getDepartment());
            statement.setInt(4, student.getId());
            int rs = statement.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return student;

    }

    public int delete(Teacher student) {
        String sql = "DELETE FROM Teacher WHERE id = ?";
        int rs = 0;

        try {
            PreparedStatement statement = getConnection().prepareStatement(sql);
            statement.setInt(1, student.getId());
            rs = statement.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rs;

    }


}
