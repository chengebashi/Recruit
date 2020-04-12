window.chartColors = {
	red: 'rgb(229, 37, 234)',
	orange: 'rgb(240, 173, 78)',
	yellow: 'rgb(245, 168, 17)',
	green: 'rgb(15, 215, 147)',
	blue: 'rgb(121, 121, 255)',
	purple: 'rgb(97, 61, 124)',
	grey: 'rgb(136,136,136)'
};

window.randomfillColor = function(){
    var color = ['rgb(91, 146, 255,0.1)','rgb(102, 16, 242,0.1)','rgb(232, 62, 140,0.1)','rgb(253, 126, 20,0.1)','rgb(31, 201, 110,0.1)','rgb(23, 162, 184,0.1)'];
    return  color[Math.floor((Math.random()*color.length))]
};

window.randomColor = function(){
    var color = ['rgb(229, 37, 234)', 'rgb(240, 173, 78)', 'rgb(245, 168, 17)', 'rgb(15, 215, 147)', 'rgb(121, 121, 255)', 'rgb(97, 61, 124)', 'rgb(136,136,136)'];
    return  color[Math.floor((Math.random()*color.length))]
};


window.randomScalingFactor = function() {
	 return Math.round(Math.random() * 50);
};

