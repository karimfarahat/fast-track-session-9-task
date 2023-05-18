var sizes = ["S", "M", "L"];
var basketCounter = 0;
var basketCounterDefault = $("<div></div>")
  .addClass("basket-counter")
  .text(basketCounter);

var borderContainer = $("<div></div>").addClass(
  "footer-border d-flex justify-content-center align-items-center gap-2"
);
var footerPlusIcon = $("<i />")
  .addClass("footer-plus fa-solid fa-plus")
  .click(openBasket);
var footerPlusIconCount = $("<div></div>")
  .addClass(
    "footer-border d-flex justify-content-center align-items-center gap-2"
  )
  .append(
    $("<i />").addClass("footer-plus counter fa-solid fa-plus").click(addBasket)
  );
var footerMinusIcon = $("<div></div>")
  .addClass("footer-border d-flex justify-content-center align-items-center")
  .append(
    $("<i />").addClass("footer-minus fa-solid fa-minus").click(deleteBasket)
  );
var footerMinusIconClose = $("<div></div>")
  .addClass("footer-border d-flex justify-content-center align-items-center")
  .append(
    $("<i />").addClass("footer-minus fa-solid fa-minus").click(closeBasket)
  );
// var footerMinusIconHtml =
//   "<i onclick='deleteBasket' class= 'footer-minus fa-solid fa-minus'/>";
var footerHeartIcon = $("<i />")
  .addClass("footer-heart fa-regular fa-heart ms-auto not-liked")
  .click(likeItem);
// var footerHeartIconHtml =
//   "<i onclick='likeItem' class= 'footer-heart fa-regular fa-heart ms-auto not-liked'/>";
var footerText = $("<div></div>").addClass("footer-text").text("ADD TO BASKET");
// var footerTextHtml = '<div class="footer-text">ADD TO BASKET</div>';
var footer = $(".basket-section");

var footerWrapper = $("<div></div>").addClass(
  "footer-wrapper container d-flex align-items-center gap-2"
);

var footerWrapperHtml = $(
  "<div class='footer-wrapper container d-flex align-items-center'></div>"
);

var footerWrapperDefault = $(footerWrapperHtml)
  .append(footerPlusIcon)
  .append(footerText)
  .append(footerHeartIcon)
  .addClass("gap-2");

var itemsWrapper = $(".items-wrapper");

var item = {
  title: "MOHAN",
  desc: "Recycle Boucle Knit Cardigan Pink",
  price: "$120",
};
function imageCreate(number) {
  for (let index = 0; index < number; index++) {
    $("#owl-demo").append(
      $(
        '<div class="item"><img class="item-image img-fluid" src="assets/images/jacket.png" alt="The Last of us"/></div>'
      )
    );
  }
}

function createItem(item) {
  var result = $("<div></div>")
    .addClass("item-body d-flex flex-column gap-1")
    .append($("<div></div>").addClass("item-title").text(item.title))
    .append($("<div></div>").addClass("item-desc").text(item.desc))
    .append($("<div></div>").addClass("item-price").text(item.price));
  return result;
}

function setActiveBlob(element) {
  $(".color-circle-border").remove();
  $(element).append(
    '<div class="rounded rounded-circle border color-circle-border"></div>'
  );
}

function addColorBlob(number) {
  for (let index = 1; index <= number; index++) {
    $(".item-color").append(
      '<div onclick="setActiveBlob(this)" class="rounded rounded-circle color-circle c' +
        index +
        '"></div>'
    );
  }
}

function setSizeBlob() {
  $(".selected").removeClass("selected").addClass("not-selected");
  $(this.closest(".size-blob"))
    .removeClass("not-selected")
    .addClass("selected");
}
function likeItem() {
  if ($(this).hasClass("fa-regular")) {
    $(this).removeClass("fa-regular").addClass("fa-solid");
  } else {
    $(this).removeClass("fa-solid").addClass("fa-regular");
  }
}

function openBasket() {
  basketCounter = 1;
  $(this)
    .parent()
    .empty()
    .append(footerPlusIconCount)
    .append(basketCounterDefault)
    .append(footerMinusIcon)
    .removeClass("gap-2")
    .addClass("justify-content-center gap-3");
  $(".basket-counter").text(basketCounter);
}
function addBasket() {
  // debugger;
  basketCounter++;
  console.log(basketCounter);

  $(".basket-counter").text(basketCounter);
}

function closeBasket() {
  $(this)
    .parent()
    .parent()
    .parent()
    .empty()
    .append(
      $(footerWrapperHtml)
        .append(footerPlusIcon.click(openBasket))
        .append(footerText)
        .append(footerHeartIcon)
        .addClass("gap-2")
    );
}

function deleteBasket() {
  if (basketCounter > 1) {
    basketCounter--;
    $(".basket-counter").text(basketCounter);
  } else if (basketCounter == 1) {
    $(this)
      .parent()
      .empty()
      .append(footerPlusIconCount)
      .append(basketCounterDefault)
      .append(footerMinusIconClose)
      .removeClass("gap-2")
      .addClass("justify-content-center gap-3");
    $(".basket-counter").text(basketCounter);
  }
}

$(document).ready(function () {
  imageCreate(5);
  $("#owl-demo").owlCarousel({
    slideSpeed: 300,
    paginationSpeed: 400,

    items: 1,
    itemsDesktop: false,
    itemsDesktopSmall: false,
    itemsTablet: false,
    itemsMobile: false,
  });

  // debugger;
  var itemHtml = createItem(item);
  $(".item-options").before(itemHtml);
  addColorBlob(3);

  // addSizeBlob(3);

  //adding item size div and 'Size' title to it
  $(".item-options").append(
    $("<div></div>")
      .attr("class", "item-size ms-auto me-5 d-flex gap-2 align-items-center")
      .append($("<p></p>").addClass("m-0 size-title").text("Size"))
  );

  //looping to create a a blob for all sizes
  sizes.forEach((size) => {
    var sizeBlobText = $("<p></p>").attr("class", "m-0 size-letter").text(size);
    var sizeBlob = $("<div></div>")
      .attr(
        "class",
        "rounded rounded-circle text-center size-blob d-flex not-selected align-items-center justify-content-center"
      )
      .click(setSizeBlob)
      .append(sizeBlobText);

    // now append those blobs
    $(".item-size").append(sizeBlob);
  });

  //selecting first blob by default
  setActiveBlob($(".color-circle:first"));
  $(".size-blob:first").addClass("selected").removeClass("not-selected");

  footer.append(footerWrapperDefault);
});
