# 2019 Spending Information

Our purpose in developing this project was to help provide the general public with an idea of where their tax dollars are going. Whether it is due to a lack of transparency from the government, lack of accessibility to information resources regarding government spending, or just an overall lack of understanding, we wanted to develop an easy way for PG County residents to fulfill this information need. Our website on PG County Government Spending is a resource that one can use to become more aware of how tax dollars are spent by the Prince George’s County government. We utilized PG County’s Open Data API to pull data about the PG County budget and provides simple visualizations about how PG County spends that budget based on government agency, and by payment description. 

Our website is aimed to function on most, if not all browsers.

[View the live website.](http://inst377-group7-finalproject.herokuapp.com/) 

[View the User Manual.](docs/user.md)


# Developer Manual

## Installing the application and all dependencies

1. Navigate to the location of the project folder in the terminal by typing into the command line: 
        
        cd folder/folder/etc.

    - After copying our repository to your Github Desktop, navigate to the location of the repository folder in your computer.
    - If you are unsure and want to check the contents of the folder you are navigating, type in: 
    
            ls 
    
       This will display all the contents of that folder you are in.

2. When you get to the project/main folder, type in:

        npm install 

    into the command line and wait for the installations to finish.
    This will install all the dependencies listed in the package.json folder in the repository.

## Running the application on a server

1. Navigate to the location of the project/main folder in the terminal typing into the command line: 

        cd folder/folder/etc.

    - If you are unsure and want to check the contents of the folder you are navigating, type in: 
    
            ls 
    
       This will display all the contents of that folder you are in.

2. Assuming that you have already installed all the necessary dependencies, type in: 

        npm start
        
3. Go to a new window or tab on your browser.

4. Type in “localhost:3000” into the search bar and click 'enter' in order to access the application. 

## Running tests for our software

### ***writeForm function***

- If your server doesn’t log the body of the json-encoded response from the form on the About page, then something went wrong in getting the response of the body or inserting the. 
- If the server doesn’t log the current SQL table, then something went wrong with inserting the values from the form in the table.

### ***byPayment and byAgency functions***

- If your server doesn’t log a list of the agency names or the payment description names and a list of the amounts, then something went wrong with the get request and getting the JSON output of the request.
- If the above worked, but your browser console isn’t logging a list of the labels, then something went wrong when sending the response to the front end (res.send).

## API for our server application (endpoints and what they each do)

### ***GET***

We have two GET endpoints: one for the Spending by Agency page and another for the Spending by Payment page. When a user goes to the Spending by Agency page, the byAgency function in the server.js file gets called and accesses or ‘gets’ the JSON output of the Finance API from the link that is specified in the function. The json data is then manipulated and transformed into the format that is required for the Chart.js chart, and sent to the front end, where it is handled by the Chart.js API to produce a bar chart. The same applies to when users go to the Spending by Payment page, except the byPayment function is called, where a get request is sent to a different link.

### ***POST***

Post method in sendForm function (about.html)

- Uses fetch API in order to post J-SON encoded data from the form on the About page, to the server. In the server, it then puts into an sql table in the database_final.db file, using the writeForm function

### ***PUT***

In the documentation page, a form, where users can submit questions, is sent to the server through a put method. It then gets inserted into a sql table in the questions.db file, using the writeForm function.

## Known bugs and Future development.

- CanvasJS maps may not load 
    - There are functions (spendingbyAgency and spendingbyPayment) in the server.js file that were meant to be used with the CanvasJS API, but since we decided not to use the API anymore, these functions are unused. However, they were left there in case anyone wanted to further work with CanvasJS to fix the loading issue.

- The Chart.js charts may or may not load on all screen sizes.
