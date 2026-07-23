const { test, expect } = require('@playwright/test');

test("Complete booking event", async ({ page }) => {

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByPlaceholder('you@email.com').fill('jackson@jj.co.za');
    await page.getByLabel('Password').fill('Password3535!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    await page.getByRole('button',{name: 'Admin'}).click(); 
    await page.getByRole('navigation').getByRole('link',{name: 'Manage Events'}).click(); 

    //============ Step 2: Create a new Event ============
    const seatCountNumber = 50; 
    // await page.getByTestId('event-title-input').fill('Get Main');
    // await page.getByRole('textbox', { name: 'Describe the event…' }).fill('48Hrs Non Stop Fresh');
    // await page.getByLabel('Category*').selectOption('Concert');
    // await page.getByRole('textbox', { name: 'City*' }).fill('Johannesburg');
    // await page.getByRole('textbox', { name: 'Venue*' }).fill('Sandton');
    // await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');
    // await page.getByLabel('Price ($)', { name: 'Price ($)*' }).fill('100.00');
    // await page.getByLabel('Total Seats', { name: 'Total Seats*' }).fill(seatCountNumber.toString());
    // await page.getByRole('textbox', { name: 'Image URL (optional)' }).fill('https://jacksonjj.co.za');
    // await page.getByTestId('add-event-btn').click();
    // await expect(page.getByText('Event created!')).toBeVisible();

    //await page.locator("a[data-testid='nav-events']").click();
    
     //============ Step 3: Find the event card and capture seats event ============
    await page.getByTestId('nav-events').click();
    const cardsOnEvents = await page.locator("article[id='event-card']"); 
    await expect(cardsOnEvents.nth(0)).toBeVisible(); 
    await page.getByRole('textbox',{name :'Search events, venues…'}).pressSequentially('Get Main',{delay: 150});

    //Quickly locate elements without loop
    const locationText = await page
    .locator('[data-testid="event-card"]', { hasText: 'Get Main' })
    .locator('div.flex.items-start span')
    .nth(1)
    .innerText();

    const ticketAvailable = parseInt(locationText); 

    //await expect(page.locator("span.text-xs:nth-child(2)")).toContainText(seatCountNumber.toString()+' seats available'); 
    await page.getByTestId('book-now-btn').click();
    //await expect(page.locator("span[id='ticket-count']")).toContainText("1");
    await page.getByTestId('customerName').fill('coolio');
    await page.getByTestId('customer-email').fill('coolio@coolio.co.za');
    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('+27999999999');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await expect(page.getByText('Booking RefA-8JW5OU')).toBeVisible();

     //============ Step 4: Start booking ============
    await page.getByTestId('nav-bookings').click();
    await expect(page.getByTestId('booking-card')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Axe Ice Chill' })).toBeVisible();
    await page.getByTestId('nav-events').click();
    await page.getByRole('article').filter({ hasText: 'FestivalFeaturedDilli Diwali' }).getByTestId('book-now-btn').click();
    
     //============ Step 5: Fill booking form ============
    await page.getByRole('textbox', { name: 'Full Name*' }).click();
    await page.getByRole('textbox', { name: 'Full Name*' }).fill('cool');
    await page.getByTestId('customer-email').click();
    await page.getByTestId('customer-email').fill('coolio@coolio.co.za');
    await page.getByRole('textbox', { name: 'Phone Number*' }).click();
    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('+27999999999');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await page.getByRole('button', { name: 'Browse More Events' }).click();
    
     //============ Step 6: Verify booking confirmation ============
    await page.getByRole('article').filter({ hasText: 'ConcertFeaturedHollywood' }).getByTestId('book-now-btn').click();
    await page.getByRole('textbox', { name: 'Full Name*' }).click();
    await page.getByRole('textbox', { name: 'Full Name*' }).fill('Coolc');
    await page.getByTestId('customer-email').click();
    await page.getByRole('textbox', { name: 'Full Name*' }).click();
    await page.getByRole('textbox', { name: 'Full Name*' }).fill('Cool');
    await page.getByTestId('customer-email').click();
    await page.getByTestId('customer-email').fill('coolio@coolio.co.za');
    await page.getByRole('textbox', { name: 'Phone Number*' }).click();
    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('+2799999999');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await page.getByTestId('nav-bookings').click();
    await page.getByTestId('nav-events').click();
    await expect(page.getByText('FestivalFeaturedDilli Diwali')).toBeVisible();
});

