(() => {
  const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
  const postsEl = document.querySelector("#posts");
  const tagsEl = document.querySelector("#tags");
  const searchEl = document.querySelector("#search");
  const emptyEl = document.querySelector("#empty");

  const state = { query: "", tag: "All" };

  const escapeHtml = (value = "") =>
    String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));

  const formatDate = date =>
    new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric" })
      .format(new Date(date + "T00:00:00"));

  const allTags = [...new Set(posts.flatMap(post => post.tags || []))]
    .sort((a, b) => a.localeCompare(b));

  tagsEl.innerHTML = ["All", ...allTags].map(tag =>
    '<button class="tag' + (tag === "All" ? " active" : "") +
    '" type="button" data-tag="' + escapeHtml(tag) + '">' +
    escapeHtml(tag) + "</button>"
  ).join("");

  function render() {
    const query = state.query.trim().toLowerCase();

    const visible = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter(post => {
        const haystack = [post.title, post.excerpt, ...(post.tags || [])]
          .join(" ").toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        const matchesTag = state.tag === "All" || (post.tags || []).includes(state.tag);
        return matchesQuery && matchesTag;
      });

    postsEl.innerHTML = visible.map(post => {
      const tags = (post.tags || []).map(tag =>
        '<span class="post-tag">' + escapeHtml(tag) + "</span>"
      ).join("");

      return `
        <article class="post-card">
          <div class="post-meta">
            <time datetime="${escapeHtml(post.date)}">${formatDate(post.date)}</time>
            ${post.readingTime ? "<span>·</span><span>" + escapeHtml(post.readingTime) + "</span>" : ""}
          </div>
          <h2><a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a></h2>
          <p>${escapeHtml(post.excerpt)}</p>
          <div class="post-tags">${tags}</div>
          <a class="read-more" href="${escapeHtml(post.url)}">Read article →</a>
        </article>`;
    }).join("");

    emptyEl.hidden = visible.length !== 0;
  }

  tagsEl.addEventListener("click", event => {
    const button = event.target.closest("[data-tag]");
    if (!button) return;
    state.tag = button.dataset.tag;
    tagsEl.querySelectorAll(".tag").forEach(el =>
      el.classList.toggle("active", el === button)
    );
    render();
  });

  searchEl.addEventListener("input", event => {
    state.query = event.target.value;
    render();
  });

  render();
})();
