var svg = d3.select("#sleep_18022020")
           .append('svg')
           .attrs({ width: 750, height: 50 });


var pos18 = $('#sleep_18022020').offset();
// https://www.a11ywithlindsey.com/blog/accessibility-d3-donut-charts

var w = 20;
var border=1;
var bordercolor='black';

var tTime18 = "4:00 am - 9:30 am; dt=5.30h";
svg.append('rect')
  .attrs({ x: w*6, y: 0, width: w*6 + w*24, height: 20, fill: 'grey' })
  .style("stroke", bordercolor)
  .style("stroke-width", border);
svg.append('rect')
  .attrs({ x: 0, y: 0, width: w*6, height: 20, fill: 'white' })
  .style("stroke", bordercolor)
  .style("stroke-width", border);
svg.append('rect')
   .attrs({ x: w*6 + 4*w, y: 0,
            width: 5.5 *w, height: 20,
            fill: 'green'})
    //'aria-labelledby' :'unique-id-123'
   .style("stroke", bordercolor)
   .style("stroke-width", border)
   .on('mousemove', () => {
        const {clientX, clientY} = d3.event
        d3.select('.tooltip18')
          .attr('transform', `translate(${clientX - pos18.left+15} ${clientY - pos18.top + 15})`)
      })
      .on('mouseenter', d => {
        d3.select('.tooltip18').append('text')
          .text(tTime18)
      })
      .on('mouseleave', () => d3.select('.tooltip18 text').remove());
      svg.append("text")
           .attrs({x: w*6 - 2.5 *w, y: 40})
           .attr("dy", "0em")
           .text(tTime18);

var tooltipGroup18 = svg
       .append('g')
       .attr('class', 'tooltip18')


svg = d3.select("#sleep_19022020")
           .append('svg')
           .attrs({ width: 750, height: 50 });


pos19 = $('#sleep_19022020').offset();
// https://www.a11ywithlindsey.com/blog/accessibility-d3-donut-charts


var tTime19 = "9:30 pm - 2:30 am; dt=5h";
svg.append('rect')
  .attrs({ x: w*6, y: 0, width: w*6 + w*24, height: 20, fill: 'grey' })
  .style("stroke", bordercolor)
  .style("stroke-width", border);
svg.append('rect')
  .attrs({ x: 0, y: 0, width: w*6, height: 20, fill: 'white' })
  .style("stroke", bordercolor)
  .style("stroke-width", border);
svg.append('rect')
   .attrs({ x: w*6 - 2.5 *w, y: 0,
            width: 5 *w, height: 20,
            fill: 'green'})
    //'aria-labelledby' :'unique-id-123'
   .style("stroke", bordercolor)
   .style("stroke-width", border)
   .on('mousemove', () => {
        const {clientX, clientY} = d3.event
        d3.select('.tooltip19')
          .attr('transform', `translate(${clientX - pos19.left+15} ${clientY - pos19.top + 15})`)
      })
      .on('mouseenter', d => {
        d3.select('.tooltip19').append('text')
          .text(tTime19)
      })
      .on('mouseleave', () => d3.select('.tooltip19 text').remove());

// 12:40 - 3:20
svg.append('rect')
   .attrs({ x: 6*w + 12.6*w, y: 0,
            width: 2.7 *w, height: 20,
            fill: 'green'})
    //'aria-labelledby' :'unique-id-123'
   .style("stroke", bordercolor)
   .style("stroke-width", border)

  svg.append("text")
           .attrs({x: w*6 - 2.5 *w, y: 40})
           .attr("dy", "0em")
           .text(tTime19);

var tooltipGroup19 = svg
      .append('g')
      .attr('class', 'tooltip19');



// -----

svg = d3.select("#sleep_20022020")
           .append('svg')
           .attrs({ width: 750, height: 50 });


pos19 = $('#sleep_20022020').offset();
// https://www.a11ywithlindsey.com/blog/accessibility-d3-donut-charts


var tTime20 = "-";
svg.append('rect')
  .attrs({ x: w*6, y: 0, width: w*6 + w*24, height: 20, fill: 'grey' })
  .style("stroke", bordercolor)
  .style("stroke-width", border);
svg.append('rect')
  .attrs({ x: 0, y: 0, width: w*6, height: 20, fill: 'white' })
  .style("stroke", bordercolor)
  .style("stroke-width", border);
svg.append('rect')
   .attrs({ x: w*6 + 2 *w, y: 0,
            width: 1 *w, height: 20,
            fill: 'yellow'})
    //'aria-labelledby' :'unique-id-123'
   .style("stroke", bordercolor)
   .style("stroke-width", border)
   .on('mousemove', () => {
        const {clientX, clientY} = d3.event
        d3.select('.tooltip20')
          .attr('transform', `translate(${clientX - pos19.left+15} ${clientY - pos19.top + 15})`)
      })
      .on('mouseenter', d => {
        d3.select('.tooltip20').append('text')
          .text(tTime20)
      })
      .on('mouseleave', () => d3.select('.tooltip20 text').remove());

// 12:40 - 3:20
svg.append('rect')
   .attrs({ x: 6*w + 5.5*w, y: 0,
            width: 6 *w, height: 20,
            fill: 'green'})
    //'aria-labelledby' :'unique-id-123'
   .style("stroke", bordercolor)
   .style("stroke-width", border)

  svg.append("text")
           .attrs({x: w*6 - 2.5 *w, y: 40})
           .attr("dy", "0em")
           .text(tTime20);

var tooltipGroup20 = svg
      .append('g')
      .attr('class', 'tooltip20');




/// ---
svg = d3.select("#sleep_24022020")
           .append('svg')
           .attrs({ width: 750, height: 50 });


var tTime24 = "3:10 am - 9:30 am; dt=6h";
svg.append('rect')
  .attrs({ x: w*6, y: 0, width: w*6 + w*24, height: 20, fill: 'grey' })
  .style("stroke", bordercolor)
  .style("stroke-width", border);
svg.append('rect')
  .attrs({ x: 0, y: 0, width: w*6, height: 20, fill: 'white' })
  .style("stroke", bordercolor)
  .style("stroke-width", border);
svg.append('rect')
   .attrs({ x: w*6 + 3.1 *w, y: 0,
            width: 6 *w, height: 20,
            fill: 'green'})
    //'aria-labelledby' :'unique-id-123'
   .style("stroke", bordercolor)
   .style("stroke-width", border)

// 12:40 - 3:20

svg.append("text")
           .attrs({x: w*6 + 3.1 *w, y: 40})
           .attr("dy", "0em")
           .text(tTime24);

/// ---
svg = d3.select("#sleep_23022020")
          .append('svg')
          .attrs({ width: 750, height: 50 });


var tTime23 = "3:30 am - 13:30 pm; dt=10h";
svg.append('rect')
 .attrs({ x: w*6, y: 0, width: w*6 + w*24, height: 20, fill: 'grey' })
 .style("stroke", bordercolor)
 .style("stroke-width", border);
svg.append('rect')
 .attrs({ x: 0, y: 0, width: w*6, height: 20, fill: 'white' })
 .style("stroke", bordercolor)
 .style("stroke-width", border);
svg.append('rect')
  .attrs({ x: w*6 + 3.50 *w, y: 0,
           width: 10 *w, height: 20,
           fill: 'green'})
   //'aria-labelledby' :'unique-id-123'
  .style("stroke", bordercolor)
  .style("stroke-width", border)

// 12:40 - 3:20

svg.append("text")
          .attrs({x: w*6 + 3.1 *w, y: 40})
          .attr("dy", "0em")
          .text(tTime23);

/// ---
svg = d3.select("#sleep_22022020")
          .append('svg')
          .attrs({ width: 750, height: 50 });


var tTime22 = "5:30 am - 14:30 pm; dt=9h";
svg.append('rect')
 .attrs({ x: w*6, y: 0, width: w*6 + w*24, height: 20, fill: 'grey' })
 .style("stroke", bordercolor)
 .style("stroke-width", border);
svg.append('rect')
 .attrs({ x: 0, y: 0, width: w*6, height: 20, fill: 'white' })
 .style("stroke", bordercolor)
 .style("stroke-width", border);
svg.append('rect')
  .attrs({ x: w*6 + 5.50 *w, y: 0,
           width: 9 *w, height: 20,
           fill: 'green'})
   //'aria-labelledby' :'unique-id-123'
  .style("stroke", bordercolor)
  .style("stroke-width", border)

// 12:40 - 3:20

svg.append("text")
          .attrs({x: w*6 + 3.1 *w, y: 40})
          .attr("dy", "0em")
          .text(tTime22);

  /// ---
  svg = d3.select("#sleep_21022020")
            .append('svg')
            .attrs({ width: 750, height: 50 });


  var tTime21 = "3:00 am - 9:00 pm; dt=6h";
  svg.append('rect')
   .attrs({ x: w*6, y: 0, width: w*6 + w*24, height: 20, fill: 'grey' })
   .style("stroke", bordercolor)
   .style("stroke-width", border);
  svg.append('rect')
   .attrs({ x: 0, y: 0, width: w*6, height: 20, fill: 'white' })
   .style("stroke", bordercolor)
   .style("stroke-width", border);
  svg.append('rect')
    .attrs({ x: w*6 + 3.0 *w, y: 0,
             width: 6 *w, height: 20,
             fill: 'green'})
     //'aria-labelledby' :'unique-id-123'
    .style("stroke", bordercolor)
    .style("stroke-width", border)

  // 12:40 - 3:20

  svg.append("text")
            .attrs({x: w*6 + 3.1 *w, y: 40})
            .attr("dy", "0em")
            .text(tTime21);
