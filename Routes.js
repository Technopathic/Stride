import React from 'react';
import { NativeRouter, Route } from 'react-router-native';

import Home from './containers/Home';

class Routes extends React.PureComponent {

    render() {
        return (
            <NativeRouter>
                <Route exact path="/" render={() => <Home />} />
            </NativeRouter>
        )
    }
}

export default Routes;

