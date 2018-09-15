console.log("connected");

$(document).ready(function() {


  $("#buttonForSearch").click(function () {
    var searchInput  = $("#searchBooks").val();
    var numberResponse = "6";
    var bookApiSearch ="https://www.googleapis.com/books/v1/volumes?q=" + searchInput + "&maxResults=" + numberResponse;
    console.log(bookApiSearch);
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

      var ListRef = document.getElementById('sideList')
      var node=document.createElement("LI");

      // book and author nodes
      var bookpara = document.createElement("p");
      var authorpara = document.createElement("p");
      var booknode=document.createTextNode(bookTitle);
      var authornode=document.createTextNode(author);
      bookpara.appendChild(booknode);
      authorpara.appendChild(authornode);


      //make image for table list
      var imgForList = document.createElement("IMG");
      imgForList.setAttribute('src', bookImg);
      imgForList.setAttribute('class', 'left');
      imgForList.setAttribute('id', 'imageId' + index);
      var imDiv = document.createTextNode("img");
      imgForList.appendChild(imDiv);
      document.body.appendChild(imgForList);


      var newSelectBtn = document.createElement("BUTTON");
      newSelectBtn.addEventListener("click", function(){
      console.log(this.parentNode.parentNode)
      });
      var newselectnode = document.createTextNode("select");
      newSelectBtn.appendChild(newselectnode);
      document.body.appendChild(newSelectBtn);

      var newDivWrapper = document.createElement('li');
      newDivWrapper.id = 'container'+index;
      newDivWrapper.appendChild(imgForList);
      newDivWrapper.appendChild(bookpara);
      newDivWrapper.appendChild(authorpara);
      newDivWrapper.appendChild(newSelectBtn);

      node.appendChild(newDivWrapper);
      ListRef.appendChild(newDivWrapper);

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
