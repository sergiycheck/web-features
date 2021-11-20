import React, { MouseEvent, useState } from "react";

//@types/react => type SFC<P> alias of interface StatelessComponent<P>
//predefined children (defaultProps, displayName, etc...)

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void;
  children: JSX.Element;
};

export const Button = ({ onClick: handleClick, children }: Props) => {
  return (
    <button className="btn border-success" onClick={handleClick}>
      {children}
    </button>
  );
};

export const ButtonContainer = () => {
  const [count, setCount] = useState<number>(0);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setCount(count + 1);
  };

  return (
    <div className="p-2">
      <div>clicks: {count}</div>
      <Button onClick={handleClick}>
        <b>click on me</b>
      </Button>
    </div>
  );
};
