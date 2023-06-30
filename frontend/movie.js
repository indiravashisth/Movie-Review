const url = new URL(location.href); // url object is created and now certain parts of it can be accessed
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = "http://localhost:5000/api/v1/reviews/";

const main = document.getElementById("section");
const title = document.getElementById("movie-title");

console.log(title);
title.innerText = `Reviews for ${movieTitle}`;
//"saveReview('new_review', 'new_user')"

returnReviews(APILINK);
function test(review, user) {
  alert(`nothing wrong here ${review}`);
}
function returnReviews(url) {
  fetch(url + "movie/" + movieId)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
      data.forEach((review) => {
        const div_card = document.createElement("div");
        div_card.setAttribute("class", "review-card");
        div_card.innerHTML = `
          <div class="row">
            <div class="column">
              <div class="card2" id="${review._id}">
                <p><strong>${review.user}</strong></p>
                <p>${review.review}</p>
                <p>
                <a href="#" onclick="editReview('${review._id}','${review.review}', '${review.user}')">✏️</a> 
                <a href="#" onclick="deleteReview('${review._id}')">🗑</a>
                </p>
              </div>
            </div>
          </div>
        `;

        main.appendChild(div_card);
      });
    });
}

const div_new = document.createElement("div");
div_new.setAttribute("class", "review-card");
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card2">
          <p><strong class="new-review">New Review</strong></p>
          <p><strong>Name: </strong>
            <input type="text" id="new_user" value="">
          </p>
          <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
          </p>
          <p><a href="#" onclick="saveReview('new_review', 'new_user')">💾</a>
          </p>
      </div>
    </div>
  </div>
`;
main.appendChild(div_new);

function editReview(id, review, user) {
  const element = document.getElementById(id);
  const reviewInputId = "review" + id;
  const userInputId = "user" + id;

  element.innerHTML = `
              <p><strong>Review: </strong>
                <input type="text" id="${reviewInputId}" value="${review}">
              </p>
              <p><strong>User: </strong>
                <input type="text" id="${userInputId}" value="${user}">
              </p>
              <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
              </p>
  
  `;
}

function saveReview(reviewInputId, userInputId, id = "") {
  //   console.log(review);
  console.log(userInputId);
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;
  console.log(review);
  console.log(user);
  if (id != "") {
    fetch(APILINK + id, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, review: review }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  } else {
    fetch(APILINK + "new", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, review: review, movieId: movieId }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  }
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      location.reload();
    });
}
