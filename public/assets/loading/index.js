function loadingOut(loading) {
  setTimeout(() => loading.out(), 3000);
}

function normal() {
  var loading = new Loading();

  loadingOut(loading);
}

function verticalTextColor() {
  var loading = new Loading({
    title: "JQueryScript",
    titleColor: "rgb(217, 83, 79)",
    discription: "Loading...",
    discriptionColor: "rgb(77, 150, 223)",
    animationOriginColor: "rgb(33, 179, 132)",
    mask: true,
    loadingPadding: "20px 50px",
    defaultApply: true,
  });

  loadingOut(loading);
}

function verticalNoTitle() {
  var loading = new Loading({
    discription: "Loading...",
    defaultApply: true,
  });

  loadingOut(loading);
}

function verticalNoTitleAnddiscription() {
  var loading = new Loading({
    animationOriginColor: "rgb(217, 83, 79)",
    defaultApply: true,
  });

  loadingOut(loading);
}

function verticalBgColor() {
  var loading = new Loading({
    loadingBgColor: "rgb(77, 150, 223)",
    defaultApply: true,
  });

  loadingOut(loading);
}

function verticalImageLoadingAnimation() {
  var loading = new Loading({
    loadingAnimation: "image",
    animationSrc:
      "http://img.lanrentuku.com/img/allimg/1212/5-121204194028.gif",
    defaultApply: true,
  });

  loadingOut(loading);
}

function horizontalNormal() {
  var loading = new Loading({
    direction: "hor",
    defaultApply: true,
  });

  loadingOut(loading);
}

function horizontalCustomStyle() {
  var loading = new Loading({
    title: " Title",
    direction: "hor",
    discription: "Loading...",
    defaultApply: true,
  });

  loadingOut(loading);
}

function horizontalNoTitle() {
  var loading = new Loading({
    direction: "hor",
    discription: "Loading...",
    defaultApply: true,
  });

  loadingOut(loading);
}

function noTransitionAnimation() {
  var loading = new Loading({
    direction: "hor",
    discription: "Loading...",
    animationIn: false,
    animationOut: false,
    defaultApply: true,
  });

  loadingOut(loading);
}
