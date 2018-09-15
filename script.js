console.log("connected");

$(document).ready(function() {





  $("#buttonForSearch").click(function () {
    var searchInput  = $("#searchBooks").val();
    var numberResponse = "6";


    var bookApiSearch ="https://www.googleapis.com/books/v1/volumes?q=" + searchInput + "&maxResults=" + numberResponse;
    console.log(bookApiSearch);

    $.ajax({
      url: bookApiSearch,
      dataType:'json',
      type: 'GET',
      data: "jsonp",
      data: {limit: 3, order: 'desc'},
      success:function(response){
        console.log(response);
        var responsetext = response.items;

        // var bookTitle = response.items[0].volumeInfo.title;
        // var bookAuthor = response.items[0].volumeInfo.authors;
        // var bookSrc = response.items[0].volumeInfo.imageLinks.smallThumbnail;

        $.each(responsetext, function (index, value) {
          var bookTitle = responsetext[index].volumeInfo.title;
          var bookAuthor = responsetext[index].volumeInfo.authors;
          var bookSrc = responsetext[index].volumeInfo.imageLinks.smallThumbnail;
          console.log(bookTitle, bookAuthor);

          function addDiv(author, bookTitle, bookImg) {
            var somethingDiv = $( "<div/>", {
              class: "bookTileClass",
              text: "Title: " + bookTitle  + " Author: "  + author ,
            });
            var bookImgDiv = $( "<img/>", {
              src : bookImg,
            });
            // $(bookImgDiv).appendTo( ".booksSearchDisplay" );
            $(bookImgDiv).prependTo( somethingDiv);
            $(somethingDiv).appendTo( ".booksSearchDisplay" );
        };

        addDiv(bookAuthor, bookTitle, bookSrc);





        });




    //   function addDiv(author, bookTitle, bookImg) {
    //     var somethingDiv = $( "<div/>", {
    //       class: "bookTileClass",
    //       text: "Title: " + bookTitle  + " Author: "  + author ,
    //     });
    //     var bookImgDiv = $( "<img/>", {
    //       src : bookImg,
    //     });
    //     // $(bookImgDiv).appendTo( ".booksSearchDisplay" );
    //     $(bookImgDiv).prependTo( somethingDiv);
    //     $(somethingDiv).appendTo( ".booksSearchDisplay" );
    // };
    //
    // addDiv(bookAuthor, bookTitle, bookSrc);





      }
        });




    });





});
