const changeFeedState = {
    fetchedData(state, data){
        var info = typeof data === 'string' ? JSON.parse(data).data : data;
        var result = state.slice();
        result = info.items ? result.concat(info.items) : result.concat(info);

        //case when we got nothing(for example search for some weird string)
        if(!result.length){result.push(undefined)}
        return result;
    },

    reset(){
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