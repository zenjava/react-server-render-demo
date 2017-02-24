import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const APP_PROPS = window.APP_PROPS || {}

ReactDOM.render(<App initialCount={ APP_PROPS.initialCount } />, document.getElementById('root'))