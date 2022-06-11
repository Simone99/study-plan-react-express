import { useContext, useState, useEffect } from "react";
import { Row, Col, Card, Dropdown, Button, Badge, Modal } from "react-bootstrap";
import { getStudyPlan } from '../API';
import { CoursesList } from "./CoursesList";
import { StudyPlanList } from "./StudyPlanList"
import UserContext from '../Context/UserContext';

function LoggedUserPage(props){
    const userState = useContext(UserContext);
    const [studyPlan, setStudyPlan] = useState([]);
    const [selectedCourseToAdd, setSelectedCourseToAdd] = useState();
    const [selectedCoursesToRemove, setSelectedCoursesToRemove] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
        if(isCourseValid(course, studyPlan, setErrorMessage)){
            setStudyPlan(oldStudyPlan => [...oldStudyPlan, course]);
        }else{
            setShowErrorModal(true);
        }
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
                <ErrorModal show = {showErrorModal} setShow = {setShowErrorModal} errorMessage = {errorMessage}/>
                <Row>
                    <Card>
                        <Card.Title>
                            <div className="d-flex justify-content-between align-items-start">
                                Total credits
                                {/*Consider the possibility to set bg="danger" in case the number of credits goes below or above two different thresholds according to full-time or part-time student*/}
                                <Badge bg="primary" pill>
                                    {studyPlan.map(course => course.credits).reduce((prev, current) => prev + current, 0)}
                                </Badge>
                            </div>
                        </Card.Title>
                        <Card.Body>
                            <StudyPlanList studyPlan = {studyPlan} selectOrRemoveCourse = {selectOrRemoveCourse}/>
                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <CoursesDropdown courses = {props.courses} setSelectedCourseToAdd = {setSelectedCourseToAdd}/>
                                </Col>
                                <Col md="auto">
                                    <Button onClick = {() => addCourseToStudyPlan(selectedCourseToAdd)}>Add course</Button>
                                </Col>
                                <Col md="auto">
                                    <Button onClick = {() => removeCoursesFromStudyPlan(selectedCoursesToRemove)}>Remove selected courses</Button>
                                </Col>
                                <Col md="auto">
                                    <Button onClick = {() => console.log('Ehy! I want being implemented!')}>Save changes</Button>
                                </Col>
                                <Col md="auto">
                                    <Button onClick = {() => console.log('Ehy! I want being implemented!')}>Drop changes</Button>
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

function ErrorModal(props){
    return(
        <Modal show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Error!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.errorMessage}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => props.setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
      </Modal>
    );
}

function isCourseValid(course, studyPlan, setErrorMessage){
    if(course === undefined){
        setErrorMessage('Please select one course to add first!');
        return false;
    }
    if(studyPlan.some(c => course.code === c.code)){
        setErrorMessage('Course already in the study plan!');
        return false;
    }
    if(course.preparatoryCourse && studyPlan.every(c => c.code !== course.preparatoryCourse)){
        setErrorMessage(`Please add ${course.preparatoryCourse} to your study plan. You must complete it alongside ${course.code}!`);
        return false;
    }
    //Take into account the possibility to change the message and the way the control is performed in order to tell the user which course is already in the study plan that is incompatible with the one the student wants to add
    if(course.incompatibleWith.length !== 0 && course.incompatibleWith.some(code => studyPlan.some(studyPlanCourse => studyPlanCourse.code === code))){
        setErrorMessage(`An incompatible course with ${course.code} has been found in your study plan. Remove it to continue!`);
        return false;
    }
    if(course.enrolledStudents === course.maxStudents){
        setErrorMessage('Maximum number of enrolled students reached!');
        return false;
    }
    return true;
}

export{LoggedUserPage};