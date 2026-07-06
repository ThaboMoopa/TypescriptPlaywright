const {test} = require('@playwright/test');

test("Register User",async ({page})=> {

await page.goto("https://rahulshettyacademy.com/client/auth/login");
 const registerLink = page.locator(".text-reset"); 
 const firstName = page.locator("#firstName"); 
 const lastName = page.locator("#lastName"); 
 const phoneNumber = page.locator("#userMobile");
 const password = page.locator("#userPassword");
 const confirmPassword = page.locator("#confirmPassword");
 const occupation = page.locator(".custom-select");
 const email = page.locator("#userEmail"); 
 const over18 = page.locator("input.ng-invalid:nth-child(1)");
 const registerBtn = page.locator("#login");
 const gender = page.locator("input.mt-3")


 await registerLink.click(); 
 await firstName.fill("Jackson");
 await lastName.fill("Miller");
 await phoneNumber.fill("1234567890"); 
 await password.fill("Password234"); 
 await confirmPassword.fill("Password234");
 await email.fill("jackson.miller@example.com"); 
 await over18.click(); 
 await occupation.selectOption("Student"); 
 await gender.first().click();
 await registerBtn.click();


}); 


test.only("Login and Select Addidas label",async ({page})=> {

await page.goto("https://rahulshettyacademy.com/client/auth/login");

const username = page.locator("#userEmail");
const password = page.locator("#userPassword");
const loginBtn = page.locator("#login");

 await password.fill("Password234"); 
 await username.fill("jackson.miller@example.com"); 
await loginBtn.click();


const addidasLabel = page.locator(".card-body h5");

console.log(await addidasLabel.first().textContent()); 

}); 