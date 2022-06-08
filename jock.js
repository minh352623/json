//https://icanhazdadjoke.com/

const jokeHeading = document.querySelector(".joke-heading");
const jokeButton = document.querySelector(".joke-button");
const jokeWapper = document.querySelector(".joke");
const endPoint = "https://icanhazdadjoke.com/";

const songs = [];
//Request header là kiểu mà chúng chúng ta muốn lấy về
async function getJoke() {
  //đôi số thứ 2 của fetch là kiểu dữ liệu mà chúng ta  muốn lấy về,trong trường hợp này là json();
  const response = await fetch(endPoint, {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  // console.log(data);
  //trả về 1 promise
  songs.push(data);
  //   return data;
}
// async function handleClick(){
//     jokeWapper.classList.add("is-loading");
//     const data = await getJoke();
//     console.log(data);
//     jokeHeading.textContent = data.joke;
//     jokeWapper.classList.remove("is-loading");

// }
async function go() {
  await getJoke();

  console.log(songs);
  console.log(songs[0]);
}
go();

jokeButton.addEventListener("click", handleClick);
