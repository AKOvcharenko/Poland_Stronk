import React, {Component} from 'react';
import {Link, hashHistory} from 'react-router';


import store from './../store/store.js';
import resetFeedData from './../actions/actionResetFeedData.js'

class Header extends Component {

    onsubmit(e){
        var input = e.target.querySelector('input');
        var value = input.value;
        value = value.replace(/\s/g, '_');
        input.value = '';
        hashHistory.push(`/search/${value}`);
        store.dispatch(resetFeedData());
        e.preventDefault();
        return false;
    }

    render(){
        var searchParams = this.props.params && this.props.params.searchParams || '';
        return <nav className="navbar navbar-fixed-top navbar-inverse">
                    <div className="container">
                        <Link className="navbar-brand" to="/igp">
                            <img alt="Brand" src="http://s.imgur.com/images/imgur-logo.svg?1"/>
                        </Link>
                        <form onSubmit={this.onsubmit} className="navbar-form navbar-right" role="search">
                            <div className="input-group stylish-input-group">
                                <input type="text" className="form-control" placeholder="Search"/>
                                <span className="input-group-addon">
                                    <button type="submit">
                                        <span className="glyphicon glyphicon-search"/>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </nav>
    }
}

export default Header;

