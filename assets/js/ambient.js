(function () {
  const $ = (id) => document.getElementById(id);

  const hud = $("hud");
  const grain = $("grain");
  const clock = $("clock");
  const date = $("date");
  const timerEl = $("timer");
  const startPause = $("startPause");
  const resetBtn = $("reset");
  const modeSel = $("mode");
  const intent = $("intent");
  const helpPanel = $("helpPanel");
  const hint = $("hint");

  let zen = false;
  let running = false;
  let remaining = 25 * 60; // seconds
  let workSeconds = 25 * 60;
  let tHandle = null;

  function pad2(n){ return String(n).padStart(2,"0"); }

  function updateClock(){
    const d = new Date();
    const hh = d.getHours();
    const mm = d.getMinutes();
    clock.textContent = `${pad2(hh)}:${pad2(mm)}`;
    date.textContent = d.toLocaleDateString(undefined, { weekday:"long", year:"numeric", month:"short", day:"numeric" });
  }

  function setMode(){
    const m = parseInt(modeSel.value, 10);
    workSeconds = m * 60;
    remaining = workSeconds;
    renderTimer();
    running = false;
    startPause.textContent = "Start";
    stop();
  }

  function renderTimer(){
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    timerEl.textContent = `${pad2(m)}:${pad2(s)}`;
  }

  function tick(){
    if (!running) return;
    remaining -= 1;
    if (remaining <= 0){
      remaining = 0;
      renderTimer();
      // soft notification: title + tiny flash of hint
      document.title = "Time";
      hint.classList.remove("hide");
      setTimeout(()=>hint.classList.add("hide"), 1600);
      pause();
      return;
    }
    renderTimer();
  }

  function start(){
    if (running) return;
    running = true;
    startPause.textContent = "Pause";
    if (!tHandle) tHandle = setInterval(tick, 1000);
  }

  function pause(){
    running = false;
    startPause.textContent = "Start";
    document.title = "Ambient";
  }

  function stop(){
    if (tHandle){
      clearInterval(tHandle);
      tHandle = null;
    }
  }

  function reset(){
    pause();
    remaining = workSeconds;
    renderTimer();
  }

  function toggleZen(){
    zen = !zen;
    if (zen){
      hud.classList.add("hide");
      hint.classList.add("hide");
    }else{
      hud.classList.remove("hide");
      hint.classList.remove("hide");
    }
  }

  function toggleGrain(){
    const on = !grain.classList.contains("hide");
    if (on) grain.classList.add("hide");
    else grain.classList.remove("hide");
    localStorage.setItem("ambientGrain", on ? "0" : "1");
  }

  function toggleHelp(){
    const on = !helpPanel.classList.contains("hide");
    if (on) helpPanel.classList.add("hide");
    else helpPanel.classList.remove("hide");
  }

  // Persist intent text locally
  intent.value = localStorage.getItem("ambientIntent") || "";
  intent.addEventListener("input", () => {
    localStorage.setItem("ambientIntent", intent.value);
  });

  // Grain pref
  if (localStorage.getItem("ambientGrain") === "0") grain.classList.add("hide");

  // Wire buttons
  $("zenBtn").addEventListener("click", toggleZen);
  $("toggleGrain").addEventListener("click", toggleGrain);
  startPause.addEventListener("click", () => running ? pause() : start());
  resetBtn.addEventListener("click", reset);
  modeSel.addEventListener("change", setMode);

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === " "){ e.preventDefault(); running ? pause() : start(); }
    if (e.key.toLowerCase() === "z") toggleZen();
    if (e.key.toLowerCase() === "r") reset();
    if (e.key.toLowerCase() === "g") toggleGrain();
    if (e.key.toLowerCase() === "h") toggleHelp();
  });

  // Init
  updateClock();
  setInterval(updateClock, 1000 * 10);
  setMode();
  helpPanel.classList.add("hide"); // default hidden
})();
