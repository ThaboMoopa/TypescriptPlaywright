const {test,expect} = require('@playwright/test'); 

test.only("More validations", async({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice");
await expect(page.locator("#displayed-text")).toBeVisible(); 

await page.locator("#hide-textbox").click(); 

await expect(page.locator("#displayed-text")).toBeHidden(); 


await page.locator("#confirmbtn").click(); 
await page.on("dialog",dialog => dialog.accept()); //click ok button on pop up\
// await page.locator("#confirmbtn").click(); 
// await page.on("dialog",dialog => dialog.dismiss()); //click cancel on pop up
// await page.locator("#confirmbtn").click(); 


//hover over element 
await page.locator("#mousehover").hover(); 

//handling iFrames 
//switch frames
const framesPage = page.frameLocator("#courses-iframe");  

//Use framesPage to use the elements in the frame page
await framesPage.locator("li a[href*=lifetime-access]:visible").click(); 
const subscribers = await framesPage.locator(".text h2").textContent(); 

console.log(subscribers.split(" ")[1]); 
})