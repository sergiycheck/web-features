import React from "react";
import renderer from "react-test-renderer";
import CustomLink from "./Link.react";

test("Link changes the class when hovered", () => {
  const component = renderer.create(
    <CustomLink page="https://example.com">Webpage</CustomLink>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  //trigger the callback
  tree.props.onMouseEnter();

  //re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  //trigger the callback
  tree.props.onMouseLeave();

  //re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
