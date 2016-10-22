import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './../store/store.js';

class App extends Component {

    render (){
        return <Provider store={store}>
                <div>
                    {this.props.header}
                    {this.props.igp}
                    {this.props.ip}
                    {this.props.error}
                </div>
        </Provider>
    }
}

export default App;