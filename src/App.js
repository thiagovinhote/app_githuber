/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import createRootNavigator from './routes';
import './config/ReactotronConfig';

class App extends Component {
  state = {
    userExists: false,
    userChecked: false,
  }

  componentWillMount() {
    this.checkUser()
      .then((response) => {
        this.setState({ userExists: response, userChecked: true });
      });
  }

  checkUser = async () => {
    const user = await AsyncStorage.getItem('@Githuber:username');

    return user !== null;
  };

  render() {
    const { userChecked, userExists } = this.state;

    if (!userChecked) return null;

    const Layout = createRootNavigator(userExists);

    return <Layout />;
  }
}

export default App;
