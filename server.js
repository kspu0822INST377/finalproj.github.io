/* server requirements*/
const express = require('express');
const fetch = require('node-fetch');
const app = express();

/*temp --Heroku?*/
const port = process.env.PORT || 3000;

app.use(express.static('./'));

/* Begin handling of data */
const apiURL = "https://data.princegeorgescountymd.gov/resource/p32t-azw8.json?"

/* Spending by Agency function */
function spendingbyAgency(req, res) {
    const agencyURL = apiURL+"$select=agency,sum(amount)&$group=agency"
    fetch(agencyURL)
    .then((data) => data.json())
    .then((data) => {
        data.shift()
        return data;
    })
    .then((data) => {
        let formattedData = Object.entries(data).map(m => {
            return {
            y: parseInt(m[1].sum_amount), label: m[1].agency
            };
        })
        return formattedData;
    })
    .then((data) => {
        console.log(data)
        res.send({data: data}) /* Send formatted data for canvasJS */
    })
}

/* Spending by Payment */
function spendingbyPayment(req, res) {
    const paymentURL = apiURL+"$select=gl_account_description,sum(amount)&$group=gl_account_description"
    fetch(paymentURL)
    .then((data) => data.json())
    .then((data) => {
        data.splice(1, 1)
        return data;
    })
    .then((data) => {
        let formattedData = Object.entries(data).map(m => {
            return {
            y: parseInt(m[1].sum_amount), label: m[1].gl_account_description
            };
        })
        return formattedData;
    })
    .then((data) => {
        console.log(data)
        res.send({data: data})
    })
}
    


app.get('/agency', (req, res) => {spendingbyAgency(req, res)});
app.get('/payment', (req, res) => {spendingbyPayment(req, res)});

app.listen(port, () => console.log(`Listening on port ${port}`));