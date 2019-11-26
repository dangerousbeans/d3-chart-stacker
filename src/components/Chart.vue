<template>
  <div id="chart">
    <div id="footer">
      <div class="title">Power</div>
      <div class="legend"></div>
      <div class="times"></div>
      <div class="hint"></div>
    </div>
  </div>
</template>

<script>

import * as d3 from "d3";

// Feel free to change or delete any of the code you see in this editor!
    const margin = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    

export default {
  name: '',
  props: {
  },
  mounted()
  {
    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top+margin.bottom)
    	.style("background-color", "rgba(0,0,0,0.1)");

      //Container for the gradients
      var defs = svg.append("defs");

      //Filter for the outside glow
      var filter = defs.append("filter")
          .attr("id","glow");
      filter.append("feGaussianBlur")
          .attr("stdDeviation","10")
          .attr("result","coloredBlur");
      // var feMerge = filter.append("feMerge");  
      // feMerge.append("feMergeNode")
      //     .attr("in","coloredBlur");
      // feMerge.append("feMergeNode")
      //     .attr("in","SourceGraphic");

      const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
      
      const parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]).domain([0, 100]);
      const c = d3.scaleOrdinal(d3.schemePaired);
      
      const area = d3.area()
        .x(d=>x(d.data.date))
        .y0(d=>y(d[0]))
        .y1(d=>y(d[1]))

      const data = d3.csv("https://raw.githubusercontent.com/dangerousbeans/d3-chart-stacker/master/public/data.csv").then(data=>{
        data.forEach(d=>{
          d.date = parseDate(d.times);
        })
        // console.log(data.columns)

        const keys = (data.columns.slice(1));
        c.domain(keys);
        x.domain(d3.extent(data, d=>d.date));
        
        const s = d3.stack();
        s.keys(keys);
        s.order(d3.stackOrderNone);
        s.offset(d3.stackOffsetNone);
        
        
        g.selectAll("path")
          .data(s(data))
          .enter()
            .append("path")
            .attr("fill", d=>c(d.key))
            .attr("d", d=>area(d));
        console.log(s(data));
        // Legend logic goes here.
        
        const legendG = g.append("g")
          .attr("transform", `translate(${width-200}, ${height - keys.length*20})`);
        legendG.append("rect")
          .attr("transform", `translate(-10, -10)`)
          .attr("width", 210)
          .attr("height", keys.length*20+10)
          .attr("fill", "white")
          .style("opacity", 0.5)
          .attr("filter", "url('#glow')")
        const legends = legendG.selectAll("g").attr("class", "legend")
          .data(keys)
          .enter()
            .append("g")
            .attr("transform", (d, i)=>`translate(0, ${i*20})`)
        legends.append("rect")
          .attr("width", 10)
          .attr("height", 10)
          .attr("fill", d=>c(d));
        legends.append("text")
          .text(d=>d)
          .attr("x", 20)
          .attr("y", 10)
          .style("font-family", "Arial")
          .style("font-size", "12px")
      })
  }
}
</script>

<style scoped>
#footer .times{font-size: 15px;}
#footer .legend{font-size: 30px; font-style: bold;}
svg {
  font-size: 10px;
}

rect {
  fill: #eeeeee;
}

path.area {
  fill: #000;
  fill-opacity: .75;
}

.axis line, .grid line {
  stroke-width: .5px;
  shape-rendering: crispEdges;
}

.grid line {
  stroke: #fff;
}

.grid line.minor {
  stroke-opacity: .5;
}

.grid text {
  display: none;
}

.axis line {
  stroke: #000;
}

.grid path, .axis path {
  display: none;
}
</style>
