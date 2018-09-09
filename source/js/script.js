(function () {
  var navToggle = document.querySelector(".page-header__nav-toggle");
  var mainNavList = document.querySelector(".main-nav__list");

  navToggle.classList.add("page-header__nav-toggle--js-visible");
  mainNavList.classList.add("main-nav__list--js-hidden");

  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("page-header__nav-toggle--open");
    navToggle.classList.toggle("page-header__nav-toggle--close");
    mainNavList.classList.toggle("main-nav__list--js-hidden");
  });

  var orderForm = document.querySelector(".order");
  var requiredInputs = document.querySelectorAll("[required]");
  var submitButton = document.querySelector(".order__button");

  if (orderForm) {
    submitButton.addEventListener("click", function() {
      for (var i = 0; i < requiredInputs.length; i++) {
        var input = requiredInputs[i];
        if (input.checkValidity() == false) {
          input.classList.add("order__inpt-invalid");
        }
      }
    });
  }

  //map
  var contactsMapImg = document.querySelector(".contacts__map-img");
  var contactsMapPin = document.querySelector(".contacts__map-pin");
  contactsMapImg.style.display = "none";
  contactsMapPin.style.display = "none";

  var getMapConfig = function () {
    if (window.innerWidth >= 1300) {
      return {
        center: [59.93902464, 30.31901718],
        iconImageSize: [110, 94],
        iconImageOffset: [-55, -94],
        zoom: 17
      };
    }
    else if (window.innerWidth >= 768) {
      return {
        center: [59.93886453, 30.32323513],
        iconImageSize: [110, 94],
        iconImageOffset: [-55, -94],
        zoom: 18
      };
    }
    else {
      return {
        center: [59.93886453, 30.32323513],
        iconImageSize: [53, 45],
        iconImageOffset: [-26, -45],
        zoom: 17
      };
    }
  };

  var myMap,
    curConfig = getMapConfig();

  ymaps.ready(initMap);

  function initMap() {
    myMap = new ymaps.Map("map", {
      center: curConfig.center,
      zoom: curConfig.zoom,
      controls: [],
      scrollZoom: false
    });
    myMap.behaviors.disable("scrollZoom");

    myPlacemark = new ymaps.Placemark([59.93877301, 30.32321367], {}, {
      iconLayout: "default#image",
      iconImageHref: "/img/map-pin.png",
      iconImageSize: curConfig.iconImageSize,
      iconImageOffset: curConfig.iconImageOffset
    });
    myMap.geoObjects.add(myPlacemark);
  }

  window.addEventListener("resize", function () {
    curConfig = getMapConfig();
    myMap.setCenter(curConfig.center, curConfig.zoom);
  });
})();
