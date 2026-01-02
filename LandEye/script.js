// Save a land record
function saveLand() {
  let owner = document.getElementById("owner").value;
  let location = document.getElementById("location").value;
  let region = document.getElementById("region").value;  // optional
  let size = document.getElementById("size").value;      // optional

  // At least one of Owner, Location, or Region must be filled
  if (owner === "" && location === "" && region === "") {
    alert("Please enter at least Owner, Location, or Region");
    return;
  }

  let land = {};
  if (owner !== "") land.owner = owner;
  if (location !== "") land.location = location;
  if (region !== "") land.region = region;
  if (size !== "") land.size = size;

  let lands = JSON.parse(localStorage.getItem("lands")) || [];
  lands.push(land);
  localStorage.setItem("lands", JSON.stringify(lands));

  displayLands();

  // Clear input fields
  document.getElementById("owner").value = "";
  document.getElementById("location").value = "";
  document.getElementById("region").value = "";
  document.getElementById("size").value = "";
}

// Display all lands
function displayLands() {
  let lands = JSON.parse(localStorage.getItem("lands")) || [];
  let list = document.getElementById("landList");
  list.innerHTML = "";

  lands.forEach((l, index) => {
    let text = "";
    if (l.owner) text += `<b>${l.owner}</b>`;
    if (l.location) text += (text ? " - " : "") + `${l.location}`;
    if (l.region) text += (text ? " - " : "") + `${l.region}`;
    if (l.size) text += (text ? " - " : "") + `${l.size}`;

    list.innerHTML += `<p>${text} 
    <button onclick="deleteLand(${index})">Delete</button></p>`;
  });
}

// Delete a land
function deleteLand(index) {
  let lands = JSON.parse(localStorage.getItem("lands")) || [];
  lands.splice(index, 1);
  localStorage.setItem("lands", JSON.stringify(lands));
  displayLands();
}

// Search lands
function searchLand() {
  let term = document.getElementById("search").value.toLowerCase();
  let lands = JSON.parse(localStorage.getItem("lands")) || [];
  let results = document.getElementById("searchResults");
  results.innerHTML = "";

  lands.forEach(l => {
    if ((l.owner && l.owner.toLowerCase().includes(term)) || 
        (l.location && l.location.toLowerCase().includes(term)) || 
        (l.region && l.region.toLowerCase().includes(term))) {

      let text = "";
      if (l.owner) text += `<b>${l.owner}</b>`;
      if (l.location) text += (text ? " - " : "") + `${l.location}`;
      if (l.region) text += (text ? " - " : "") + `${l.region}`;
      if (l.size) text += (text ? " - " : "") + `${l.size}`;

      results.innerHTML += `<p>${text}</p>`;
    }
  });

  if (results.innerHTML === "") {
    results.innerHTML = "<p>No results found</p>";
  }
}

// Show lands on page load
displayLands();