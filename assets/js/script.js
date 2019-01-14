$( document ).ready( function () {

	$( document ).on( 'click', '.deleteBtn', function () {
		var parentDivToRemove = $( this ).closest( "div" );
		var panelSibling = parentDivToRemove.next( "div" ).remove();
		$( this ).closest( "div" ).remove();
	} );

	// $( document ).on( 'click', '.accordionDisplay', function () {
	// 	var acc = $( this );
	// 	var i;
	// 	for ( i = 0; i < acc.length; i++ ) {
	// 		this.classList.toggle( "active" );
	// 		var panel = this.nextElementSibling;
	// 		if ( panel.style.display === "inline-grid" ) {
	// 			panel.style.display = "none";
	// 		} else {
	// 			panel.style.display = "inline-grid";
	// 		}
	// 	};
	// } );

	//click on search input and highlights text
	$( function () {
		$( document ).on( 'click', 'input[type=text]', function () {
			this.select();
		} );
	} );

	//search button for sidebar input
	$( "#buttonForSearch" ).click( function () {
		$( "#list" ).html( "" );
		var searchInput = $( "#searchBooks" ).val();
		var numberResponse = "6";
		var bookApiSearch = "https://www.googleapis.com/books/v1/volumes?q=" + searchInput + "&maxResults=" + numberResponse;
		sendRquest( bookApiSearch )
	} );

	//retrieve info from google books api
	function sendRquest( bookApiSearch ) {
		$.ajax( {
			url: bookApiSearch,
			dataType: 'json',
			type: 'GET',
			data: "jsonp",
			success: function ( response ) {
				var responsetext = response.items;

				$.each( responsetext, function ( index, value ) {
					var bookTitle = responsetext[ index ].volumeInfo.title;
					var bookAuthor = responsetext[ index ].volumeInfo.authors;
					var bookSrc = responsetext[ index ].volumeInfo.imageLinks.thumbnail;
					var bookCat = responsetext[ index ].volumeInfo.categories;
					var bookInfo = responsetext[ index ].volumeInfo.infoLink;
					addDiv( bookAuthor, bookTitle, bookSrc, index, bookCat, bookInfo );
					//end of response loop
				} );
				//end of response
			}
			//end of ajax
		} );
	};

    //sidebar search results
	function addDiv( author, bookTitle, bookImg, index, bookCat, bookInfo ) {

		var infoGroupDiv = $( "<div></div>" )
			.addClass( "infogroup" );

		var bookpara = $( "<div></div>" )
			.addClass( "book-name" )
			.text( bookTitle )
			.appendTo( infoGroupDiv );

		var authorpara = $( "<div></div>" )
			.addClass( "author-desc" )
			.text( author )
			.appendTo( infoGroupDiv );

		var infolinkpara = $( "<a> </a>" )
			.attr( "href", bookInfo )
			.text( "Info" )
			.appendTo( infoGroupDiv );

		var img = $( '<img >' )
			.attr( 'src', bookImg );

		var imgDiv = $( "<div></div>" );
		imgDiv.addClass( "img-div" );
		imgDiv.append( img );

        //create select button to add to bookcase display, with functions for delete and get info
		var newSelectBtn = $( "<button></button>" )
			.addClass( "button small" )
			.text( "Select" )
			.click( function () {
				var bookImgMainDiv = document.getElementById( 'bookImgMain' );
				var imgInDiv = $( this ).parent().siblings( '.img-div' ).children( 'img' );
				var clonedImg = ( imgInDiv ).clone();
				var clonedInfo = $( this ).siblings().clone();


				// var newPanelDiv = $( "<div></div>" )
				// 	.addClass( "panel booksMedia panel" )
				// 	.append( clonedInfo )
				// 	.prependTo( bookImgMainDiv );

				var overlayDiv = $( "<div></div>" )
					.addClass( "overlay" );

					var newTextDiv = $( "<div></div>" )
						.addClass( "text" )
						.append( clonedInfo )
						.appendTo( overlayDiv );


				var newDivImg = $( "<div></div>" )
					.addClass( "booksMedia container" )
					.append( clonedImg )
					.append( overlayDiv );

				var newDeleteIcon = $( "<i> </i>" )
					.addClass( "fa fa-times deleteBtn" )
					.appendTo( newDivImg );

				$( bookImgMainDiv ).prepend( newDivImg );

			} )
			.appendTo( infoGroupDiv );


		var ListRef = document.getElementById( 'list' );
		var newDivWrapper = $( "<div></div>" )
			.addClass( "infowrapper" )
			.append( imgDiv, infoGroupDiv )
			.appendTo( ListRef );

	};

	//end of document ready
} );;
