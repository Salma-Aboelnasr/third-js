
var bookmarkNameInput = document.getElementById("siteName");
var bookmarkLinkInput = document.getElementById("siteURL");

var sites = [];


if (localStorage.getItem("bookmarks") != null) {
  sites = JSON.parse(localStorage.getItem("bookmarks"));
  console.log(sites); 
  display(); 
}

// Add bookmark
function addBookmark() {
  // Get input values
  const siteName = bookmarkNameInput.value.trim();
  const siteURL = bookmarkLinkInput.value.trim();

  // Validation
  if (siteName.length < 3 || !isValidURL(siteURL)) {
    showValidationError(); 
    return;
  }

  // Add bookmark if validation passes
  const bookmark = {
    name: siteName,
    url: siteURL,
  };

  sites.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(sites));
  display();
  clearInputs();
}

// Validate URL
function isValidURL(url) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(url);
}

// Show validation error using modal
function showValidationError() {
  const modal = new bootstrap.Modal(document.getElementById("errorModal"));
  modal.show();
}

// Clear inputs
function clearInputs() {
  bookmarkNameInput.value = null;
  bookmarkLinkInput.value = null;
  bookmarkNameInput.classList.remove("is-valid", "is-invalid");
  bookmarkLinkInput.classList.remove("is-valid", "is-invalid");
}


function display() {
  var cartona = ``;
  for (var i = 0; i < sites.length; i++) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${sites[i].name}</td>
        <td><a href="${sites[i].url}" class="btn btn-success" target="_blank"><i class="fas fa-eye pe-1"></i>Visit</a></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fas fa-trash-can pe-1"></i>Delete</button></td>
      </tr>
    `;
  }
  document.getElementById("bookmarkTable").innerHTML = cartona;
}

// Delete bookmark
function deleteBookmark(index) {
  sites.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(sites));
  display();
  console.log(sites);
}

// Real-time validation for inputs
bookmarkNameInput.addEventListener("input", function () {
  const siteName = bookmarkNameInput.value.trim();
  if (siteName.length >= 3) {
    bookmarkNameInput.classList.remove("is-invalid");
    bookmarkNameInput.classList.add("is-valid");
  } else {
    bookmarkNameInput.classList.remove("is-valid");
    bookmarkNameInput.classList.add("is-invalid");
  }
});

bookmarkLinkInput.addEventListener("input", function () {
  const siteURL = bookmarkLinkInput.value.trim();
  if (isValidURL(siteURL)) {
    bookmarkLinkInput.classList.remove("is-invalid");
    bookmarkLinkInput.classList.add("is-valid");
  } else {
    bookmarkLinkInput.classList.remove("is-valid");
    bookmarkLinkInput.classList.add("is-invalid");
  }
});
