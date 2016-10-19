export default (url, id) => {
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();
        req.open("GET", url);
        if(id){req.setRequestHeader('Authorization', `Client-ID ${id}`);} // set header if we passed id
        req.onload = function() {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(new Error(req.statusText));
            }
        };

        req.onerror = function() {
            reject(new Error("Network error"));
        };

        req.send();
    });
}
