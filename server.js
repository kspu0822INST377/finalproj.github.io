/* server requirements*/
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.static('./'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*sqlite*/
const sqlite3 = require('sqlite3').verbose();
const open = require('sqlite').open;

const dbSettings = {
  filename: "./server_files/database_final.db",
  driver: sqlite3.Database,
};
const dbSettings2 = {
  filename: "./server_files/questions.db",
  driver: sqlite3.Database,
};

/* defined port */
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('public'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}


/* Begin handling of data */
const apiURL = "https://data.princegeorgescountymd.gov/resource/p32t-azw8.json?"

/* Spending by Agency function (old)*/
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

/* Spending by Payment (old)*/
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


/* writeForm function to send suggestion form info to database_final database */
async function writeForm(username, email, suggestion, dbSettings) {
    console.log('writing form data to database');
    const db = await open(dbSettings)
    await db.exec('CREATE TABLE IF NOT EXISTS form_data (name varchar(255), email varchar(320), suggestion text)');
    await db.exec(`INSERT INTO form_data VALUES ("${username}", "${email}", "${suggestion}")`);
    const result = await db.all('SELECT * FROM form_data', (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
      });
    });
    console.log("form_data table", result);
    return result;
  }

/* function to send question form info to questions.db database */
async function writeQuestion(username, email, question, dbSettings2) {
  console.log('writing question form data to database');
  const db = await open(dbSettings2)
  await db.exec('CREATE TABLE IF NOT EXISTS questions (name varchar(255), email varchar(320), suggestion text)');
  await db.exec(`INSERT INTO questions VALUES ("${username}", "${email}", "${question}")`);
  const result = await db.all('SELECT * FROM questions', (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
  console.log("questions table", result);
  return result;
}

/* function to get data for ageny graph */
function byAgency(req, res) {
  const agencyURL = apiURL+"$select=agency,sum(amount)&$group=agency";
  fetch(agencyURL)
  .then((data) => data.json())
  .then((data) => {
    data.shift()
    return data;
  })
  .then((data) => {
    let labels = [];
    let amounts = [];
    for (let i=0; i<data.length; i++) {
      labels.push(data[i].agency)
      amounts.push(parseInt(data[i].sum_amount))
    }
    console.log(labels, amounts)
    res.send({labels: labels, amounts: amounts}) /*Send formatted data for chart.js*/
  })
}

/* function to get data for payment graph */
function byPayment(req, res) {
  const paymentURL = apiURL+"$select=gl_account_description,sum(amount)&$group=gl_account_description";
  fetch(paymentURL)
  .then((data) => data.json())
  .then((data) => {
    data.splice(1, 1)
    return data;
  })
  .then((data) => {
    let labels = [];
    let amounts = [];
    for (let i=0; i<data.length; i++) {
      labels.push(data[i].gl_account_description)
      amounts.push(data[i].sum_amount)
    }
    console.log(labels, amounts)
    res.send({labels: labels, amounts: amounts}) /*Send formatted data for chart.js*/
  })
}



app.get('/public/agency', (req, res) => {byAgency(req, res)});
app.get('/public/payment', (req, res) => {byPayment(req, res)});
app.route("/public/about").post((req, res) => {
    console.log("/public/about post request", req.body);
    writeForm(req.body.name, req.body.email, req.body.improvement, dbSettings);
    res.json({successMsg: 'Thank you! Your suggestion was submitted.'});
})
app.route("/public/doc").put((req, res) => {
  console.log("/public/doc put request", req.body);
  writeQuestion(req.body.name, req.body.email, req.body.question, dbSettings2);
  res.json({successMsg: 'Thank you! Your question was submitted.'});
})

app.listen(port, () => console.log(`Listening on port ${port}`));
