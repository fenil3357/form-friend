const { google } = require("googleapis");
const sheetIdGenerator = require('../helper/sheetIdGenerator')

const service = google.sheets("v4");
const credentials = require("../../config/credentials.json");

// Configure auth client
const authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

// https://docs.google.com/spreadsheets/d/1Y8nsP2uocOK23-qrD_Cqf2pR3y7ipjBn5BWSZh9XfuU/edit#gid=0
// https://docs.google.com/forms/d/e/1FAIpQLSccbNxirijJQ5rmn2S58QNq9kPXspYpxXw9yV2Z4irf7RQtwA/viewform?usp=sf_link

const fetchSheetData = (sheetLink, callBack) => {
    const sheetId = sheetIdGenerator(sheetLink);

    try {
        async function solve() {
            // Authorize the client
            const token = await authClient.authorize();

            // Set the client credentials
            authClient.setCredentials(token);

            const res = await service.spreadsheets.values.get({
                auth: authClient,
                spreadsheetId: sheetId,
                range: "A:D",
            });

            const answers = [];

            // Set rows to equal the rows
            const rows = res.data.values;
            // Remove the headers
            rows.shift()

            // For each row
            for (const row of rows) {
                answers.push({ EnNumber: row[1] });
            }
            callBack(null, answers);
        }
        solve();
    } catch (error) {
        callBack(error);
    }
}

module.exports = fetchSheetData;