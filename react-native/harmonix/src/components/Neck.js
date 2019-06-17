import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';


class Neck extends Component {

  render () {
    return (
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
    );
  }
}


export default Neck;
