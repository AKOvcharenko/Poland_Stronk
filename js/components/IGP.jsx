import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import fetchData from './../utils/fetchData.js';
import Loader from './Loader.jsx';
import Error from './../components/Error.jsx';

import store from './../store/store.js';
import gotFeedData from './../actions/actionGotFeedData.js'
import resetFeedData from './../actions/actionResetFeedData.js'


const mapStateToProps = state => {return {feedState: state.feedState}};

class IGP extends Component {

    constructor(){
        super();
        this.appID = '6273a7e9fad6e45';
        this.pageNumber = 0; // i will count number of pages to which i already have sent request, yes it is a big memory leak
        this.sent = false; // same story, here i will keep flag for preventing request's doublings
        this.handleScroll = this.handleScroll.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
    }

    determineURL(pageNumber){
        var searchParams = this.props.params &&  this.props.params.searchParams;
        var url = `https://api.imgur.com/3/gallery/t/polandball/viral/${pageNumber}`;
        if(searchParams){
            searchParams = searchParams.replace(/_/g, '+');
            url = `https://api.imgur.com/3/gallery/search/${pageNumber}/?q=${searchParams}`;
        }
        return url;
    }

    makeRequest(){
        var self = this;
        var url = this.determineURL(this.pageNumber);
        if(this.sent){return;}
        this.sent = true;
        fetchData(url, this.appID).then(response => {
            store.dispatch(gotFeedData(response));
            self.sent = false;
            self.pageNumber = this.pageNumber + 1;
        }, err => {self.sent = false; self.pageNumber = self.pageNumber + 1});
    }

    handleScroll(){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.makeRequest();
        }
    }

    componentWillMount(){
        var self = this;
        this.props.history.listen(() => {
            //debugger;
            self.pageNumber = 0;
            store.dispatch(resetFeedData());
        });
        !this.props.feedState.length && this.makeRequest();
    }

    componentDidUpdate(){
        !this.props.feedState.length && this.makeRequest();
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
                (feedState[0] ? <div className="cards">

                    {feedState.map(this.forEachItem)}
                </div> : <Error/>)  :
                <Loader/>
    }
}

IGP = connect(mapStateToProps)(IGP);


export default IGP;