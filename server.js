/* server requirements*/
const express = require('express');
const fetch = require('node-fetch');
const app = express();

/*sqlite*/
const sqlite3 = require('sqlite3').verbose();
const open = require('sqlite').open;

const dbSettings = {
  filename: "./database.db",
  driver: sqlite3.Database,
};

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

/* writeForm function */
async function writeForm(user_name, email, suggestion, dbSettings) {
    console.log('writing form data to database');
    const db = await open(dbSettings)
    await db.exec('CREATE TABLE IF NOT EXISTS form_data (name varchar(255), email varchar(255), suggestion text)');
    await db.exec(`INSERT INTO form_data VALUES ("${user_name}", ${email}, "${suggestion}")`);
    const result = await db.all('SELECT * FROM form_data', (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
      });
    });
    return result;
  }
//export default writeForm;



app.get('/agency', (req, res) => {spendingbyAgency(req, res)});
app.get('/payment', (req, res) => {spendingbyPayment(req, res)});
app.get('/about', (req, res) => {
    (async () => {
      const db = await open(dbSettings);
      const result = await db.all("SELECT * FROM form_data");
      console.log("Expected result", result);
      res.json(result);
    })();
  })
  .put('/about', (req, res) => {
    console.log("/about post request", req.body);
    writeForm(req.body.name, req.body.email, req.body.suggestion, dbSettings)
    .then((table) => {
      console.log(table)
      res.json({successMsg: 'Thank you! Your suggestion was submitted.'});
    })
    .catch((err) => {
      console.log(err);
    });
  })


app.listen(port, () => console.log(`Listening on port ${port}`));