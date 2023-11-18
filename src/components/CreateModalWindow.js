import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {connect} from "react-redux";

function CreateModalWindow(props) {
    const [modal, setModal] = useState(false);
    const initialState = {
        name: '',
        description: '',
        status: props.statuses[0].status,
        priority: props.priorities[0]

    }
    const [newTask, setNewTask] = useState(initialState)
    const toggle = () => setModal(!modal);

    const onCreate = () => {
        props.createTask({...newTask, id: Date.now()})
        toggle()
    }


    return (
        <>
            <Button color="danger" onClick={toggle}>
                Create new task
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Create new task</ModalHeader>
                <ModalBody>

                    <Form>
                        <FormGroup>

                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">
                                Task name
                            </Label>
                            <Input
                                // id="examplePassword"
                                // name="password"
                                placeholder="enter task name..."
                                value={newTask.name}
                                onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                                // type="password"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">
                                Status
                            </Label>
                            <Input
                                type="select"
                                value={newTask.status}
                                onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                            >
                                {props.statuses.map((el) =>
                                    <option key={el.id}>
                                        {el.status}
                                    </option>
                                )}

                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleSelect">
                                Priority
                            </Label>
                            <Input
                                type="select"
                                value={newTask.priority}
                                onChange={(e) => setNewTask({...newTask, priority: +e.target.value})}
                            >
                                {props.priorities.map((el, index) =>
                                    <option key={index}>
                                        {el}
                                    </option>
                                )}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleText">
                                Description
                            </Label>
                            <Input
                                id="exampleText"
                                name="text"
                                type="textarea"
                                value={newTask.description}
                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            />
                        </FormGroup>


                    </Form>


                </ModalBody>
                <ModalFooter>
                    <Button color="danger"
                            onClick={onCreate}
                    >
                        Create
                    </Button>{' '}
                    <Button color="success" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}


const mapStateToProps = (state) => ({
    statuses: state.boardStatuses,
    priorities: state.priorities,
})

const mapDispatchToProps = (dispatch) => ({
    createTask: (newTask) => dispatch({
        type: 'CREATE_TASK',
        payload: newTask
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateModalWindow);
