import React, {Component} from 'react';

class Message extends Component {
	render () {
		return <p className="user-message">[{this.props.author}]:&ensp;{this.props.text}&emsp;&emsp;({this.props.time})</p>;
	}
}

export default Message;