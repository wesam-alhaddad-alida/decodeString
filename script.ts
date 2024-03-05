import * as fs from 'fs';
// import * as csvParse from 'csv-parse';
import { parse } from 'csv-parse';
// @ts-ignore
// import * as atob from 'atob';

// Function to decode base64 encoded strings
function decodeBase64(encodedString: string): string {
    var atob = require('atob');
    return atob(encodedString);
}

// Function to process CSV file
function processCSV(inputFilePath: string, outputFilePath: string) {
    const inputStream = fs.createReadStream(inputFilePath);
    const outputStream = fs.createWriteStream(outputFilePath);
    const parser = parse({ delimiter: ',' });

    inputStream.pipe(parser).on('data', (row: string[]) => {
        // Decode the base64 encoded strings in the 3rd and 4th columns
        const decodedColumn3 = decodeBase64(row[2]);
        const decodedColumn4 = decodeBase64(row[3]);

        // Write the decoded row to the output file
        outputStream.write(`${row[0]},${row[1]},${decodedColumn3},${decodedColumn4}\n`);
    });

    parser.on('end', () => {
        console.log('CSV processing finished.');
        outputStream.end();
    });
}

// Example usage:
const inputFilePath = 'input.csv'; // Specify the input CSV file path
const outputFilePath = 'output.csv'; // Specify the output CSV file path
processCSV(inputFilePath, outputFilePath);