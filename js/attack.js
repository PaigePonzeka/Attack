/*
 * A Little script using D3.js to draw and animate circles across the browser
 * User just has to click all the circles to get to the final color (orange) and they win
 *
 */

$(function(){
	var Canvas = "#Canvas",
		CanvasObj = $("#Canvas"),
		circles = [],
		pointerCircle = "pointer-circle",
		totalTestCircles = 10,
		temps = {},
		circleColors = [
				"#0fa1ff", // blue
				"#99ff00", // green
				"#9900ff", // purple
				"#ff0099", // pink
				"#ffbc00" // orange
		],
		totalClicks = circleColors.length - 1,
		maxSpeed = 7,
		totalDeadCircles = 0;

	// game drawing
	setInterval(Update, 30);

	$('body').on('click', 'circle', function(){
		var circlePosition = $(this).data('position'); 
		var circle = circles[circlePosition ];

		if(circle.numOfClicks < circleColors.length -1){
			if(circle.numOfClicks < (circleColors.length - 1)){
				circle.numOfClicks += 1;
			}

			if(circle.numOfClicks == circleColors.length -1){
				circle.alive = false;
				totalDeadCircles++;
				checkDeadCircles();
			
			}
			circle.color = circleColors[circle.numOfClicks];
		}
	});

	function checkDeadCircles(){
		if(totalDeadCircles == totalTestCircles){
			ShowDino();
		}
	}
	 /*
	  * Update screen
	  */ 
	 function Update(){
		DrawCircles();
		MoveCircles();
		DrawScore();
	 }


	 /* 
	  * Creates a new Circle and Adds it to the circles array
	  */
	 function addCircle() {
	 		var setColor = RandomInt(circleColors.length) - 1;
	 		var isAlive = (setColor != (circleColors.length-1));

	 		if(!isAlive){
	 			totalDeadCircles++;
	 		}
	 		
	 		var circle = {
	 			x : RandomInt($(window).width()), 
	 			y: RandomInt($(window).height()), 
	 			r: RandomInt(100, 40), 
	 			mx : RandomInt(maxSpeed), 
	 			my : RandomInt(maxSpeed), 
	 			color: circleColors[setColor],
	 			numOfClicks: setColor,
	 			position: circles.length,
	 			alive: isAlive
	 		};
	 		
	 		circles.push(circle);
	 		console.log(circles);
	 }

	 /*
	  * Deletes a circle from the array
	  */
	 function removeCircle() {
	 	circles.pop();
	 	console.log(circles);
	 }

	 /*
	  * Updates circle data so its position moves in the proper direction
	  */
	 function MoveCircles(){
	 	$.each( circles, function(){
	 		this.x = this.x + this.mx;
	 		this.y = this.y + this.my;

	 		checkScreenCollisionX(this);
	 		checkScreenCollisionY(this);
	 	});
	 }

	 /*
	  * Just some Collision detecting so it bounces back when it goes off screen
	  */
	 function checkScreenCollisionX(circle){
	 	/* if the circle goes off the screen redirect it */
	 	if(circle.x >= $('body').width() || circle.x <= 0){
	 		circle.mx = -(circle.mx);
	 	}
	 }

	  function checkScreenCollisionY(circle){
	 	/* if the circle goes off the screen redirect it */
	 	if(circle.y >= $('body').height() || circle.y <= 0){
	 		circle.my = -(circle.my);
	 	}
	 }




	  /*
	  * Generate A Random number
	  */
	 function RandomInt(max, min){
	 	if(!max){
	 		max = 500;
	 	}
	 	if(!min){
	 		min = 0;
	 	}
	 	 return Math.ceil(Math.random() * (max - min) + min);
	 }


	 function DrawScore(){
	 		var data = {"score": totalDeadCircles};
	 		var score = d3.select("#Score").selectAll(".score-data").data([data]);

	 		score.enter()
	 			.append("div").classed("score-data", true).style("color", circleColors[circleColors.length-1])

	 		score
	 			.text(function(d){ return "Orange: " + d.score;})

	 }


	 /*
	  * Draw all of the circles onto the board using D3.js 
	  */ 
	 function DrawCircles(){
	 	// DATA JOIN
	 	// join new data with old elements (if there are any)
	 	// selects circls (even if they don't exist yet!)
	 	// data counts and parses out data set 
	 	// (d3 can handle geoJSON and complicated JSON files with ease)
	 	// can even import csv's 
	 	var SVGCircles = d3.select(Canvas)
	 											.selectAll('.data-circles')
	 											.data(circles)
	  	// WHERE THE MAGIC HAPPENS
	  	// ENTER() 
	  	// looks at the DOM and then the data being handed to it. 
	  	// enter() - contains placeholder elements which have corresponding data
	  	// append() takes the placeholder element created and inserts it into the DOM
	  	// classed()
	  	SVGCircles.enter()
	  		.append('circle')
	  		.classed('data-circles', true);
	  	
	  	// UPDATE
	  	// update existing elements as needed 
	  	SVGCircles
	  		.attr('cx', function(d){return d.x;})
	  		.attr('cy', function(d){return d.y;})
	  		.attr('r', function(d){return d.r;})
	  		.attr('opacity', function(d){ 
	  			if(d.alive){
	  				return .5;
	  			}
	  			else{
	  				return .8;
	  			}
	  		})
	  		.attr('stroke', function(d){
	  			if(!d.alive){ // only showing a stroke on "dead" circles
	  				return 'white';
	  			}
	  		})
	  		.attr('stroke-width', 6)
	  		.attr('data-position', function(d){return d.position})
	  		.style('fill', function(d){ return d.color;})
	  	
	  	// lets d3 determine which elements are at the 'exit' stage
	  	// this is more useful when you have more valuable data then just circle popping of an array
	  	// exit() contains all elements which have no corresponding data (opposite of enter())
	  	// remove() gets rid of them
	  	SVGCircles
	  		.exit()
	  		.remove();
	 }

	 /*
	  * Append Data to the interaction Log (this is mainly for me to see what's going on)
	  */
	 function Log(content){
	 	$('#Logger').prepend("<li>" + content + "</li>");
	 }

	 $('.js-add-circle').click(function(){
	 	addCircle();
	 });

	 $('.js-remove-circle').click(function(){
	 	removeCircle();
	 });
});

