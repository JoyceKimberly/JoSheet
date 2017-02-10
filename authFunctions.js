(function($) { $(document).ready(function() { // ----------------------------------------

var CLIENT_ID = 'ztucdd8z8fjuh08';

// Parses the url and gets the access token if it is in the urls hash
function getAccessTokenFromUrl() {
    return utils.parseQueryString(window.location.hash).access_token;
}
// If the user was just redirected from authenticating, the urls hash will
// contain the access token.
function isAuthenticated() {
    return !!getAccessTokenFromUrl();
}

if ( isAuthenticated() ) {
    $('#authLink').hide();

	var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
	dbx.filesListFolder({path: ''})
		.then(function(response) {
		    console.log(response.entries);
		})
		.catch(function(error) {
		    console.log(error);
		});
} else {
    $('#authLink').show();

	var dbx = new Dropbox({ clientId: CLIENT_ID });
	var authUrl = dbx.getAuthenticationUrl('http://localhost/~Joyce/JoSheet/');
	document.getElementById('authLink').href = authUrl;
};

}); // ----------------------------------------------------------------------------------

})(jQuery); // --------------------------------------------------------------------------

(function(window) {
	window.utils = {
		parseQueryString: function(str) {
			var ret = Object.create(null);

			if (typeof str !== 'string') {
				return ret;
			}

			str = str.trim().replace(/^(\?|#|&)/, '');

			if (!str) {
				return ret;
			}

			str.split('&').forEach(function (param) {
				var parts = param.replace(/\+/g, ' ').split('=');
				// Firefox (pre 40) decodes `%3D` to `=`
				// https://github.com/sindresorhus/query-string/pull/37
				var key = parts.shift();
				var val = parts.length > 0 ? parts.join('=') : undefined;

				key = decodeURIComponent(key);

				// missing `=` should be `null`:
				// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
				val = val === undefined ? null : decodeURIComponent(val);

				if (ret[key] === undefined) {
				    ret[key] = val;
				} else if (Array.isArray(ret[key])) {
				    ret[key].push(val);
				} else {
				    ret[key] = [ret[key], val];
				}
			});
			return ret;
		}
	};
})(window);
