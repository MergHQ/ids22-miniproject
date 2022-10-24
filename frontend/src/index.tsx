import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'

const rootElem = document.getElementById('root')

if (rootElem) {
  ReactDom.createRoot(rootElem).render(<App />)
}
