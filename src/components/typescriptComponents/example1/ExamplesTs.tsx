import React from "react";
import { useState, useEffect } from "react";

export type Props = {
  name: string;
  priority?: boolean;
};

type FauxactFunctionComponent<Props extends {}> = (
  props: Props,
  context?: any
) => FauxactFunctionComponent<any> | null | JSX.Element;

type DateProps = {
  iso8601Date: string;
  message: string;
};

export const DateComponent: FauxactFunctionComponent<DateProps> = (props) => {
  return (
    <time className="p-2" dateTime={props.iso8601Date}>
      {props.message}
    </time>
  );
};

export const DateComponentFC: React.FC<DateProps> = (props) => {
  return (
    <time className="p-2" dateTime={props.iso8601Date}>
      {props.message}
    </time>
  );
};

interface FauxactClassComponent<Props extends {}, State = {}> {
  props: Props;
  state: State;

  setState: (prevState: State, props: Props) => Props;
  callback?: () => void;
  render(): FauxactClassComponent<any> | null;
}

const PrintName: React.FC<Props> = (props) => {
  return (
    <div>
      <p style={{ fontWeight: props.priority ? "bold" : "normal" }}>
        {props.name}
      </p>
    </div>
  );
};

export const ShowUser: React.FC<any> = (props) => {
  return <PrintName name="Ned" />;
};

let userName = "Cersei";
const ShowStoredUser: React.FC<any> = (props) => {
  return <PrintName name={userName} priority></PrintName>;
};

const CounterExample = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        className="btn rounded border-primary shadow"
        onClick={() => setCount(count + 1)}
      >
        increment
      </button>
    </div>
  );
};

export const ShowAllComponentsAbove: React.FC<Props> = (props) => {
  return (
    <div className="p-2">
      <ShowUser />
      <DateComponentFC
        iso8601Date={new Date().toISOString()}
        message={"Hi, i am here"}
      />
      <ShowStoredUser />
      <CounterExample />
    </div>
  );
};
