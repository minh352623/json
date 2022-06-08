//áp dụng cho add cart dc

//https://jsonplaceholder.typicode.com/guide/
//https://github.com/typicode/json-server#getting-started

// function addPost(title,author) {
//   fetch("http://localhost:3456/courses", {
//     method: "POST",
//     body: JSON.stringify({
//       title,
//       author,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// }
// const formPost = document.querySelector(".form-post");
// formPost.addEventListener("submit",function(e) {
//     e.preventDefault();
//     // console.log(this)
//     //lấy dữ liệu người dùng nhập vào
//     const title = this.elements["title"].value;
//     const author = this.elements["author"].value;

//     console.log(title,author);
//     addPost(title,author);
// })

/**
 * image
 * title
 * author
 * rating
 * price
 * bestSeller
 * buyAmount
 */
//thêm sữa xóa khóa học
let endpoint = "http://localhost:3000/posts";

const courseList = document.querySelector(".courses-list");
const formSubmit = document.querySelector(".form-submit");
const filterInput = document.querySelector(".filter");
function debounceFn(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
filterInput.addEventListener(
  "keydown",
  debounceFn(function (e) {
    let path = endpoint;
    if (e.target.value !== "") {
      path = `${endpoint}?title_like=${e.target.value}`;
    }
    getCourses(path);

    // console.log(e.target.value);
    //title_like  là có chứa từ đó
    // const response =  await fetch(`${endpoint}?title_like=${e.target.value}`);
    // const data =await response.json();
    // console.log(data);
  }, 500)
);

let updateId = null;
async function addPost({
  image,
  title,
  author,
  rating,
  price,
  bestSeller,
  buyAmount,
}) {
  await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      image,
      title,
      author,
      rating,
      price,
      bestSeller,
      buyAmount,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
async function getSinglexourse(id) {
  const response = await fetch(`${endpoint}/${id}`);
  const data = response.json();
  return data;
}
async function updateCourse({
  id,
  image,
  title,
  author,
  rating,
  price,
  bestSeller,
  buyAmount,
}) {
  await fetch(`${endpoint}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      image,
      title,
      author,
      rating,
      price,
      bestSeller,
      buyAmount,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
async function deleteCourse(id) {
  fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });
}

function renderItem(item) {
  const template = `
        <div class="course-item">
            <div class="course-image">
                <img src="${item.image}" alt="">
                <button class="course-pencil" data-id="${
                  item.id
                }"><i class="fa fa-pencil" style="pointer-events:none;"></i></button>
                <button class="course-remove" data-id="${
                  item.id
                }"><i class="fa fa-times"></i></button>
            </div>
            <div class="course-content">
                <h3 class="course-title">${item.title}</h3>
                <div class="course-author">${item.author}</div>
                <div class="course-price">${item.price}</div>
                <div class="course-meta">
                    <div class="course-rating">${item.rating}</div>
                    <div class="course-enroll">${item.buyAmount}</div>
                </div>
                ${
                  item.bestSeller
                    ? '<div class="course-best-seller">Best seller</div>'
                    : ""
                }
            </div>
        </div>
    `;
  courseList.insertAdjacentHTML("beforeend", template);
}

async function getCourses(link = endpoint) {
  const response = await fetch(link);
  const data = await response.json();
  courseList.innerHTML = "";
  // console.log(data);
  if (data.length > 0 && Array.isArray(data)) {
    data.forEach((item) => {
      renderItem(item);
    });
  }
}

const formPost = document.querySelector(".form-post");
formPost.addEventListener("submit", async function (e) {
  e.preventDefault();
  // console.log(this)
  //lấy dữ liệu người dùng nhập vào
  const couses = {
    image: this.elements["image"].value,
    title: this.elements["title"].value,
    author: this.elements["author"].value,
    rating: +this.elements["rating"].value,
    price: +this.elements["price"].value,
    bestSeller: this.elements["bestSeller"].checked,
    buyAmount: +this.elements["buyAmount"].value,
  };

  //   console.log(title, author);
  updateId
    ? await updateCourse({ id: updateId, ...couses })
    : await addPost(couses);
  await getCourses();
  this.reset();
  updateId = null;
  formSubmit.textContent = "Add Course";
});

courseList.addEventListener("click", async function (e) {
  if (e.target.matches(".course-remove")) {
    // console.log(e.target)
    const id = +e.target.dataset.id;
    console.log(id);
    await deleteCourse(id);
    await getCourses();
  } else if (e.target.matches(".course-pencil")) {
    console.log(e.target);
    const id = +e.target.dataset.id;
    const data = await getSinglexourse(id);
    // console.log(data)
    formPost.elements["image"].value = data.image;
    formPost.elements["title"].value = data.title;
    formPost.elements["author"].value = data.author;
    formPost.elements["rating"].value = +data.rating;
    formPost.elements["price"].value = +data.price;
    formPost.elements["bestSeller"].checked = data.bestSeller;
    formPost.elements["buyAmount"].value = data.buyAmount;
    formSubmit.textContent = "Update Course";
    updateId = data.id;
  }
});

getCourses();
