import {hashHistory, Router, Route, IndexRedirect} from 'react-router';
import App from './../components/App.jsx';
import IGP from './../components/IGP.jsx';
import IP from './../components/IP.jsx';

var Routing = (
    <Router  history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/igp" />
            <Route path="/igp" component={IGP}/>
            <Route path="/img/:imageId" component={IP}/>
        </Route>
    </Router>
);

export default Routing;