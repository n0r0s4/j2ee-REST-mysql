package cat.proven.apiexample.dao;

import java.sql.Connection;

public class DAOFactory {
    private static DAOFactory instance;

    public static DAOFactory getInstance() {
        if (instance == null) {
                instance = new DAOFactory();
        }
        return instance;
    }

    private DAOFactory() {
        super();
    }

    public TeacherDAO createStudentDAO() {
        Connection connection = ConnectionFactory.getInstance().connect();
        return new TeacherDAO(connection);
    }

    public CourseDAO createCourseDAO() {
        Connection connection = ConnectionFactory.getInstance().connect();
        return new CourseDAO(connection);
    }
}
