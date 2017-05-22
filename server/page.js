var React = require('react')
var ReactDOMServer = require('react-dom/server')
var App = require('../app/App')
var ReactDOM = require('react-dom')

module.exports = (props) => {
  const content = ReactDOMServer.renderToString(<App initialCount={ props.initialCount }/>)
  return content
}