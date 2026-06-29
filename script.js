/* ----------------------------------------------------------------------------
   Flowing-wave canvas background
   A fixed, full-viewport animation of layered light ribbons drifting across a
   deep navy gradient. Injected on every page so the whole site shares the same
   futuristic backdrop. Honors prefers-reduced-motion by painting a single
   static frame.
---------------------------------------------------------------------------- */
(function flowingWaveBackground() {
  const canvas = document.createElement("canvas");
  canvas.className = "wave-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let dpr = 1;

  // Each layer is a stroked sine ribbon with its own speed, amplitude and hue.
  const layers = [
    { amp: 0.16, freq: 1.3, speed: 0.16, offset: 0.34, width: 1.4, color: [70, 214, 255], alpha: 0.40 },
    { amp: 0.22, freq: 1.0, speed: 0.11, offset: 0.46, width: 1.8, color: [43, 108, 255], alpha: 0.42 },
    { amp: 0.18, freq: 1.7, speed: 0.20, offset: 0.58, width: 1.2, color: [120, 180, 255], alpha: 0.30 },
    { amp: 0.26, freq: 0.8, speed: 0.08, offset: 0.66, width: 2.2, color: [27, 80, 200], alpha: 0.45 },
    { amp: 0.14, freq: 2.1, speed: 0.24, offset: 0.40, width: 1.0, color: [150, 230, 255], alpha: 0.26 },
    { amp: 0.30, freq: 0.6, speed: 0.06, offset: 0.74, width: 2.6, color: [18, 52, 140], alpha: 0.50 },
  ];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function paintBackdrop() {
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#03081c");
    g.addColorStop(0.5, "#071a44");
    g.addColorStop(1, "#04102e");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    // Soft central glow for depth.
    const glow = ctx.createRadialGradient(
      width * 0.5, height * 0.5, 0,
      width * 0.5, height * 0.5, Math.max(width, height) * 0.7
    );
    glow.addColorStop(0, "rgba(13, 42, 107, 0.55)");
    glow.addColorStop(1, "rgba(13, 42, 107, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  function drawWaves(t) {
    paintBackdrop();
    ctx.globalCompositeOperation = "lighter";

    const step = Math.max(6, Math.floor(width / 160));
    for (const layer of layers) {
      const baseY = height * layer.offset;
      const amplitude = height * layer.amp;
      const phase = t * layer.speed;

      ctx.beginPath();
      for (let x = 0; x <= width; x += step) {
        const nx = x / width;
        // Two summed sines give the ribbon an organic, non-repeating drift.
        const y =
          baseY +
          Math.sin(nx * Math.PI * 2 * layer.freq + phase) * amplitude +
          Math.sin(nx * Math.PI * 4 * layer.freq + phase * 1.6) * amplitude * 0.25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const [r, g, b] = layer.color;
      const stroke = ctx.createLinearGradient(0, 0, width, 0);
      stroke.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
      stroke.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${layer.alpha})`);
      stroke.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = layer.width;
      ctx.stroke();
    }

    ctx.globalCompositeOperation = "source-over";
  }

  function loop(now) {
    drawWaves(now / 1000);
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => {
    resize();
    if (reduceMotion) drawWaves(0);
  });

  resize();
  if (reduceMotion) {
    drawWaves(0);
  } else {
    requestAnimationFrame(loop);
  }
})();

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

function getCurrentPath() {
  const name = window.location.pathname.split("/").pop();
  return name || "index.html";
}

function renderGlobalNavigation() {
  if (!nav) return;

  const currentPath = getCurrentPath();
  const links = [
    ["index.html", "Home"],
    ["about.html", "About"],
    ["international-nurses.html", "International Nurses"],
    ["healthcare-employers.html", "Healthcare Employers"],
    ["healthcare-professionals.html", "Healthcare Professionals"],
    ["non-medical-caregivers.html", "Non-Medical Caregivers"],
    ["countries.html", "Countries"],
    ["immigration-visa-services.html", "Immigration & Visa Services"],
    ["credentialing.html", "Credentialing"],
    ["training-academy.html", "Training Academy"],
    ["open-positions.html", "Open Positions"],
    ["success-stories.html", "Success Stories"],
    ["resources.html", "Resources"],
    ["blog.html", "Blog"],
    ["faq.html", "FAQ"],
    ["contact.html", "Contact"],
    ["candidate-portal.html", "Candidate Portal"],
    ["employer-portal.html", "Employer Portal"],
  ];

  nav.innerHTML = links
    .map(([href, label]) => {
      const active = href === currentPath ? ' class="active" aria-current="page"' : "";
      return `<a href="${href}"${active}>${label}</a>`;
    })
    .join("") + '<a class="btn btn-gold" href="apply-now.html">Apply Now</a>';
}

function renderGlobalFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container footer-grid">
      <div>
        <h3>Midwest Healthcare Staffing Agency</h3>
        <p>Connecting Global Healthcare Talent with America's Healthcare Providers</p>
      </div>
      <div>
        <h4>Employer Resources</h4>
        <ul>
          <li><a href="healthcare-employers.html">Workforce Solutions</a></li>
          <li><a href="open-positions.html">Open Positions</a></li>
          <li><a href="employer-portal.html">Employer Portal</a></li>
        </ul>
      </div>
      <div>
        <h4>Candidate Resources</h4>
        <ul>
          <li><a href="international-nurses.html">International Nurses</a></li>
          <li><a href="credentialing.html">Credentialing</a></li>
          <li><a href="training-academy.html">Training Academy</a></li>
        </ul>
      </div>
      <div>
        <h4>Legal and Support</h4>
        <ul>
          <li><a href="resources.html">Resources</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="apply-now.html">Apply Now</a></li>
        </ul>
      </div>
    </div>
  `;
}

function renderBreadcrumbs() {
  const header = document.querySelector("header.topbar");
  const main = document.querySelector("main");
  if (!header || !main) return;
  if (main.querySelector(".breadcrumbs")) return;

  const currentPath = getCurrentPath();
  const labels = {
    "index.html": "Home",
    "about.html": "About",
    "international-nurses.html": "International Nurses",
    "healthcare-employers.html": "Healthcare Employers",
    "healthcare-professionals.html": "Healthcare Professionals",
    "non-medical-caregivers.html": "Non-Medical Caregivers",
    "countries.html": "Countries We Recruit From",
    "immigration-visa-services.html": "Immigration and Visa Services",
    "credentialing.html": "Credentialing",
    "training-academy.html": "Training Academy",
    "open-positions.html": "Open Positions",
    "success-stories.html": "Success Stories",
    "resources.html": "Resources",
    "blog.html": "Blog",
    "faq.html": "FAQ",
    "contact.html": "Contact",
    "candidate-portal.html": "Candidate Portal",
    "employer-portal.html": "Employer Portal",
    "apply-now.html": "Apply Now",
  };

  const breadcrumb = document.createElement("nav");
  breadcrumb.className = "breadcrumbs container";
  breadcrumb.setAttribute("aria-label", "Breadcrumb");

  if (currentPath === "index.html") {
    breadcrumb.innerHTML = '<a href="index.html" aria-current="page">Home</a>';
  } else {
    breadcrumb.innerHTML = `<a href="index.html">Home</a><span>/</span><a href="${currentPath}" aria-current="page">${labels[currentPath] || "Page"}</a>`;
  }

  main.prepend(breadcrumb);
}

renderGlobalNavigation();
renderGlobalFooter();
renderBreadcrumbs();

menuToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

function animateNumber(el, target) {
  const isPercent = [98, 95].includes(target);
  const isSupport = target === 24;
  const plus = target >= 500 || [25, 98, 95].includes(target);
  const suffix = isSupport ? "/7" : isPercent ? "%" : plus ? "+" : "";

  let value = 0;
  const increment = Math.max(1, Math.round(target / 60));

  const tick = () => {
    value = Math.min(value + increment, target);
    el.textContent = `${value}${suffix}`;
    if (value < target) requestAnimationFrame(tick);
  };

  tick();
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.animated) return;
      entry.target.dataset.animated = "true";
      animateNumber(entry.target, Number(entry.target.dataset.target));
    });
  },
  { threshold: 0.7 }
);

document.querySelectorAll(".stats h3").forEach((el) => statObserver.observe(el));

const worldMap = document.getElementById("worldMap");
const mapPoints = [
  ["Philippines", 78, 57],
  ["Kenya", 56, 64],
  ["India", 67, 54],
  ["Nigeria", 48, 56],
  ["Ghana", 45, 56],
  ["South Africa", 55, 78],
  ["Jamaica", 25, 53],
  ["Nepal", 69, 50],
  ["Zimbabwe", 56, 73],
  ["Canada", 21, 32],
  ["United Kingdom", 42, 40],
  ["Australia", 83, 76],
];

mapPoints.forEach(([name, x, y]) => {
  const dot = document.createElement("div");
  dot.className = "world-dot";
  dot.style.left = `${x}%`;
  dot.style.top = `${y}%`;
  dot.title = name;
  worldMap?.appendChild(dot);
});

const jobs = [
  { title: "ICU Registered Nurse", state: "Illinois", city: "Chicago", facility: "Hospital", specialty: "ICU", shift: "Night", visa: true, housing: true, experience: 4, salaryMin: 92000, salary: "$92,000 - $118,000" },
  { title: "ER Registered Nurse", state: "Ohio", city: "Columbus", facility: "Hospital", specialty: "ER", shift: "Day", visa: true, housing: false, experience: 2, salaryMin: 88000, salary: "$88,000 - $110,000" },
  { title: "Med Surg RN", state: "Texas", city: "Austin", facility: "Hospital", specialty: "Med Surg", shift: "Rotating", visa: false, housing: true, experience: 4, salaryMin: 84000, salary: "$84,000 - $102,000" },
  { title: "Dialysis Nurse", state: "California", city: "San Diego", facility: "Clinic", specialty: "Dialysis", shift: "Day", visa: true, housing: true, experience: 6, salaryMin: 95000, salary: "$95,000 - $120,000" },
  { title: "Rehabilitation RN", state: "Minnesota", city: "Rochester", facility: "Rehabilitation Center", specialty: "Med Surg", shift: "Night", visa: true, housing: false, experience: 2, salaryMin: 86000, salary: "$86,000 - $104,000" },
];

const jobList = document.getElementById("jobList");
const filters = document.getElementById("jobFilters");

function renderJobs(list) {
  if (!jobList) return;

  jobList.innerHTML = list.length
    ? list
        .map(
          (job) => `
      <article class="job-item">
        <h3>${job.title}</h3>
        <p><strong>Location:</strong> ${job.city}, ${job.state} | <strong>Facility:</strong> ${job.facility}</p>
        <p><strong>Specialty:</strong> ${job.specialty} | <strong>Shift:</strong> ${job.shift} | <strong>Salary:</strong> ${job.salary}</p>
        <p><strong>Visa Sponsorship:</strong> ${job.visa ? "Available" : "Not available"} | <strong>Housing:</strong> ${job.housing ? "Included" : "Not included"}</p>
        <button class="btn btn-outline-dark save-single" type="button" data-job="${job.title}">Save Job</button>
      </article>
    `
        )
        .join("")
    : "<p>No jobs match the selected filters.</p>";
}

renderJobs(jobs);

filters?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(filters);

  const state = formData.get("state")?.toString();
  const city = formData.get("city")?.toString().trim().toLowerCase();
  const facility = formData.get("facility")?.toString();
  const salary = Number(formData.get("salary") || 0);
  const shift = formData.get("shift")?.toString();
  const specialty = formData.get("specialty")?.toString();
  const experience = Number(formData.get("experience") || 0);
  const visa = formData.get("visa") === "on";
  const housing = formData.get("housing") === "on";

  const filtered = jobs.filter((job) => {
    const passState = !state || job.state === state;
    const passCity = !city || job.city.toLowerCase().includes(city);
    const passFacility = !facility || job.facility === facility;
    const passSalary = !salary || job.salaryMin >= salary;
    const passShift = !shift || job.shift === shift;
    const passSpecialty = !specialty || job.specialty === specialty;
    const passExperience = !experience || job.experience >= experience;
    const passVisa = !visa || job.visa;
    const passHousing = !housing || job.housing;
    return passState && passCity && passFacility && passSalary && passShift && passSpecialty && passExperience && passVisa && passHousing;
  });

  renderJobs(filtered);
});

const saveJobsBtn = document.getElementById("saveJobsBtn");
saveJobsBtn?.addEventListener("click", () => {
  localStorage.setItem("savedJobs", JSON.stringify(jobs.slice(0, 3)));
  alert("3 featured jobs saved to your dashboard.");
});

jobList?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.classList.contains("save-single")) return;
  alert(`${target.dataset.job} has been saved.`);
});

const alertsBtn = document.getElementById("alertsBtn");
alertsBtn?.addEventListener("click", () => {
  const alertForm = document.getElementById("jobAlertForm");
  alertForm?.scrollIntoView({ behavior: "smooth", block: "center" });
});

const alertForm = document.getElementById("jobAlertForm");
const alertMsg = document.getElementById("alertMsg");
alertForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(alertForm);
  const email = formData.get("alertEmail");
  alertMsg.textContent = `Job alerts enabled for ${email}.`;
  alertForm.reset();
});

const hospitalMap = document.getElementById("hospitalMap");
const hospitalPoints = [
  ["Chicago Medical Center", 24, 36],
  ["Cleveland Regional", 42, 30],
  ["Austin Care Network", 55, 64],
  ["San Diego Health", 12, 70],
  ["Rochester Rehab", 33, 20],
];

hospitalPoints.forEach(([name, x, y]) => {
  const dot = document.createElement("div");
  dot.className = "hospital-dot";
  dot.style.left = `${x}%`;
  dot.style.top = `${y}%`;
  dot.dataset.name = name;
  hospitalMap?.appendChild(dot);
});

const candidates = [
  { name: "A. Santos", specialty: "ICU", experience: 8, english: 95, visaReady: true, retention: 93 },
  { name: "J. Mwangi", specialty: "ER", experience: 6, english: 90, visaReady: true, retention: 89 },
  { name: "P. Shrestha", specialty: "Med Surg", experience: 7, english: 88, visaReady: true, retention: 91 },
  { name: "T. Okafor", specialty: "Dialysis", experience: 9, english: 92, visaReady: false, retention: 84 },
];

function scoreCandidate(c) {
  return c.experience * 6 + c.english * 0.25 + c.retention * 0.3 + (c.visaReady ? 20 : 0);
}

const runMatch = document.getElementById("runMatch");
const matchResult = document.getElementById("matchResult");

runMatch?.addEventListener("click", () => {
  const ranked = [...candidates]
    .map((c) => ({ ...c, score: Math.round(scoreCandidate(c)) }))
    .sort((a, b) => b.score - a.score);

  const top3 = ranked.slice(0, 3).map((c, i) => `${i + 1}. ${c.name} (${c.specialty}) score ${c.score}`);

  if (matchResult) {
    matchResult.textContent = `Top AI matches: ${top3.join(" | ")}`;
  }
});

const recommendForm = document.getElementById("recommendForm");
const recommendResult = document.getElementById("recommendResult");

recommendForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(recommendForm);
  const preferredSpecialty = formData.get("candidateSpecialty")?.toString();
  const preferredState = formData.get("candidateState")?.toString();

  const recommendations = jobs
    .filter((job) => job.specialty === preferredSpecialty || job.state === preferredState)
    .slice(0, 2)
    .map((job) => `${job.title} in ${job.city}, ${job.state}`);

  recommendResult.textContent = recommendations.length
    ? `Recommended jobs: ${recommendations.join(" | ")}`
    : "No matching recommendations available now.";
});

const scheduleForm = document.getElementById("scheduleForm");
const scheduleMsg = document.getElementById("scheduleMsg");
let latestInterviewSlot = "";

scheduleForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(scheduleForm);
  const date = formData.get("date");
  const time = formData.get("time");
  latestInterviewSlot = `${date} ${time}`;
  scheduleMsg.textContent = `Interview scheduled for ${latestInterviewSlot}.`;
});

const calendarSyncBtn = document.getElementById("calendarSyncBtn");
calendarSyncBtn?.addEventListener("click", () => {
  scheduleMsg.textContent = latestInterviewSlot
    ? `Calendar sync successful for ${latestInterviewSlot}.`
    : "Schedule an interview first, then sync to calendar.";
});

const docForm = document.getElementById("docForm");
const docMsg = document.getElementById("docMsg");

docForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(docForm);
  const files = formData.getAll("docs");
  const signName = formData.get("signName")?.toString().trim();
  const consent = formData.get("consent") === "on";

  if (!files.length || files[0].size === 0) {
    docMsg.textContent = "Please select at least one document.";
    return;
  }

  if (!signName || !consent) {
    docMsg.textContent = "Digital signature name and consent are required.";
    return;
  }

  docMsg.textContent = `${files.length} document(s) uploaded and digitally signed by ${signName}.`;
  docForm.reset();
});

const messageForm = document.getElementById("messageForm");
const messageMsg = document.getElementById("messageMsg");
messageForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(messageForm);
  const message = formData.get("message");
  messageMsg.textContent = `Secure message sent: "${message}"`;
  messageForm.reset();
});

const videoBtn = document.getElementById("videoBtn");
videoBtn?.addEventListener("click", () => {
  messageMsg.textContent = "Video interview room launched. Invite link sent to candidate and recruiter.";
});

const referralForm = document.getElementById("referralForm");
const referralMsg = document.getElementById("referralMsg");
referralForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(referralForm);
  const name = formData.get("refName")?.toString();
  const code = `MID-${Math.floor(100000 + Math.random() * 900000)}`;
  referralMsg.textContent = `Referral submitted for ${name}. Your referral code is ${code}.`;
  referralForm.reset();
});

const blogData = [
  "International nurse recruitment trends shaping U.S. healthcare in 2026",
  "How EB-3 sponsorship timelines impact workforce planning",
  "Retention strategies for long-term care and behavioral health staffing",
  "Using predictive analytics for proactive hiring in rural hospitals",
  "Bridging clinical culture: onboarding global nurses for U.S. systems",
];

const blogGrid = document.getElementById("blogGrid");
if (blogGrid) {
  blogGrid.innerHTML = blogData
    .map((title) => `<article class="blog-card"><h3>${title}</h3><p>Read strategic insights from our workforce and compliance experts.</p></article>`)
    .join("");
}

const faqData = [
  ["Do you provide visa sponsorship for international nurses?", "Yes. We support EB-3, TN, H-1B, and related pathways based on role eligibility and client needs."],
  ["How long does credentialing take?", "Credentialing timelines vary by profession and state, but we provide transparent trackers and milestone updates."],
  ["Can employers request rapid response staffing?", "Yes. We support rapid response staffing, seasonal scaling, and specialty-specific placements."],
  ["What relocation support is available?", "We assist with relocation planning, housing guidance, onboarding logistics, and transition support."],
];

const faqList = document.getElementById("faqList");
if (faqList) {
  faqList.innerHTML = faqData
    .map(
      ([q, a]) => `
      <article class="faq-item">
        <button type="button" aria-expanded="false">${q}</button>
        <p>${a}</p>
      </article>
    `
    )
    .join("");

  faqList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      item.classList.toggle("open");
      button.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

const contactForm = document.querySelector(".contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you. Your consultation request has been received.");
  contactForm.reset();
});
