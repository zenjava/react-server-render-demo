var React = require('react')

var App = React.createClass({

  getInitialState() {
    return { count: 5 }
  },

  _increment() { this.setState({ count: this.state.count + 1 })},

  render() {

    return (
      <div id="a">
        <span id="b">the count is: </span>
        <span id='c' onClick={ this._increment }>{ this.state.count }</span>
      </div>
    )
  }
})

module.exports = App