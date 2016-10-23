import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import {connect} from 'react-redux';
import fetchData from './../utils/fetchData.js';
import Loader from './Loader.jsx';
import Error from './../components/Error.jsx';
import IGPHeader from './../components/IGPHeader.jsx';

import store from './../store/store.js';
import gotFeedData from './../actions/actionGotFeedData.js'
import resetFeedData from './../actions/actionResetFeedData.js'


const mapStateToProps = state => {return {feedState: state.feedState}};

class IGP extends Component {

    constructor(props){
        super(props);
        this.appID = '6273a7e9fad6e45';
        this.pageNumber = 0; // i will count number of pages to which i already have sent request, yes it is a big memory leak
        this.sent = false; // same story, here i will keep flag for preventing request's doublings
        this.handleScroll = this.handleScroll.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
        this.determineResult = this.determineResult.bind(this);
        this.resetFeed = this.resetFeed.bind(this);
    }

    determineURL(pageNumber){
        var searchParams = this.props.params &&  this.props.params.searchParams;
        var author = this.props.params &&  this.props.params.author;
        var url = `https://api.imgur.com/3/gallery/t/polandball/time/${pageNumber}`;
        if(searchParams){
            searchParams = searchParams.replace(/_/g, '+');
            url = `https://api.imgur.com/3/gallery/search/${pageNumber}/?q=${searchParams}`;
        }
        if(author){
            url = `https://api.imgur.com/3/account/${author}/submissions/${pageNumber}`;
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
        }, () => {self.sent = false; self.pageNumber = self.pageNumber + 1});
    }

    handleScroll(){
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        if ((window.innerHeight + scrollTop) >= document.body.offsetHeight) {
            this.makeRequest();
        }
    }

    resetFeed(){
        this.pageNumber = 0;
        store.dispatch(resetFeedData());
    }

    componentWillMount(){
        this.props.router.listen(this.resetFeed);
        this.resetFeed();
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
    
    forEachItem(item){
        return <div key={item.id} id={item.id} className="post" >
            <Link className="image-list-link" to={`img/${item.id}`}>
                <img src={`http://i.imgur.com/${item.cover || item.id}b.jpg`}/>
            </Link>
            <div className="hover">
                <p>{item.title}</p>
                <div className="post-info">{`album · ${item.views} views`}</div>
            </div>
        </div>
    }

    determineResult(feedState, haveAnyResponse, haveAnyImage){
        var result = <Loader/>; // case when we have not got response yet
        if(haveAnyResponse && haveAnyImage){// case when we received response with data
            result = <div className="cards">{feedState.map(this.forEachItem)}</div>;
        }
        if(haveAnyResponse && !haveAnyImage){// case when we received response without data
            result = <Error/>;
        }

        return result;
    }
    
    render(){
        var feedState = this.props.feedState;
        var anyResponse = !!feedState.length;
        var anyImage = !!feedState[0];
        var searchParams = this.props.params &&  this.props.params.searchParams;
        var author = this.props.params &&  this.props.params.author;
        return <div className="igp">
                    <IGPHeader anyResponse={anyResponse} anyImage={anyImage} params={searchParams} author={author}/>
                    {this.determineResult(feedState, anyResponse, anyImage)}
                </div>

    }
}

IGP = connect(mapStateToProps)(IGP);


export default withRouter(IGP) ;