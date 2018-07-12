/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { ApolloProvider } from 'react-apollo'

import client from '../client'
import Centers from './Centers'

export default class App extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Centers />
      </ApolloProvider>
    );
  }
}