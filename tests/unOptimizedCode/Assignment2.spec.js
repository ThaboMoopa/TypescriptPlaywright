const {test,expect} = require('@playwright/test'); 


test("End to end Testing",async ({page})=> {

await page.goto("https://rahulshettyacademy.com/client/auth/login");

const username = page.locator("#userEmail");
const password = page.locator("#userPassword");
const loginBtn = page.locator("#login");

 await password.fill("Password234"); 
 await username.fill("jackson.miller@example.com"); 
await loginBtn.click();

//validate that the blinking text is present 
const blinkingText = page.locator('label.blink_me'); 
await blinkingText.isVisible(); 

//wait for cart to load all the products
await page.locator('.card-body b').first().waitFor();
const titles = await page.locator('.card-body b').allTextContents();
console.log(titles); 

//Select product and add to cart
const productName = "ZARA COAT 3";
const products = await page.locator('.card-body'); 

const productCount  = await products.count()
for(let i=0; i<productCount; i++)
{
    if(await products.nth(i).locator('b').textContent() === productName)
        {
            await products.nth(i).locator('text= Add To Cart').click();
            break; 
        } 
}

await page.locator('[routerlink*="cart"]').click();

await page.locator('div li').first().waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();

expect(bool).toBeTruthy(); 

await page.locator('text=Checkout').click(); 


//Dynamic dropdown handling 
await page.locator("[placeholder*='Country']").pressSequentially('S','o','u', {delay: 150}); 
const options = await page.locator("section.list-group");
await options.waitFor();
const optionCount = await options.locator("button").count(); 

for(let i=0; i<optionCount; i++)
{
    const text = await options.locator("button").nth(i).textContent(); 
    if(text === " South Africa")
    {
        await options.locator("button").nth(i).click(); 
        break; 
    }

}

const fields = await page.locator(".field input");
await fields.nth(1).fill("123");
await fields.nth(2).fill("Jackson Miller");
//fields.last().fill("1234567890");

const emailText = await page.locator(".user__name label").textContent(); 
expect(emailText).toContain('jackson.miller@example.com'); 

await page.locator(".action__submit").click();
const orderConfirmation = await page.locator(".hero-primary"); 
await orderConfirmation.waitFor(); 
await expect(orderConfirmation).toHaveText(' Thankyou for the order. '); 

const orderNumber = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

console.log("Order Number: " + orderNumber); 

const orderNumberTrimmed = orderNumber.split('|'); 
console.log(orderNumberTrimmed[1].trim()); 


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
    if(orderId === orderNumberTrimmed[1].trim())
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