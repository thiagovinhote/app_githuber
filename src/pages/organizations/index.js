import React, { Component } from 'react';
import {
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import Organization from './components/organization';
import api from '../../services/api'

class Organizations extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="building" size={20} color={tintColor} />
    ),
  };

  state = {
    organizations: [],
    loading: false,
  };

  componentWillMount() {
    this.setState({ loading: true });

    this.loadingOrganizations()
      .then(() => {
        this.setState({ loading: false });
      });
  }

  loadingOrganizations = async () => {
    const username = await AsyncStorage.getItem('@Githuber:username');
    const response = await api.get(`/users/${username}/orgs`);

    this.setState({ organizations: response.data });
  }

  renderOrganizations = () => (
    this.state.organizations.map(organization => (
      <Organization key={organization.id} organization={organization} />
    ))
  );

  renderList = () => (
    this.state.organizations.length
      ? this.renderOrganizations()
      : <Text style={styles.empty}>Nenhuma organização encontrada</Text>
  );

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        { this.state.loading
          ? <ActivityIndicator size="small" color="#999" style={styles.loading}/>
          : this.renderList()
        }
      </ScrollView>
    );
  }
}

export default Organizations;
