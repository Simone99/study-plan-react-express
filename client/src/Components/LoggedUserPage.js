import { useContext, useState, useEffect } from "react";
import { Row, Col, Card, Dropdown, Button, Badge, Modal, ButtonGroup, ToggleButton } from "react-bootstrap";
import { getStudyPlan, deleteStudyPlan, addStudyPlan, updateFullTimeStudent } from '../API';
import { CoursesList } from "./CoursesList";
import { StudyPlanList } from "./StudyPlanList"
import UserContext from '../Context/UserContext';

function LoggedUserPage(props){
    const userState = useContext(UserContext);
    const [studyPlan, setStudyPlan] = useState([]);
    const [totalCredits, setTotalCredits] = useState(0);
    const [selectedCourseToAdd, setSelectedCourseToAdd] = useState();
    const [selectedCoursesToRemove, setSelectedCoursesToRemove] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fulltimeStudyPlan, setFullTimeStudyPlan] = useState(userState.loggedUser.fulltime);

    const creditsBoundaries = {
        true : [60, 80],
        false : [20, 40]
    };

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
        if(isCourseValidToAdd(course, studyPlan, setErrorMessage)){
            setStudyPlan(oldStudyPlan => [...oldStudyPlan, course]);
        }else{
            setShowErrorModal(true);
        }
    };

    const removeCoursesFromStudyPlan = (courses) => {
        courses.forEach(course => {
            if(isCourseValidToRemove(course, studyPlan, setErrorMessage)){
                setStudyPlan(oldList => oldList.filter(c => c.code !== course.code));
            }else{
                setShowErrorModal(true);
            }
        });
    };

    const handleSaveChanges = async () => {
        if(isStudyPlanValid(totalCredits, creditsBoundaries, fulltimeStudyPlan)){
            await deleteStudyPlan();
            await addStudyPlan(studyPlan);
            await updateFullTimeStudent(fulltimeStudyPlan);
        }else{
            setErrorMessage('Number of credits must belong to min-max interval!');
            setShowErrorModal(true);
        }
    };

    useEffect(() => {
        getStudyPlanAsync();
    }, [userState.loggedUser.email]);

    useEffect(() => {
        setTotalCredits(studyPlan.map(course => course.credits).reduce((prev, current) => prev + current, 0));
    }, [studyPlan]);

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
                            {studyPlan.length === 0? <FullTimeSwitch fulltimeStudyPlan = {fulltimeStudyPlan} setFullTimeStudyPlan = {setFullTimeStudyPlan}/> : ''}
                            <div className="d-flex justify-content-between align-items-start">
                                {`Total credits (min : ${creditsBoundaries[fulltimeStudyPlan][0]} | max : ${creditsBoundaries[fulltimeStudyPlan][1]})`}
                                {/*Consider the possibility to set bg="danger" in case the number of credits goes below or above two different thresholds according to full-time or part-time student*/}
                                <Badge bg={isStudyPlanValid(totalCredits, creditsBoundaries, fulltimeStudyPlan)? "primary" : "danger"} pill>
                                    {totalCredits}
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
                                    <Button onClick = {handleSaveChanges}>Save changes</Button>
                                </Col>
                                <Col md="auto">
                                    <Button onClick = {getStudyPlanAsync}>Drop changes</Button>
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

function FullTimeSwitch(props){
    const userState = useContext(UserContext);

    return(
        <ButtonGroup className="mb-2">
            <ToggleButton
            type="radio"
            variant={userState.loggedUser.fulltime !== null && props.fulltimeStudyPlan == true? "primary" : "light"}
            name="fulltime-radio"
            value={true}
            checked={userState.loggedUser.fulltime !== null && props.fulltimeStudyPlan == true}
            onClick={() => {
                props.setFullTimeStudyPlan(true);
                /*added userState.loggedUser.fulltime = true because if the user has never created a study plan before all previous condition will always return false due to 'userState.loggedUser.fulltime !== null' condition*/
                if(userState.loggedUser.fulltime === null)
                    userState.loggedUser.fulltime = true;
                }}>
                Full time
            </ToggleButton>
            <ToggleButton
            type="radio"
            variant={userState.loggedUser.fulltime !== null && props.fulltimeStudyPlan == false? "primary" : "light"}
            name="parttime-radio"
            value={false}
            checked={userState.loggedUser.fulltime !== null && props.fulltimeStudyPlan == false}
            onClick={() => {
                props.setFullTimeStudyPlan(false);
                if(userState.loggedUser.fulltime === null)
                    userState.loggedUser.fulltime = false;
                }}>
                Part time
            </ToggleButton>
        </ButtonGroup>
    );
}

function isCourseValidToAdd(course, studyPlan, setErrorMessage){
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

function isCourseValidToRemove(course, studyPlan, setErrorMessage){
    //Take into account the possibility to change the message and the way the control is performed in order to tell the user which course is preparatory for another course
    if(studyPlan.some(c => c.preparatoryCourse === course.code)){
        setErrorMessage(`Course ${course.code} can't be removed because it's a preparatory course for another course in the study plan. Remove it first!`);
        return false;
    }
    return true;
}

function isStudyPlanValid(totalCredits, creditsBoundaries, fulltimeStudyPlan){
    return totalCredits >= creditsBoundaries[fulltimeStudyPlan][0] && totalCredits <= creditsBoundaries[fulltimeStudyPlan][1];
}

export{LoggedUserPage};