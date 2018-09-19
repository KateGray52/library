console.log("connected");

$(document).ready(function() {


  // function removeElement(elementId) {
  //   // Removes an element from the document
  //   var element = document.getElementById(elementId);
  //   element.parentNode.removeChild(element);
  // };



  $(".accordionDisplay").click(function () {
    var acc = $(this);
    var i;
    for (i = 0; i < acc.length; i++) {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
    };
  });




  // $(".openBtn").click(function () {
  //   document.getElementById("mySidenav").style.width = "30%";
  //    document.getElementById("main").style.marginLeft = "30%";
  // });
  $(".openBtn").click(function () {
     document.getElementById("list").style.display = "block";
     document.getElementById("list").style.padding = "0";
      document.getElementById("main").style.marginLeft = "30%";
  });

  $("#closeBtn").click(function () {
     document.getElementById("list").style.display = "none";
      document.getElementById("main").style.marginLeft = "0";
  });



  $(function(){
        $(document).on('click','input[type=text]',function(){ this.select(); });
    });

  $("#buttonForSearch").click(function () {
    $("#sideList").html("");

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
            var bookSrc = responsetext[index].volumeInfo.imageLinks.thumbnail;

          addDiv(bookAuthor, bookTitle, bookSrc, index);
          //end of response loop
            });
        //end of response
        }
        //end of ajax
        });
      };


    function addDiv(author, bookTitle, bookImg, index) {

      var ListRef = document.getElementById('list')

      var infoNodeDiv = document.createElement("div");
      infoNodeDiv.setAttribute("class", "pure-u-3-4")
      var bookpara = document.createElement("h5");
      bookpara.setAttribute("class", "email-name")
      var authorpara = document.createElement("p");
      authorpara.setAttribute("class", "email-desc")
      var booknode=document.createTextNode(bookTitle);
      var authornode=document.createTextNode(author);
      bookpara.appendChild(booknode);
      authorpara.appendChild(authornode);

      infoNodeDiv.appendChild(bookpara);
      infoNodeDiv.appendChild(authorpara);


      //make image for table list
      var imgDivPure = document.createElement("div");
      imgDivPure.setAttribute('class', "pure-u" )
      var imgForList = document.createElement("IMG");
      imgForList.setAttribute('src', bookImg);
      imgForList.setAttribute('class', 'email-avatar');
      // imgForList.setAttribute('id', 'imageId' + index);
      document.body.appendChild(imgForList);
      imgDivPure.appendChild(imgForList);


      // var newSelectBtn = document.createElement("BUTTON");
      // newSelectBtn.addEventListener("click", function(){
      //   var el = $(this);
      //
      //   var imgsibling = (el).siblings('img');
      //
      //   var GalleryDiv = document.getElementById('bookImgMain');
      //   var newDivImg = document.createElement('div');
      //   newDivImg.setAttribute('class', "media");
      //   var clonedImg =(imgsibling).clone().removeClass().addClass('imgClassForGallery');
      //   console.log("testing clone 1", clonedImg);
      //   document.body.append(clonedImg);
      //   console.log("testing clone 2", clonedImg);
      //   $(clonedImg).appendTo(newDivImg);
      //   console.log("testing newDivimg", newDivImg);
      //
      //   // $(GalleryDiv).append(newDivImg);
      //   $(GalleryDiv).prepend(newDivImg);
      // });
      //
      // var newselectnode = document.createTextNode("select");
      // newSelectBtn.appendChild(newselectnode);
      // document.body.appendChild(newSelectBtn);

      var newDivWrapper = document.createElement('div');
      newDivWrapper.setAttribute('class', "email-item pure-g");
      // newDivWrapper.id = 'container'+index;
      newDivWrapper.appendChild(imgDivPure);
      newDivWrapper.appendChild(infoNodeDiv);
      // newDivWrapper.appendChild(newSelectBtn);

      ListRef.appendChild(newDivWrapper);

  };


//end of document ready
});
