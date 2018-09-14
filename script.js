console.log("connected");

$(document).ready(function() {





  $("#buttonForSearch").click(function () {
    var searchInput  = $("#searchBooks").val();


    var bookApiSearch ="https://www.googleapis.com/books/v1/volumes?q=" + searchInput;
    console.log(bookApiSearch);

    $.ajax({
      url: bookApiSearch,
      dataType:'json',
      type: 'GET',
      data: "jsonp",
      success:function(response){
        console.log(response);
        var bookTitle = response.items[0].volumeInfo.title;
        var bookAuthor = response.items[0].volumeInfo.authors;

        var bookSrc = "https://via.placeholder.com/350x150";

        // $('#outputdivTitle').html(bookTitle);
        // $('#outputdivAuthor').html(bookAuthor);


      function addDiv(author, bookTitle, bookImg) {
        var img = document.createElement("IMG");
        // var src = c;

        var somethingDiv = $( "<div/>", {
          class: "bookTileClass",
          text: "Title: " + bookTitle + " Author: "  + author ,
          attr: src = bookImg,
        });
        var bookImgDiv = $( "<img/>", {
          src : "https://via.placeholder.com/350x150",
        });

        // $(bookImgDiv).appendTo( ".booksSearchDisplay" );
        $(bookImgDiv).prependTo( somethingDiv);
        $(somethingDiv).appendTo( ".booksSearchDisplay" );
    };

    addDiv(bookAuthor, bookTitle, bookSrc);





      }
        });




    });





});
