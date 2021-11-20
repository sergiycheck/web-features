import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { ContextContainer } from "../advancedComponents/ContextContainer";

type elem = {
  path: string;
  component: JSX.Element;
};

type Props = elem & {
  props: any[];
};

type componentProps = RouteComponentProps & {
  routes: Props;
};

export const TsComponentsContainer = (props: componentProps) => {
  const { routes }: { routes: Props } = props;

  return (
    <React.Fragment>
      <ContextContainer routes={routes}></ContextContainer>
    </React.Fragment>
  );
};
