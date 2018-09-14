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
              // document.getElementById("outputdiv").innerHTML = response.items.volumeInfo.title ;
              document.getElementById("outputdivTitle").innerHTML = "Title: " +  bookTitle ;
                document.getElementById("outputdivAuthor").innerHTML = " Author: " + bookAuthor;


                  }
              });




      });








});
