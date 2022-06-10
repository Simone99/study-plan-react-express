import { useContext, useState, useEffect } from "react";
import { Row, Col, Card, Dropdown, Button } from "react-bootstrap";
import { getStudyPlan } from '../API';
import { CoursesList } from "./CoursesList";
import { StudyPlanList } from "./StudyPlanList"
import UserContext from '../Context/UserContext';

function LoggedUserPage(props){
    const userState = useContext(UserContext);
    const [studyPlan, setStudyPlan] = useState([]);
    const [selectedCourseToAdd, setSelectedCourseToAdd] = useState();
    const [selectedCoursesToRemove, setSelectedCoursesToRemove] = useState([]);

    const getStudyPlanAsync = async () => {
        if(userState.loggedUser){
          try{
            const result = await getStudyPlan();
            setStudyPlan(result);
          }catch(err){
            console.log(err);
          }  
        }
    };

    const selectOrRemoveCourse = (course, remove) => {
        if(remove){
            setSelectedCoursesToRemove(oldList => oldList.filter(c => course.code !== c.code));
        }else{
            setSelectedCoursesToRemove(oldList => [...oldList, course]);
        }
    };

    const addCourseToStudyPlan = (course) => {
        setStudyPlan(oldStudyPlan => [...oldStudyPlan, course]);
    };

    const removeCoursesFromStudyPlan = (courses) => {
        courses.forEach(course => {
            setStudyPlan(oldList => oldList.filter(c => c.code !== course.code));
        });
    };

    useEffect(() => {
        getStudyPlanAsync();
      }, [userState.loggedUser.email]);    

    return(
        <Row>
            <Col xs={6}>
                <Row className="justify-content-md-center">
                    <h1>Courses available</h1>
                </Row>
                <Row>
                    <CoursesList courses = {props.courses}/>
                </Row>
            </Col>
            <Col xs={6}>
                <Row>
                    <h1>My study plan</h1>
                </Row>
                <Row>
                    <Card>
                        <Card.Title>Courses</Card.Title>
                        <Card.Body>
                            <StudyPlanList studyPlan = {studyPlan} selectOrRemoveCourse = {selectOrRemoveCourse}/>
                            <Row>
                                <Col md="auto">
                                    <CoursesDropdown courses = {props.courses} setSelectedCourseToAdd = {setSelectedCourseToAdd}/>
                                </Col>
                                <Col md="auto">
                                    <Button onClick = {() => addCourseToStudyPlan(selectedCourseToAdd)}>Add course</Button>
                                </Col>
                                <Col md="auto">
                                    <Button onClick = {() => removeCoursesFromStudyPlan(selectedCoursesToRemove)}>Remove selected courses</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
        </Row>
    );
}

function CoursesDropdown(props){
    const [courseName, setCourseName] = useState('');
    return(
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {courseName? courseName : 'Select a course to add'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {props.courses.map(course => <CoursesDropdownItem course = {course} setCourseName = {setCourseName} setSelectedCourseToAdd = {props.setSelectedCourseToAdd} key = {course.code}/>)}
            </Dropdown.Menu>
        </Dropdown>
    );
}

function CoursesDropdownItem(props){
    return(
        <Dropdown.Item onClick = {() => {props.setCourseName(props.course.name); props.setSelectedCourseToAdd(props.course)}}>{props.course.name}</Dropdown.Item>
    );
}

export{LoggedUserPage};