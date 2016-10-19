const changeFeedState = {
    fetchedData(state, data){
        var info = typeof data === 'string' ? JSON.parse(data).data : data;
        var result = state.slice();
        result = result.concat(info.items);
        return result;
    }
};

const feedState = (state = [], action) => {
    switch (action.type) {
        case "GOT_FEED_DATA": {
            return changeFeedState.fetchedData(state, action.data);
        }
        default:
            return state;
    }
};

export default feedState;