class apiRequest {
    constructor(baseUrl, path, requestInit, object) {
        this.baseUrl = baseUrl;
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
            const response = await fetch(`${this.baseUrl}/${this.path}`, {
                headers: myHeaders,
                method: this.requestInit
            });
            if (!response.ok) {
                throw new error(`Request failed with status ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.log("Error fetching data: ", error.message);
        }
    }

    // async postRequest() {
    //     const object = this.object
    //     const myHeaders = new Headers({
    //         "Content-Type": "application/json",
    //         "Accept": "application/json, text/plain, */*"
    //     });
    //     const response = await fetch(`${this.baseUrl}/${this.path}`, {
    //         method: this.requestInit,
    //         headers: myHeaders,
    //         body: JSON.stringify({object})
    //     }).catch(error => errorHandle(error));
    // }
}

export default apiRequest;