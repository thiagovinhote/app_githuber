import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import Repository from './components/repository';
import api from '../../services/api'

class Respositories extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list-alt" size={20} color={tintColor} />
    ),
  };

  state = {
    repositories: [],
    loading: false,
  };

  componentWillMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ loading: true });

    const username = await AsyncStorage.getItem('@Githuber:username');
    const response = await api.get(`/users/${username}/repos`);

    this.setState({ repositories: response, loading: false });
  };

  renderList = () => (
    this.state.repositories.length
      ? this.renderRepositories()
      : <Text style={styles.empty}>Nenhum repositório encontrado</Text>
  );

  render() {
    return (
      <View style={styles.container}>
        { this.state.loading
          ? <ActivityIndicator size="small" color="#FFF" />
          : this.renderList()
        }
      </View>
    );
  }
}

export default Respositories;
