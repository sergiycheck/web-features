import React from "react";
import PropTypes from "prop-types";

//propTypes is only checking in dev mode.

const Greeting = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};

//specifies the default values for props:
Greeting.defaultProps = {
  name: "James",
};

Greeting.propTypes = {
  name: PropTypes.string,
};

class ClassGreeting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
    };
  }

  static defaultProps = {
    name: "Robby",
  };

  render() {
    return <div>Hell, {this.props.name}</div>;
  }
}

console.log(ClassGreeting + "with default props");
