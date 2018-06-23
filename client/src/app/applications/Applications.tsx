import * as React from "react";
import { Routes } from './Routes';
import { NavBar } from "./NavBar";

export const Applications: React.StatelessComponent = () => (
  <>
    <NavBar />
    <Routes />
  </>
);
