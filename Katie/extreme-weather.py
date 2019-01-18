#Read contents of extreme-weather.csv
import csv
from pprint import pprint

#Read extreme-weather.csv into a variable called extreme.
with open('extreme-weather.csv', 'r') as f :
	reader = csv.DictReader(f)
	extreme = [dict(extreme) for extreme in reader]

# Loop through vegetables and filter down to only green vegtables using a whitelist.
deaths_disaster = []
deaths = ['Fatalities']
for fatalities in extreme:
	if fatalities['Fatalities'] in deaths:
			deaths_disaster.append(fatalities)


# Print to the terminal
pprint(deaths_disaster)