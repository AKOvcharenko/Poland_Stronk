import React, {Component} from 'react';
import fetchData from './../utils/fetchData.js';
import Loader from './Loader.jsx';
import ImageIP from './ImageIP.jsx';
import CommentsIP from './CommentsIP.jsx';


class IP extends Component {
    constructor(){
        super();
        this.appID = '6273a7e9fad6e45';
        this.state = {dataImage: {}, dataComments:[]};
        this.insertData = this.insertData.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
    }

    insertData(response){
        var newState;
        response = JSON.parse(response).data;
        newState = {dataComments: response}; // case when response for comments
        if(Object.prototype.toString.call(response) === '[object Object]'){newState = {dataImage: response};}// case when response for image
        this.setState(newState);
    }

    componentWillMount(){
        var imageID = this.props.params.imageId;
        this.makeRequest(`https://api.imgur.com/3/gallery/${imageID}`);
        this.makeRequest(`https://api.imgur.com/3/gallery/${imageID}/comments`);
    }

    makeRequest(url){
        fetchData(url, this.appID).then(this.insertData);
    }

    render(){
        var dataImage = this.state.dataImage;
        var dataComments = this.state.dataComments;
        return <div className="image-page">
            {Object.keys(dataImage).length ?  <ImageIP data={dataImage}/>:  <Loader/>}
            {dataComments.length && <CommentsIP data={dataComments}/>}
        </div>


    }
}

export default IP;