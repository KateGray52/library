console.log("connected");

$(document).ready(function() {


  $("#buttonForSearch").click(function () {
    var searchInput  = $("#searchBooks").val();
    var numberResponse = "2";
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
      imgForList.setAttribute('class', 'picClass');
      // imgForList.setAttribute('id', 'imageId' + index);
      var imDiv = document.createTextNode("img");
      imgForList.appendChild(imDiv);
      document.body.appendChild(imgForList);


      var newSelectBtn = document.createElement("BUTTON");
      newSelectBtn.addEventListener("click", function(){
        var el = $(this);
        console.log("el test", el);
        console.log((el).parent().closest('div'));
        var parentDiv = ($(el).parent().closest('div'));
        console.log("parent div test", parentDiv);

        var imgsibling = (el).siblings('.picClass');
        var psibling = (el).siblings('p');
        console.log("img siblings test", imgsibling);
        console.log("psiblings test", psibling);

        var GalleryDiv = document.getElementById('bookImgMain');
        var newDivImg = document.createElement('div');
        newDivImg.setAttribute('class', "media");
        var clonedImg = $(imgsibling).clone().removeClass('.picClass');
        console.log("testing clone 1", clonedImg);
        document.body.append(clonedImg);
        console.log("testing clone 2", clonedImg);
        $(clonedImg).appendTo(newDivImg);
        console.log("testing newDivimg", newDivImg);

        $(GalleryDiv).append(newDivImg);



      });

      var newselectnode = document.createTextNode("select");
      newSelectBtn.appendChild(newselectnode);
      document.body.appendChild(newSelectBtn);

      var newDivWrapper = document.createElement('div');
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
