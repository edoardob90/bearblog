// A simple search bar for the blog page
// NOTE: search is limited to posts' titles
// Source: https://github.com/Froodooo/bear-plugins/blob/616e488f5435bf53b1193495967a678e10e594c0/bear/blog-search.js

if (
  document.querySelector(".blog-posts") &&
  document.body.classList.contains("blog")
) {
  document.querySelector("main").insertBefore(
    Object.assign(document.createElement("input"), {
      type: "text",
      id: "searchInput",
      placeholder: "Search...",
      style: "display: block;",
      oninput: (event) => {
        document.querySelectorAll(".blog-posts li").forEach((post) => {
          post.style.display = post.textContent
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
            ? ""
            : "none";
        });
      },
    }),
    document.querySelector(".blog-posts"),
  );
}
