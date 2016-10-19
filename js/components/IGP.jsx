import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import fetchData from './../utils/fetchData.js';
import Loader from './Loader.jsx';

import store from './../store/store.js';
import gotFeedData from './../actions/actionGotFeedData.js'


const mapStateToProps = state => {return {feedState: state.feedState}};

class IGP extends Component {

    constructor(){
        super();
        this.sent = false;
        this.appID = '6273a7e9fad6e45';
        this.handleScroll = this.handleScroll.bind(this);
        this.makeRequest = this.makeRequest.bind(this);

    }

    makeRequest(){
        var self = this;
        var feedLength = this.props.feedState.length;
        if(this.sent){return;}
        this.sent = true;
        var url = `https://api.imgur.com/3/gallery/t/polandball/viral/${feedLength ? (feedLength/60 + 1) : 0}`;
        fetchData(url, this.appID).then(response => {
            store.dispatch(gotFeedData(response));
            self.sent = false;
        }, err => {self.sent = false;});
    }

    handleScroll(){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.makeRequest();
        }
    }

    componentWillMount(){
        this.makeRequest();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    forEachItem(item, index){
        return <div key={item.id} id={item.id} className="post" >
            <Link className="image-list-link" to={`img/${item.id}`}>
                <img src={`http://i.imgur.com/${item.cover || item.id}b.jpg`}/>
                    <div className="point-info gradient-transparent-black transition">
                        <div className="relative">
                            <div className="pa-bottom">
                                <div className="point-info-points" title="points">
                                    <span className={'points-' + item.id}></span>
                                    <span className={'points-text-'+ item.id}>points</span>
                                </div>
                            </div>
                        </div>
                    </div>
            </Link>
            <div className="hover">
                <p>{item.title}</p>
                <div className="post-info">{`album · ${item.views} views`}</div>
            </div>
        </div>
    }
    
    render(){
        var feedState = this.props.feedState;
        return feedState.length ?
            <div className="cards">
                {feedState.map(this.forEachItem)}
            </div> :
            <Loader/>
    }
}

IGP = connect(mapStateToProps)(IGP);


export default IGP;