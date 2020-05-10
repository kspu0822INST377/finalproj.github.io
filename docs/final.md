
# 2019 Spending Information

## Team Members
- Layo Adewole
- Intisar Muhammad
- Catherine Onumajuru
- Kangsheng Pu 
- Jessica Tang

[View website live.](http://inst377-group7-finalproject.herokuapp.com/)

## Information Problem 

People often pay taxes without properly understanding where their money goes and what it is being used for due to lack of transparency of spending records, inaccessibility of tools and resources, inability to understand financial information, etc. We aim to help citizens of Prince George’s County understand their tax money flow through the use of visualizations for the fiscal year of 2019.

## Stakeholders

***Prince George’s County Residents***

This project will provide a method for citizens to see where their tax money is going (tax flow) and what infrastructures they are being put into. This will show them what the government of Prince George’s County prioritizes in terms of budgeting and spending.

***Prince George’s County Government***

This project will show which infrastructures are being funded and how much is spent in certain areas, which will help the government determine how they can budget tax money for the following year. For example, if they put a lot of money into education but not into traffic-related areas to prevent accidents in 2019, this is an area they can invest in next year. 

## Chosen Data

We decided to use the Finance API for fiscal year of 2019 for Prince George’s County, which displays: 

- Payee name
- Agency
- Amount spent
- Zip code
- Payment description

## Chosen Solution

We decided to use graphs/charts to show the amount spent because visual data in this form can be easier to understand for people than lengthy explanations or tables. In order to do this, we decided to use Chart.js because it allows us to create organized charts that users can interact with. 

## Technical System Rationale

We decided to use the Chart.js library because it allows us to create clean visual charts and graphs that users can interact with, and that loads fast in a browser. There are several options for chart types, which gives us more freedom in choosing how we want to represent our data.

## How Our System Helps Address the Problem

Our visualizations will summarize the total amount spent in the fiscal year of 2019 by Prince George’s County, which shows the amount per agency and by payment descriptions. It is much easier to read and understand a visual graph or chart in comparison to a table or written explanation of the data, because users are able to interact with the bars to view amounts and see how they compare to each other.

## Challenges Faced 

We were unable to use the Bootstrap library in order to format our application due to a lack of time to learn and understand how it works.

## Possible Future Directions 

One thing we can look into is expanding our analysis by bringing in financial datasets from other fiscal years. This will allow us to look at changes in spending and allocation in Prince George’s County over time, as well as the overall total amounts spent on certain infrastructures/areas.
If given time, it would be nice to improve our website by making our visualizations and page more compelling, clean, and accessible through uniform stylization and official-looking color palettes. For example, we could format our page to be color-blind friendly and have text attributes that are easy to read, in order to make the material and resources on the page more accessible to all residents who are interested. 
