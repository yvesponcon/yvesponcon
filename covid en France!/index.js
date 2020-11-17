import {map,max, select, json,scalePow, geoPath,csv, scaleThreshold } from 'd3';
const svg = select('svg');
const colordomain = [0,200000]
const exposantcolor= 0.5
const colorrange=['#ffffff','#850309']

var projection = d3.geoMercator()
    .center([3, 47])                // GPS of location to zoom on
    .scale(1800)                       // This is like the zoom
    .translate([ 960/2, 450/2 ])
const pathGenerator = geoPath().projection(projection);

svg.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'sphere'}))
    
var data = map();
//var colorScale = scaleThreshold()
//  .domain([0, 50000])
//  .range(d3.schemeReds[3]);

 var color = d3.scalePow()
 				.exponent(exposantcolor)
				.domain( colordomain)
        .range(colorrange);



Promise.all([
  csv( "covidtot.csv", function(d) { data.set( d.dep, +d.hosp); }),
  json("json.json")
]).then(([csvdata,topo]) => {
 
 
  
  const hosp = data
    svg.selectAll('path').data(topo.features)
      .enter().append('path')
        .attr('class', 'dep')
        .attr('d', pathGenerator)
 			   
     .attr("fill", function (d) {
        d.total = data.get(d.properties.code) || 0;
        return (color(d.total))}) 
   //   return console.log(d.total)})
     .append('title')
  				.text(function (d) {
         d.total = data.get(d.properties.code);
        return  d.properties.nom + " : " + d.total });
    ;

})
  