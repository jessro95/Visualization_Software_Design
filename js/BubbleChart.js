//Create a function BubbleChart
var BubbleChart = function() {
	//variables within function scope for tracking maximum bubble size, name, value, colorscale
	var variableName, valueName;
	var colorScale = ['#2D96E1', '#597FAD','#856979', '#B15345', '#DE3D12']
	var size = 800;//default at 800
	//chart function being returned 
	var chart = function(selection) {
		selection.each(function(data) {


			//select all of the g elements inside 
			var bubble = d3.layout.pack()
							.size([size, size])
							.padding([5])
    						.value(function(d) { return d.val;});
			
			//select 'this' as the element to render the chart
			var vis = d3.select(this)
						.append('svg')
						.attr('height', size)
						.attr('width', size)
						.attr('class', 'bubble')
						.append('g')
						.attr('transform', 'translate(2,2)');

			var newData = bubble.nodes(dataToNode(data))
								.filter(function(d) {return !d.children;});

			//Enter new g elements
			var circle = vis.selectAll('circle')
							.data(newData);

			//Draw all the circles newly with new data
			circle.enter().append('circle')
				.attr('transform', function(d) {return 'translate (' + d.x + ',' + d.y+ ')'; })
				.attr('r', function(d) {return d.r;})
				.attr('fill', '#2D96E1');

			circle.append('text')
					.attr('x', function(d){return d.x;})
					.attr('y', function(d) {return d.y})
					.attr('text-anchor', 'middle')
					.text(function(d){return d.varName})
					.style('fill' , 'white')
					.style('font-size', 12);


			 
		})
	}

	//Change dataset to Nodes 
	var dataToNode = function(data) {
		var nodeSet = [];
		
		data.forEach(function(d) {
			nodeSet.push({varName: d[variableName], val: d[valueName]})
		})

		return {children: nodeSet};
	}
	//Method to update the size for whole bubble
	chart.size = function(value) {
		if(!arguments.length) return size; // return the current size if not provided
		size = value; //set size to new value
		return this; //return the new object to allow method chaining

	};
	//a method to update the color
	chart.colorScale = function(value) {
		if(!arguments.length) return colorScale; // return the current color if not provided
		colorScale = value; //set color to new value
		return this; //return the new object to allow method chaining
	};
	//Method to select/change the name of the variable that will be labeled on the circle.
	chart.variableName = function(value) {
		if(!arguments.length) return variableName; // return the current variableName if not provided
		variableName = value; //set variableName to new value
		return this; //return the new object to allow method chaining
	};

	//select/change the name of value that will change the size of each bubble. 
	chart.valueName = function(value) {
		if(!arguments.length) return valueName; // return the current valueName if not provided
		valueName = value; //set valueName to new value
		return this; //return the new object to allow method chaining
	};


	//Return the chart object
	return chart;


}