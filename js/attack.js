$(function(){
	var Canvas = "#Canvas",
		CanvasObj = $("#Canvas"),
		circles = [],
		pointerCircle = "pointer-circle",
		totalTestCircles = 5;

	Init();
	
	setInterval(Update, 30);

	// resize the canvas to fill browser window dynamically
    //window.addEventListener('resize', resizeCanvas, false);

	/*
	 * Draw a Circle where the mouse should be
	 */
	CanvasObj.mousemove(function(e){
		var x = e.pageX,
			y = e.pageY,
			r = 5;

		var circle = {'x' : x, 'y': y, 'r': r};
		Log("Move: X:" + x + ", Y:" + y);
		DrawPointerCircle(circle);
	});

	/*
	 * Do something on Mouse click
	 */
	CanvasObj.click(function(e){
	 	Log("Click X:" + e.pageX + ", Y:" + e.pageY);

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
	 		var circle = {x : RandomInt(), y: RandomInt(), r: RandomInt(50), mx : RandomInt(5), my : RandomInt(5)};
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
	 	console.log(circles);
	 	var SVGCircles = d3.select(Canvas).selectAll('.data-circles').data(circles)
	  		
	  	SVGCircles.enter()
	  		.append('circle').classed('data-circles', true);
	  		
	  	SVGCircles
	  		.attr('cx', function(d){return d.x;})
	  		.attr('cy', function(d){return d.y;})
	  		.attr('r', function(d){return d.r;})
	  		.style('fill', 'blue')
	  	
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