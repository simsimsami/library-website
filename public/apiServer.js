class apiRequest {
    constructor(baseUrl, port, path, requestInit, object) {
        this.baseUrl = baseUrl;
        this.port = port;
        this.path = path;
        this.requestInit = requestInit;
        this.object = object;

        this.getRequest();
        // this.postRequest();
        // this.deleteRequest();
        // this.putRequest();
    }

    async getRequest() {
        try {
            const myHeaders = new Headers({
                "Content-Type": "application/json",
            });
            const response = await fetch(`http://${this.baseUrl}:${this.port}/${this.path}`, {
                method: this.requestInit,
                headers: myHeaders
            });
            if (!response.ok) {
                throw new error(`Request failed with status ${response}`);
            }
            
            return await response.json();
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }

    // async postRequest() {
    //     const object = this.object
    //     const myHeaders = new Headers({
    //         "Content-Type": "application/json",
    //         "Accept": "application/json, text/plain, */*"
    //     });
    //     const response = await fetch(`${this.baseUrl}:${this.port}/${this.path}`, {
    //         method: this.requestInit,
    //         headers: myHeaders,
    //         body: JSON.stringify({object})
    //     }).catch(error => errorHandle(error));
    // }
}

export default apiRequest;