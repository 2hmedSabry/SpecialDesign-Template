// Toggle Settings Box
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("openned");
};

// Switch Colors
const colorsList = document.querySelectorAll(".colors-list li");
// Looping to Array
colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    // target all colors in List by ( e.target ) to get data-color => ??

    // Set color on root Element
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set Value (color) on Local Storage
    localStorage.setItem("colors_option", e.target.dataset.color);

    // handle Active class
    handleActive(e);
  });
});

// checking if there's Local Storage Color
let mainColor = localStorage.getItem("colors_option");

if (mainColor != null) {
  //     console.log('Local storage Is Not Empty You can Set It on Root Element' );

  document.documentElement.style.setProperty("--main-color", mainColor);

  //Remove Active class Form All Childrens
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active class on element that is available in Local storage
    if (element.dataset.color === mainColor) {
      //Add Active
      element.classList.add("active");
    }
  });
}

// Switch Background Option
const randomBackground = document.querySelectorAll(".randow-background li");
// Looping to Array
randomBackground.forEach((li) => {
  li.addEventListener("click", (e) => {
    // set Value (Randow background) on Local Storage

    // localStorage.setItem('main-color' , e.target.dataset.color )

    //Remove Active class Form All Childrens
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      random();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Randow Background Option
let backgroundOption = true;

// Variable to control the background Interval
let backgroundInterval;

// check if there's Local storage Randow Background Item
let backgroundLoacalItem = localStorage.getItem("background_option");

if (backgroundLoacalItem !== null) {
  if (backgroundLoacalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Remove Active  Class from yes or no button
  document.querySelectorAll(".randow-background li").forEach((e) => {
    e.classList.remove("active");
  });

  if (backgroundLoacalItem === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array of IMages
let imgesArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

function random() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Random index for imgesArray
      let randomNumber = Math.floor(Math.random() * imgesArray.length);
      // change Background Image Url
      landingPage.style.backgroundImage =
        'url("images/' + imgesArray[randomNumber] + '")';
    }, 10000);
  }
}
random();

// Select skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //skills offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  //Skills outer height => to gave height of skills
  let skillsOuterHeight = ourSkills.offsetHeight;

  // windows height
  let windowHeight = this.innerHeight;

  // window scrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    // console.log(allSkills);
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
      // console.log(skill.dataset.progress);
    });
  }
};

// create Popup with Image

let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    // create The popup
    let popupBox = document.createElement("div");
    //  Add classe Name top popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // creaate heading
      let imgHeading = document.createElement("h3");
      // create text for heading
      let imgtext = document.createTextNode(img.alt);
      // append the text to the heading
      imgHeading.appendChild(imgtext);
      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    // create the image
    let popupImage = document.createElement("img");
    // set image source
    popupImage.src = img.src;
    // add image to popup box
    popupBox.appendChild(popupImage);
    // append the popup to body
    document.body.appendChild(popupBox);
    //create the close span
    let closeBtn = document.createElement("span");
    // create the  btn  text
    let closeBtnText = document.createTextNode("X");
    // Append text to close btn
    closeBtn.appendChild(closeBtnText);
    // add class to btn
    closeBtn.className = "close-btn";
    // Add close btn to the popup Box
    popupBox.appendChild(closeBtn);
  });
});

//close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-btn") {
    e.target.parentNode.remove();

    //remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Adding Sections directly by arry of section

const sectionArr = [
  "about",
  "skills",
  "gallery",
  "timeline",
  "features",
  "testimonials",
  "contact",
];

let navBullets = document.createElement("div");
navBullets.className = "nav-bullets";

document.body.appendChild(navBullets);

sectionArr.forEach((ele) => {
  // create bullet & add 'nav-bullets' class
  let divBullet = document.createElement("div");
  divBullet.className = "bullet";
  divBullet.dataset.section = `.${ele}`;
  // create bullet & add 'tooltip' class
  let divTooltip = document.createElement("div");
  divTooltip.className = "tooltip";
  divTooltip.append((divTooltip.createTextNode = ele));
  divBullet.appendChild(divTooltip);

  navBullets.appendChild(divBullet);
  // document.querySelector(".nav-bullets").appendChild(divBullet);
});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// seclect all links in Navbar
const allLinks = document.querySelectorAll(".links li");

function scrollingToElement(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollingToElement(allBullets);
scrollingToElement(allLinks);

//  handling class active ( Function )
function handleActive(ev) {
  //Remove Active class Form All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add Active To Class
  ev.target.classList.add("active");
}

// nav-bullets setting box

let bulletList = document.querySelectorAll(".bullets-option li");
let bulletsContainer = document.querySelector(".nav-bullets");

bulletsLocalItems = localStorage.getItem("bullets_option");

// Adding active class to nav-bullets box (show or hide) in setting box

if (localStorage.getItem("bullets_option") !== null) {
  bulletList.forEach((li) => {
    li.classList.remove("active");
  });

  if (bulletsLocalItems === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

// Saving value in local storage

bulletList.forEach((li) => {
  li.addEventListener("click", (e) => {
    if (li.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    // handling active class in setting box
    handleActive(e);
  });
});

// Reset button

document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear()

  localStorage.removeItem("colors_option");
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("background_option");
  // relod windows
  window.location.reload();
};

//  toggle menu
let toggleBTn = document.querySelector(".toggle-menu");
let tlink = document.querySelector(".links");

toggleBTn.onclick = function (e) {
  e.stopPropagation();

  // toggle class
  this.classList.toggle("menu-active");

  tlink.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  //for toggle menu

  if (e.target !== toggleBTn && e.target !== tlink) {
    if (tlink.classList.contains("open")) {
      toggleBTn.classList.toggle("menu-active");
      tlink.classList.toggle("open");
    }
  }
  // For setting box

  if (e.target !== document.querySelector(".toggle-settings .fa-gear")) {
    //
    if (document.querySelector(".settings-box").classList.contains("openned")) {
      document.querySelector(".settings-box").classList.toggle("openned");
    }
  }
});

tlink.onclick = function (e) {
  e.stopPropagation();
};

///////
