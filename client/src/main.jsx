import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import {ChatProvider} from './context/chatContext'
import * as ReactDOM from 'react-dom/client'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
    <BrowserRouter>
    <ChatProvider>
      <App />
    </ChatProvider>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)