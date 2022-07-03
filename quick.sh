#!/bin/bash

tsc
rm -rf /tmp/shed
mkdir /tmp/shed

for stage in 1 2 3 4 # ... as many stages as you require
do
    node dist/index.js ${stage} > /tmp/shed/stage${stage}.csv
done

# Combine the results into a single CSV
python merge.py /tmp/shed combined