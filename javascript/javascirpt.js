var bookmarkName = document.getElementById("bookmarkName");
var websiteName = document.getElementById("websiteName");
var tableBody = document.getElementById("tableBody");
var submitBtn = document.getElementById("submitBtn");
var websiteIndex = 0;
var urlRegEx =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

var websitesContainer = [];
if (localStorage.getItem("websites") != null) {
  websitesContainer = JSON.parse(localStorage.getItem("websites"));
  displayProduct();
}

function addBookmark() {
  if (urlRegEx.test(websiteName.value)) {
    var website = {
      bookmarkName: bookmarkName.value,
      websiteName: websiteName.value,
    };

    websitesContainer.push(website);
    localStorage.setItem("websites", JSON.stringify(websitesContainer));
    displayProduct();
    clear();
  } else {
    submitBtn.setAttribute("data-bs-toggle", "modal");
    submitBtn.setAttribute("data-bs-target", "#exampleModal");
  }
}

function clear() {
  bookmarkName.value = "";
  websiteName.value = "";
}

function displayProduct() {
  tableBody.innerHTML = "";
  for (i = 0; i < websitesContainer.length; i++) {
    tableBody.innerHTML += `
<tr>
    <td>${i + 1}</td>
    <td>${websitesContainer[i].bookmarkName}</td>
    <td class="d-none">${websitesContainer[i].websiteName}</td>
    <td><button id="visitBtn" onclick="visit(${[
      i,
    ]})" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></td>
    <td><button onclick="remove(${i})" class="btn btn-danger" ><i class="fa-solid fa-trash"></i> Delete</button></td>
</tr>
`;
  }
}

function remove(websiteIndex) {
  websitesContainer.splice(websiteIndex, 1);
  localStorage.setItem("websites", JSON.stringify(websitesContainer));
  displayProduct();
}

function visit(url) {
  url = websitesContainer.websiteName;
  window.open(url,"_blank")
  console.log(url);
}
