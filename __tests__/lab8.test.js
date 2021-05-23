describe("Basic user flow for SPA ", () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5500");
    await page.waitForTimeout(500);
    jest.setTimeout(40000);
  });

  // test 1 is given
  it("Test1: Initial Home Page - Check for 10 Journal Entries", async () => {
    const numEntries = await page.$$eval("journal-entry", (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it("Test2: Make sure <journal-entry> elements are populated", async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$("journal-entry");
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty("entry");
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) {
        allArePopulated = false;
      }
      if (plainValue.date.length == 0) {
        allArePopulated = false;
      }
      if (plainValue.content.length == 0) {
        allArePopulated = false;
      }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it("Test3: Clicking first <journal-entry>, new URL should contain /#entry1", async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click("journal-entry");
    const url = await page.url();
    expect(url).toMatch("http://127.0.0.1:5500/#entry1");
  });

  it("Test4: On first Entry page - checking page header title", async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1”
    const header = await page.$eval("h1", (entry) => {
      return entry.innerHTML;
    });
    expect(header).toBe("Entry 1");
  });

  it("Test5: On first Entry page - checking <entry-page> contents", async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    const entry = await page.$("entry-page");
    const data = await entry.getProperty("entry");
    const jsonEntry = await data.jsonValue();
    expect(jsonEntry.title).toMatch("You like jazz?");
    expect(jsonEntry.date).toMatch("4/25/2021");
    expect(jsonEntry.content).toMatch(
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible."
    );
    expect(jsonEntry.image.alt).toMatch("bee with sunglasses");
    expect(jsonEntry.image.src).toMatch(
      "https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455"
    );
  }, 10000);

  it("Test6: On first Entry page - checking <body> element classes", async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const journalEntry = await page.$eval("body", (entry) => {
      return entry.classList[0];
    });
    expect(journalEntry).toEqual("single-entry");
  });

  it("Test7: Clicking the settings icon, new URL should contain #settings", async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click("img");
    const url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/#settings");
  });

  it("Test8: On Settings page - checking page header title", async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header = await page.$eval("h1", (settingHeader) => {
      return settingHeader.innerHTML;
    });
    expect(header).toMatch("Settings");
  });

  it("Test9: On Settings page - checking <body> element classes", async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const settingsBodyClass = await page.$eval("body", (settings) => {
      return settings.classList;
    });
    expect(settingsBodyClass[0]).toBe("settings");
  });

  it("Test10: Clicking the back button, new URL should be /#entry1", async () => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    const url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/#entry1");
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it("Test11: Clicking the back button, back to home page", async () => {
    await page.goBack();
    const url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/");
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it("Test12: When user on home page, header title should be “Journal Entries", async () => {
    const header = await page.$eval("h1", (entry) => {
      return entry.innerHTML;
    });
    expect(header).toBe("Journal Entries");
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute
  it("Test12: When user on home page, header title should be “Journal Entries", async () => {
    const classLen = await page.$eval("body", (entry) => {
      return entry.classList.length;
    });
    expect(classLen).toBe(0);
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: When click on second entry, url is correct', async() => {
    const entries = await page.$$("journal-entry");
    await entries[1].click();
    const url = await page.url();
    await page.waitForTimeout(500);
    expect(url).toBe("http://127.0.0.1:5500/#entry2");
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: When click on second entry, title is correct', async() => {
    const header = await page.$eval("header > h1", (entry) => {
      return entry.innerHTML;
    });
    expect(header).toBe("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: When clicking on the second entry, entry page contents is correct', async() => {
    const entries = await page.$$("journal-entry");
    const entry = entries[1];
    const data = await entry.getProperty("entry");
    const jsonEntry = await data.jsonValue();

    expect(jsonEntry.title).toMatch("Run, Forrest! Run!");
    expect(jsonEntry.date).toMatch("4/26/2021"); 
    expect(jsonEntry.content).toMatch("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    expect(jsonEntry.image.src).toMatch("https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg");
    expect(jsonEntry.image.alt).toMatch("forrest running");
    expect(data.audio).toBeUndefined();
  }, 10000);

  // create your own test 17
  it("Test17: Clicking the back button from second entry, back to home page", async () => {
    await page.goBack();
    const url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/");
  });

  // create your own test 18
  it('Test18: When click on third entry, url is correct', async() => {
    const entries = await page.$$("journal-entry");
    await entries[2].click();
    await page.waitForNavigation();
    const url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/#entry3");
  }, 30000);

  // create your own test 19
  it('Test19: When click on third entry, title is correct', async() => {
    const header = await page.$eval("header > h1", (entry) => {
      return entry.innerHTML;
    });
    expect(header).toBe("Entry 3");
  });

  // create your own test 20
  it('Test20: When clicking on the third entry, entry page contents is correct', async() => {
    const entry = await page.$('entry-page');
    const jsonEntry = await (await entry.getProperty('entry')).jsonValue();

    expect(jsonEntry.title).toMatch("Ogres are like onions");
    expect(jsonEntry.date).toMatch("4/27/2021"); 
    expect(jsonEntry.content).toMatch("Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.");
    expect(jsonEntry.image.src).toMatch("https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg");
    expect(jsonEntry.image.alt).toMatch("shrek and donkey looking confused");
    expect(jsonEntry.audio).toBeUndefined();
  }, 40000);
});
