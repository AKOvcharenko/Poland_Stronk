import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './../store/store.js';

import IGP from './IGP.jsx';
import IP from './IP.jsx';
import Loader from './Loader.jsx';

class App extends Component {

    render (){
        return <Provider store={store}>
            {this.props.children}
        </Provider>
    }
}

export default App;