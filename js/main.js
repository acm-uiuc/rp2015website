var slider = $('.about-slider').lightSlider({
	item: 1,
	adaptiveHeight: true,
	pager: false
});

$('nav a').click(function() {
	$('nav li').removeClass('active');
	$(this).parent().addClass('active');

	var section = $(this).attr('data-anchor'),
		top = $('section[data-section="' + section + '"]').offset().top + 50;

	if (section == 'home') top = 0;
	$('html, body').animate({scrollTop: top}, 500);
});

var $sections = $('body > section');
var scrollTimer = null;

$(window).scroll(function () {
    if (scrollTimer) {
        clearTimeout(scrollTimer);   // clear any previous pending timer
    }
    scrollTimer = setTimeout(handleScroll, 20);   // set new timer
});

function handleScroll() {
	var windscroll = $(window).scrollTop();

    $sections.each(function(i) {
        if ($(this).position().top <= windscroll) {
        	var section = $(this).attr('data-section');

            $('#desktop-nav li.active').removeClass('active');
            $('#desktop-nav li a[data-anchor="' + section + '"]').parent().addClass('active');
        }
    });
}

$('.learn-more a').click(function() {
	slider.goToSlide($(this).attr('data-number'));
	$('.learn-more a').removeClass('active');
	$(this).addClass('active');
});

var flag = false;
var open = -1;
$('.speaker-button').bind("click touchstart", function(){
    if(!flag){
        flag = true;
        setTimeout(function(){flag = false;}, 100);
        $('.speaker-info').slideUp(300);

        data_num = $(this).attr('data-number');
        var bio = $('.speaker-info[data-number="'+data_num+'"]');

        if (open != data_num) {
	        $('.speaker-info[data-number="'+data_num+'"]').slideDown(300);
	        open = data_num;
	    } else {
	    	open = -1;
	    }
    }
    return false;
});

var $word = $('.title-text span:first-child');

$('#typed').typed({
	strings: [
		"a meeting of the minds",
		"a celebration of computer science",
		"competing in Mechmania",
		"open to everyone",
		"more than just a conference",
		"an annual event",
		"puzzling over Puzzlebang!",
		"student-run",
		"going above and beyond",
		"21 years running",
		"a meeting of the minds",
		"a celebration of computer science",
		"competing in Mechmania",
	/*       ___
		///\(o_o)/\\\
		|||  ` '  |||     */
		"INFESTED WITH SPIDERS PLEASE SEND HELP",
		"open to everyone",
		"more than just a conference",
		"an annual event",
		"puzzling over Puzzlebang!",
		"student-run",
		"going above and beyond",
		"21 years running"
	],
	typeSpeed: 30,
	backSpeed: 0,
	backDelay: 2000,
	loop: true
});

function Icosahedron(scale,velocityX,velocityY) {

	// http://bl.ocks.org/mbostock/7782500

	this.velocityX = velocityX;
	this.velocityY = velocityY;
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.t0 = Date.now();
	var projection = d3.geo.orthographic()
	    .scale(this.height/scale)
	    .translate([this.width/2, this.height/2])
	    .center([0, 0]);

    	this.projection = projection;

	this.svg = d3.select("body").append("svg")
		  .attr("class", "isoco1")
	    .attr("width", this.width)
	    .attr("height", this.height);


	this.face = this.svg.selectAll("path")
		.data(icosahedronFaces)
		.enter()
		.append("path").attr("class", "isoco")
		.each(function(d) { d.polygon = d3.geom.polygon(d.map(projection)); });

	function icosahedronFaces(slide) {
		var slide = slide || 180;
		var faces = [],
		y = Math.atan2(1, 2) * slide / Math.PI;
		for (var x = 0; x < 360; x += 72) {
			faces.push(
				[[x +  0, -90], [x +  0,  -y], [x + 72,  -y]],
				[[x + 36,   y], [x + 72,  -y], [x +  0,  -y]],
				[[x + 36,   y], [x +  0,  -y], [x - 36,   y]],
				[[x + 36,   y], [x - 36,   y], [x - 36,  90]]
				);
		}
		return faces;
	};

	};

Icosahedron.prototype.redraw = function() {
		var time = Date.now() - this.t0;
		var projection = this.projection;

	this.projection.rotate([time * this.velocityX, time * this.velocityY]);
	this.face
    		.each(function(d) { d.forEach(function(p, i) { d.polygon[i] = projection(p); }); })
    		.style("display", function(d) { return d.polygon.area() > 0 ? null : "none"; })
    		.attr("d", function(d) { return "M" + d.polygon.join("L") + "Z"; })
};

function init() {
	d3.selectAll("svg").remove();

	var i1 = new Icosahedron(2,.014,.01);
	var i2 = new Icosahedron(2.5,.02,-.02);
	var i3 = new Icosahedron(3,-.01,.014);
	var i4 = new Icosahedron(3.5,.01,.012);
	var i5 = new Icosahedron(4,-.01,-.011);

	d3.timer(function() {
 		i1.redraw();
 		i2.redraw();
 		i3.redraw();
 		i4.redraw();
 		i5.redraw();
	});

};

window.onresize = function(event) { init(); };
