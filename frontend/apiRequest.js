class apiRequest {
    constructor(baseUrl, port, path) {
        this.baseUrl = baseUrl;
        this.port = port;
        this.path = path;

        this.getRequest();
        this.postRequest();
        // this.deleteRequest();
        // this.putRequest();
    }

    async getRequest() {
        try {
            const myHeaders = new Headers({
                "Content-Type": "application/json",
            });
            const response = await fetch(`http://${this.baseUrl}:${this.port}${this.path}`, {
                method: "GET",
                headers: myHeaders
            });
            return await response.json();
            
        } catch (e) {
            console.log("Error fetching data: ", e);
        }
    }

    async postRequest(postData) {
        try {


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json, text/plain, */*");

            const route = (this.baseUrl, ":", this.port, this.path);

            await fetch(route, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(postData)
            });
        } catch (e) {
            console.log("Error posting data: ", e);
        }
    }
}

export default apiRequest;