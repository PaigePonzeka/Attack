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
		totalClicks = circleColors.length - 1;

	Init();
	
	setInterval(Update, 30);

	// resize the canvas to fill browser window dynamically
    //window.addEventListener('resize', resizeCanvas, false);


	$('body').on('click', 'circle', function(){
		var circlePosition = $(this).data('position'); 
		var circle = circles[circlePosition ];
		//circle.clicks = "#00ff00";
		if(circle.numOfClicks){
			circle.numOfClicks += 1;
		}
		else{
			circle.numOfClicks = 1;
		}
		circle.color = circleColors[circle.numOfClicks];

		if(circle.numOfClicks >= totalClicks ){
			//delete circles[circlePosition];
			//Log("DESTROY");
		}
		
	});


	function Init(){
		GenerateCircles();
	}

	 /*
	  * Update screen
	  */ 
	 function Update(){
		DrawCircles();
		MoveCircles();
	 }


	  /*
	  * Generate Test Circles
	  */ 
	 function GenerateCircles(){
	 	for(var i = 0; i<=totalTestCircles; i++){
	 		var circle = {
	 			x : RandomInt(), 
	 			y: RandomInt(), 
	 			r: RandomInt(50), 
	 			mx : RandomInt(5), 
	 			my : RandomInt(5), 
	 			color: circleColors[0],
	 			opacity: .5,
	 			position: i
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
	 function RandomInt(max){
	 	if(!max){
	 		max = 500;
	 	}
	 	return Math.ceil(Math.random()*max);
	 }

	 /*
	  * Draw A Circle 
	  */ 
	 function DrawCircles(){
	 	var SVGCircles = d3.select(Canvas).selectAll('.data-circles').data(circles)
	  		
	  	SVGCircles.enter()
	  		.append('circle').classed('data-circles', true);
	  		
	  	SVGCircles
	  		.attr('cx', function(d){return d.x;})
	  		.attr('cy', function(d){return d.y;})
	  		.attr('r', function(d){return d.r;})
	  		.attr('opacity', .5)
	  		.attr('data-position', function(d){return d.position})
	  		.style('fill', function(d){ return d.color;})
	  	
	  	SVGCircles.exit().remove();
	 }

	 /*
	  * Draw A Circle At the current Most Position
	  */ 
	  function DrawPointerCircle(circle){
	  	console.log(circle);
	  	
	  	var pointerSVGCircle = getPointerCircle().data([circle])
	  		
	  	pointerSVGCircle.enter()
	  		.append('circle')
	  		
	  	pointerSVGCircle
	  		.attr('id', pointerCircle)
	  		.attr('cx', circle.x)
	  		.attr('cy', circle.y)
	  		.attr('r', circle.r)
	  		.style('fill', 'red')
	  	
	  	pointerSVGCircle.exit().remove();
	}

	function getPointerCircle(){
		return d3.select(Canvas).selectAll('#' + pointerCircle)
	}
	// resizeCanvas();
	// function resizeCanvas(){
	// 	CanvasObj.width = window.innerWidth;
 //        CanvasObj.height = window.innerHeight;
	//}
	  
	 /*
	  * Append Data to the interaction Log
	  */
	 function Log(content){
	 	$('#Logger').prepend("<li>" + content + "</li>");
	 }
})