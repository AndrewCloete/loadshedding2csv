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
```sh
mkdir /tmp/shed

for stage in 1 2 3 4 # ... as many stages as you require
do
    node dist/index.js ${stage} > /tmp/shed/stage${stage}.csv
done

# Combine the results into a single CSV
python merge.py /tmp/shed combined
```

Finally create a new calendar in Google Calendar, then import the CSV to it `/tmp/shed/combined.csv`.
