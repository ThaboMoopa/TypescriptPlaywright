const {test,expect,request} = require('@playwright/test'); 
const loginPayLoad = {userEmail:"jackson.miller@example.com",userPassword:"Password234"}; 
const orderPayLoad = {orders:[{country:"South Africa",productOrderedId:"6960eac0c941646b7a8b3e68" }]}; 
let token; 
let orderIdApi; 
test.beforeAll(async()=>{
    //login API
    const apiContext = await request.newContext(); 
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {data:loginPayLoad})

        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();

        console.log(loginResponse.body());  
        token = loginResponseJson.token; 
        console.log(token); 



        //send request for post
       const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad, 
                headers: {
                    'Authorization' : token,
                    'Content-type' : 'application/json'
                }
            }
        );

        const orderResponseJson = await orderResponse.json(); 
        console.log(orderResponseJson);
        orderIdApi = orderResponseJson.orders[0]; 

    
}); 

test.only("Client App login api", async({page})=>{

    //execute javascript code inside UI test
    //store the token inside the storage of browser window
    page.addInitScript(value =>{
        window.localStorage.setItem('token', value); 

    }, token); 

await page.goto("https://rahulshettyacademy.com/client")
 // Select product and add to cart

//Complete later 

// const orderNumber = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

// console.log("Order Number: " + orderNumber); 

// const orderNumberTrimmed = orderNumber.split('|'); 
// console.log(orderNumberTrimmed[1].trim()); 

//navigate to my orders
await page.locator("[routerlink*='myorders']").last().click(); 
await page.locator("tbody").waitFor(); 
await expect(await page.locator("h1").nth(0)).toHaveText("Your Orders"); 

const table = await page.locator('table tbody tr'); 

const tableCount = await table.count(); 
await table.nth(0).waitFor(); 

for(let i=0; i<tableCount; i++)
{
    await page.locator("tbody").waitFor(); 
    const orderId = await table.nth(i).locator('th').textContent(); 
    if(orderIdApi === orderId)
    {

        const tableData = await table.nth(i).locator('td');
        const tableDataCount =await tableData.count(); 

        for(let j=0; j<tableDataCount; j++)
        {
            await table.nth(j).locator('.btn-primary').isVisible(); 
            await table.nth(j).locator('.btn-primary').click(); 
            break;             
        }
        break; 
    }
}
await page.locator('.email-container .email-title').waitFor(); 
await expect (await page.locator('.email-container .email-title')).toContainText('order summary'); 


}); 