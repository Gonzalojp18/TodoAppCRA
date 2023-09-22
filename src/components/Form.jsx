import React from 'react';
import { useState } from "react";
import '../components/Form.css'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

export default function Form(props) {
  const [name, setName] = useState("");

  // const { addTask } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      alert('Hey! Forget enter your task');
      return
    }
    props.addTask(name);
    setName('');
  }

  function handleChange(e) {
    setName(e.target.value);
  }


  return (
    <form
        className='boxForm'
        onSubmit={handleSubmit}>
      <h2 className="mainTitle">KEEP YOUR GOALS IN MIND
        <label htmlFor="new-todo-input">
        </label>
      </h2>
      <div className='boxEnterTask'>
      <Input style={{ border: 'none' }}
        type="text"
        id="new-todo-input"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        placeholder='Write here your task'
        fontSize='1em'
        p='2em'
        textAlign='center'
      />
        <Button
        background='#222937'
        color='#f3f3f3'
        width='25%'
        height='3.5rem'
        fontSize='1.5rem'
        type="submit" >
        ADD
      </Button>
      </div>
    </form>
  );
};






