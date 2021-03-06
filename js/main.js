// Main JavaScript File

// After page load
$(function() {
  // Data to visualize (gdp on y, )
    var data = [
      {'Country Name' : 'USA' , '2015' : '5'},
      {'Country Name' : 'Sriranka', '2015' : '7'},
      {'Country Name' : 'South Korea', '2015' : '2'},
      {'Country Name' : 'South Korea', '2015' : '8'}

    ];
    // Create an instance of your ParagraphChart, setting the color to blue
    var myChart = BubbleChart().variableName('Country Name').valueName('2015');

    // Select the container div, bind the data (datum) to it,
    // then call your instantiation of the ParagraphChart function
    var chartWrapper = d3.select('#my-div')
        .datum(data)
        .call(myChart);
    
});