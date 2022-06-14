import { Accordion, Table } from 'react-bootstrap'

function CoursesList(props){
    return (
        <Table responsive bordered hover /*style={{color: 'white'}}*/>
            <CoursesListHeader/>
            <CoursesListBody courses = {props.courses} incompatibleCourses = {props.incompatibleCourses}/>
        </Table>
    );
}

function CoursesListHeader(props){
    return (
        <thead>
            <tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Credits</th>
                <th scope="col">Enrolled students</th>
                <th scope="col">Maximum students number</th>
            </tr>
        </thead>    
    );
}

function CoursesListBody(props){
    return (
        <tbody>
            {props.courses.map(course => <CoursesListRow course = {course} incompatibleCourses = {props.incompatibleCourses} key = {course.code}/>)}
        </tbody>
    );
}

function CoursesListRow(props){
    return (
        <tr style={props.incompatibleCourses && props.incompatibleCourses.some(c => c.code === props.course.code)? {backgroundColor: "LightCoral"} : {}}>
            <CourseListData course = {props.course}/>
            <CourseListAccordion course = {props.course}/>
        </tr>
    );
}

function CourseListData(props){
    return (
        <>
        <td>
            {props.course.code}
        </td>
        <td>
            {props.course.name}
        </td>
        <td>
            {props.course.credits}
        </td>
        <td>
            {props.course.enrolledStudents}
        </td>
        <td>
            {props.course.maxStudents? props.course.maxStudents : 'Unlimited!'}
        </td>
        </>
    );
}

function CourseListAccordion(props){
    return(
        <td>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Additional info</Accordion.Header>
                    <Accordion.Body>
                        <p>Incompatible courses:</p>
                        {props.course.incompatibleWith.length === 0? 'None!\n' : 
                            <ul>
                                {props.course.incompatibleWith.map(courseCode => <li key={courseCode}>{courseCode}</li>)}
                            </ul>
                        }
                        <p>Preparatory course:</p>
                        <p>{props.course.preparatoryCourse? props.course.preparatoryCourse : 'None!\n'}</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </td>
    );
}

export{CoursesList};