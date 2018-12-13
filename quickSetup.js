//Jamie Jarvis 2016


function run () {
    //Data
    var myData = [100, 125, 320, 440, 500, 250, 400, 1000, 800, 700, 610, 600, 300, 1050];
    //Margins
    var margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50
    }
    //Canvas Size
    var width = 600;
    var height = 400;
    var animateTime = 700;
    var animateDelay = 30;
    
    //Chart Size
    var innerHeight = height - margin.bottom;
    var innerWidth = width - margin.left;
    
    //Plot Scaling
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(myData)])
        .range([0, innerHeight - margin.top]); 
    var xScale = d3.scaleBand()
        .domain(d3.range(0, myData.length))
        .range([0, innerWidth]);
    
    //Axis Scaling
    var vScale = d3.scaleLinear()
        .domain([0, d3.max(myData)])
        .range([innerHeight, margin.top]);
    var hScale = d3.scaleBand()
        .domain(d3.range(0, myData.length))
        .range([0, innerWidth]);
    
    //Axis
    var vAxis = d3.axisLeft(vScale);
    var hAxis = d3.axisBottom(hScale);
    
    //Tooltip Creation
    var toolDiv = d3.select("body").append("div")	
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "lightblue")
        .style("font", "12px sans-serif")
        .style("padding","5px 15px")
        .style("border-radius", "5px")
        .style("pointer-events", "none")
        .style("opacity", 0);
    
    //Build SVG canvas
    var canvas = d3.select(".myChart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "#f4f4f4")
        .append("g")
        .attr("class", "vAxis")
        .attr("transform", "translate(40,0)")
        .call(vAxis)
        .append("g")
        .attr("class", "hAxis")
        .attr("transform", "translate(0, " + innerHeight + ")" )
        .call(hAxis)
    
    //Populate graph
    canvas.selectAll("rect")
        .data(myData)
        .enter()
        .append("rect")
        .style("fill", "orange")
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("x", function(d, i) {return xScale(i);})
        .attr("y", innerHeight)
    
  .on("mouseover", function(d) {
      toolDiv.transition()
        .duration(200)
        .style("opacity", 1);
      
      toolDiv.html(d)
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY) + "px");
    
      //bar hilight on
      d3.select(this)
        .style("opacity", 0.5);
  })
  
  .on("mouseout", function(d) {
      toolDiv.transition()
        .duration(500)
        .style("opacity", 0);
     
      //bar hilight off
      d3.select(this)
        .style("opacity", 1);
  })
    
 canvas.selectAll("rect").transition()
    .attr("height", function(d) {return yScale(d);})
    .attr("y", function(d) {return 0 - yScale(d);})
    .duration(animateTime)
    .delay(function(d, i) {return i * animateDelay})
    .ease("elastic")
    
        
}