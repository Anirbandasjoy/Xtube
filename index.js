const loadCategory = async () => {
  const spiner = document.getElementById("spiner");
  const spinContaier = document.getElementById("spinContaier");
  spiner.style.display = "block";
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    if (!res.ok) {
      throw new Error("Not featching data Nework erro");
    }
    const category = await res.json();
    displayCategoryButton(category.data);
  } catch (error) {
    console.log(error.message);
  } finally {
    spiner.style.display = "none";
    spinContaier.style.display = "none";
  }
};

const displayCategoryButton = (data) => {
  const categoryContainer = getId("tabContainer");
  data?.map((categoryBtn) => {
    const button = document.createElement("a");
    button.className = "tab capitalize btn rounded-sm";
    button.innerText = categoryBtn.category;
    button.onclick = () => {
      displayCategoryData(categoryBtn.category_id);
      setActiveButton(button);
    };

    const div = document.createElement("div");
    div.appendChild(button);
    categoryContainer.appendChild(div);
  });

  const button = categoryContainer.querySelector(".tab");
  if (button) {
    setActiveButton(button);
  }
  displayAllCategoryData();
};
const setActiveButton = (button) => {
  const allButtons = document.querySelectorAll(".tab");
  allButtons.forEach((btn) => {
    btn.classList.remove("tab-active");
  });
  button.classList.add("tab-active");
};

const displayAllCategoryData = async () => {
  const courseContainer = getId("courseContainer");
  const notFoundContainer = getId("notFoundContainer");
  courseContainer.innerHTML = "";
  notFoundContainer.innerHTML = "";

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const categoryData = await res.json();

    if (!categoryData.data || categoryData.data.length === 0) {
      const div = document.createElement("div");
      div.innerHTML = `
        <p class="font-bold text-center mt-4 text-xl">
          Oops!! Sorry, There are no categories available.
        </p>
      `;
      notFoundContainer.appendChild(div);
    } else {
      // Only call displayCategoryData once with the first category
      displayCategoryData(categoryData.data[0].category_id);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const displayCategoryData = async (id) => {
  const allbutton = document.querySelectorAll(".tab");
  allbutton.forEach((tab) => {
    tab.addEventListener("click", () => {
      tab.classList.add("tab-active");
    });
  });

  const courseContainer = getId("courseContainer");
  const notFoundContainer = getId("notFoundContainer");
  courseContainer.innerHTML = "";
  notFoundContainer.innerHTML = "";

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const categoryData = await res.json();
    console.log(categoryData);

    if (!categoryData.data || categoryData?.data.length === 0) {
      const div = document.createElement("div");
      div.innerHTML = `
        <img class="mx-auto" src="./image/icon.png" />
        <p class="font-bold text-center mt-4 text-xl">
          Oops!! Sorry, There is no <br> content here
        </p>
      `;
      notFoundContainer.appendChild(div);
    } else {
      categoryData.data?.map((course) => {
        const seconds = Math.floor(course.others.posted_date);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const timeAgo = hours > 0 ? `${hours} hrs ${minutes} min ago` : "";

        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card bg-base-100">
          <div class="relative">
            <figure>
              <img class="w-full h-56 rounded-md " src=${
                course.thumbnail
              } alt=${course.title}/>
            </figure>
            <p class="text-gray-300 bg-gray-800 w-fit px-3 absolute bottom-3 right-0">${timeAgo}</p>
          </div>
          <div class="card-body h-36">
            <div class="flex gap-4 items-center">
              <img class="w-10 h-10 rounded-full" src=${
                course.authors[0].profile_picture
              } alt=${course.title}/>
              <h1 class="text-lg font-bold">${course.title}</h1>
            </div>
            <div class="ml-14 space-y-3">
              <div class="flex text-gray-500 gap-3 items-center justify-center">
                <h1>${course.authors[0].profile_name}</h1>
                <p>${
                  course.authors[0].verified
                    ? "<img src='./image/varifaid.png' />"
                    : ""
                }</p>
              </div>
              <p class="text-gray-500">${course.others.views} views</p>
            </div>
          </div>
        </div>
      `;

        courseContainer.appendChild(div);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const shortViews = async () => {
  const courseContainer = getId("courseContainer");
  courseContainer.innerHTML = "";
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );
  const data = await res.json();
  const showtCategoryData = data.data;
  const allData = [...showtCategoryData];
  allData.sort(
    (firstObject, secondObject) =>
      secondObject.others.views.slice(0, -1) -
      firstObject.others.views.slice(0, -1)
  );
  allData?.map((course) => {
    console.log(course);
    const seconds = Math.floor(course.others.posted_date);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const timeAgo = hours > 0 ? `${hours} hrs ${minutes} min ago` : "";

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-base-100">
          <div class="relative">
            <figure>
              <img class="w-full h-56 rounded-md " src=${
                course.thumbnail
              } alt=${course.title}/>
            </figure>
            <p class="text-gray-300 bg-gray-800 w-fit px-3 absolute bottom-3 right-0">${timeAgo}</p>
          </div>
          <div class="card-body h-36">
            <div class="flex gap-4 items-center">
              <img class="w-10 h-10 rounded-full" src=${
                course.authors[0].profile_picture
              } alt=${course.title}/>
              <h1 class="text-lg font-bold">${course.title}</h1>
            </div>
            <div class="ml-14 space-y-3">
              <div class="flex text-gray-500 gap-3 items-center justify-center">
                <h1>${course.authors[0].profile_name}</h1>
                <p>${
                  course.authors[0].verified
                    ? "<img src='./image/varifaid.png' />"
                    : ""
                }</p>
              </div>
              <p class="text-gray-500">${course.others.views} views</p>
            </div>
          </div>
        </div>
      `;

    courseContainer.appendChild(div);
  });
};

loadCategory();

const getId = (id) => {
  return document.getElementById(id);
};
