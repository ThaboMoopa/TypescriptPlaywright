class ApiUtils{

    //constructor
    constructor(apiContext,loginPayLoad)
    {
        this.apiContext = apiContext; 
        this.loginPayLoad = loginPayLoad; 
    }


    //login and get token
    async getToken()
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: this.loginPayLoad
        })

        const loginResponseJson = await loginResponse.json();

        console.log(loginResponse.body());  
        const token = loginResponseJson.token; 
        console.log(token);
        return token; 
    }

    async createOrder(orderPayLoad)
    {
        let response = {}; 
        response.token = await this.getToken(); 
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                    {
                        data: orderPayLoad, 
                        headers: {
                            'Authorization' : response.token,
                            'Content-type' : 'application/json'
                        }
                    }
                );
        
                const orderResponseJson = await orderResponse.json(); 
                console.log(orderResponseJson);
                response.orderIdApi = orderResponseJson.orders[0]; 
                return response; 
        
    }
}
module.exports = {ApiUtils};