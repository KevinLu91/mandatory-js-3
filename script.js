let imageContainer = document.querySelector(".image");
let refresh = document.querySelector("button");

function getData() {
  let currentBreed = window.location.hash.substring(1);
  let oReq = new XMLHttpRequest();
  oReq.addEventListener("load", renderData);
  oReq.open("GET", "https://dog.ceo/api/breeds/list/all");
  oReq.send();
}

getData()

function renderData() {
  let parsedData = JSON.parse(this.responseText);
  keys = Object.keys(parsedData.message);
  let nav = document.querySelector(".nav ul");
  let theBreed = document.querySelector(".theBreed");
  let p = document.createElement("p");
  p.textContent = "Currentbreed: " +window.location.hash.substring(1);
  theBreed.appendChild(p);
  for (let i = 0; i < keys.length; i++) {
    let li = document.createElement("li");
    li.textContent = keys[i];
    nav.appendChild(li);
    li.addEventListener("click", function(e) {
      theBreed.innerHTML = "";
      p.textContent = "Currentbreed: " + e.target.textContent;
      theBreed.appendChild(p);
      window.location.hash = e.target.textContent;
      getBreedImage();
      getSubBreed();
    });
  }
}

function getRandomImage() {
  let currentBreed = window.location.hash.substring(1);
  let imgReq = new XMLHttpRequest();
  imgReq.addEventListener("load", renderRandomImage);
  imgReq.open("GET", "https://dog.ceo/api/breeds/image/random/3");
  imgReq.send();
}

function renderRandomImage() {
  let parsedData = JSON.parse(this.responseText);
  let currentImg = document.querySelectorAll(".image img");
  if (currentImg) {
    for (let i = 0; i < currentImg.length; i++) {
      imageContainer.removeChild(currentImg[i]);
    }
  }
  for (let i = 0; i < parsedData.message.length; i++) {
    let randomImage = document.createElement("img");
    randomImage.src = parsedData.message[i];
    imageContainer.appendChild(randomImage);
  }
}

function getBreedImage() {
  let currentBreed = window.location.hash.substring(1);
  let imgReq = new XMLHttpRequest();
  imgReq.addEventListener("load", renderBreedImage);
  imgReq.open("GET", "https://dog.ceo/api/breed/" + currentBreed + "/images/random/3");
  imgReq.send();
}

function renderBreedImage() {
  if (this.status >= 200 && this.status < 300) {
    let parsedData = JSON.parse(this.responseText);
    let currentImages = document.querySelectorAll(".image img");
    if (currentImages) {
      for (let j = 0; j < currentImages.length; j++) {
        imageContainer.removeChild(currentImages[j]);
      }
    }
    for (let i = 0; i < parsedData.message.length; i++) {
      let breedImage = document.createElement("img");
      breedImage.src = parsedData.message[i];
      imageContainer.appendChild(breedImage);
    }
  } else {
    console.error("invalid status" + this.status);
  }
}

function getSubBreed() {
  let currentBreed = window.location.hash.substring(1);
  if(currentBreed.includes("/") ){
  currentBreed = currentBreed.substring(0, currentBreed.indexOf("/"));
  getBreedImage()
}
  let imgReq = new XMLHttpRequest();
  imgReq.addEventListener("load", renderSubBreed);
  imgReq.open("GET", "https://dog.ceo/api/breed/" + currentBreed + "/list");
  imgReq.send();
}

function renderSubBreed() {
  let parsedData = JSON.parse(this.responseText);
  let sub = document.querySelector(".sub");
  let theBreed = document.querySelector(".theBreed");
  theBreed.innerHTML = "";
  let p = document.createElement("p");
  p.textContent = "Currentbreed: " + window.location.hash.substring(1);
  theBreed.appendChild(p);
  if (parsedData.message.length > 0) {
    sub.innerHTML = "";
    let h4 = document.createElement("h4");
    h4.textContent = "Subbreed: ";
    sub.appendChild(h4);
    let currentBreed = window.location.hash.substring(1);
    let ul = document.createElement("ul");
    sub.appendChild(ul)
    for (let i = 0; i < parsedData.message.length; i++) {
      let li = document.createElement("li");
      li.textContent = parsedData.message[i];
      ul.appendChild(li);
      li.addEventListener("click", function(e) {
        if(currentBreed.includes("/")){
          breedArray = currentBreed.split("/");
          currentBreed =breedArray[0];
        }
        theBreed.innerHTML = "";
        p.textContent = "Currentbreed: " + currentBreed + " " + e.target.textContent;
        theBreed.appendChild(p);
        window.location.hash = currentBreed + "/" + e.target.textContent;
        getBreedImage()
      });
    }
  } else {
    sub.innerHTML = "";
  }
}

function refreshbtn() {
  refresh.addEventListener("click", function() {
    if (window.location.hash) {
      getBreedImage();
    } else {
      getRandomImage();
    }
  })
}
refreshbtn()

function refreshPage() {
  if (window.location.hash) {
    getBreedImage();
    getSubBreed()

  } else {
    getRandomImage();
  }
}
refreshPage()
