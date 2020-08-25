$(function () {
  $("#yes").click(function (event) {
    modal("爱笑的姑娘最可爱。(^_^)", function () {
      $(".page_one").addClass("hide");
      $(".page_two").removeClass("hide");
      // typeWrite();
      fireworks();
    });
  });
  $("#no").click(function (event) {
    modal("考你个脑筋急转弯！", A);
  });
});

function A() {
  modal("今天晴空万里，但我的能见度只有1米。", B);
}

function B() {
  modal("为啥？？？", C);
}

function C() {
  modal("因为只能看见你。", D);
}

function D() {
  modal("2020七夕快乐，老公永远爱你🤟", E);
}

function E() {
  modal("愿你开心每一天", F);
}

function F() {
  modal("跟我走吧", G);
}

function G() {
  modal("我会做饭", H);
}

function H() {
  modal("我会暖床", I);
}

function I() {
  modal("爱你。么么哒！", J);
}

function J() {
  modal("急切想下班见到你", k);
}
function k() {
  modal("2020.08.25 七夕 和你在一起", function () {
    fireworks();
  });
}

function fireworks() {
  $(".page_one").addClass("hide");
  initAnimate();
}

function modal(content, callback) {
  var tpl =
    '<div class="container">' +
    '<div class="mask"></div>' +
    '<div class="modal">' +
    "<p>" +
    content +
    "</p>" +
    '<button type="button" id="confirm" class="confirm">哎呦喂</button>' +
    "</div>" +
    "</div>";
  $("body").append(tpl);
  $(document).on("click", ".confirm", function () {
    $(".container").remove();
    callback();
  });
}
