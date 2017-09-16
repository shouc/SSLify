(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)+45 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();



$(document).ready(function() {
    $('.scroll1').click(function(){
        $('html, body').animate({scrollTop:$('#tutorial').position().top}, 'slow');
        return false;
    });
});
function alrtinfo(){
  swal({
        title: 'About us',
        html: "Hi! This system is developed by Shou and supported by his school! The source code can be found <a href='https://github.com/InvidHead/SSLify'>here</a>. <br><strong>Extremely easy to deploy!</strong>" 
  })
}
function alrtintro(){
  swal({
        title: 'Detailed Introduction',
        html: "<p><b>SSLify.tech</b> is a means for developers to test against valid SSL certificates without the bother of purchasing them. A wildcard SSL certificate for *.sslify.tech and the corresponding key, both downloadable from cert/ Install the certificate and key on the server, modify the server's configuration to use the certificate and key, and restart the daemon. After that, browse the server using the SSLify.tech hostname via HTTPS (e.g.<a href='https://bla.SSLify.tech'>https://bla.SSLify.tech</a>) and receive a valid SSL connection (green lock), all in a matter of seconds." 
  })
}
function alrt(){
  swal.setDefaults({
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    animation: false,
    progressSteps: ['1', '2']
  })

  var steps = [
    {
      input: 'select',
      title: 'Record type!',
      text: "If your server provider gives you the IP, you'd better choose A and vice versa.",
      inputOptions: {
        'CNAME': 'CNAME',
        'A': 'A',
      },
    },
    {
      input: 'text',
      title: 'Server info!',
      text: "Please input your sever's hostname or IP",
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value.indexOf(".")!=-1) {
            resolve()
          } else {
            reject('Please correctly input the information!')
          }
        })
      }
    }
  ]

  swal.queue(steps).then(function (result) {
    swal.resetDefaults()
    var xmlHttp = new XMLHttpRequest();
    var url = "/api/"+result[0]+"/"+result[1]+"/";
    xmlHttp.open( "GET", url , false ); 
    // false for synchronous request
    xmlHttp.send( null );
    obj = JSON.parse(xmlHttp.responseText);
    if (obj.type == "success"){
      swal({
        type: 'success',
        title: 'Enjoy!!!',
        html: obj.message 
      })
    }
    else{
      swal({
        type: 'error',
        title: 'Failed!!!',
        html: obj.message 
      })
    }
    
  }, function () {
    swal.resetDefaults()
  })
}

