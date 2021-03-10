import React, {Component} from 'react';
import { RouteComponentProps, navigate } from '@reach/router';

import {show_error_banner} from '../util/banner';

interface IProps extends RouteComponentProps {}

interface IState {}

export default class ErrorRoute extends Component<IProps, IState>  {
  constructor(props: RouteComponentProps) {
    super(props);

    const path = props.location?.pathname;
    
    if (path?.includes("play")) {
      show_error_banner('ERROR CODE: COW (Matchmake/NoRoom)');
    }

    navigate("/")
  }

  render() {
    return <></>
  }
}
