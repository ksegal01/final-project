This file describes the process for the EMDAT data set, which I used for my visualization titled "Worldwide Deaths by Disaster Type," as well as the bar chart titled "Which types of disasters have occured most frequently?"

Here is the full data source: Universite catholique de Louvain, School of Public Health. Center for Research on the Epidemiology of Disasters. International Disaster Database. https://www.emdat.be/


Dima downloaded the raw EMDAT data for me and sent it to me via Slack, as he was planning to use it but we then realized it was better suited for my page.

The raw data is stored on GitHub in the file titled "raw data EMDAT." The data used for the vega visualization can be found in the file titled disasters.csv.

Here is the process I used to modify the data in Excel:
1) I created a pivot table with the year variable in rows, the disaster type in columns, and the sum of total deaths as the value. I then copy and pasted the pivot table as values only into a separate tab so that I could drag and drop disaster type into a new column. I now had three columns: the first showing year of disaster, the second showing type of disaster (e.g., storm), and the last column showing number of deaths. From there, I saved as a CSV file and combined with my visualization. I modified sthe original visualization by using a different data source and changing the shape of the bubbles on the chart from circles to squares. 

2) To create the bar chart showing disaster frequency, I used a similar pivot table but removed the year filter and put disaster type in the rows. I was then able to make a simple Excel chart that I feel tells the story well enough without additional visualization.