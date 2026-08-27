(function () {
  var routes = {
    "": "toc.html",
    "/": "toc.html",
    "/table-of-contents": "toc.html",
    "/foreword": "foreword.html",
    "/preface": "preface.html"
  };

  function loadHtml(url) {
    return fetch(url, { credentials: "same-origin" }).then(function (response) {
      if (!response.ok) {
        throw new Error("Unable to load " + url);
      }
      return response.text();
    });
  }

  function loadIncludes() {
    var targets = Array.prototype.slice.call(document.querySelectorAll("[data-include]"));
    return Promise.all(targets.map(function (target) {
      return loadHtml(target.getAttribute("data-include")).then(function (html) {
        target.innerHTML = html;
      });
    }));
  }

  function loadRoute() {
    var outlet = document.querySelector("[data-route-view]");
    if (!outlet) {
      return Promise.resolve();
    }

    var hash = window.location.hash.replace(/^#/, "");
    var template = routes[hash] || routes["/"];

    return loadHtml(template).then(function (html) {
      outlet.innerHTML = html;
    });
  }

  function initMenu() {
    var curtain = document.getElementById("curtain");
    var menuButton = document.getElementById("burger-menu");
    var dropdown = document.getElementById("drop-down");
    var overlay = document.getElementById("overlay-element");

    if (!curtain || !menuButton || !dropdown || !overlay) {
      return;
    }

    function setOpen(isOpen) {
      curtain.className = isOpen ? "menu-opened" : "menu-closed";
      menuButton.className = isOpen ? "collapse" : "expand";
      dropdown.className = isOpen ? "dropdown-content show" : "dropdown-content hide";
      overlay.className = isOpen ? "collapses" : "expands";
    }

    menuButton.addEventListener("click", function (event) {
      event.preventDefault();
      setOpen(dropdown.className.indexOf("hide") !== -1);
    });

    curtain.addEventListener("click", function () {
      setOpen(false);
    });
  }

  function boot() {
    loadIncludes().then(function () {
      return loadRoute();
    }).then(initMenu).catch(function (error) {
      window.console && window.console.error(error);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
}());
