// Set the margins
var margin = {top: 60, right: 100, bottom: 20, left: 80},
  width = 850 - margin.left - margin.right,
  height = 370 - margin.top - margin.bottom;

// Parse the year variable
var parseYear = d3.timeParse("%b");
var formatYear = d3.timeFormat("%b");

var formatYear = d3.timeFormat("%Y");
var parseYear = d3.timeParse("%Y");


// Set the ranges
var x = d3.scaleTime().domain([parseYear("1851"), parseYear("2017")]).range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


// Define the line
var valueLine = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(+d.Occurance); })

// Create the svg canvas in the "graph" div
var svg = d3.select("#graph")
        .append("svg")
        .style("width", width + margin.left + margin.right + "px")
        .style("height", height + margin.top + margin.bottom + "px")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "svg");

// Import the CSV data
d3.csv("test.csv", function(error, data) {
  if (error) throw error;
  
   // Format the data
  data.forEach(function(d) {
      d.Year = parseYear(d.Year);
      d.Hurricane = +d.Hurricane;
      d.Drought = +d.Drought;
      d.Flood = +d.Flood;
      d.Wildfire = +d.Wildfire;

  var nest = d3.nest()
      .key(function(d){
        return d.Occurance;
      })
      .key(function(d){
        return d.Year;
      })
      .entries(data)

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d.Occurance; })]);
  
  // Set up the x axis
  var xaxis = svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .attr("class", "x axis")
       .call(d3.axisBottom(x)
          .ticks(d3.timeYear)
          .tickSize(0, 0)
          .tickFormat(d3.timeFormat("%B"))
          .tickSizeInner(0)
          .tickPadding(10));

  // Add the Y Axis
   var yaxis = svg.append("g")
       .attr("class", "y axis")
       .call(d3.axisLeft(y)
          .ticks(5)
          .tickSizeInner(0)
          .tickPadding(6)
          .tickSize(0, 0));
  
  // Add a label to the y axis
  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Occurance")
        .attr("class", "y axis label");

 // Add a label to the X axis
  svg.append("text")
        .attr("y", 0 - 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Year")
        .attr("class", "x axis label");


  // Create a dropdown
    var EventMenu = d3.select("#EventDropdown")

    EventMenu
        .append("select")
        .selectAll("option")
        .data(nest)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d.key;
        })
        .text(function(d){
            return d.key;
        })


 
    // Function to create the initial graph
    var initialGraph = function(event){

        // Filter the data to include only Events of interest
        var selectEvent = nest.filter(function(d){
                return d.key == event;
              })

        var selectEventGroups = svg.selectAll(".eventGroups")
            .data(selectEvent, function(d){
              return d ? d.key : this.key;
            })
            .enter()
            .append("g")
            .attr("class", "eventGroups")

        var initialPath = selectEventGroups.selectAll(".line")
            .data(function(d) { return d.values; })
            .enter()
            .append("path")

        initialPath
            .attr("d", function(d){
                return valueLine(d.values)
            })
            .attr("class", "line")

    }

    // Create initial graph
    initialGraph("Hurricane")


    // Update the data
    var updateGraph = function(event){

        // Filter the data to include only event of interest
        var selectEvent = nest.filter(function(d){
                return d.key == event;
              })

        // Select all of the grouped elements and update the data
        var selectEventGroups = svg.selectAll(".eventGroups")
            .data(selectEvent)

            // Select all the lines and transition to new positions
            selectEventGroups.selectAll("path.line")
               .data(function(d){
                  return (d.values);
                })
                .transition()
                  .duration(1000)
                  .attr("d", function(d){
                    return valueLine(d.values)
                  })


    }


    // Run update function when dropdown selection changes
    eventMenu.on('change', function(){

        // Find which event was selected from the dropdown
        var selectedEvent = d3.select(this)
            .select("select")
            .property("value")

        // Run update function with the selected event
        updateGraph(selectedEvent)


    });


  
})