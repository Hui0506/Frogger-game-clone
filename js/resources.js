(function() {
	var resourceCashe = {};
	var loading = [];
	var readyCallbacks = [];

	function load(urlOrArr) {
		if (urlOrArr instanceof Array) {
			urlOrArr.forEach(function(url) {
				_load(url);
			});
		}else {
			_load(urlOrArr);
		}
	}

	function _load(url) {
		if (resourceCashe[url]) {
			return resourceCashe[url];
		} else {
			var img = new Image();
			img.onload = function() {
				resourceCashe[url] = img;

				if (isReady()) {
					readyCallbacks.forEach(function(func){
						func();
					});
				}
			};
			resourceCashe[url] = false;
			img.src = url;
		}
	}

	function get(url) {
		return resourceCashe[url];
	}

	function isReady() {
		var ready = true;
		for (var k in resourceCashe) {
			if (resourceCashe.hasOwnProperty(k) && !resourceCashe[k]) {
				ready = false;
			}
		}
		return ready;
	}

	function onReady(func) {
		readyCallbacks.push(func);
	}

	window.Resources = {
		load: load,
		get: get,
		onReady: onReady,
		isReady: isReady
	};
})();