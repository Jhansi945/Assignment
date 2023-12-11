const { Builder, By, Key, until } = require('selenium-webdriver');
const data = require("./data.json");

async function findElements() {
    let driver = await new Builder().forBrowser('safari').build();

    try {
        // Navigate to a website
        await driver.get('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');

        // Find multiple elements using XPath
        let elements = await driver.findElements(By.xpath("//summary[contains(text(),'Table Data')]"));

        // Iterate through the found elements
        for (let element of elements) {
            // Perform actions on each element (e.g., get text)
             await element.click();
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        elements = await driver.findElements(By.xpath("//textarea[@id='jsondata']"));

        // Iterate through the found elements
        for (let element of elements) {
            // Perform actions on each element (e.g., get text)
            await element.clear();
            await new Promise(resolve => setTimeout(resolve, 3000));

             await element.sendKeys(JSON.stringify(data));

            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        elements = await driver.findElements(By.xpath("//button[@id='refreshtable']"));

        // Iterate through the found elements
        for (let element of elements) {
            // Perform actions on each element (e.g., get text)
            await element.click();

            await new Promise(resolve => setTimeout(resolve, 6000));
        }


        for(let i=2;i<=data.length+1;i++){
            let data_q = data[i];
            let table_text_name = await driver.findElement(By.xpath("//tr["+i+"]/td[1]"));
            let table_text_age = await driver.findElement(By.xpath("//tr["+i+"]/td[2]"));
            let table_text_gender = await driver.findElement(By.xpath("//tr["+i+"]/td[3]"));
            

        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await new Promise(resolve => setTimeout(resolve, 6000));     
           await driver.quit();
    }
}

// Call the function to find elements
findElements();
