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
      .attr('class', 'tooltip19')
