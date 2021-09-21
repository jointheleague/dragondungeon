import React, {Component} from 'react';
import { RouteComponentProps, navigate } from '@reach/router';

import {show_error_banner} from '../util/banner';

interface IProps extends RouteComponentProps {}

interface IState {}

export default class ErrorRoute extends Component<IProps, IState>  {
  constructor(props: RouteComponentProps) {
    super(props);
    show_error_banner('Page Not Found');
    navigate("/");
  }

  render() {
    return <></>
  }
}
