/* Shared header and footer for the GPF static site.
   Each page sets <body data-page="slug"> and includes:
   <div id="site-header"></div> ... <div id="site-footer"></div>
   <script src="assets/js/site.js"></script> */

(function () {
  var page = (document.body && document.body.dataset.page) || "";

  var NAV = [
    { label: "About", href: "about.html", id: "about" },
    {
      label: "Programs", id: "programs", children: [
        { label: "Organizational Wellness", href: "organizational-wellness.html", id: "organizational-wellness" },
        { label: "SWFL Community Reach", href: "community-reach.html", id: "community-reach" },
        { label: "The Lantern Project", href: "lantern-project.html", id: "lantern-project" }
      ]
    },
    { label: "Impact", href: "impact.html", id: "impact" },
    { label: "Events", href: "events.html", id: "events" },
    { label: "Get Involved", href: "get-involved.html", id: "get-involved" },
    { label: "Contact", href: "contact.html", id: "contact" },
    { label: "FAQ", href: "faq.html", id: "faq" }
  ];

  function isActive(item) {
    if (item.id === page) return true;
    if (item.children) return item.children.some(function (c) { return c.id === page; });
    return false;
  }

  function navHTML() {
    var items = NAV.map(function (item) {
      if (item.children) {
        var sub = item.children.map(function (c) {
          return '<li><a href="' + c.href + '"' + (c.id === page ? ' class="active"' : "") + ">" + c.label + "</a></li>";
        }).join("");
        return '<li class="dropdown">' +
          '<span class="nav-group-label"' + (isActive(item) ? ' style="color:var(--gold-deep)"' : "") + ">" + item.label + "</span>" +
          '<ul class="dropdown-panel">' + sub + "</ul>" +
          '<ul class="sub"><li><span class="nav-group-label">' + item.label + "</span></li>" + sub + "</ul>" +
          "</li>";
      }
      return '<li><a href="' + item.href + '"' + (isActive(item) ? ' class="active"' : "") + ">" + item.label + "</a></li>";
    }).join("");
    return "" +
      '<div class="wrap header-inner">' +
      '<a class="brand" href="index.html" aria-label="The Guided Pathway Foundation home">' +
      '<img src="assets/img/logo.jpg" alt="The Guided Pathway Foundation lighthouse logo">' +
      '<span class="brand-name">The Guided Pathway<small>FOUNDATION</small></span>' +
      "</a>" +
      '<button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '<nav class="main-nav" aria-label="Main navigation"><ul>' + items + "</ul></nav>" +
      '<div class="header-cta">' +
      '<a class="btn btn-navy" href="donate.html">Donate</a>' +
      '<a class="btn btn-gold" href="about.html">Learn More</a>' +
      "</div>" +
      "</div>";
  }

  function footerHTML() {
    var year = new Date().getFullYear();
    return "" +
      '<div class="wrap footer-grid">' +
      '<div>' +
      '<div class="footer-brand"><img src="assets/img/logo.jpg" alt="The Guided Pathway Foundation logo"><span>The Guided Pathway<br>Foundation</span></div>' +
      "<p>Free emotional intelligence tools for families and communities. We work in the space before the storm, building resilience, connection, and strength from an already good place.</p>" +
      '<div class="social-row">' +
      '<a href="https://www.facebook.com/guidedpathwayfoundation" aria-label="Facebook" target="_blank" rel="noopener">f</a>' +
      '<a href="https://www.instagram.com/theguidedpathwayfoundation" aria-label="Instagram" target="_blank" rel="noopener">ig</a>' +
      "</div>" +
      "</div>" +
      "<div><h4>Explore</h4><ul class=\"footer-links\">" +
      '<li><a href="about.html">About</a></li>' +
      '<li><a href="impact.html">Impact</a></li>' +
      '<li><a href="events.html">Events</a></li>' +
      '<li><a href="get-involved.html">Get Involved</a></li>' +
      '<li><a href="board.html">Board</a></li>' +
      '<li><a href="faq.html">FAQ</a></li>' +
      "</ul></div>" +
      "<div><h4>Programs</h4><ul class=\"footer-links\">" +
      '<li><a href="organizational-wellness.html">Organizational Wellness</a></li>' +
      '<li><a href="community-reach.html">SWFL Community Reach</a></li>' +
      '<li><a href="lantern-project.html">The Lantern Project</a></li>' +
      '<li><a href="https://lantern.theguidedpathwayfoundation.com" target="_blank" rel="noopener">Lantern Resource Hub</a></li>' +
      '<li><a href="donate.html">Donate</a></li>' +
      "</ul></div>" +
      "<div><h4>Stay in the light</h4>" +
      "<p>Get occasional updates on new resources, events, and community distributions. No spam, ever.</p>" +
      '<form class="newsletter" data-newsletter>' +
      '<input type="email" name="email" placeholder="Your email address" aria-label="Email address" required>' +
      '<button class="btn btn-gold" type="submit">Join</button>' +
      "</form>" +
      '<p class="form-note" style="color:#a9a290">Cape Coral, Florida and Las Vegas, Nevada<br>' +
      '<a href="mailto:info@theguidedpathwayfoundation.com">info@theguidedpathwayfoundation.com</a><br>' +
      '<a href="tel:+12392239809">(239) 223-9809</a></p>' +
      "</div>" +
      "</div>" +
      '<div class="wrap footer-bottom">' +
      "<span>The Guided Pathway Foundation " + year + " · A 501(c)(3) nonprofit · EIN 41-4735497</span>" +
      "<nav>" +
      '<a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="refund.html">Refunds</a>' +
      '<a href="donation-disclaimer.html">Donation Disclaimer</a><a href="accessibility.html">Accessibility</a>' +
      "</nav>" +
      "</div>";
  }

  var headerEl = document.getElementById("site-header");
  var footerEl = document.getElementById("site-footer");
  if (headerEl) {
    headerEl.className = "site-header";
    headerEl.innerHTML = navHTML();
  }
  if (footerEl) {
    footerEl.className = "site-footer";
    footerEl.innerHTML = footerHTML();
  }

  /* Mobile menu */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  }

  /* Newsletter: compose a signup email (static site, no backend yet) */
  document.querySelectorAll("[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector('input[name="email"]').value.trim();
      if (!email) return;
      window.location.href =
        "mailto:info@theguidedpathwayfoundation.com" +
        "?subject=" + encodeURIComponent("Newsletter signup") +
        "&body=" + encodeURIComponent("Please add me to the GPF newsletter.\n\nEmail: " + email + "\n");
    });
  });

  /* Contact form: compose an email (static site, no backend yet) */
  var contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = contactForm.querySelector('[name="name"]').value.trim();
      var email = contactForm.querySelector('[name="email"]').value.trim();
      var topic = contactForm.querySelector('[name="topic"]').value;
      var message = contactForm.querySelector('[name="message"]').value.trim();
      window.location.href =
        "mailto:info@theguidedpathwayfoundation.com" +
        "?subject=" + encodeURIComponent("Website contact: " + topic + " from " + name) +
        "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nTopic: " + topic + "\n\n" + message);
    });
  }
})();
