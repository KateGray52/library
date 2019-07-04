$(document).ready(function() {

  $(document).on('click', '.deleteBtn', function() {
    var parentDivToRemove = $(this).closest("div");
    $(this).closest("div").remove();
  });


  //click on search input and highlights text
  $(function() {
    $(document).on('click', 'input[type=text]', function() {
      this.select();
    });
  });

  //search button for sidebar input
  $("#buttonForSearch").click(function() {
    $("#list").html("");
    var searchInput = $("#searchBooks").val();
    var numberResponse = "6";
    var bookApiSearch = "https://www.googleapis.com/books/v1/volumes?q=" + searchInput + "&maxResults=" + numberResponse;
    sendRquest(bookApiSearch)
  });

  //Array to check if book is in display, add selected books to
  var ids = new Array();
  var hrefs = new Array();
  $('.text a').each(function() {
    hrefs.push($(this).attr('href'));
  });


  //retrieve info from google books api
  function sendRquest(bookApiSearch) {
    $.ajax({
      url: bookApiSearch,
      dataType: 'json',
      type: 'GET',
      data: "jsonp",
      success: function(response) {
        var responsetext = response.items;

        $.each(responsetext, function(index, value) {
          var bookTitle = responsetext[index].volumeInfo.title;
          var bookAuthor = responsetext[index].volumeInfo.authors;
          var bookSrc = responsetext[index].volumeInfo.imageLinks.thumbnail;
          var bookCat = responsetext[index].volumeInfo.categories;
          var bookInfo = responsetext[index].volumeInfo.infoLink;
          addDiv(bookAuthor, bookTitle, bookSrc, index, bookCat, bookInfo);
          //end of response loop
        });
        //end of response
      }
      //end of ajax
    });
  };

  //sidebar search results
  function addDiv(author, bookTitle, bookImg, index, bookCat, bookInfo) {

    var infoGroupDiv = $("<div class='infogroup'></div>")

    var bookpara = $("<div class='book-name'></div>")
      .text(bookTitle)
      .appendTo(infoGroupDiv);

    var authorpara = $("<div class='author-desc'></div>")
      .text(author)
      .appendTo(infoGroupDiv);

    var infolinkpara = $("<a> Info</a>")
      .attr("href", bookInfo)
      .attr("target", "_blank")
      .appendTo(infoGroupDiv);

    var img = $('<img >')
      .attr('src', bookImg);

    var imgDiv = $("<div class='img-div'></div>");
    imgDiv.append(img);

    //create select button to add to bookcase display, with functions for delete and get info
    var newSelectBtn = $("<button class='button small'>Select</button>")
      .click(function() {

        var isClicked = $(this).text();
        var bookImgMainDiv = document.getElementById('bookImgMain');

        var imgInDiv = $(this).parent().siblings('.img-div').children('img');
        var clonedImg = (imgInDiv).clone();
        var clonedInfo = $(this).siblings().clone();

        // var ids = new Array();
        var selectedHref = ($(this).siblings("a").attr("href"));

        var overlayDiv = $("<div class='overlay'></div>");

        var newTextDiv = $("<div class='text'></div>")
          .append(clonedInfo)
          .appendTo(overlayDiv);

        var newDivImg = $("<div class='booksMedia container'></div>")
          .append(clonedImg)
          .append(overlayDiv);

        var newDeleteIcon = $("<i class='fa fa-times deleteBtn'> </i>")
          .appendTo(newDivImg);


        $(this).text("Added");
        $(this).addClass("add");

        if (hrefs.indexOf(selectedHref) > -1) {
          console.log("is in the array");
          alert("Already in your Bookcase");
        } else {
          $(bookImgMainDiv).prepend(newDivImg);
          hrefs.push(selectedHref);
          console.log("addddd ittt")
          console.log(hrefs.length);
        }

      })


      .appendTo(infoGroupDiv);


    var ListRef = document.getElementById('list');
    var newDivWrapper = $("<div class='infowrapper'></div>")
      .append(imgDiv, infoGroupDiv)
      .appendTo(ListRef);

  };

  //end of document ready
});;
