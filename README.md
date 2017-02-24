###React-Server-Render Demo
---
原文: [从零开始React服务器渲染](http://www.alloyteam.com/2017/01/react-from-scratch-server-render/#prettyPhoto)

```js
git clone git@github.com:MrCuriosity/react-server-render-demo.git
npm install
webpack --watch
node server/index.js
```
then visit `127.0.0.1:8082`


#### 敲demo中遇到的坑：
* 同一个模块里`require`和`export`可以混用，而`import`和`module.exports`则可以，详见 [Cannot assign to read only property 'exports' of object '#< Object >' (mix require and export) #4039](https://github.com/webpack/webpack/issues/4039).	

* 箭头函数作用域问题, **app/App.js**	

```jsx
var App = React.createClass({

	getInitialState: ()=> {
		return { count: this.props.initialCount }
	},
	
	_increment: ()=> { this.setState({ count: this.state.count + 1 })},

	render: ()=> {
	    console.log(this) //undefined
		return (
			<div>
				<span>the count is: </span>
				<span onClick={ this._increment }>{ this.state.count }</span>
			</div>
		)
	}
})
```

```jsx
    var App = React.createClass({

	getInitialState() {
		return { count: this.props.initialCount }
	},
	
	_increment() { this.setState({ count: this.state.count + 1 })},

	render() {
	    console.log(this) //a App class instance
		console.log(this.constructor === App) // true
		return (
			<div>
				<span>the count is: </span>
				<span onClick={ this._increment }>{ this.state.count }</span>
			</div>
		)
	}
})
```
代码1中用了构造函数App中用了arrow function,构造函数的`this`指向他的实例， 而箭头函数的this指向outer scope, 这里的`this`是`undefined`, 而[MDN - Arrow functions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)也有说明，不要将构造函数和箭头函数混用，否则报错。

- **server/page.js**
这里`var React = require('react')`,而没有显氏的调用，但如果没有这一句，会报：`React is not defined`, 查看**page.generator.js**可以看到，
```js
const content = ReactDOMServer.renderToString(<App initialCount={ props.initialCount } />)
```
变成了
```js
const content = ReactDOMServer.renderToString(React.createElement(App, { initialCount: props.initialCount }));
```
.jsx作为`React.createElement`的语法糖最终调用的还是会调用`React`,所以必须有`const React = require('react')`

---
*react server render* *作为前后端同构、直出的基础，同一个模板（**app/App.js**）可以运行在客户端与服务器端，首页数据比较多的情况下后端渲染能提升不少性能，加快首屏渲染时间与首次可交互时间.不过个人觉得小项目就没必要，怎么简单怎么来，毕竟现在的前端已经很过度架构和过度工具了*