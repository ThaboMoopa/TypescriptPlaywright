const {test,expect} = require('@playwright/test'); 


test.only("End to end Testing",async ({page})=> {

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







}); 