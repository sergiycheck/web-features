import React, { MouseEvent } from "react";

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void;
  children?: JSX.Element;
};

export const Button = ({ onClick: handleClick, children }: Props) => {
  return <button onClick={handleClick}>{children}</button>;
};

//the info from ts hottel tutorial is a bit deprecated
// but can be implemented
// SFC is marked deprecated but used here
