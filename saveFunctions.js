(function($) { $(document).ready(function() { // ----------------------------------------

var dbx = new Dropbox({ accessToken: 'QLhFo6KEPX8AAAAAAAAS2cL5uUXCagOL_FUcI50GsDNmd_Jgkz6G5iw-f74Uic_z' });
dbx.filesListFolder({path: ''})
	.then(function(response) {
	    console.log(response);
	})
	.catch(function(error) {
	    console.log(error);
	});

}); // ----------------------------------------------------------------------------------


})(jQuery); // --------------------------------------------------------------------------
