import * as fs from 'fs';
import * as http from 'http';

http.get('http://localhost:3000/shop', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        if (data.includes('cake-choclate')) {
            console.log('SUCCESS: "cake-choclate" slug found in shop HTML!');
        } else if (data.includes('onZmr8bUdEFndZR7oDT0')) {
            console.log('FAILURE: ID "onZmr8bUdEFndZR7oDT0" found instead of slug!');
        } else {
            console.log('Neither found.');
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
