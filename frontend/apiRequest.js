class apiRequest {
    constructor(baseUrl, port, path) {
        this.baseUrl = baseUrl;
        this.port = port;
        this.path = path;

    }

    async getRequest() {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const route = (this.baseUrl, ":", this.port, this.path);

            const response = await fetch(route, {
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

            const response = await fetch(route, {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(postData)
            }).then(response => response.json());

        } catch (e) {
            console.log("Error posting data: ", e);
        }
    }

    async deleteRequest(id) {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-type', 'application/json');

            const route = (this.baseUrl, ":", this.port, this.path);

            console.log(`${route}${id}`);
            
            console.log(`What the route looks like: ${this.baseUrl}:${this.port}${this.path}${id}`)

            const response = await fetch(`http://${this.baseUrl}:${this.port}${this.path}${id}`, {
                method: 'DELETE',
            }).then(response => response.json());
            
        } catch (e) {
            console.log("Error deleting data: ", e);
            
        }
    }
}

export default apiRequest;