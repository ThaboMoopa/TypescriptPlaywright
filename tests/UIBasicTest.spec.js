const {test,expect} = require ('@playwright/test'); 

test('Browser Context Playwright test',async ({browser})=> {
    //Automation flow 

     

    const context = await browser.newContext();
    const page = await context.newPage(); 
      const username = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise"); 
    console.log(await page.title());
    await username.fill('rahulshet');
    await page.locator('#password').fill('lear');
    await page.locator('#signInBtn').click();

     await page.locator("[style*='block']").textContent(); 

    console.log(await page.locator("[style*='block']").textContent() ); 

     await expect(page.locator("[style*='block']")).toContainText('Incorrect');



});  

//those two steps can be avoided if you include page on the fixture
test.only('Page Playwright test',async ({page})=> {
    //Automation flow 
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');


    await page.goto("https://rahulshettyacademy.com/loginpagePractise"); 
    console.log(await page.title());
    await username.fill("");
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await signInBtn.click();


    await page.locator('.card-body a');
    //find elements in a array and get the first element and get the text content
    console.log(await page.locator('.card-body a').first().textContent());
    console.log(await page.locator('.card-body a').nth(1).textContent());
});  