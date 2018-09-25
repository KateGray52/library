console.log("connected");

$(document).ready(function() {


  // newEditBtn.addEventListener("click", function() {
  //   var x = document.getElementsByClassName("catogories");
  //   if (x.contentEditable == "true") {
  //       x.contentEditable = "false";
  //       newEditBtn.innerHTML = "Edit";
  //   } else {
  //       x.contentEditable = "true";
  //       newEditBtn.innerHTML = "Save";
  //   }
  // });


  var newDelBtn = document.createElement("BUTTON");
  newDelBtn.addEventListener("click", function() {
  document.getElementById('tableId').deleteRow(this.parentNode.parentNode.rowIndex)
  });
  var newDelete = document.createTextNode("Delete");
  newDelBtn.appendChild(newDelete);
  // document.body.appendChild(newDelBtn);



  $(".deleteBtn").click(function () {
    $(this).closest("div").remove();
  });


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



  $(function(){
        $(document).on('click','input[type=text]',function(){ this.select(); });
    });

  $("#buttonForSearch").click(function () {
    // $("#list").html("");
    $('#list :not(:first-child)').remove();
    // $('#list:not(:first-child)').html("");

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

            var bookCat = responsetext[index].volumeInfo.categories;
            var bookInfo = responsetext[index].volumeInfo.infoLink;
            // console.log(bookCat);
            // console.log(bookInfo);


          addDiv(bookAuthor, bookTitle, bookSrc, index, bookCat, bookInfo);
          //end of response loop
            });
        //end of response
        }
        //end of ajax
        });
      };


    function addDiv(author, bookTitle, bookImg, index, bookCat, bookInfo) {

      var ListRef = document.getElementById('list')

      var infoNodeDiv = document.createElement("div");
      infoNodeDiv.setAttribute("class", "infogroup")

      var bookpara = document.createElement("div");
      bookpara.setAttribute("class", "email-name")
      bookpara.setAttribute("style", "font-weight: bold")

      var authorpara = document.createElement("div");
      authorpara.setAttribute("class", "email-desc")
      var booknode=document.createTextNode(bookTitle);
      var authornode=document.createTextNode(author);
      bookpara.appendChild(booknode);
      authorpara.appendChild(authornode);


      var infolinkpara = document.createElement("A");
      var infonode=document.createTextNode("Info");
      infolinkpara.setAttribute("href", bookInfo);
      infolinkpara.setAttribute("style", "border-bottom: none");
      infolinkpara.appendChild(infonode);


      var catpara = document.createElement("div");
      catpara.setAttribute("class", "catpara")
      catpara.setAttribute("style", "font-style: italic;")
      var catnode=document.createTextNode(bookCat);
      catpara.appendChild(catnode);
      // infopara.appendChild(infonode);

      infoNodeDiv.appendChild(bookpara);
      infoNodeDiv.appendChild(authorpara);
      infoNodeDiv.appendChild(catpara);
      infoNodeDiv.appendChild(infolinkpara);


      //make image for table list
      var imgDivPure = document.createElement("div");
      imgDivPure.setAttribute('class', "pure-u" )
      var imgForList = document.createElement("IMG");
      imgForList.setAttribute('src', bookImg);
      imgForList.setAttribute('class', 'email-avatar');
      // imgForList.setAttribute('id', 'imageId' + index);
      document.body.appendChild(imgForList);
      imgDivPure.appendChild(imgForList);


      var newSelectBtn = document.createElement("BUTTON");
      newSelectBtn.setAttribute("class", "button small")
      newSelectBtn.setAttribute("style", "margin-top: 8rem;")





      newSelectBtn.addEventListener("click", function(){
        var el = $(this);
        console.log(el);

        var imgparent = (el).parent();
        var imgsibling = (imgparent).children('.pure-u');
        var imgInDiv = (imgsibling).children('img');

        var infoSibling =  (imgparent).children('.infogroup');
        console.log(infoSibling);
        var infoChildren =  (infoSibling).children();
          console.log(infoChildren);

        var GalleryDiv = document.getElementById('bookImgMain');


        var newDivImg = document.createElement('div');
        newDivImg.setAttribute('class', "booksMedia accordionDisplay");

        $(newDivImg).click(function () {
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


        var clonedImg =(imgInDiv).clone().removeClass().addClass('pure-img-responsive');
        document.body.append(clonedImg);
        $(clonedImg).appendTo(newDivImg);

        var newDeleteIcon = document.createElement('i');
        newDeleteIcon.setAttribute('class', "fa fa-times deleteBtn");
        $(newDeleteIcon).click(function () {
          $(this).closest("div").remove();
        });
        // document.body.append(newDeleteIcon);
        $(newDeleteIcon).appendTo(newDivImg);



        var newPanelDiv = document.createElement('div');
        newPanelDiv.setAttribute('class', "panel booksMedia panel");
        var clonedInfo = (infoChildren).clone();

        $(clonedInfo).appendTo(newPanelDiv);
        $(GalleryDiv).prepend(newPanelDiv);
        $(GalleryDiv).prepend(newDivImg);

      });

      var newselectnode = document.createTextNode("select");
      newSelectBtn.appendChild(newselectnode);
      document.body.appendChild(newSelectBtn);

      var newDivWrapper = document.createElement('div');
      newDivWrapper.setAttribute('class', "infowrapper");
      newDivWrapper.setAttribute('style', "display: inline-flex; margin-top: .5rem; border-bottom: .15em solid #3d444963;");
      // newDivWrapper.id = 'container'+index;
      newDivWrapper.appendChild(imgDivPure);
      newDivWrapper.appendChild(infoNodeDiv);
      newDivWrapper.appendChild(newSelectBtn);

      ListRef.appendChild(newDivWrapper);

  };


//end of document ready
});
