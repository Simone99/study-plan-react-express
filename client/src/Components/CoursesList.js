import { useEffect, useState } from 'react';
import { Accordion, OverlayTrigger, Table, Popover } from 'react-bootstrap'
import { isCourseValidToAdd } from "./LoggedUserPage";

function CoursesList(props){
    return (
        <Table responsive bordered hover /*style={{color: 'white'}}*/>
            <CoursesListHeader/>
            <CoursesListBody courses = {props.courses} studyPlan = {props.studyPlan}/>
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
            {props.courses.map(course => <CoursesListRow course = {course} studyPlan = {props.studyPlan} key = {course.code}/>)}
        </tbody>
    );
}

function CoursesListRow(props){
    const [overlayMessage, setOverlayMessage] = useState('');
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if(props.studyPlan !== undefined){
            setValid(isCourseValidToAdd(props.course, props.studyPlan, (message) => setOverlayMessage(message)));
        }else{
            setValid(true);
        }
    }, [props.studyPlan]);

    return (
            valid?
            <tr>
                <CourseListData course = {props.course}/>
                <CourseListAccordion course = {props.course}/>
            </tr>
            :
            <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                <Popover id="popover-basic">
                    <Popover.Header as="h3">Error!</Popover.Header>
                    <Popover.Body>
                        {overlayMessage}
                    </Popover.Body>
                </Popover>
            }>
                <tr style={{backgroundColor: "LightCoral"}}>
                    <CourseListData course = {props.course}/>
                    <CourseListAccordion course = {props.course}/>
                </tr>
            </OverlayTrigger>
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