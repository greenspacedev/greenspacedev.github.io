(function () {
  const $ = (id) => document.getElementById(id);

  // Base units:
  // length: m
  // area: m^2
  // volume: m^3
  // stress/pressure: Pa
  // force: N
  // moment/torque: N*m
  // density: kg/m^3
  // energy: J
  // power: W
  // temperature: special

  const categories = [
    {
      key: "length",
      name: "Length",
      kind: "linear",
      base: "m",
      units: [
        { key: "mm", label: "millimeter (mm)", toBase: v => v / 1000, fromBase: v => v * 1000 },
        { key: "cm", label: "centimeter (cm)", toBase: v => v / 100, fromBase: v => v * 100 },
        { key: "m",  label: "meter (m)",       toBase: v => v, fromBase: v => v },
        { key: "km", label: "kilometer (km)",  toBase: v => v * 1000, fromBase: v => v / 1000 },
        { key: "in", label: "inch (in)",       toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
        { key: "ft", label: "foot (ft)",       toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
        { key: "yd", label: "yard (yd)",       toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
        { key: "mi", label: "mile (mi)",       toBase: v => v * 1609.344, fromBase: v => v / 1609.344 }
      ]
    },
    {
      key: "area",
      name: "Area",
      kind: "linear",
      base: "m²",
      units: [
        { key: "mm2", label: "mm²", toBase: v => v * 1e-6, fromBase: v => v / 1e-6 },
        { key: "cm2", label: "cm²", toBase: v => v * 1e-4, fromBase: v => v / 1e-4 },
        { key: "m2",  label: "m²",  toBase: v => v, fromBase: v => v },
        { key: "in2", label: "in²", toBase: v => v * 0.00064516, fromBase: v => v / 0.00064516 },
        { key: "ft2", label: "ft²", toBase: v => v * 0.09290304, fromBase: v => v / 0.09290304 }
      ]
    },
    {
      key: "volume",
      name: "Volume",
      kind: "linear",
      base: "m³",
      units: [
        { key: "mm3", label: "mm³", toBase: v => v * 1e-9, fromBase: v => v / 1e-9 },
        { key: "cm3", label: "cm³", toBase: v => v * 1e-6, fromBase: v => v / 1e-6 },
        { key: "m3",  label: "m³",  toBase: v => v, fromBase: v => v },
        { key: "L",   label: "liter (L)", toBase: v => v / 1000, fromBase: v => v * 1000 },
        { key: "mL",  label: "milliliter (mL)", toBase: v => v / 1e6, fromBase: v => v * 1e6 },
        { key: "in3", label: "in³", toBase: v => v * 1.6387064e-5, fromBase: v => v / 1.6387064e-5 },
        { key: "ft3", label: "ft³", toBase: v => v * 0.028316846592, fromBase: v => v / 0.028316846592 },
        { key: "gal", label: "US gallon (gal)", toBase: v => v * 0.003785411784, fromBase: v => v / 0.003785411784 }
      ]
    },
    {
      key: "stress",
      name: "Stress / Pressure",
      kind: "linear",
      base: "Pa",
      units: [
        { key: "Pa",  label: "pascal (Pa)", toBase: v => v, fromBase: v => v },
        { key: "kPa", label: "kilopascal (kPa)", toBase: v => v * 1e3, fromBase: v => v / 1e3 },
        { key: "MPa", label: "megapascal (MPa)", toBase: v => v * 1e6, fromBase: v => v / 1e6 },
        { key: "GPa", label: "gigapascal (GPa)", toBase: v => v * 1e9, fromBase: v => v / 1e9 },
        { key: "bar", label: "bar", toBase: v => v * 1e5, fromBase: v => v / 1e5 },
        { key: "psi", label: "psi", toBase: v => v * 6894.757293168, fromBase: v => v / 6894.757293168 },
        { key: "ksi", label: "ksi", toBase: v => v * 6894757.293168, fromBase: v => v / 6894757.293168 },
        { key: "atm", label: "atm", toBase: v => v * 101325, fromBase: v => v / 101325 }
      ]
    },
    {
      key: "force",
      name: "Force",
      kind: "linear",
      base: "N",
      units: [
        { key: "N", label: "newton (N)", toBase: v => v, fromBase: v => v },
        { key: "kN", label: "kilonewton (kN)", toBase: v => v * 1000, fromBase: v => v / 1000 },
        { key: "lbf", label: "pound-force (lbf)", toBase: v => v * 4.4482216152605, fromBase: v => v / 4.4482216152605 },
        { key: "kip", label: "kip (1000 lbf)", toBase: v => v * 4448.2216152605, fromBase: v => v / 4448.2216152605 }
      ]
    },
    {
      key: "moment",
      name: "Moment / Torque",
      kind: "linear",
      base: "N·m",
      units: [
        { key: "N_m", label: "N·m", toBase: v => v, fromBase: v => v },
        { key: "N_mm", label: "N·mm", toBase: v => v / 1000, fromBase: v => v * 1000 },
        { key: "lb_ft", label: "lb·ft", toBase: v => v * 1.3558179483314, fromBase: v => v / 1.3558179483314 },
        { key: "lb_in", label: "lb·in", toBase: v => v * 0.11298482902762, fromBase: v => v / 0.11298482902762 }
      ]
    },
    {
      key: "density",
      name: "Density",
      kind: "linear",
      base: "kg/m³",
      units: [
        { key: "kg_m3", label: "kg/m³", toBase: v => v, fromBase: v => v },
        { key: "g_cm3", label: "g/cm³", toBase: v => v * 1000, fromBase: v => v / 1000 },
        { key: "lb_ft3", label: "lb/ft³", toBase: v => v * 16.01846337396, fromBase: v => v / 16.01846337396 },
        { key: "lb_in3", label: "lb/in³", toBase: v => v * 27679.9047102, fromBase: v => v / 27679.9047102 }
      ]
    },
    {
      key: "energy",
      name: "Energy",
      kind: "linear",
      base: "J",
      units: [
        { key: "J", label: "joule (J)", toBase: v => v, fromBase: v => v },
        { key: "kJ", label: "kilojoule (kJ)", toBase: v => v * 1000, fromBase: v => v / 1000 },
        { key: "Wh", label: "watt-hour (Wh)", toBase: v => v * 3600, fromBase: v => v / 3600 },
        { key: "kWh", label: "kilowatt-hour (kWh)", toBase: v => v * 3.6e6, fromBase: v => v / 3.6e6 },
        { key: "ftlb", label: "ft·lbf", toBase: v => v * 1.3558179483314, fromBase: v => v / 1.3558179483314 },
        { key: "BTU", label: "BTU (IT)", toBase: v => v * 1055.05585262, fromBase: v => v / 1055.05585262 }
      ]
    },
    {
      key: "power",
      name: "Power",
      kind: "linear",
      base: "W",
      units: [
        { key: "W", label: "watt (W)", toBase: v => v, fromBase: v => v },
        { key: "kW", label: "kilowatt (kW)", toBase: v => v * 1000, fromBase: v => v / 1000 },
        { key: "hp", label: "horsepower (mechanical)", toBase: v => v * 745.6998715822702, fromBase: v => v / 745.6998715822702 }
      ]
    },
    {
      key: "temp",
      name: "Temperature",
      kind: "temperature",
      base: "K",
      units: [
        { key: "C", label: "°C", toBase: v => v + 273.15, fromBase: v => v - 273.15 },
        { key: "F", label: "°F", toBase: v => (v - 32) * (5/9) + 273.15, fromBase: v => (v - 273.15) * (9/5) + 32 },
        { key: "K", label: "K",  toBase: v => v, fromBase: v => v }
      ]
    }
  ];

  const categorySel = $("category");
  const fromUnitSel = $("fromUnit");
  const valueInp = $("value");
  const resultsBody = $("results");
  const precisionSel = $("precision");

  function fmt(n, dp){
    if (!Number.isFinite(n)) return "—";
    // Avoid "-0.0000"
    const x = Math.abs(n) < 1e-12 ? 0 : n;
    return x.toLocaleString(undefined, { maximumFractionDigits: dp, minimumFractionDigits: dp });
  }

  function renderCategories(){
    categorySel.innerHTML = "";
    categories.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.key;
      opt.textContent = c.name;
      categorySel.appendChild(opt);
    });
  }

  function currentCategory(){
    return categories.find(c => c.key === categorySel.value) || categories[0];
  }

  function renderUnits(){
    const cat = currentCategory();
    fromUnitSel.innerHTML = "";
    cat.units.forEach(u => {
      const opt = document.createElement("option");
      opt.value = u.key;
      opt.textContent = u.label;
      fromUnitSel.appendChild(opt);
    });
  }

  function getUnit(cat, key){
    return cat.units.find(u => u.key === key) || cat.units[0];
  }

  function compute(){
    const cat = currentCategory();
    const dp = parseInt(precisionSel.value, 10);
    const val = parseFloat(valueInp.value);

    resultsBody.innerHTML = "";

    if (!Number.isFinite(val)) return;

    const fromU = getUnit(cat, fromUnitSel.value);
    const base = fromU.toBase(val);

    cat.units.forEach(u => {
      const out = u.fromBase(base);

      const tr = document.createElement("tr");
      const tdU = document.createElement("td");
      const tdV = document.createElement("td");
      const tdC = document.createElement("td");

      tdU.textContent = u.label;
      tdV.innerHTML = `<code>${fmt(out, dp)}</code>`;

      const btn = document.createElement("button");
      btn.className = "btn";
      btn.type = "button";
      btn.textContent = "Copy";
      btn.addEventListener("click", async () => {
        try{
          await navigator.clipboard.writeText(String(out));
          btn.textContent = "Copied";
          setTimeout(() => btn.textContent = "Copy", 900);
        }catch{
          btn.textContent = "No perm";
          setTimeout(() => btn.textContent = "Copy", 900);
        }
      });

      tdC.appendChild(btn);

      tr.appendChild(tdU);
      tr.appendChild(tdV);
      tr.appendChild(tdC);
      resultsBody.appendChild(tr);
    });
  }

  $("swapBtn").addEventListener("click", () => {
    // Simple swap: picks the "closest" imperial/metric partner for common categories.
    const cat = currentCategory();
    const k = fromUnitSel.value;

    const swapMap = {
      length: { mm:"in", cm:"in", m:"ft", km:"mi", in:"mm", ft:"m", yd:"m", mi:"km" },
      area:   { mm2:"in2", cm2:"in2", m2:"ft2", in2:"mm2", ft2:"m2" },
      volume: { mm3:"in3", cm3:"in3", m3:"ft3", L:"gal", mL:"in3", in3:"cm3", ft3:"m3", gal:"L" },
      stress: { Pa:"psi", kPa:"psi", MPa:"ksi", GPa:"ksi", bar:"psi", psi:"kPa", ksi:"MPa", atm:"kPa" },
      force:  { N:"lbf", kN:"kip", lbf:"N", kip:"kN" },
      moment: { N_m:"lb_ft", N_mm:"lb_in", lb_ft:"N_m", lb_in:"N_mm" },
      density:{ kg_m3:"lb_ft3", g_cm3:"lb_in3", lb_ft3:"kg_m3", lb_in3:"g_cm3" },
      energy: { J:"ftlb", kJ:"BTU", Wh:"kJ", kWh:"kJ", ftlb:"J", BTU:"kJ" },
      power:  { W:"hp", kW:"hp", hp:"kW" },
      temp:   { C:"F", F:"C", K:"C" }
    };

    const m = swapMap[cat.key];
    if (m && m[k]) fromUnitSel.value = m[k];
    compute();
  });

  $("resetBtn").addEventListener("click", () => {
    valueInp.value = "";
    compute();
    valueInp.focus();
  });

  categorySel.addEventListener("change", () => {
    renderUnits();
    compute();
  });
  fromUnitSel.addEventListener("change", compute);
  valueInp.addEventListener("input", compute);
  precisionSel.addEventListener("change", compute);

  // init
  renderCategories();
  categorySel.value = "length";
  renderUnits();
})();
