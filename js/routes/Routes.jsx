import {hashHistory, Router, Route, IndexRedirect} from 'react-router';
import App from './../components/App.jsx';
import IGP from './../components/IGP.jsx';
import Header from './../components/Header.jsx';
import IP from './../components/IP.jsx';
import Error from './../components/Error.jsx';
import Social from './../components/Social.jsx';

var Routing = (
    <Router  history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/igp" />
            <Route path="/igp" components={{igp: IGP, header: Header}} onEnter={function(){/*store.dispatch(resetFeedData())*/}}/>
            <Route path="/img/:imageId" components={{ip: IP, header: Header, social: Social}}/>
            <Route path="/search/:searchParams" components={{igp: IGP, header: Header}}/>
            <Route path="*" components={{error: Error, header: Header}}/>
        </Route>
    </Router>
);

export default Routing;
