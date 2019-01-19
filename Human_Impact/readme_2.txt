This file describes the process used to modify data from the European Environmental Agency, which was used in my map visualization.

The full source of this data set is: European Environmental Agency. Impacts of extreme weather and climate related events in the EEA member countries. https://www.eea.europa.eu/data-and-maps/daviz/impacts-of-extreme-weather-and#tab-chart_2 

From the main page, I was able to download the raw data both as a JSON and CSV file. You can find the raw data on GitHub in the file titled "EEA Raw Data.csv." You can find some of my Python scratch work in the file called "extreme-weather.py"

Worth mentioning: I played around quite a bit in Python with reading and writing the files in JSON and CSV and transitioning between them, just to get a feel of those skills. However, I ultimately just used the data straight from the site and modified in Excel because the modifications were so simple.

In Excel, all I did was delete every column except "Country" and "Fatalities." Then I just had a two column csv-ready format showing the number of fatalities by country for the time period indicated by EEA. The data as read by the chart can be found in the file titled "extreme-weather.csv."