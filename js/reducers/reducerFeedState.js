const changeFeedState = {
    fetchedData(state, data){
        var info = typeof data === 'string' ? JSON.parse(data).data : data;
        var result = state.slice();
        result = info.items ? result.concat(info.items) : result.concat(info);
        return result;
    },

    reset(){
        debugger;
        return [];
    }
};

const feedState = (state = [], action) => {
    switch (action.type) {
        case "GOT_FEED_DATA": {
            return changeFeedState.fetchedData(state, action.data);
        }
        case "RESET_FEED_DATA": {
            return changeFeedState.reset(state);
        }
        default:
            return state;
    }
};

export default feedState;