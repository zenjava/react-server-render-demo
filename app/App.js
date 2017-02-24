var React = require('react')

var App = React.createClass({

	getInitialState() {
		return { count: this.props.initialCount }
	},
	
	_increment() { this.setState({ count: this.state.count + 1 })},

	render() {
		return (
			<div>
				<span>the count is: </span>
				<span onClick={ this._increment }>{ this.state.count }</span>
			</div>
		)
	}
})

module.exports = App