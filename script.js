(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  const grid = document.getElementById("projectGrid");
  const filters = document.getElementById("filters");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  document.title = `${config.name || "Creative Portfolio"} — Portfolio`;
  document.querySelectorAll(".brand span:last-child").forEach(el => {
    el.innerHTML = (config.name || "V GRAPHIC WORLD").replace(/&/g, "&amp;").toUpperCase();
  });
  document.getElementById("emailLink").href = `mailto:${config.email || "your-email@example.com"}`;
  document.getElementById("whatsappLink").href = `https://wa.me/${(config.whatsapp || "910000000000").replace(/\D/g, "")}`;
  document.getElementById("year").textContent = new Date().getFullYear();

  function render(category = "All") {
    const projects = config.projects || [];
    const list = category === "All" ? projects : projects.filter(p => p.category === category);
    grid.innerHTML = list.map((p, i) => {
      const title = escapeHtml(p.title || "Untitled project");
      const cat = escapeHtml(p.category || "Project");
      const image = escapeAttr(p.image || "");
      const isVideo = p.type === "video" && p.videoUrl;
      return `<article class="project-card" style="animation-delay:${i * 55}ms" ${isVideo ? `data-video="${escapeAttr(p.videoUrl)}" data-title="${title}"` : ""}>
        <div class="project-image">
          <img src="${image}" alt="${title}" loading="lazy" onerror="this.style.opacity='.15';this.alt='Add your project image in projects.js';">
          <div class="project-overlay"><span>${isVideo ? "Play video" : "View project"}</span><span class="play-mark">${isVideo ? "▶" : "↗"}</span></div>
        </div>
        <div class="project-meta"><h3>${title}</h3><span>${cat}</span></div>
        <div class="project-type">${isVideo ? "VIDEO PROJECT ↗" : "VISUAL DESIGN ↗"}</div>
      </article>`;
    }).join("");
    grid.querySelectorAll("[data-video]").forEach(card => card.addEventListener("click", () => {
      const url = card.dataset.video;
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    }));
  }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function escapeAttr(s) { return escapeHtml(s); }

  filters.addEventListener("click", e => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    filters.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
    render(btn.dataset.filter);
  });
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
  render();
})();
