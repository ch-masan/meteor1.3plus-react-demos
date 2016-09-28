import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - 每条 task
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });
    console.log(this.props.task._id.valueOf().length, 888);
    let timestamp = 'na'
    // if (this.props.task._id.hasOwnProperty('getTimestamp')) {
    if (typeof(this.props.task._id) != 'string') {
      console.log(this.props.task._id, 666);
      timestamp = this.props.task._id.getTimestamp()
      console.log(timestamp, new Date(timestamp*1000), new Date().getTime(), new Date(1474868810929));
    }
    return (
      <li className={taskClassName} onClick={this.props.itemClicked.bind(this, this.props.task.text)}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.task.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
          <span style={{color: 'red'}} > {this.props.task._id.valueOf()} </span>
          <span style={{color: 'blue'}} > {timestamp} </span>
        </span>
      </li>
    );
  }
}

Task.propTypes = {
  // 验证组件属性是否合格
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired
};
