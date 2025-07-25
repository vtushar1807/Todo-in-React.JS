import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Container,Row,Col } from 'react-bootstrap';

export const ModalToDo = (props)=>{


    return(
        <>

        <Modal style={{marginTop:"10%"}} show={props.isModal} onHide={props.editFn}>

            <Modal.Header closeButton>
                <Modal.Title>Updated Todo Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div id="update-div" > </div>
            </Modal.Body>


            <Container fluid="0">
                <Row>
                    <Col className='text-center'><textarea style={{border:"1px solid navy", width:"90%", height:"200px"}} value={props.editValue} onChange={props.editChange} onBlur={props.blur}></textarea></Col>
                </Row>
            </Container>
            <Modal.Footer>

                <Button style={{ borderRadius:"1px 10px", padding:"8px 19px", border:"none"}} className="task-button" id="cancelBtn"  onClick={props.editFn}>Cancel</Button>
                <Button type="save" style={{ borderRadius:"1px 10px", padding:"8px 19px", border:"none"}} className="task-button" id="saveBtn" onClick={props.saveFn}>Save</Button>
            </Modal.Footer>

         </Modal>

        </>
    )
}