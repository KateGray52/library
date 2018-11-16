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