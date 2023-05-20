var sizes = ["S", "M", "L"];
var basketCounter = 0;
var basketCounterDefault = $("<div></div>")
  .addClass("basket-counter")
  .text(basketCounter);

var borderContainer = $("<div></div>").addClass(
  "footer-border d-flex justify-content-center align-items-center gap-2"
);
var footerPlusIcon = $("<i />").addClass("footer-plus fa-solid fa-plus");
var footerPlusIconCount = $("<div></div>")
  .addClass(
    "footer-border d-flex justify-content-center align-items-center gap-2"
  )
  .append($("<i />").addClass("footer-plus counter fa-solid fa-plus"));
var footerMinusIcon = $("<div></div>")
  .addClass("footer-border d-flex justify-content-center align-items-center")
  .append($("<i />").addClass("footer-minus fa-solid fa-minus"));
var footerMinusIconClose = $("<div></div>")
  .addClass("footer-border d-flex justify-content-center align-items-center")
  .append($("<i />").addClass("footer-minus fa-solid fa-minus"));
// var footerMinusIconHtml =
//   "<i onclick='deleteBasket' class= 'footer-minus fa-solid fa-minus'/>";
var footerHeartIcon = $("<i />").addClass(
  "footer-heart fa-regular fa-heart ms-auto not-liked"
);
var footerCartIcon = $("<i />").addClass(
  "cart-close-icon fa-solid fa-bag-shopping"
);
// var footerHeartIconHtml =
//   "<i onclick='likeItem' class= 'footer-heart fa-regular fa-heart ms-auto not-liked'/>";
var footerText = $("<div></div>").addClass("footer-text");
// var footerTextHtml = '<div class="footer-text">ADD TO BASKET</div>';
var footer = $(".basket-section");

var footerWrapper = $("<div></div>").addClass(
  "footer-wrapper container-fluid d-flex align-items-center gap-2"
);

var footerWrapperHtml = $(
  "<div class='footer-wrapper container-fluid d-flex align-items-center'></div>"
);

function footerWrapperDefault() {
  return $(footerWrapperHtml)
    .empty()
    .removeClass()
    .off("click")
    .addClass("footer-wrapper container-fluid d-flex align-items-center gap-2")
    .append(footerPlusIcon.on("click", openBasket))
    .append(footerText.text("ADD TO BASKET"))
    .append(footerHeartIcon.on("click", likeItem).addClass("mt-1"))
    .addClass("gap-2");
}
function footerWrapperCartEmpty() {
  return $(footerWrapperHtml)
    .empty()
    .removeClass()
    .append(footerCartIcon.addClass("mt-2"))
    .append(footerText.text("CONTINUE SHOPPING").addClass("mt-1"))
    .removeClass()
    .addClass(
      "footer-wrapper empty-cart-footer container-fluid d-flex align-items-center  gap-4 justify-content-center"
    )
    .on("click", closeCart);
}
function footerWrapperCartFilled() {
  return $(footerWrapperHtml)
    .empty()
    .removeClass()
    .append(footerCartIcon.addClass("mt-2"))
    .append(footerText.text("BUY NOW").addClass("mt-1"))
    .removeClass()
    .addClass(
      "filled-cart-footer container-fluid d-flex align-items-center gap-4 justify-content-center"
    );
}

var itemsWrapper = $(".items-wrapper");

var item = {
  title: "MOHAN",
  desc: "Recycle Boucle Knit Cardigan Pink",
  price: 120,
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
    .append(
      $("<div></div>")
        .addClass("item-price")
        .text("$" + item.price)
    );
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
    .closest(".footer-wrapper")
    .empty()
    .append(footerMinusIcon.on("click", deleteBasket))
    .append(basketCounterDefault)
    .append(footerPlusIconCount.on("click", addBasket))
    .removeClass()
    .addClass(
      "footer-wrapper container-fluid d-flex align-items-center justify-content-center gap-4"
    );
  $(".basket-counter").text(basketCounter);
}
function addBasket() {
  basketCounter++;
  console.log(basketCounter);

  $(".basket-counter").text(basketCounter);
}

function closeBasket() {
  $(this).closest(".footer-wrapper").empty().append(footerWrapperDefault());
}

function deleteBasket() {
  if (basketCounter > 1) {
    basketCounter--;
    $(".basket-counter").text(basketCounter);
  } else if (basketCounter == 1) {
    // debugger;
    $(this).closest(".footer-wrapper").empty();
    basketCounter = 0;
    closeBasket();
  }
}

function openCart() {
  $(".item-section").hide();
  $(".cart-section").slideDown().removeClass("hidden");
  footer.empty();
  cartWrapper(basketCounter);
  if (basketCounter > 0) {
    $(".cart-wrapper").append(footerWrapperCartFilled());
  } else {
    $(".cart-wrapper").append(footerWrapperCartEmpty());
  }
  $("<hr></hr>").addClass("subtotal-border").insertAfter(".item-options");
  $("<div></div>")
    .addClass("subtotal-wrapper d-flex flex-column gap-3")
    .append(
      $("<div></div>")
        .addClass("subtotal-header d-flex")
        .append($("<div></div>").addClass("subtotal-title").text("SUB TOTAL"))
        .append(
          $("<div></div>")
            .addClass("subtotal-price ms-auto")
            .text("$" + item.price * basketCounter)
        )
    )
    .append(
      $("<div></div>")
        .addClass("subtotal-desc")
        .text(
          "*shipping charges, taxes and discount codes are calculated at the time of accounting."
        )
    )
    .insertAfter(".subtotal-border");

  //add subtotal part
}
function closeCart() {
  $(".item-section").show();
  $(".cart-section").slideUp().addClass("hidden");
  $(".subtotal-wrapper").empty();
  // alert();

  //after i close cart, footer doesn't go to normal

  footer.append(footerWrapperDefault());
  $(".items-wrapper").append($(".item-options"));

  // $(footer).append(footerWrapperDefault().on("click", closeCart));
}
function incrementCounter() {
  basketCounter++;
  $(".cart-item-price").text("$" + item.price * basketCounter);

  $(".cart-item-counter-text").text(basketCounter);
}
function decrementCounter() {
  if (basketCounter > 1) {
    basketCounter--;
    $(".cart-item-price").text("$" + item.price * basketCounter);
    $(".cart-item-counter-text").text(basketCounter);
  }
}
function itemCartWrapper() {
  return $("<div></div>")
    .addClass("d-flex cart-item-wrapper gap-3")
    .append(
      $("<div></div>")
        .addClass("cart-item-img")
        .append(
          $("<img />")
            .addClass("img-fluid")
            .attr("src", "assets/images/jacket.png")
        )
    )
    .append(
      $("<div></div>")
        .addClass("cart-item-body d-flex flex-column gap-2 ")
        .append($("<div></div>").addClass("cart-item-title").text(item.title))
        .append($("<div></div>").addClass("cart-item-desc").text(item.desc))
        .append(
          $("<div></div>")
            .addClass(
              "cart-item-counter-wrapper container d-flex align-items-center gap-3"
            )
            .append(
              $("<div></div>")
                .addClass(
                  "cart-item-counter-border d-flex justify-content-center align-items-center"
                )
                .append(
                  $("<i />").addClass(
                    "cart-item-counter-minus fa-solid fa-minus"
                  )
                )
                .on("click", decrementCounter)
            )
            .append(
              $("<div></div>")
                .addClass("cart-item-counter-text")
                .text(basketCounter)
            )
            .append(
              $("<div></div>")
                .addClass(
                  "cart-item-counter-border d-flex justify-content-center align-items-center gap-2"
                )
                .append(
                  $("<i />").addClass("cart-item-counter-plus fa-solid fa-plus")
                )
                .on("click", incrementCounter)
            )
        )
        .append(
          $("<div></div>")
            .addClass("cart-item-price")
            .text("$" + item.price)
        )
    );
}

// function cartWrapperClear() {
//   $(".cart-title").removeClass().addClass("empty");
//   $(".cart-wrapper")
//     .addClass("empty")
//     .append(
//       $("<p></p>")
//         .addClass("empty-cart-text m-0 p-0")
//         .text(" You have no items in your Shopping Bag.")
//     );
// }
function cartWrapper(count) {
  if (count == 0) {
    $(".cart-title").removeClass().addClass("card-title empty");
    $(".cart-wrapper")
      .empty()
      .removeClass()
      .addClass("cart-wrapper empty")
      .append(
        $("<p></p>")
          .addClass("empty-cart-text m-0 p-0")
          .text(" You have no items in your Shopping Bag.")
      );
  } else {
    $(".cart-title").removeClass().addClass("cart-title not-empty");
    $(".cart-wrapper")
      .empty()
      .removeClass()
      .addClass("cart-wrapper not-empty")
      .append(itemCartWrapper())
      .append($(".item-options"));
  }
}

function openSideMenu() {
  $(".sidemenu").slideDown().removeClass("hidden");
  $(".item-section").hide();
  $(".basket-section").hide();
  sideItemAdd(6);
}

function closeSideMenu() {
  $(".sidemenu").slideUp().addClass("hidden");
  $(".item-section").show();
  $(".basket-section").show();
}

function sideItemAdd(count) {
  for (let index = 0; index < count; index++) {
    //count henaaa gabet problemmm
    $(".sidemenu-list").append(
      $(
        '<div class="sidemenu-item d-flex p-4 justify-content-between"> <div class="sidemenu-item-text">New</div> <div class="sidemenu-item-arrow"> <img src="assets/images/arrow-down.png" alt="arrow down" /> </div></div>'
      )
    );
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

  footer.append(footerWrapperDefault());

  //cart basics
  $(".cart-open-icon").on("click", openCart);
  $(".cart-close-icon").on("click", closeCart);

  // SIDEMENU PART
  //
  //
  //
  //
  //
  //
  //
  $(".sidemenu-toggler").on("click", openSideMenu);
  $(".sidemenu-close-icon").on("click", closeSideMenu);
});
