# Lab8_Starter

## Partners:
* Jacquelyn Co
* Hana Kim

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
    * 1 Within a Github action that runs whenever code is pushed 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
    * We should probably not use a unit test to test the "message" feature of a messaging application because "messaging" consists of multiple parts/components of the application  since it allows a user to both write AND send a message to another user. It would take multiple operations within the application to do these things. But unit testing should only be used on one component of the application, so if we wanted to test out this feature, we should probably break it down into a smaller unit like testing if our application has the correct thing that the user wrote down or etc. Unit testing should be used on one component of the application not several parts. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
    * Yes, we should use a unit test to test the "max message length" feature of a messaging application. This feature is small enough to test as its only function is to prevent the user from typing more than 80 characters. It's a single operation that can't really be broken down into further components.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
    * 

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
    * 
