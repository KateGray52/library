console.log( "connected" );

$( document ).ready( function () {

    	//click on search input and it highlights
	$( function () {
		$( document ).on( 'click', 'input[type=text]', function () {
			this.select();
		} );
	} );

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
			if ( panel.style.display === "inline-grid" ) {
				panel.style.display = "none";
			} else {
				panel.style.display = "inline-grid";
			}
		};
	} );


	//search button for side bar input
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


		var infoGroupDiv = document.createElement( "div" );
		infoGroupDiv.setAttribute( "class", "infogroup" )

//        var infoGroupDiv = $( "<div></div>" )
//			.addClass( "infogroup" );
//
////			.appendTo( infoGroupDiv );


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


		var imgDiv = document.createElement( "div" );
		imgDiv.setAttribute( 'class', "img-div" );

		var img = $( '<img >' );
		img.attr( 'src', bookImg );
		img.appendTo( imgDiv );


//       var newSelectBtn = $( "<button></button>" )
//        .attr( "class", "button small"  )
//        .text( "Select" )
//        .appendTo( infoGroupDiv );


        	//		//select button to add to bookcase display
		var newSelectBtn = document.createElement( "BUTTON" );
		newSelectBtn.setAttribute( "class", "button small" );

		//select button for side search
		var newselectnode = document.createTextNode( "select" );
		newSelectBtn.appendChild( newselectnode );
	   infoGroupDiv.appendChild( newSelectBtn );



		$( newSelectBtn).click( function () {

            var bookImgMainDiv = document.getElementById( 'bookImgMain' );

			var imgInDiv = $( this ).parent().siblings( '.img-div' ).children( 'img' );
			var clonedImg = ( imgInDiv ).clone();
            var clonedInfo = $( this ).siblings().clone();

			var newPanelDiv = $( "<div></div>" )
				.addClass( "panel booksMedia panel" )
				.append(clonedInfo)
				.prependTo( bookImgMainDiv );

			var newDivImg = $( "<div></div>" )
			.addClass( "booksMedia accordionDisplay"  )
			.append(clonedImg)
			.click( function () {
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

			var newDeleteIcon= $( "<i> </i>" )
			.addClass( "fa fa-times deleteBtn" )
			.appendTo( newDivImg)
            .click( function () {
                var parentDivToRemove = $( this ).closest( "div" );
                var panelSibling = parentDivToRemove.next( "div" ).remove();
                $( this ).closest( "div" ).remove();
            } );

			$( bookImgMainDiv ).prepend( newDivImg );
		} );

            var ListRef = document.getElementById( 'list' );

         	var newDivWrapper = $( "<div></div>" )
			.addClass( "infowrapper" )
			.css({'display' : 'inline-flex', 'margin-top': '.5rem', 'border-bottom' : '.15em solid #3d444963' })
			.append( imgDiv, infoGroupDiv)
			.appendTo(ListRef);

	};

	//end of document ready
} );;