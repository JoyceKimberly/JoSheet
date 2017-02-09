(function($) { $(document).ready(function() { // ----------------------------------------

var dbx = new Dropbox({ accessToken: 'QLhFo6KEPX8AAAAAAAAS2mpkqK__bG4lzw-8QsXc3-haIZ6jBTTMpxW886F9cxIF' });
dbx.filesListFolder({path: ''})
	.then(function(response) {
	    console.log(response);
	})
	.catch(function(error) {
	    console.log(error);
	});

}); // ----------------------------------------------------------------------------------


})(jQuery); // --------------------------------------------------------------------------
