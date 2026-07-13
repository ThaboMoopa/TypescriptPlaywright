import {test, expect} from '@playwright/test';
 

test.only("Rewrite end to end using special locators", async({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/client/auth/login");

await page.getByPlaceholder("email@example.com").fill("jackson.miller@example.com");
await page.getByPlaceholder("enter your passsword").fill("Password234");
await page.getByRole("button", {name: 'login'}).click();

//validate that the blinking text is present 
const blinkingText = page.locator('label.blink_me'); 
await blinkingText.isVisible(); 

//wait for cart to load all the products
await page.locator('.card-body b').first().waitFor();

//Select product and add to cart
const productName = "Adidas Original";
const products = await page.locator('.card-body'); 

await page.locator('.card-body').filter({hasText: 'Adidas Original'}).getByRole("button", {name: 'Add To Cart'}).click();

await page.getByRole('listitem').getByRole("button", {name: 'Cart'}).click();

await page.locator('div li').first().waitFor();

await expect(page.getByText('Adidas Original')).toBeVisible();

await page.getByRole("button", {name: 'Checkout'}).click(); 

//Dynamic dropdown handling 
await page.getByPlaceholder("Select Country").pressSequentially('S','o','u', {delay: 150}); 
await page.getByRole("button", {name: 'South Africa'}).click();

const fields = await page.locator(".field input");
await fields.nth(1).fill("123");
await fields.nth(2).fill("Jackson Miller");
//fields.last().fill("1234567890");

const emailText = await page.locator(".user__name label").textContent(); 
expect(emailText).toContain('jackson.miller@example.com'); 

await page.getByText("PLACE ORDER").click();
await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();

//Complete later 

// const orderNumber = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

// console.log("Order Number: " + orderNumber); 

// const orderNumberTrimmed = orderNumber.split('|'); 
// console.log(orderNumberTrimmed[1].trim()); 


// //navigate to my orders
// await page.locator("[routerlink*='myorders']").last().click(); 
// await page.locator("tbody").waitFor(); 
// await expect(await page.locator("h1").nth(0)).toHaveText("Your Orders"); 

// const table = await page.locator('table tbody tr'); 

// const tableCount = await table.count(); 
// await table.nth(0).waitFor(); 

// for(let i=0; i<tableCount; i++)
// {
//     await page.locator("tbody").waitFor(); 
//     const orderId = await table.nth(i).locator('th').textContent(); 
//     if(orderId === orderNumberTrimmed[1].trim())
//     {

//         const tableData = await table.nth(i).locator('td');
//         const tableDataCount =await tableData.count(); 

//         for(let j=0; j<tableDataCount; j++)
//         {
//             await table.nth(j).locator('.btn-primary').isVisible(); 
//             await table.nth(j).locator('.btn-primary').click(); 
//             break;             
//         }
//         break; 
//     }
// }
// await page.locator('.email-container .email-title').waitFor(); 
// await expect (await page.locator('.email-container .email-title')).toContainText('order summary'); 
}); 