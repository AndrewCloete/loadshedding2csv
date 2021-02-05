#!/usr/bin/env python3

import sys
import pandas as pd
import glob

if len(sys.argv) != 3:
    print("Supply the folder containing the csv's and the output name e.g.")
    print("python merge.py /tmp/loadshedding combined")
    sys.exit()


FILE_DIR = sys.argv[1]
OUTPUT = sys.argv[2]
all_files = glob.glob(FILE_DIR + "/*.csv")
all_files = sorted(all_files)

# Read all CSVs in dir as dataframes and concat
print(all_files)
li = []
for filename in all_files:
    print(filename)
    sub_df = pd.read_csv(filename,
                     index_col=None, 
                     header=0)
    li.append(sub_df)
    
df = pd.concat(li, axis=0, ignore_index=True)


#%% Merge the overlapping stages and keep the minimim
mins = df.groupby(['StartDate', 'StartTime'])['Subject'].transform(min)
df_min = df.loc[df['Subject'] == mins]
df_min_sorted = df_min.sort_values(by=['StartDate', 'StartTime'])

#%% Sort by date for convenience and write CSV
df_min_sorted.to_csv(FILE_DIR+"/" + OUTPUT + ".csv", index = False)