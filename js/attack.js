$(function(){
	var Canvas = "#Canvas",
		circles = {},
		pointerCircle = "pointer-circle";
	/*
	 * Draw a Circle where the mouse should be
	 */
	$(Canvas).mousemove(function(e){
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
	 $(Canvas).click(function(e){
	 	Log("Click X:" + e.pageX + ", Y:" + e.pageY);
	 });


	 /*
	  * Draw A Circle At the current Most Position
	  */ 
	  function DrawPointerCircle(circle){
	  	console.log(circle);
	  	/*console.log(circle);
	  	Log("Append: X:" + circle.x + ", Y:" + circle.y);
	  	var ctx = $(Canvas).getContext("2d"); 
    	var x = 75;
    	var y = 75;
    	var radius = 75;
    	var startAngle = 0;
    	var endAngle = Math.PI*2;
    	var antiClockwise = false;
		
    	ctx.beginPath();
    	ctx.arc(x, y, radius, startAngle, endAngle, antiClockwise);
    	ctx.closePath();
		
    	ctx.fill();  */
	  	var pointerSVGCircle = d3.select(Canvas)
	  		.selectAll('#' + pointerCircle)
	  		.data([circle])
	  		
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
	  
	 /*
	  * Append Data to the interaction Log
	  */
	 function Log(content){
	 	$('#Logger').prepend("<li>" + content + "</li>");
	 }
})