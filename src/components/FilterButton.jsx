import React from 'react';
import { Button } from '@chakra-ui/react'
// import App from './FilterButton';
import {
  List,
  ListItem
} from '@chakra-ui/react'

export default function FilterButton(props) {
  return (
    <List style={{ border: 'none' }}
      w='90%'>
      <ListItem
      className='bgHover'
      display= 'flex'
      size='lg'
      p='4'
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}>

      {/* <Button */}
      <span className="visually-hidden">Show</span>
      <span>{props.name}</span>
      <span className="visually-hidden">tasks</span>
    {/* </Button> */}

      </ListItem>

    </List>
  )
}