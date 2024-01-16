import BandSiteApi, { apiKey, baseUrl } from './band-site-api.js';
const bandSiteApi = new BandSiteApi(apiKey);

const formatTimeAgo = (timestamp) => {
  const currentDate = new Date();
  const commentDate = new Date(timestamp);

  const timeDifference = currentDate - commentDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds + (seconds === 1 ? " second ago" : " seconds ago");
  } else if (minutes < 60) {
    return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  } else if (hours < 24) {
    return hours + (hours === 1 ? " hour ago" : " hours ago");
  } else if (days < 30) {
    return days + (days === 1 ? " day ago" : " days ago");
  } else if (months < 12) {
    return months + (months === 1 ? " month ago" : " months ago");
  } else {
    return years + (years === 1 ? " year ago" : " years ago");
  }
};

const postNewComment = async(commentPosted) =>{
  const addedComment = await bandSiteApi.postComment(commentPosted);
}

const fetchDefaultComments = (async () =>{
  const comments = await bandSiteApi.getComments();
  const defaultComments = comments.splice(-3);
  return defaultComments;
});

const fetchAllComments = (async () =>{
  const comments = await bandSiteApi.getComments();
  return comments;
});

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
  date.textContent = formatTimeAgo(comment.timestamp);
  headRight.appendChild(date);
  head.appendChild(author);
  head.appendChild(headRight);
  content.appendChild(head);

  // Comment Text
  const text = document.createElement("div");
  text.classList.add("comment__text");
  const paragraph = document.createElement("p");
  paragraph.classList.add("comment__par");
  paragraph.textContent = comment.comment;
  text.appendChild(paragraph);
  content.appendChild(text);

  commentElement.appendChild(content);

  return commentElement;
};

//haven't used it. but it maybe necessary for any furthur updates on the project
const renderThreeDefaultComments = async () => {
  const commentsList = document.querySelector(".comments__list");
  commentsList.innerHTML = ""; // Clear existing comments
  const defaultComments = await fetchDefaultComments();
  defaultComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsList.appendChild(commentElement);
  });
};

const renderAllComments = async () => {
  const commentsList = document.querySelector(".comments__list");
  commentsList.innerHTML = ""; // Clear existing comments
  const comments = await fetchAllComments();
  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsList.appendChild(commentElement);
  });
};

// Event listener for form submission
const form = document.getElementById("comment-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent page reload

  const userName = document.querySelector(".form__name").value;
  const userComment = document.querySelector(".form__comment").value;

  // Construct a new comment object
  const newComment = { name: userName, comment: userComment };

  await postNewComment(newComment);

  // Clear input fields
  document.querySelector(".form__name").value = "";
  document.querySelector(".form__comment").value = "";

  // Render the new comment on the page
  await renderNewComment();
});


// A function to fetch a single new comment
const fetchNewComment = async () => {
  const comments = await fetchAllComments();
  return comments[0]; // Assuming the latest comment is at index 0
};

// A rendering function for a single new comment
const renderNewComment = async () => {
  const commentsList = document.querySelector(".comments__list");
  const newComment = await fetchNewComment();
  const commentElement = createCommentElement(newComment);

  // Prepend the new comment to the existing list
  commentsList.insertBefore(commentElement, commentsList.firstChild);
};

// Initial rendering of default comments
(async () => {
  await renderAllComments();
})();