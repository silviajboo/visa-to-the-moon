function serverRequest() {
    const METHODS = {
        post: 'POST',
        get: 'GET',
        put: 'PUT',
        delete: 'DELETE'
    };

    let privateSyncServerRequest = obj => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(
                obj.method || 'GET',
                obj.method == METHODS.get && obj.params ? obj.url + '?' + obj.params : obj.url,
                true
            );

            if (obj.headers) {
                Object.keys(obj.headers).forEach(key => {
                    xhr.setRequestHeader(key, obj.headers[key]);
                });
            }
            else {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
            xhr.responseType = obj.responseType || 'json';
            xhr.timeout = 3000;

            if (obj.fn) {
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject(`Error, status ${xhr.status}: ${xhr.statusText} ${xhr.responseURL}`);
                    }
                };
            }
            xhr.ontimeout = () => reject(`Timeout: ${xhr.status} ${xhr.statusText} ${xhr.responseURL}`);
            xhr.onerror = () => reject(`Error: ${xhr.status} ${xhr.statusText} ${xhr.responseURL}`);

            if (obj.method == METHODS.get || !obj.params) {
                xhr.send();
            }
            else {
                xhr.send(obj.params);
            }
        });
    };

    let privateAsyncServerRequest = obj => {
        let xhr = new XMLHttpRequest();
        xhr.open(
            obj.method || 'GET',
            obj.method == METHODS.get && obj.params ? obj.url + '?' + obj.params : obj.url,
            true
        );

        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        else {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        xhr.responseType = obj.responseType || 'json';
        xhr.timeout = 3000;

        if (obj.fn) {
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    obj.fn(xhr.response);
                } else {
                    obj.fnError(`Error, status ${xhr.status}: ${xhr.statusText} ${xhr.responseURL}`);
                }
            };
        }

        xhr.onerror = () => obj.fnError(`Error: ${xhr.status} ${xhr.statusText} ${xhr.responseURL}`);
        xhr.ontimeout = () => obj.fnError(`Timeout: ${xhr.status} ${xhr.statusText} ${xhr.responseURL}`);

        if (obj.method == METHODS.get || !obj.params) {
            xhr.send();
        }
        else {
            xhr.send(obj.params);
        }
    };

    return {
        METHODS,
        syncServerRequest: privateSyncServerRequest,
        asyncServerRequest: privateAsyncServerRequest,
    };
}

export default serverRequest();