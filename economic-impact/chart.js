var margin = {top: 20, right: 160, bottom: 35, left: 30};

var width = 1060 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("class", "chart")
  .attr("id", "economic-impact-chart")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Data pasted from data.json - find out is possible to print from the file instead
var data = [

  {
    "Year": "1997",
    "Drought": "1.515",
    "Flood": "17.884",
    "Wildfire": "8.309",
    "Storm": "7.535"
  },
  {
    "Year": "1998",
    "Drought": "0.513",
    "Flood": "43.929",
    "Wildfire": "2.616",
    "Storm": "30.659"
  },
  {
    "Year": "1999",
    "Drought": "9.347",
    "Flood": "15.612",
    "Wildfire": "0.491",
    "Storm": "43.337"
  },
  {
    "Year": "2000",
    "Drought": "3.655",
    "Flood": "25.804",
    "Wildfire": "2.559",
    "Storm": "12.96"
  },
  {
    "Year": "2001",
    "Drought": "0.036",
    "Flood": "4.753",
    "Wildfire": "0.09",
    "Storm": "14.545"
  },
  {
    "Year": "2002",
    "Drought": "7.871",
    "Flood": "26.826",
    "Wildfire": "0.362",
    "Storm": "14.75"
  },
  {
    "Year": "2003",
    "Drought": "0.691",
    "Flood": "20.866",
    "Wildfire": "6.095",
    "Storm": "21.363"
  },
  {
    "Year": "2004",
    "Drought": "2.991",
    "Flood": "10.383",
    "Wildfire": "0.003",
    "Storm": "84.228"
  },
  {
    "Year": "2005",
    "Drought": "0.462",
    "Flood": "17.94",
    "Wildfire": "3.85",
    "Storm": "184.793"
  },
  {
    "Year": "2006",
    "Drought": "3.136",
    "Flood": "7.806",
    "Wildfire": "0.839",
    "Storm": "17.703"
  },
  {
    "Year": "2007",
    "Drought": "0.706",
    "Flood": "24.586",
    "Wildfire": "4.597",
    "Storm": "29.559"
  },
  {
    "Year": "2008",
    "Drought": "0.234",
    "Flood": "19.619",
    "Wildfire": "2.532",
    "Storm": "60.728"
  },
  {
    "Year": "2009",
    "Drought": "3.629",
    "Flood": "8.004",
    "Wildfire": "1.515",
    "Storm": "26.135"
  },
  {
    "Year": "2010",
    "Drought": "3.885",
    "Flood": "49.138",
    "Wildfire": "2.07",
    "Storm": "28.124"
  },
  {
    "Year": "2011",
    "Drought": "8.142",
    "Flood": "70.759",
    "Wildfire": "3.137",
    "Storm": "50.872"
  },
  {
    "Year": "2012",
    "Drought": "25.481",
    "Flood": "25.795",
    "Wildfire": "1",
    "Storm": "85.737"
  },
  {
    "Year": "2013",
    "Drought": "1.587",
    "Flood": "54.811",
    "Wildfire": "1.074",
    "Storm": "52.602"
  },
  {
    "Year": "2014",
    "Drought": "11.007",
    "Flood": "36.458",
    "Wildfire": "0.259",
    "Storm": "40.22"
  },
  {
    "Year": "2015",
    "Drought": "19.317",
    "Flood": "21.086",
    "Wildfire": "3.44",
    "Storm": "33.065"
  },
  {
    "Year": "2016",
    "Drought": "3.554",
    "Flood": "56.879",
    "Wildfire": "6.287",
    "Storm": "45.111"
  },
  {
    "Year": "2017",
    "Drought": "4.922",
    "Flood": "20.339",
    "Wildfire": "16.922",
    "Storm": "285.599"
  }
];

var parse = d3.time.format("%Y").parse;


// Transpose the data into layers
var dataset = d3.layout.stack()(["Drought", "Flood", "Wildfire", "Storm"].map(function(disaster) {
  return data.map(function(d) {
    return {x: parse(d.Year), y: +d[disaster]};
  });
}));


// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, width-10], 0.02);

var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
  .range([height, 0]);

var colors = ["#012977", "#0089AB", "#00BFFF", "#87CEEB"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(d3.time.format("%Y"));

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);


// Create groups for each series, rects for each segment 
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand())
  .on("mouseover", function() { tooltip.style("display", null); })
  .on("mouseout", function() { tooltip.style("display", "none"); })
  .on("mousemove", function(d) {
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d.y);
  });


// Draw legend
var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d, i) {return colors.slice().reverse()[i];});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) { 
    switch (i) {
      case 0: return "Storm";
      case 1: return "Wildfire";
      case 2: return "Flood";
      case 3: return "Drought";
    }
  });


// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
    
tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
