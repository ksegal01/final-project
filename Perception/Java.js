var data = [{"country":"USA","veryconcerned":42},{"country":"Israel","veryconcerned":14},{"country":"China","veryconcerned":19},{"country":"Japan","veryconcerned":42},{"country":"Canada","veryconcerned":45},{"country":"France","veryconcerned":48},{"country":"Senegal","veryconcerned":51}];

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// set the ranges
var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

var x = d3.scaleLinear()
          .range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  // format the data
  data.forEach(function(d) {
    d.veryconcerned = +d.veryconcerned;
  });

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.veryconcerned; })])
  y.domain(data.map(function(d) { return d.country; }));
  //y.domain([0, d3.max(data, function(d) { return d.; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      //.attr("x", function(d) { return x(d.veryconcerned); })
      .attr("width", function(d) {return x(d.veryconcerned); } )
      .attr("y", function(d) { return y(d.country); })
      .attr("height", y.bandwidth());
 // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));