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

    var tableRef = document.getElementById('tableId').getElementsByTagName('tbody')[0];
  // Insert a row in the table at the last row
    var newRow   = tableRef.insertRow(tableRef.rows.length);
  // Insert a cell in the row at index 0
    var newImgRow  = newRow.insertCell(0);
    var newTitleRow  = newRow.insertCell(1);
    var newAuthorRow  = newRow.insertCell(2);
    var newBtnRow  = newRow.insertCell(3);
    //make and set button for table
    var newSelectBtn = document.createElement("BUTTON");

    newSelectBtn.addEventListener("click", function() {
    console.log("clicked");
    document.getElementById('tableId').deleteRow(this.parentNode.parentNode.rowIndex)
    });
    var newselect = document.createTextNode("select");
    newSelectBtn.appendChild(newselect);
    document.body.appendChild(newSelectBtn);

  //make image for table list
    var imgForList = document.createElement("IMG");
    imgForList.setAttribute('src', bookImg);
    imgForList.setAttribute('id', 'imageId' + index);
    var imDiv = document.createTextNode("img");
    imgForList.appendChild(imDiv);
    document.body.appendChild(imgForList);

    //append elements to table
    newImgRow.appendChild(imgForList);
    newTitleRow.appendChild(document.createTextNode(bookTitle));
    newAuthorRow.appendChild(document.createTextNode(author));
    newBtnRow.appendChild(newSelectBtn);

  };

//end of document ready
});
ld(img);
