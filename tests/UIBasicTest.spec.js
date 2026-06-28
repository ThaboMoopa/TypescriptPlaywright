const {test,expect} = require ('@playwright/test'); 

test.only('Browser Context Playwright test',async ({browser})=> {
    //Automation flow 
    const context = await browser.newContext();
    const page = await context.newPage(); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise"); 
    console.log(await page.title());
    await page.locator('#username').fill('rahulshet');
    await page.locator('#password').fill('lear');
    await page.locator('#signInBtn').click();

     await page.locator("[style*='block']").textContent(); 

    console.log(await page.locator("[style*='block']").textContent() ); 

     await expect(page.locator("[style*='block']")).toContainText('Incorrect');

});  

//those two steps can be avoided if you include page on the fixture
test('Page Playwright test',async ({page})=> {
    //Automation flow 
    await page.goto("https://google.com"); 
    console.log(await page.title()); 
    await expect(page).toHaveTitle("Google");
});  