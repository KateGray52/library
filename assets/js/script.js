console.log( "connected" );

$( document ).ready( function () {


	var newDelBtn = document.createElement( "BUTTON" );
	newDelBtn.addEventListener( "click", function () {
		document.getElementById( 'tableId' ).deleteRow( this.parentNode.parentNode.rowIndex )
	} );
	var newDelete = document.createTextNode( "Delete" );
	newDelBtn.appendChild( newDelete );
	// document.body.appendChild(newDelBtn);


	//delete button for bookcase display img div
	$( ".deleteBtn" ).click( function () {
		var parentDivToRemove = $( this ).closest( "div" );
		var panelSibling = parentDivToRemove.next( "div" ).remove();
		$( this ).closest( "div" ).remove();
	} );

	//function for bookcase display accordian and panels
	$( ".accordionDisplay" ).click( function () {
		var acc = $( this );
		var i;
		for ( i = 0; i < acc.length; i++ ) {
			this.classList.toggle( "active" );
			var panel = this.nextElementSibling;
			if ( panel.style.display === "block" ) {
				panel.style.display = "none";
			} else {
				panel.style.display = "block";
			}
		};
	} );

	//click on search input and it highlights
	$( function () {
		$( document ).on( 'click', 'input[type=text]', function () {
			this.select();
		} );
	} );

	//search button for side bar input
	$( "#buttonForSearch" ).click( function () {
		$( "#list" ).html( "" );
		var searchInput = $( "#searchBooks" ).val();
		var numberResponse = "6";
		var bookApiSearch = "https://www.googleapis.com/books/v1/volumes?q=" + searchInput + "&maxResults=" + numberResponse;
		console.log( bookApiSearch );
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

				//selecting and variables for use
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


	function addDiv( author, bookTitle, bookImg, index, bookCat, bookInfo ) {

		var ListRef = document.getElementById( 'list' )

		//div for title, author, info link and category
		var infoNodeDiv = document.createElement( "div" );
		infoNodeDiv.setAttribute( "class", "infogroup" )

		//div for title

		var bookpara = $( "<div></div>" )
			.addClass( "book-name" )
			.text( bookTitle )
			.appendTo( infoNodeDiv );

		var authorpara = $( "<div></div>" )
			.addClass( "author-desc" )
			.text( author )
			.appendTo( infoNodeDiv );

		var infolinkpara = $( "<a> </a>" )
			.attr( "href", bookInfo )
			.text( "Info" )
			.appendTo( infoNodeDiv );

		var catpara = $( "<div></div>" )
			.addClass( "catpara" )
			.text( bookCat )
			.appendTo( infoNodeDiv );


		//make image for search list
		var imgDivPure = document.createElement( "div" );
		imgDivPure.setAttribute( 'class', "pure-u" )

		var img = $( '<img class="email-avatar">' );
		img.attr( 'src', bookImg );
		img.appendTo( imgDivPure );

		//		//select button to add to bookcase display
		var newSelectBtn = document.createElement( "BUTTON" );
		newSelectBtn.setAttribute( "class", "button small" )
		newSelectBtn.setAttribute( "style", "margin-top: 8rem;" )


		// how the button displays info/ what it displays
		newSelectBtn.addEventListener( "click", function () {
			var el = $( this );
			console.log( el );
			//retrieve image by nav to parent then to img div
			var imgparent = ( el ).parent();
			var imgsibling = ( imgparent ).children( '.pure-u' );
			var imgInDiv = ( imgsibling ).children( 'img' );

			//getting info from infoSibling
			var infoSibling = ( imgparent ).children( '.infogroup' );
			var infoChildren = ( infoSibling ).children();
			//where it will be displayed
			var GalleryDiv = document.getElementById( 'bookImgMain' );

			//div for new image
			var newDivImg = document.createElement( 'div' );
			newDivImg.setAttribute( 'class', "booksMedia accordionDisplay" );

			//giving image div accordion function
			$( newDivImg ).click( function () {
				var acc = $( this );
				var i;
				for ( i = 0; i < acc.length; i++ ) {
					this.classList.toggle( "active" );
					var panel = this.nextElementSibling;
					if ( panel.style.display === "block" ) {
						panel.style.display = "none";
					} else {
						panel.style.display = "block";
					}
				};
			} );

			//taking the image sibling and cloning
			var clonedImg = ( imgInDiv ).clone().removeClass().addClass( 'pure-img-responsive' );
			$( clonedImg ).appendTo( newDivImg );

			//delete button to go button corner bookcase image div
			var newDeleteIcon = document.createElement( 'i' );
			newDeleteIcon.setAttribute( 'class', "fa fa-times deleteBtn" );
			$( newDeleteIcon ).click( function () {
				$( this ).closest( "div" ).remove();
			} );
			$( newDeleteIcon ).appendTo( newDivImg );

			var clonedInfo = ( infoChildren ).clone();
			var newPanelDiv = $( "<div></div>" )
				.addClass( "panel booksMedia panel" )

				.appendTo( GalleryDiv )

			//			//adding image div and panel to bookcase display
			$( clonedInfo ).appendTo( newPanelDiv );
			$( GalleryDiv ).prepend( newPanelDiv );
			$( GalleryDiv ).prepend( newDivImg );
		} );

		//select button for side search
		var newselectnode = document.createTextNode( "select" );
		newSelectBtn.appendChild( newselectnode );
		document.body.appendChild( newSelectBtn );

		//div for all side search (info and img and select button) and append children divs
		var newDivWrapper = document.createElement( 'div' );
		newDivWrapper.setAttribute( 'class', "infowrapper" );
		newDivWrapper.setAttribute( 'style', "display: inline-flex; margin-top: .5rem; border-bottom: .15em solid #3d444963;" );
		// newDivWrapper.id = 'container'+index;
		newDivWrapper.append( imgDivPure, infoNodeDiv, newSelectBtn );

		//adding search divwrapper to list
		ListRef.appendChild( newDivWrapper );
	};

	//end of document ready
} );;