import React from 'react'
import ReactDom from 'react-dom'
import App from './App'

const rootElem = document.getElementById('root')

if (rootElem) { 
  ReactDom.render(<App />, rootElem)
}
