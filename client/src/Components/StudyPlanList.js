import { useEffect, useState } from "react";
import { ListGroup, Badge } from "react-bootstrap";

function StudyPlanList(props){
    return(
        <ListGroup as="ol" numbered>
            {props.studyPlan.map(course => <StudyPlanListItem course = {course} coursesToRemove = {props.coursesToRemove} selectOrRemoveCourse = {props.selectOrRemoveCourse} key={course.code}/>)}
        </ListGroup>
    );
}

function StudyPlanListItem(props){
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(props.coursesToRemove.some(c => c.code === props.course.code));
    }, [props.coursesToRemove]);

    return(
        <ListGroup.Item as="li" style={checked? {backgroundColor: "lightblue"} : {}} className="d-flex justify-content-between align-items-start" onClick={() => {props.selectOrRemoveCourse(props.course, checked);}}>
            <div className="ms-2 me-auto">
                <div className="fw-bold">{props.course.name}</div>
                {props.course.code}
            </div>
            <Badge bg="primary" pill>
                {props.course.credits}
            </Badge>
        </ListGroup.Item>
    );
}

export{StudyPlanList};