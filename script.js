const products = [
  {
    id: 0,
    name: "Огурец",
  },
  {
    id: 1,
    name: "Помидор",
  },
  {
    id: 2,
    name: "Перец",
  },
  {
    id: 3,
    name: "Лук",
  },
];

const maxNumber = (numbers) => {
  let max = 0;
  numbers.forEach((element) => {
    if (element > max) {
      max = element;
    }
  });
  return max;
};

let addReviewcontainerEl = document.querySelector(".addReviewContainer");
let viewReviewContainerEl = document.querySelector(".viewReviewContainer");
let productsSbEl = document.querySelector(".productsSb");
let commentsListEl = document.querySelector(".commentsList");
let commentEl = document.querySelector(".comment");
let delButtonEl = document.querySelector(".delButton");
const buttonEl = document.querySelector(".button");

let commentsList = JSON.parse(localStorage.getItem("comments"));

commentsList.forEach((element) => {
  const newCommentEl = document.createElement("p");
  newCommentEl.textContent =
    products.find((pr) => pr.id === element.idProduct).name +
    ": " +
    element.text;
  const delButtonEl = document.createElement("button");
  delButtonEl.className = "delButton" + element.id;
  delButtonEl.textContent = "Удалить";
  newCommentEl?.appendChild(delButtonEl);
  commentsListEl?.appendChild(newCommentEl);
});

buttonEl?.addEventListener("click", function (e) {
  if (localStorage.getItem("comments")) {
    let comments = JSON.parse(localStorage.getItem("comments"));
    const comment = {
      id: maxNumber(comments.map((c) => c.id)) + 1,
      idProduct: Number(productsSbEl.value),
      text: commentEl.value,
    };
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
    commentEl.value = "";
  } else {
    const comment = {
      id: 0,
      idProduct: Number(productsSbEl.value),
      text: commentEl.value,
    };
    commentEl.value = "";
    localStorage.setItem("comments", JSON.stringify([comment]));
  }
});

viewReviewContainerEl?.addEventListener("click", function (e) {
  if (e.target.tagName === 'SPAN') {
    commentsListEl?.replaceChildren();
    commentsList.forEach((element) => {
      if (
        element.idProduct ===
        products.find((pr) => pr.name === e.target.textContent)?.id
      ) {
        const newCommentEl = document.createElement("p");
        newCommentEl.textContent =
          products.find((pr) => pr.id === element.idProduct).name +
          ": " +
          element.text;
        const delButtonEl = document.createElement("button");
        delButtonEl.className = "delButton" + element.id;
        delButtonEl.textContent = "Удалить";
        newCommentEl?.appendChild(delButtonEl);
        commentsListEl?.appendChild(newCommentEl);
      }
    });
  }  else if (e.target.tagName === 'BUTTON') {
    const idComment = Number(e.target.className[e.target.className.length-1]);
    localStorage.setItem("comments", JSON.stringify(commentsList.filter(c => c.id !== idComment)));
    commentsList = JSON.parse(localStorage.getItem("comments"));
    commentsListEl.removeChild(e.target.parentNode);
  }
});
