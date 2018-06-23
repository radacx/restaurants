import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MainApp } from './app/MainApp';
import './styles/index.css';
import 'typeface-roboto';

ReactDOM.render(
  <MainApp />,
  document.getElementById('root') as HTMLElement
);
