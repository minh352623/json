/**
 *  <div class="image-item">
            <img src="" alt="">
        </div>
 */

//page=2&limit=100
const imageList = document.querySelector(".images");
const loadMore = document.querySelector(".load-more");
const loading = document.querySelector(".loading");

loadMore.style.display="none";
let page =1;
let limit = 8;
const endpoint = `https://picsum.photos/v2/list?limit=${limit}`;

function imagetemplate(url){
    const template = `
    <div class="image-item">
        <img src="${url}" alt="">
    </div>
    `;
    imageList.insertAdjacentHTML("beforeend", template);
}


async function fetchImages(page =1){
    loadMore.style.display="none";

    loading.style.display = "block";
    const response = await fetch(`${endpoint}&page=${page}`);
    // console.log(image);
    const images = await response.json();
    if(images.length > 0 && Array.isArray(images)){
        loadMore.style.display="block";
        loading.style.display = "none";

        console.log(images);
        images.forEach(item =>{
            imagetemplate(item.download_url);
        })
    }
    // console.log(imgae);

}

async function handleLoadMOre(){
    // console.log("Load More");
    page++;
    await fetchImages(page);
}

loadMore.addEventListener("click",handleLoadMOre);
fetchImages();