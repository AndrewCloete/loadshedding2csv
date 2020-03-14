# loadshedding2csv
Get loadshedding events in Google Calendar compatible CSV

## Dependencies
Node, Typescript

## Getting started
- Restore dependencies `npm install`
- Search for your suburb by modifying `index.ts` as needed
- Compile `tsc`
- Run `node dist/index.js`
- Example usage `node dist/index.js 2 > /tmp/stage2.csv`
- Import `stage2.csv` to Google Calendar