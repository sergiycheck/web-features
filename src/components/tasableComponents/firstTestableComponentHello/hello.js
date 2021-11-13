import React from "react";

export default function Hello(props) {
  const { name } = props;
  if (name) {
    return <h1>Hello, {name}</h1>;
  } else {
    return <h1>Hello, noname</h1>;
  }
}
