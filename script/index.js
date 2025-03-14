function loadCatagories() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // prosmise the data
    .then((response) => response.json())
    // send data to display catagories
    .then((data) => displayCatagories(data.categories));
}
function loadVedio() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVedios(data.videos));
}
// {category_id: '1003', category: 'Comedy'}
function displayCatagories(categories) {
  const catagorieContainer = document.getElementById("catagorie-container");

  categories.forEach((cat) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button class="btn btn-sm hover:bg-orange-500 hover:text-white ">${cat.category}</button>`;
    catagorieContainer.appendChild(div);
  });
}
const displayVedios = (videos) => {
  const videoContainer = document.getElementById("video-container");
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
                              <img src="${video.authors[0].
                                profile_picture
                                }" />
                            </div>
                          </div>
                    </div>
                    <div>
                        <h2 class="test-sm font-semibold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1 my-2">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></p>
                        <p class="text-sm text-gray-400 ">${video.others.views} views</p>
                    </div>
                </div>
              </div>
        `;
    videoContainer.appendChild(div);
  });
};
loadCatagories();