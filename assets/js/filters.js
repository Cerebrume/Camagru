	var idx = 0;
	var filters = ['grayscale', 'sepia', 'blur', 'hue_rotate',
					'hue_rotate1', 'hue_rotate2', 'invert', ''];

	function changeFilter(e) {
	var el = e.target;
	var canvas = document.getElementById('canvas');

	canvas.className = '';
	el.className = '';
	var effect = filters[idx++ % filters.length]; // loop through filters.
	if (effect) {
		el.classList.add(effect);
		canvas.classList.add(effect);
	}
	}

	document.getElementById('video').addEventListener(
		'click', changeFilter, false);