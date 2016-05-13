//Create a function BubbleChart
var BubbleChart = function() {
	//variables within function scope for tracking maximum bubble size, name, value, colorscale
	var variableName, valueName;
	var colorScale = ['#DE3D12', '#B15345','#856979','#597FAD', '#2D96E1']
	var size = 800;//default at 800
	//chart function being returned 
	var chart = function(selection) {
		selection.each(function(data) {

			var color = function(dataSet, val) {
				var min = d3.min(dataSet, function(d){ return d.val});
				var max = d3.max(dataSet, function(d){return d.val});
				var increment = (max - min) / colorScale.length;
				for(var i = 0; i < colorScale.length; i++) {
					if(val >= Number(max) - ((i+1) * increment)) return colorScale[i];
				}
				return null;
			}
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
						.attr('class', 'bubble');

			var newData = bubble.nodes(dataToNode(data))
								.filter(function(d) {return !d.children;});

			//Enter new g elements
			var circle = vis.selectAll('circle')
							.data(newData);

			//Draw all the circles newly with new data
			circle.enter().append('g').append('circle')
				.attr('transform', function(d) {return 'translate (' + d.x + ',' + d.y+ ')'; })
				.attr('r', function(d) {return d.r;})
				.attr('fill', function(d){ return color(newData, d.val)});

			circle.append('text')
					.attr('x', function(d){return d.x;})
					.attr('y', function(d) {return d.y})
					.text(function(d){return d.varName})
					.style("text-anchor", "middle")
					.style('fill' , 'white')
					.style('font-size', function(d){return (d.r)/5});


			 
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