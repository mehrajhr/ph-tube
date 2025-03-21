const removeClasslist = () => {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
};

const showLoader = () =>{
  document.getElementById("loaderContainer").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
}
const hideLoader = () =>{
  document.getElementById("loaderContainer").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
}
function loadCatagories() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // prosmise the data
    .then((response) => response.json())
    // send data to display catagories
    .then((data) => displayCatagories(data.categories));
}
function loadVedio(searchText = "") {
  showLoader();
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      removeClasslist();
      const btnAll = document.getElementById("btn-all");
      btnAll.classList.add("active");
      displayVedios(data.videos);
    });
}

const loadCatagoriesVidos = (id) => {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeClasslist();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVedios(data.category);
    });
};

const loadVideoDetails = (id) => {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details_container");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p class="text-sm text-gray-400 flex gap-1 my-2">${video.authors[0].profile_name} ${
      video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified"` : ``
    }</p>
    <p class="text-sm text-gray-400 ">${video.others.views} views</p>
  </div>
</div>
  `;
  hideLoader();
};
// {category_id: '1003', category: 'Comedy'}
function displayCatagories(categories) {
  const catagorieContainer = document.getElementById("catagorie-container");

  categories.forEach((cat) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="btn-${cat.category_id}" onClick="loadCatagoriesVidos(${cat.category_id})" class="btn btn-sm hover:bg-orange-500 hover:text-white ">${cat.category}</button>`;
    catagorieContainer.appendChild(div);
  });
}
const displayVedios = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.innerHTML = `
     <div class="col-span-full flex flex-col justify-center items-center py-16 gap-7">
                <img src="assets/Icon.png" alt="" class="w-[120px]">
                <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>`;
  }
  videos.forEach((video) => {
    console.log(video);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-base-100">
                <figure class="relative">
                  <img
                   class="w-full h-[220px] object-cover"
                    src="${video.thumbnail}"
                    alt="Shoes" />
                    <span class="absolute bottom-2 right-2 bg-black text-white rounded px-2 text-sm">3hrs 56 min ago</span>
                </figure>
                <div class="flex gap-3 px-0 py-5">
                    <div>
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                              <img src="${video.authors[0].profile_picture}" />
                            </div>
                          </div>
                    </div>
                    <div>
                        <h2 class="test-sm font-semibold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1 my-2">${video.authors[0].profile_name} ${
                          video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified"` : ``} </p>
                        <p class="text-sm text-gray-400 ">${video.others.views} views</p>
                    </div>
                </div>
                <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show details</button>
              </div>
        `;
    videoContainer.appendChild(div);
  });
  hideLoader();
};

document.getElementById('search_input').addEventListener('keyup', (event) =>{
  const input = event.target.value;
  showLoader();
  loadVedio(input);
})
loadCatagories();
