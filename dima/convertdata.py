# convert csv into json


import csv
import json

# read data.csv
with open('data.csv', 'r') as f:
    reader = csv.DictReader(f)
    disaster_years = [dict(row) for row in reader] # Convert Ordered Dict to regular dict (python 3.6 or higher)

# write data.json

import json

with open('data.json', 'w') as f:
    json.dump(disaster_years, f, indent=2)