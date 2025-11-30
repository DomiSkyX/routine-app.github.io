// Load header
fetch("components/header.html")
  .then(r => r.text())
  .then(html => document.querySelector("#header").innerHTML = html);

// Load footer
fetch("components/footer.html")
  .then(r => r.text())
  .then(html => document.querySelector("#footer").innerHTML = html);
