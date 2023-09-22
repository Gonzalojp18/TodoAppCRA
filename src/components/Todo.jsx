import React from 'react';
import { useState, useRef, useEffect } from "react";
import '../components/Todo.css'
// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'



export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);


    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    // We keep the focus inside the input of editButtonRef,

    const wasEditing = usePrevious(isEditing);

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);

    // TEMPLATES
    const editingTemplate = (
        <form
            className='boxEdit'
            onSubmit={handleSubmit}>
            <div className="editTask">
                <label
                htmlFor={props.id}>
                {props.name}
                </label>
                <Input
                    p='2rem'
                    fontSize='1em'
                    mt='5rem'
                    id={props.id}
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                    placeholder='Enter your new task name'/>
            </div>
            <div className="optionBtnEdit">
                <Button
                    colorScheme='yellow'
                    px='10'
                    fontSize='.7em'
                    type="button"
                    onClick={() => setEditing(false)}>
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </Button>
                <Button
                    px='10'
                    fontSize='.7em'
                    colorScheme='yellow'
                    type="submit">
                    Save
                    <span className="visually-hidden">Change your Taks{props.name}</span>
                </Button>
            </div>
        </form>
    );
    const viewTemplate = (
        <div className="boxTask">
            <div className="infoTask">
                <Checkbox
                    className='checkBoxIcon'
                    colorScheme='green'
                    size='lg'
                    boxShadow='md'
                    borderColor='blue.600'
                    mt='5%'
                    iconColor='blue.400'
                    id={props.id}
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className='mainLabel' htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="optionBtn">
                <Button
                    colorScheme='messenger'
                    type="button"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}>Edit
                    <span className="visually-hidden">{props.name}</span>
                </Button>
                <Button
                    colorScheme='messenger'
                    type="button"
                    onClick={() => (props.deleteTask(props.id))}>
                    Delete <span className="visually-hidden">{props.name}</span>
                </Button>
            </div>
        </div>
    );
    return (
        <li className='cardTask'>{isEditing ? editingTemplate : viewTemplate}
        </li>

    )
}