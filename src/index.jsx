import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'

const DATA = [
  { id: "todo-0", name: "Learn java", completed: true },
  { id: "todo-1", name: "Work out", completed: false },
  { id: "todo-2", name: "Improve English vocabulary", completed: false },
];



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <ChakraProvider>
    <App tasks={DATA} />
    </ChakraProvider>
  </React.StrictMode>,
)
