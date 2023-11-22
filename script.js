function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};









///헤더스크립트

window.onload = function () {

  const burger = document.querySelector(".burgermenus");
  const navi = document.querySelector("nav");
  const header = document.querySelector("header");

  burger.addEventListener("click", function () {
    burger.classList.toggle("act");
    navi.classList.toggle("navopen");
    document.body.classList.toggle('no-scroll');
    navi.classList.toggle("navi-border");
    header.style.boxShadow = "none";
  });

  // let prevScroll = window.pageYOffset;

  // document.addEventListener("scroll", () => {
  //   let currentScroll = window.pageYOffset;

  //   if (currentScroll > 540) {
  //     header.style.boxShadow = "0 0px 20px #ddd";
  //   } else {
  //     header.style.boxShadow = "none";
  //   }
  //   prevScroll = currentScroll;
  // });

};




  ///메인 스와이퍼 스크립트


  window.addEventListener('load', function(){

  let swiper = new Swiper(".mySwiper", {

    loop: true,
    loopedSlides: 1,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 1300,
      disableOnInteraction: false,
    }
  });

});



  //PICK 드래그 스크립트

  window.addEventListener('load', function(){

  let pickContain = document.querySelector(".picks-container");
  let pickWrap = document.querySelector(".picks-wrapper");
  let firstSection = pickWrap.querySelectorAll("div")[0];
  let arrowIcons = document.querySelectorAll(".picks-btn");

  let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;


  const showHideIcons = () => {
    let scrollWidth = pickWrap.scrollWidth - pickWrap.clientWidth;
    arrowIcons[0].style.display = pickWrap.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = pickWrap.scrollLeft == scrollWidth ? "none" : "block";
  }


  arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      let firstSectionWidth = firstSection.clientWidth + (1 / 10 * pickContain.clientWidth);
      pickWrap.scrollLeft += icon.id == "picks-btn-left" ? -firstSectionWidth : firstSectionWidth;
      setTimeout(() => showHideIcons(), 60);
    })
  })


  const autoSlide = () => {
    if (pickWrap.scrollLeft == (pickWrap.scrollWidth - pickWrap.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstSectionWidth = firstSection.clientWidth + (1 / 10 * pickContain.clientWidth);
    let valDifference = firstSectionWidth - positionDiff;

    if (pickWrap.scrollLeft > prevScrollLeft) {
      return pickWrap.scrollLeft += positionDiff > firstSectionWidth / 3 ? valDifference : -positionDiff;
    }
    pickWrap.scrollLeft -= positionDiff > firstSectionWidth / 3 ? valDifference : -positionDiff;

  }


  let dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = pickWrap.scrollLeft;
  }

  let draggring = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    pickWrap.classList.add("dragging");
    isDragging = true;
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    pickWrap.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  }

  let dragStop = () => {
    isDragStart = false;
    pickWrap.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
  }

  pickWrap.addEventListener("mousedown", dragStart);
  pickWrap.addEventListener("touchstart", dragStart);
  pickWrap.addEventListener("mousemove", draggring);
  pickWrap.addEventListener("touchmove", draggring);
  pickWrap.addEventListener("mouseup", dragStop);
  pickWrap.addEventListener("mouseleave", dragStop);
  pickWrap.addEventListener("touchend", dragStop);

});




  ///////스토리 탭메뉴 스크립트

  window.addEventListener('load', function(){

  const tabList = document.querySelectorAll('.story-tab-menu div');
  const contents = document.querySelectorAll('.story-container img')
  let activeCont = '';

  for (var i = 0; i < tabList.length; i++) {
    tabList[i].addEventListener('click', function (e) {
      e.preventDefault();
      for (var j = 0; j < tabList.length; j++) {
        tabList[j].classList.remove('tabshow');
        contents[j].classList.remove('tabshow');
      }

      this.parentNode.classList.add('is_on');
      activeCont = this.getAttribute('href');
      document.querySelector(activeCont).classList.add('tabshow');

    });
  }

});



  /// EVENT 이미지 자동 슬라이더 스크립트



  // let images = [];
  // let time = 2000;

  // images[0] = 'https://cdn.winix.com/uploadData/bbs/08/brRF3T722U4QRARQrFG3BMHpax8tQb8h8zej8zG1.png';
  // images[1] = 'https://www.winix.com/uploadData/bbs/08/bnkADcSwe3ia3O0vuwUUlaK8At7bgixUsOIZo2YR.jpg';
  // images[2] = 'https://cdn.winix.com/uploadData/bbs/08/CbBMyqx1uomDXWAHsFLLFJ7fAFUQrOLlLhkt9Yec.png';

  // function changeSlide() {
  //   var i = 0;
  //   document.eventslider.src = images[i];
  //   if (i < images.length - 1) {
  //     i++;
  //   }
  //   else {
  //     i = 0;
  //   }
  //   setTimeout("changeSlide()", time);
  // }
  // window.onload = changeSlide;



  // setInterval(function () {
  //   let images = [];
  //   let time = 2000;
  
  //   images[0] = 'https://cdn.winix.com/uploadData/bbs/08/brRF3T722U4QRARQrFG3BMHpax8tQb8h8zej8zG1.png';
  //   images[1] = 'https://www.winix.com/uploadData/bbs/08/bnkADcSwe3ia3O0vuwUUlaK8At7bgixUsOIZo2YR.jpg';
  //   images[2] = 'https://cdn.winix.com/uploadData/bbs/08/CbBMyqx1uomDXWAHsFLLFJ7fAFUQrOLlLhkt9Yec.png';
  
  //   var i = 0;
  //   document.eventslider.src = images[i];
  //   if (i < images.length - 1) {
  //     i++;
  //   }
  //   else {
  //     i = 0;
  //   }
  
  //   }, 1500);







