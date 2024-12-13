let popup;
let localData;
let fishArray = JSON.parse(localStorage.getItem("fishArray")) || [];
let newTempleResponse = document.createElement("p");
let templeResponse = document.getElementById("templeResponse");

// let beat = new Audio(mainbackground.mp3);
// beat.play();

function openPopup() {
  popup = document.getElementById("fishPage");
  popup.style.display = "flex";
  document.getElementById("fishWarning").innerHTML = "";
  fetch("/random")
    .then((data) => {
      parsedData = data.json();
      // console.log(parsedData);
      return parsedData;
    })
    .then((parsedData) => {
      document.getElementById("name").innerHTML =
        "Creature Name:" + parsedData.name;
      document.getElementById("descriptions").innerHTML =
        "Description:" + parsedData.descriptions;
      document.getElementById("size").innerHTML =
        "Normal Size:" + parsedData.size;
      let image = document.getElementById("fishimage");
      image.src = parsedData.image;
      localData = parsedData;
    });
}

function formFishArray() {
  checkLocalData();
  localStorage.setItem("fishArray", JSON.stringify(fishArray));
}

function checkLocalData() {
  if (fishArray.length >= 3) {
    document.getElementById("fishWarning").innerHTML =
      "cannot put more than 3 fishes";
    console.log("check3");
    return fishArray;
  } else if (fishArray.some((fish) => fish.name === localData.name)) {
    document.getElementById("fishWarning").innerHTML = "same fish in cabinet";
    console.log("check2");
    return fishArray;
  } else {
    fishArray.push(localData);
    document.getElementById("fishWarning").innerHTML = "collected successfully";
    let localName = localData.name;
    console.log(fishArray[0].status);
    setTimeout(updateStaleStatus, 10000, localName);

    console.log("checkfinal");

    return fishArray;
  }
}

function closePopup() {
  localStorage.setItem("fishData", JSON.stringify(localData));
  localData = JSON.parse(localStorage.getItem("fishData"));

  console.log("closeing popup");
  formFishArray();

  popup = document.getElementById("fishPage");
  fetch("/fishingSite");
}
window.onload = () => {
  localData = JSON.parse(localStorage.getItem("fishData")) || null;
};

function updateRottenStatus() {
  fishArray.forEach((fish) => {
    let currentStatus = "Rotten";
    fish.status = currentStatus;
    localStorage.setItem("fishArray", JSON.stringify(fishArray));
    console.log(fish.status);
  });

  setTimeout(throwOutFish, 10000);
}

function throwOutFish() {
  localStorage.clear();
  location.reload();
}
function statusPopup(event) {
  const findDiv = event.target.closest("div");
  const popup = findDiv.querySelector(".statusPopUp"); //GPT about how to get the nearest Dom element, so it is the class,statusPopUp)
  if (popup) {
    popup.classList.toggle("show");
  } else {
    console.error("Clicked element is not a popup");
  }
}

function moveTemple(event) {
  const findDiv = event.target.closest("div");

  if (findDiv) {
    // Get the key of the fish from the data attribute
    localStorage.removeItem("fishData");
    location.reload();

    // Remove the image from the DOM (or you can set the src to an empty string)
    const fishImage = findDiv.querySelector("img");
    const fishStatus = findDiv.querySelector("p");
    if (fishImage) {
      fishImage.src = "";
    }
    if (fishStatus) {
      fishStatus.status = "";
    }
    localStorage.clear();
    // Remove the fish from localStorage using the key
    //not able to find a way to do it

    // Optionally, you can remove the entire div if you don't want to just remove the image
  } else {
    console.error("Clicked element is not a valid fish container.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let templeResponse = document.getElementById("templeResponse");
  updateCabinet();
  templeResponse.addEventListener("click", (event) => {
    let randomResponse = getRandomResponse();
    document.getElementById("responseOutput").innerText = randomResponse;
  }); // Ensure this is inside the DOMContentLoaded callback
});
function updateCabinet() {
  let image = document.getElementById("collectedFishImage");
  let image2 = document.getElementById("collectedSecondFishImage");
  let image3 = document.getElementById("collectedThirdFishImage");
  let status1 = document.getElementById("fishCurrentStatus");
  let status2 = document.getElementById("fishSecondCurrentStatus");
  let status3 = document.getElementById("fishThirdCurrentStatus");
  if (fishArray[0] && image) {
    let srcinfo = fishArray[0].image || "";
    let statusInfo = fishArray[0].status || "";
    console.log("Image element found:", image);
    image.src = srcinfo; // Set a source for demonstration
    status1.innerText = statusInfo;
  } else {
    console.log("Image element NOT found.");
  }
  if (fishArray[1] && image2) {
    let srcinfo2 = fishArray[1].image || "";
    let statusInfo2 = fishArray[1].status || "";
    console.log("second Image element found:", image2);
    image2.src = srcinfo2; // Set a source for demonstration
    status2.innerText = statusInfo2;
  } else {
    console.log("Image element NOT found.");
  }
  if (fishArray[2] && image3) {
    let srcinfo3 = fishArray[2].image || "";
    let statusInfo3 = fishArray[2].status || "";
    console.log("third Image element found:", image3);
    image3.src = srcinfo3; // Set a source for demonstration
    status3.innerText = statusInfo3;
  } else {
    console.log("Image element NOT found.");
  }
}
//so it can constantly update the collected fish

// document.addEventListener("DOMContentLoaded", () => {
// This runs after the DOM is fully loaded

function updateStaleStatus(localName) {
  let collectedFish = fishArray.find((fish) => fish.name === localName);
  let currentStatus = "stale";
  collectedFish.status = currentStatus;

  localStorage.setItem("fishArray", JSON.stringify(fishArray));
  console.log(collectedFish.status);
  setTimeout(updateRottenStatus, 10000);
}

function getRandomResponse() {
  const responses = [
    "too fresh, too bland, a little bit rotten is the best!",
    "I wish I can eat more than I could.",
    "interesting seasoning, I want to have more",
    "they used to taste like Burger king",
    "I have a lot of fishs, they all listen to me",
    "Can you add more flavor, please?",
  ];

  // Get a random index from the responses array
  const randomIndex = Math.floor(Math.random() * responses.length);

  // Return the randomly selected response
  return responses[randomIndex];
}
