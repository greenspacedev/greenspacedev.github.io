(function () {
  const $ = (id) => document.getElementById(id);

  // Curated set (kept pre-1900). Image URLs are from Wikimedia commons.
  // If any URL breaks, swap it for another commons upload.
  const ART = [
    {
      title: "Mona Lisa",
      artist: "Leonardo da Vinci",
      year: 1503,
      century: "1500s",
      img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
      source: "https://commons.wikimedia.org/wiki/File:Mona_Lisa.jpg",
      desc: "Portrait painting widely associated with the High Renaissance."
    },
    {
      title: "The Starry Night",
      artist: "Vincent van Gogh",
      year: 1889,
      century: "1800s",
      img: "https://upload.wikimedia.org/wikipedia/commons/e/ea/The_Starry_Night.jpg",
      source: "https://commons.wikimedia.org/wiki/File:The_Starry_Night.jpg",
      desc: "Post-impressionist night sky over Saint-Rémy."
    },
    {
      title: "The Night Watch",
      artist: "Rembrandt",
      year: 1642,
      century: "1600s",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/The_Nightwatch_by_Rembrandt.jpg",
      source: "https://commons.wikimedia.org/wiki/File:The_Nightwatch_by_Rembrandt.jpg",
      desc: "Militia company portrait with dramatic light and motion."
    },
    {
      title: "Girl with a Pearl Earring",
      artist: "Johannes Vermeer",
      year: 1665,
      century: "1600s",
      img: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
      source: "https://commons.wikimedia.org/wiki/File:Meisje_met_de_parel.jpg",
      desc: "Tronie noted for its luminous skin tones and simple composition."
    },
    {
      title: "The Birth of Venus",
      artist: "Sandro Botticelli",
      year: 1485,
      century: "1400s",
      img: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Birth_of_Venus_Botticelli.jpg",
      source: "https://commons.wikimedia.org/wiki/File:Birth_of_Venus_Botticelli.jpg",
      desc: "Mythological scene painted in early Renaissance Florence."
    },
    {
      title: "The Creation of Adam",
      artist: "Michelangelo",
      year: 1512,
      century: "1500s",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
      source: "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg",
      desc: "Iconic fresco panel from the Sistine Chapel ceiling."
    },
    {
      title: "Las Meninas",
      artist: "Diego Velázquez",
      year: 1656,
      century: "1600s",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Las_Meninas_01.jpg",
      source: "https://commons.wikimedia.org/wiki/File:Las_Meninas_01.jpg",
      desc: "Complex court scene with perspective and self-reference."
    },
    {
      title: "The Great Wave off Kanagawa",
      artist: "Hokusai",
      year: 1831,
      century: "1800s",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/0a/The_Great_Wave_off_Kanagawa.jpg",
      source: "https://commons.wikimedia.org/wiki/File:The_Great_Wave_off_Kanagawa.jpg",
      desc: "Woodblock print from Thirty-six Views of Mount Fuji."
    },
    {
      title: "The School of Athens",
      artist: "Raphael",
      year: 1511,
      century: "1500s",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/94/Sanzio_01.jpg",
      source: "https://commons.wikimedia.org/wiki/File:Sanzio_01.jpg",
      desc: "Fresco depicting classical philosophy in an idealized setting."
    },
    {
      title: "The Arnolfini Portrait",
      artist: "Jan van Eyck",
      year: 1434,
      century: "1400s",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg",
      source: "https://commons.wikimedia.org/wiki/File:Van_Eyck_-_Arnolfini_Portrait.jpg",
      desc: "Northern Renaissance portrait with meticulous detail and symbolism."
    },
    {
      title: "Liberty Leading the People",
      artist: "Eugène Delacroix",
      year: 1830,
      century: "1800s",
      img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
      source: "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
      desc: "Romantic allegory of revolution and civic identity."
    },
    {
      title: "A Sunday Afternoon on the Island of La Grande Jatte",
      artist: "Georges Seurat",
      year: 1886,
      century: "1800s",
      img: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_%E2%80%93_1884_-_Google_Art_Project.jpg",
      source: "https://commons.wikimedia.org/wiki/File:Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_%E2%80%93_1884_-_Google_Art_Project.jpg",
      desc: "Pointillist composition built from small dots of color."
    }
  ];

  const grid = $("grid");
  const artistFilter = $("artistFilter");
  const centuryFilter = $("centuryFilter");

  const modalBack = $("modalBack");
  const closeModal = $("closeModal");
  const modalImg = $("modalImg");
  const modalTop = $("modalTop");
  const modalTitle = $("modalTitle");
  const modalMeta = $("modalMeta");
  const modalDesc = $("modalDesc");
  const sourceLink = $("sourceLink");
  const copyTitle = $("copyTitle");

  function unique(list){
    return Array.from(new Set(list)).sort((a,b)=>a.localeCompare(b));
  }

  function initFilters(){
    const artists = unique(ART.map(a => a.artist));
    artistFilter.innerHTML = `<option value="all">All artists</option>` + artists.map(a => `<option>${a}</option>`).join("");

    const centuries = unique(ART.map(a => a.century));
    centuryFilter.innerHTML = `<option value="all">All centuries</option>` + centuries.map(c => `<option>${c}</option>`).join("");
  }

  function currentFiltered(){
    const a = artistFilter.value;
    const c = centuryFilter.value;
    return ART.filter(x => (a === "all" || x.artist === a) && (c === "all" || x.century === c));
  }

  function render(){
    const items = currentFiltered();
    grid.innerHTML = "";
    items.forEach((item, idx) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.tabIndex = 0;
      tile.setAttribute("role", "button");
      tile.setAttribute("aria-label", `Open details: ${item.title}`);
      tile.innerHTML = `
        <img src="${item.img}" alt="${item.title} by ${item.artist}" loading="lazy">
        <div class="tcap">
          <div class="name">${item.title}</div>
          <div class="sub">${item.artist} • ${item.year}</div>
        </div>
      `;
      tile.addEventListener("click", () => openItem(item));
      tile.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openItem(item); }
      });
      grid.appendChild(tile);
    });
  }

  function openItem(item){
    modalTop.textContent = `${item.artist} • ${item.year}`;
    modalTitle.textContent = item.title;
    modalMeta.textContent = `${item.century} • Source: Wikimedia Commons`;
    modalDesc.textContent = item.desc || "";
    modalImg.src = item.img;
    modalImg.alt = `${item.title} by ${item.artist}`;
    sourceLink.href = item.source;

    copyTitle.textContent = "Copy caption";
    copyTitle.onclick = async () => {
      const caption = `${item.title} — ${item.artist} (${item.year})`;
      try{
        await navigator.clipboard.writeText(caption);
        copyTitle.textContent = "Copied";
        setTimeout(()=>copyTitle.textContent="Copy caption", 900);
      }catch{
        copyTitle.textContent = "No perm";
        setTimeout(()=>copyTitle.textContent="Copy caption", 900);
      }
    };

    modalBack.classList.add("open");
  }

  function close(){
    modalBack.classList.remove("open");
    modalImg.src = "";
  }

  $("randomBtn").addEventListener("click", () => {
    const items = currentFiltered();
    if (!items.length) return;
    openItem(items[Math.floor(Math.random() * items.length)]);
  });

  closeModal.addEventListener("click", close);
  modalBack.addEventListener("click", (e) => {
    if (e.target === modalBack) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBack.classList.contains("open")) close();
  });

  artistFilter.addEventListener("change", render);
  centuryFilter.addEventListener("change", render);

  // If Launchpad requested random on load
  if (localStorage.getItem("galleryRandomOnLoad") === "1") {
    localStorage.removeItem("galleryRandomOnLoad");
    setTimeout(() => $("randomBtn").click(), 80);
  }

  initFilters();
  render();
})();
