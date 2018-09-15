console.log("connected");

$(document).ready(function() {


      $("#buttonForSearch").click(function () {
       var searchInput  = $("#searchBooks").val();
       var numberResponse = "6";

       var bookApiSearch ="https://www.googleapis.com/books/v1/volumes?q=" + searchInput + "&maxResults=" + numberResponse;
       sendRquest(bookApiSearch)

       });

    function sendRquest(bookApiSearch){
      $.ajax({
        url: bookApiSearch,
        dataType:'json',
        type: 'GET',
        data: "jsonp",
        success:function(response){
        var responsetext = response.items;

          $.each(responsetext, function (index, value) {
            var bookTitle = responsetext[index].volumeInfo.title;
            var bookAuthor = responsetext[index].volumeInfo.authors;
            var bookSrc = responsetext[index].volumeInfo.imageLinks.smallThumbnail;
          addDiv(bookAuthor, bookTitle, bookSrc, index);
          //end of response loop
            });
        //end of response
        }
        //end of ajax
        });
      };


    function addDiv(author, bookTitle, bookImg, index) {
      // var somethingDiv = $( "<div/>", {
      //   class: "bookTitleClass",
      //   id: 'book'+index,
      // });

      var tableRef = document.getElementById('tableId').getElementsByTagName('tbody')[0];
  // Insert a row in the table at the last row
  var newRow   = tableRef.insertRow(tableRef.rows.length);

  // Insert a cell in the row at index 0
  var newImgRow  = newRow.insertCell(0);
  var newTitleRow  = newRow.insertCell(1);
  var newAuthorRow  = newRow.insertCell(2);
  var newBtnRow  = newRow.insertCell(3);


  var newSelectBtn = document.createElement("BUTTON");
  newSelectBtn.addEventListener("click", function() {
  console.log("clicked");
  document.getElementById('tableId').deleteRow(this.parentNode.parentNode.rowIndex)
  });
  var newselect = document.createTextNode("select");
  newSelectBtn.appendChild(newselect);
  document.body.appendChild(newSelectBtn);

  // var imDiv =
  // var img = $('<img id="dynamic">');
  // img.attr('src', bookImg);
  // img.appendTo('#imDiv');



  newImgRow.appendChild(document.createTextNode("img"));
  newTitleRow.appendChild(document.createTextNode(bookTitle));
  newAuthorRow.appendChild(document.createTextNode(author));
  newBtnRow.appendChild(newSelectBtn);






      // $(ptext).appendTo( somethingDiv);
      // $(bookImgDiv).prependTo( somethingDiv);
      // $(somethingDiv).appendTo( ".booksSearchDisplay" );
      // $(selectBtn).appendTo(somethingDiv);

  };

  // button.addEventListener ("click", function() {
  // console.log("did something");
  // });

  // function newButtonClickListener() {
  //
  //     console.log("Hello World");
  //   };

   //  $( ".listSelect" ).click(function() {
   // console.log("Hello World");
   // });



//end of document ready
});
