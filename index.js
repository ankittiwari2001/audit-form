const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const express = require('express');


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

  

// The file where you want to save the fetched data
const JSON_DATA_FILE = path.join(__dirname, 'data', 'WCAG-issue-Library.json');

// const JSON_DATA_FILE = 'WCAG-issue-Library.json';


async function loadDataAndSaveToJson(auth) {
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1JtOAkHbakeGKkN79RiaBStkGhD6jaMZh444LM28Kh10',
      range: 'A2:S', // Update the range as needed to cover all columns
    });

    const rows = res.data.values;

    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return;
    }

    // Create an array to store the data
    const data = [];

    // Iterate through the rows and convert them into objects
    rows.forEach((row) => {
      const rowData = {
        Barrier_Type: row[0],
        Barrier_Test: row[1],
        Barrier_Summary: row[4],
        Severity: row[6],
        WCAG_Guideline: row[7],
        Section: row[8],
        Platform: row[9],
        Users_Affected: row[10],
        Actual_Result: row[12],
        Expected_Result: row[13],
        Recommendation: row[14], 

        // Add other properties as needed
      };

      data.push(rowData);
    });

    // Save the fetched data to WCAG-issue-Library.json
    await fs.writeFile(JSON_DATA_FILE, JSON.stringify(data, null, 2));

    console.log('Data loaded and saved to', JSON_DATA_FILE);
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Authorize and load data
authorize()
  .then(loadDataAndSaveToJson)
  .catch(console.error);





const app = express();
const port = process.env.PORT || 4000; // You can change the port if needed

// Serve static files (CSS, images, etc.) from a "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve WCAG-issue-Library.json from the "data" directory
app.get('/data/WCAG-issue-Library.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'WCAG-issue-Library.json'));
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
