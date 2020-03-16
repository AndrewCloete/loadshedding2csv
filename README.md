# loadshedding2csv
Get loadshedding events in Google Calendar compatible CSV

## Dependencies
Node, Typescript, Python with Pandas

## TL;DR
- Restore dependencies `npm install`
- Search for your suburb by modifying `index.ts` as needed
- Compile `tsc`
- Run `node dist/index.js`

Example usage: 
- `node dist/index.js 1 > /tmp/shed/stage1.csv`
- `node dist/index.js 2 > /tmp/shed/stage2.csv`
- `node dist/index.js 3 > /tmp/shed/stage3.csv`
- ... as many stages as you require
- Merge stages `python merge.py /tmp/shed combined`
- Import `/tmp/shed/combined.csv` to Google Calendar