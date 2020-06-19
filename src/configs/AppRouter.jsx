import React from "react";
import { Route as R, Switch as S } from "react-router-dom";
import Rules from "../pages/Rules";
import Game from "../pages/Game";
const AppRouter = () => {
  return (
    <S>
      <R exact path="/" component={Rules} />
      <R path="/game" component={Game} />
    </S>
  );
};

export default AppRouter;