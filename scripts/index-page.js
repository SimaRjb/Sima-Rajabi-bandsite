const commentsArray = [
  {
    name: "Connor Walton",
    timestamp: "02/17/2021",
    text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    timestamp: "01/09/2021",
    text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    timestamp: "12/20/2020",
    text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

// Function to create a comment element
const createCommentElement = (comment) => {
  const commentElement = document.createElement("li");
  commentElement.classList.add("comment");

  // Comment Avatar
  const avatarWrapper = document.createElement("div");
  avatarWrapper.classList.add("comment__avatar-wrapper");
  const avatar = document.createElement("div");
  avatar.classList.add("comment__avatar");
  avatarWrapper.appendChild(avatar);
  commentElement.appendChild(avatarWrapper);

  // Comment Content
  const content = document.createElement("div");
  content.classList.add("comment__content");

  // Comment Head
  const head = document.createElement("div");
  head.classList.add("comment__head");
  const author = document.createElement("p");
  author.classList.add("comment__author");
  author.textContent = comment.name;
  const headRight = document.createElement("div");
  headRight.classList.add("comment__head-right");
  const date = document.createElement("p");
  date.classList.add("comment__date");
  date.textContent = comment.timestamp;
  headRight.appendChild(date);
  head.appendChild(author);
  head.appendChild(headRight);
  content.appendChild(head);

  // Comment Text
  const text = document.createElement("div");
  text.classList.add("comment__text");
  const paragraph = document.createElement("p");
  paragraph.classList.add("comment__par");
  paragraph.textContent = comment.text;
  text.appendChild(paragraph);
  content.appendChild(text);

  commentElement.appendChild(content);

  return commentElement;
};

// Function to render all comments on the page
const renderComments = () => {
  const commentsList = document.querySelector(".comments__list");
  commentsList.innerHTML = ""; // Clear existing comments

  commentsArray.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsList.appendChild(commentElement);
  });
};

// Event listener for form submission
const form = document.getElementById("comment-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  const userName = document.querySelector(".form__name").value;

  const userComment = document.querySelector(".form__comment").value;
  const timestamp = new Date().toLocaleDateString(); // Use the current date as timestamp

  // Construct a new comment object
  const newComment = { name: userName, timestamp, text: userComment };

  // Push the new comment to the array
  commentsArray.unshift(newComment);
  // Clear input fields
  document.querySelector(".form__name").value = "";
  document.querySelector(".form__comment").value = "";

  // Re-render all comments on the page
  renderComments();
});

// Initial rendering of default comments
renderComments();
