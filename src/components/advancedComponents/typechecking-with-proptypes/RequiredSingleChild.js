import PropTypes from "prop-types";

function MyComponent(props) {
  return <div>{props.children}</div>;
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired,
};
