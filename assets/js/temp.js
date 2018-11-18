	$( ".deleteBtn" ).click( function () {
          var parentDivToRemove = 	$( this ).closest( "div" );
		var panelSibling = parentDivToRemove.next("div").remove();
        $( this ).closest( "div" ).remove();
	} );






//    var infolinkpara = $("<a />", {
//    class : "author-desc",
//    href : bookInfo,
//    text : "Info"
//});

		//making div to add author in
//		var authorpara = document.createElement( "div" );
//		authorpara.setAttribute( "class", "author-desc" )
//		var authornode = document.createTextNode( author );
//		authorpara.appendChild( authornode );

		//div for info link
//		var infolinkpara = document.createElement( "A" );
//		var infonode = document.createTextNode( "Info" );
//		infolinkpara.setAttribute( "href", bookInfo );
////		infolinkpara.setAttribute( "style", "border-bottom: none" );
//		infolinkpara.appendChild( infonode );



//		infoNodeDiv.appendChild( bookpara);
//		infoNodeDiv.appendChild( authorpara );
//		infoNodeDiv.appendChild( catpara );
//		infoNodeDiv.appendChild( infolinkpara );


//    console.log(bookpara);

		//div for category
//		var catpara = document.createElement( "div" );
//		catpara.setAttribute( "class", "catpara" )
//		catpara.setAttribute( "style", "font-style: italic;" )
////        setAttributes(catpara, { class: 'catpara', style: {font-style : "italic"}});
//
//		var catnode = document.createTextNode( bookCat );
//		catpara.appendChild( catnode );
//		// infopara.appendChild(infonode);
//
//		//appending indivdual divs to main
//		infoNodeDiv.append( catpara);



//		var bookpara = $ ("<div class='book-name' style='font-weight: bold'></div>")
//
//		var bookpara = document.createElement( "div" );
//		bookpara.setAttribute( "class", "book-name" )
//		bookpara.setAttribute( "style", "font-weight: bold" )
//		var booknode = document.createTextNode( bookTitle );
//		bookpara.appendChild( booknode );
//



//		var imgForList = document.createElement( "IMG" );
//		imgForList.setAttribute( 'src', bookImg );
//		imgForList.setAttribute( 'class', 'email-avatar' );
//
//		document.body.appendChild( imgForList );
//		imgDivPure.appendChild( imgForList );



//            .appendTo( clonedInfo);




//			// panel for accordion
//			var newPanelDiv = document.createElement( 'div' );
//			newPanelDiv.setAttribute( 'class', "panel booksMedia panel" );
//			newPanelDiv.setAttribute( 'style', "padding-top: 3rem;" );
//			// geting info to put in panel
//


		//		newDivWrapper.append( infoNodeDiv );
		//		newDivWrapper.append( newSelectBtn );






			var accDiv = $(".accordionDisplay").not(this);

			 var isVisible = $(accDiv ).is( ":visible" );

			 if ( accDiv === isVisible ) {
				console.log("yes");
			} else {
			console.log("no");
			}
//			  var isVisible = $(accDiv ).is( ":visible" );
//
//            var isHidden = $(accDiv).is( ":hidden" );

//			console.log(accDiv);
//			var accDivPanel = accDiv.siblings("")
//			console.log(accDivPanel);

//            if ( accDiv.class === "active" ) {
//				accDiv.toggle();
//			} else {
//			}
