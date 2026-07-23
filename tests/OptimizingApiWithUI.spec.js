const {test,expect,request} = require('@playwright/test'); 

//import the class
const {ApiUtils} = require('./utils/ApiUtils');

const loginPayLoad = {userEmail:"jackson.miller@example.com",userPassword:"Password234"}; 
const orderPayLoad = {orders:[{country:"South Africa",productOrderedId:"6960eac0c941646b7a8b3e68" }]}; 
let response;  

test.beforeAll(async()=>{
    const apiContext = await request.newContext(); 

    //create new obtain of API Utils
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);  
}); 

test.only("Client App login api", async({page})=>{

    //execute javascript code inside UI test
    //store the token inside the storage of browser window
    page.addInitScript(value =>{
        window.localStorage.setItem('token', value); 

    }, response.token); 

await page.goto("https://rahulshettyacademy.com/client")

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
    if(response.orderIdApi === orderId)
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