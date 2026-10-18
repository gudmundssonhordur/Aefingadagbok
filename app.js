const D = window.APP_DATA;

const esc = s =>
  String(s ?? "").replace(
    /[&<>"']/g,
    m =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[m]
  );

function go(id) {
  document.querySelectorAll(".view").forEach(x => {
    x.classList.toggle("active", x.id === id);
  });

  window.scrollTo(0, 0);
}

function cards(items, badge = "Æfing") {
  return items
    .map(
      x => `
        <article class="card">
          <span class="badge">
            ${esc(x.dose || x.pace || x.type || badge)}
          </span>
          <h3>${esc(x.name)}</h3>
          <p>${esc(x.text)}</p>
        </article>
      `
    )
    .join("");
}

function render() {

  weeks.innerHTML = D.program
    .map(
      (w, i) => `
        <details class="week" ${i === 0 ? "open" : ""}>
          <summary>
            ${esc(w.week)} · ${esc(w.period)} · ${esc(w.focus)}
          </summary>

          <p>${esc(w.instructions)}</p>

          ${
            w.workouts.length
              ? w.workouts
                  .map(
                    (x, j) => `
                      <div class="workout">
                        <span class="badge">Æfing ${j + 1}</span>
                        <br>
                        ${esc(x)}
                      </div>
                    `
                  )
                  .join("")
              : `
                <div class="workout">
                  <span class="meta">
                    Enginn æfingatexti skráður fyrir þessa viku.
                  </span>
                </div>
              `
          }

          ${
            w.extras.length
              ? `
                <p>
                  <b>Aukalega:</b>
                  ${w.extras.map(esc).join(" · ")}
                </p>
              `
              : ""
          }
        </details>
      `
    )
    .join("");

  zones.innerHTML = cards(D.zones);

  physioCards.innerHTML = cards(D.physio);

  docsList.innerHTML = D.docs
    .map(
      x => `
        <article class="card doc">

          <div>
            <span class="badge">${esc(x.kind)}</span>
            <h3>${esc(x.title)}</h3>
          </div>

          <a
            class="open"
            href="${encodeURI(x.file)}"
            target="_blank"
          >
            Opna
          </a>

        </article>
      `
    )
    .join("");
}

function showCollection(key, title, sub) {
  collectionTitle.textContent = title;
  collectionSub.textContent = sub;
  collectionCards.innerHTML = cards(D[key]);

  go("collection");
}

function showPhysio() {
  physioCards.innerHTML = cards(D.physio);
  go("physio");
}

render();
