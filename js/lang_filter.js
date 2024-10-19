// A simple language filter for the posts page
// Author: Edoardo Baldi

// Do not run the script if the page is not the posts page
if (window.location.pathname.startsWith("/blog")) {
  // Set the language cookie
  function setLang(lang) {
    document.cookie = "lang=" + lang + "; path=/;";
    window.location.reload(); // Reload to apply the filter
  }

  // Get the current language from the cookie
  function getLang() {
    const langCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lang="));

    return langCookie ? langCookie.split("=")[1] : undefined;
  }

  const lang = getLang();

  // Inject the language filter links into the page
  const mainElement = document.querySelector("main");
  const langFilterDiv = document.createElement("div");
  langFilterDiv.setAttribute("id", "language-filter");

  langFilterDiv.innerHTML = `
            <details style="color: grey;">
                <summary>Language (${lang ? lang : "no filter"})</summary>
                <div>
                    <a href="#" onclick="setLang('')">None</a> |
                    <a href="#" onclick="setLang('en')">English</a> |
                    <a href="#" onclick="setLang('it')">Italian</a>
                </div>
            </details>
        `;

  mainElement.insertBefore(
    langFilterDiv,
    document.querySelector(".blog-posts"),
  );

  // Fetch blog post and check its lang attribute
  function getPostLang(url) {
    return fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const doc = new DOMParser().parseFromString(text, "text/html");
        return doc.documentElement.getAttribute("lang");
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        return null;
      });
  }

  // Retrieve/store post langs in localStorage
  function getCachedLangs() {
    const cached = localStorage.getItem("postLangs");
    return cached ? new Map(JSON.parse(cached)) : new Map();
  }
  function saveCachedLangs(cache) {
    localStorage.setItem(
      "postLangs",
      JSON.stringify(Array.from(cache.entries())),
    );
  }

  // Perform the filtering based on the lang cookie
  if (lang) {
    const postLinks = document.querySelectorAll(".blog-posts li a");
    let langCache = getCachedLangs();

    postLinks.forEach(async (link) => {
      const url = link.href;

      // Check if the post lang is already cached
      if (langCache.has(url)) {
        const postLang = langCache.get(url);
        if (postLang !== lang) {
          link.parentNode.style.display = "none";
        }
      } else {
        // Post lang not cached, fetch it
        getPostLang(url).then((postLang) => {
          if (postLang) {
            langCache.set(url, postLang);
            saveCachedLangs(langCache);

            if (postLang !== lang) {
              link.parentNode.style.display = "none";
            }
          }
        });
      }
    });
  }
}
