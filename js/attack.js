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

	// intializing the game
	Init();


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

		$("#Instructions").html("You Got It!").delay(500).fadeOut();
		
	});

	$("#PlayMoreButton").click(function(e){
		e.preventDefault();
		totalTestCircles += 5; 
		Init();
	});


	function Init(){
		HideDino();
		ResetInstructions();
		totalDeadCircles = 0;
		circles = [];
		GenerateCircles();
		checkDeadCircles(); // make sure all circles aren't dead on startup
	}

	function ResetInstructions(){
		$("#Instructions").html("Click The Balls!").show();
	}

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
	  * Generate Test Circles
	  */ 
	 function GenerateCircles(){

	 	for(var i = 0; i<totalTestCircles; i++){
	 		var setColor = RandomInt(circleColors.length) - 1;
	 		var isAlive = (setColor != (circleColors.length-1));

	 		if(!isAlive){
	 			totalDeadCircles++;
	 		}

	 		totalDeadCircles
	 		var circle = {
	 			x : RandomInt($(window).width()), 
	 			y: RandomInt($(window).height()), 
	 			r: RandomInt(100, 40), 
	 			mx : RandomInt(maxSpeed), 
	 			my : RandomInt(maxSpeed), 
	 			color: circleColors[setColor],
	 			numOfClicks: setColor,
	 			position: i,
	 			alive: isAlive
	 		};
	 		circles.push(circle);
	 	}
	 }

	 function MoveCircles(){
	 	$.each( circles, function(){
	 		this.x = this.x + this.mx;
	 		this.y = this.y + this.my;

	 		checkScreenCollisionX(this);
	 		checkScreenCollisionY(this);
	 	});
	 }

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
	 	var SVGCircles = d3.select(Canvas).selectAll('.data-circles').data(circles)
	  		
	  	SVGCircles.enter()
	  		.append('circle').classed('data-circles', true);
	  	

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
	  	
	  	SVGCircles.exit().remove();
	 }

	function ShowDino(){
		$("#Dino").addClass("show-dino");
	}

	function HideDino(){
		$("#Dino").removeClass("show-dino");
	}
	  
	 /*
	  * Append Data to the interaction Log (this is mainly for me to see what's going on)
	  */
	 function Log(content){
	 	$('#Logger').prepend("<li>" + content + "</li>");
	 }
});

