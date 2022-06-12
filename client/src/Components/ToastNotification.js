import { Toast, ToastContainer } from 'react-bootstrap';

function ToastNotification(props){
    return(
        <ToastContainer className="p-3" position="top-center">
            <Toast bg='dark' show={props.toastData.show} onClose={() => props.setToastData({show : false, title : '', message : ''})} delay={3000} autohide>
                <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">{props.toastData.title}</strong>
                </Toast.Header>
                <Toast.Body className='text-white'>{props.toastData.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export{ToastNotification};