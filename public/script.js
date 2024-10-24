filterSelection("all");
const Alltags = document.getElementsByTagName("label");
console.log(notes);
function filterSelection(c) {
  let x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
// //from GPT
// const data = [
//   { name: "Mermaid 1", note: "Lives near the land", tags: ["land"] },
//   { name: "Mermaid 2", note: "Swims in the water", tags: ["water"] },
//   { name: "Mermaid 3", note: "Found a bottle", tags: ["bottle", "land"] },
//   { name: "Mermaid 4", note: "Has a shiny shell", tags: ["shell", "water"] },
// ];

// function filterItems() {
//   // Get all checked checkboxes
//   const checkboxes = document.querySelectorAll('input[name="filter"]:checked');
//   const selectedTags = Array.from(checkboxes).map((checkbox) => checkbox.value);

//   // Filter the data based on selected tags
//   const filteredData = data.filter((item) => {
//     return selectedTags.some((tag) => item.tags.includes(tag));
//   });

//   // Display filtered results
//   const resultDiv = document.getElementById("filteredResults");
//   resultDiv.innerHTML = ""; // Clear previous results

//   if (filteredData.length > 0) {
//     filteredData.forEach((item) => {
//       resultDiv.innerHTML += `<p><strong>${item.name}</strong>: ${item.note}</p>`;
//     });
//   } else {
//     resultDiv.innerHTML = "<p>No results found.</p>";
//   }
// }
