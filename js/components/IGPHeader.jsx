import React, {Component} from 'react';

class Header extends Component {

    determineText(anyResponse, anyImage, params = '', author = ''){
        var result = null;
        params = params.replace(/_/g, ' ');
        if(params && anyResponse && anyImage){// case when user made a search and got result
            result = <span className="text-center igp-header-wrapper">We found smth for <span className="search-params">{params}</span>. Check it out! </span>;
        }
        else if(params && anyResponse && !anyImage){// case when user just on igp
            result = <span className="text-center igp-header-wrapper">You looked for <span className="search-params">{params}</span>, but smth went wrong :C</span>;
        }
        else if(author && anyResponse && anyImage){// case when user on author page, and we have result
            result = <span className="text-center igp-header-wrapper">More posted by <span className="author">{author}</span>. Check it out! </span>;
        }
        else if(author && anyResponse && !anyImage){// case when user on author page, and we have no result
            result = <span className="text-center igp-header-wrapper">More posted by <span className="author">{author}</span>? Smth went wrong :C</span>;
        }
        else if(anyResponse && anyImage){// case when user just on igp
            result = <span className="text-center igp-header-wrapper">Check it out!</span>;
        }

        return result;
    }

   render(){
        debugger;
        return this.determineText(this.props.anyResponse, this.props.anyImage, this.props.params, this.props.author);
    }
}

export default Header;

