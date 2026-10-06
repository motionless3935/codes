/**
 * OMINIS SYSTEMS - Physical AI & Aerospace Autonomy Interactive Suite
 * High-performance 60FPS physics simulation, Monte Carlo engine, and hardware inspector.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrambleText();
  initSimulationSandbox();
  initPipelineSwitcher();
  initHardwareExplorer();
  initPricingCalculators();
  initFaqAccordion();
  initMobileDrawer();
  initApprovalForm();
  initAudioSynthesizer();
});

/* ==========================================================================
   1. SCRAMBLE TEXT EFFECT (Aerospace Telemetry Decoding)
   ========================================================================== */

function initScrambleText() {
  const chars = '0123456789ABCDEF!<>-_\\/[]{}—=+*^?#________';
  const element = document.getElementById('hero-scramble-heading');
  if (!element) return;

  const targetText = element.getAttribute('data-text') || element.innerText;
  let iteration = 0;
  let interval = null;

  function runScramble() {
    clearInterval(interval);
    iteration = 0;

    interval = setInterval(() => {
      element.innerText = targetText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= targetText.length) {
        clearInterval(interval);
        element.innerText = targetText;
      }

      iteration += 1 / 2;
    }, 28);
  }

  runScramble();
}

/* ==========================================================================
   2. INTERACTIVE SIMULATION SANDBOX (60 FPS Canvas Physics)
   ========================================================================== */

function initSimulationSandbox() {
  const canvas = document.getElementById('sim-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // DOM Elements
  const tabDrones = document.getElementById('tab-drone-sim');
  const tabSats = document.getElementById('tab-sat-sim');
  const tabMc = document.getElementById('tab-mc-sim');
  const mcDashboard = document.getElementById('mc-dashboard');
  const densitySlider = document.getElementById('agent-density-slider');
  const densityVal = document.getElementById('agent-density-val');
  const turbSlider = document.getElementById('turbulence-slider');
  const turbVal = document.getElementById('turbulence-val');
  const btnVectors = document.getElementById('btn-toggle-vectors');
  const btnGrid = document.getElementById('btn-toggle-grid');
  const btnFault = document.getElementById('btn-trigger-fault');
  const btnReset = document.getElementById('sim-reset-btn');
  const clockDisplay = document.getElementById('sim-clock-display');
  const fpsDisplay = document.getElementById('sim-fps-display');
  const hudAgentCount = document.getElementById('hud-agent-count');
  const hudCollisions = document.getElementById('hud-collisions');
  const hudFormationError = document.getElementById('hud-formation-error');
  const attitudeDegrees = document.getElementById('attitude-degrees');

  // Simulation State
  let mode = 'drones'; // 'drones' | 'satellites' | 'montecarlo'
  let agentCount = parseInt(densitySlider.value, 10) || 128;
  let turbulence = parseFloat(turbSlider.value) || 2.5;
  let showVectors = true;
  let showGrid = true;
  let faultActive = false;
  let agents = [];
  let mouse = { x: canvas.width / 2, y: canvas.height / 2, active: false };
  let startTime = Date.now();
  let lastFrameTime = performance.now();
  let frameCount = 0;
  let fpsTimer = performance.now();

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0) {
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = 480 * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Initialize Agents
  function resetAgents() {
    agents = [];
    const w = canvas.getBoundingClientRect().width || 1000;
    const h = 480;

    for (let i = 0; i < agentCount; i++) {
      if (mode === 'drones') {
        agents.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          targetX: w / 2,
          targetY: h / 2,
          size: 4 + Math.random() * 2,
          heading: Math.random() * Math.PI * 2,
          health: 1.0,
          id: i
        });
      } else if (mode === 'satellites') {
        const orbitRadius = 140 + (i % 6) * 45;
        const angle = (i / agentCount) * Math.PI * 2;
        agents.push({
          orbitR: orbitRadius,
          angle: angle,
          speed: 0.005 + (1 / orbitRadius) * 0.4,
          x: w / 2 + Math.cos(angle) * orbitRadius,
          y: h / 2 + Math.sin(angle) * orbitRadius * 0.45,
          id: i
        });
      }
    }
    if (hudAgentCount) hudAgentCount.innerText = `${agentCount} VEHICLES`;
  }
  resetAgents();

  // Mouse interactivity
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Mode Tabs Switching
  function switchMode(newMode) {
    mode = newMode;
    [tabDrones, tabSats, tabMc].forEach(t => t.classList.remove('active'));

    if (mode === 'drones') {
      tabDrones.classList.add('active');
      mcDashboard.style.display = 'none';
    } else if (mode === 'satellites') {
      tabSats.classList.add('active');
      mcDashboard.style.display = 'none';
    } else if (mode === 'montecarlo') {
      tabMc.classList.add('active');
      mcDashboard.style.display = 'block';
      initMonteCarloChart();
    }
    resetAgents();
  }

  tabDrones.addEventListener('click', () => switchMode('drones'));
  tabSats.addEventListener('click', () => switchMode('satellites'));
  tabMc.addEventListener('click', () => switchMode('montecarlo'));

  // Slider Listeners
  densitySlider.addEventListener('input', (e) => {
    agentCount = parseInt(e.target.value, 10);
    densityVal.innerText = agentCount;
    resetAgents();
  });

  turbSlider.addEventListener('input', (e) => {
    turbulence = parseFloat(e.target.value);
    turbVal.innerText = `${turbulence.toFixed(1)} m/s`;
  });

  btnVectors.addEventListener('click', () => {
    showVectors = !showVectors;
    btnVectors.classList.toggle('active', showVectors);
  });

  btnGrid.addEventListener('click', () => {
    showGrid = !showGrid;
    btnGrid.classList.toggle('active', showGrid);
  });

  btnFault.addEventListener('click', () => {
    faultActive = !faultActive;
    btnFault.classList.toggle('active', faultActive);
    btnFault.innerText = faultActive ? 'Fault Injected!' : 'Inject Fault';
    if (faultActive && agents.length > 5) {
      agents[0].health = 0.0;
      agents[1].health = 0.2;
    }
  });

  btnReset.addEventListener('click', () => {
    faultActive = false;
    btnFault.classList.remove('active');
    btnFault.innerText = 'Inject Fault';
    startTime = Date.now();
    resetAgents();
  });

  // Main 60 FPS Render Loop
  function renderSim(now) {
    requestAnimationFrame(renderSim);

    // Calculate FPS
    frameCount++;
    if (now - fpsTimer >= 500) {
      const currentFps = ((frameCount * 1000) / (now - fpsTimer)).toFixed(1);
      if (fpsDisplay) fpsDisplay.innerText = currentFps;
      frameCount = 0;
      fpsTimer = now;
    }

    // Update Clock
    const elapsed = Date.now() - startTime;
    const ms = Math.floor((elapsed % 1000) / 10).toString().padStart(2, '0');
    const sec = Math.floor((elapsed / 1000) % 60).toString().padStart(2, '0');
    const min = Math.floor((elapsed / 60000) % 60).toString().padStart(2, '0');
    if (clockDisplay) clockDisplay.innerText = `00:${min}:${sec}.${ms}`;

    const w = canvas.getBoundingClientRect().width || 1000;
    const h = 480;

    // Clear background
    ctx.fillStyle = '#05070D';
    ctx.fillRect(0, 0, w, h);

    // Draw Coordinate Grid
    if (showGrid) {
      ctx.strokeStyle = 'rgba(46, 91, 255, 0.07)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    // Render Mode Physics
    if (mode === 'drones') {
      renderDronePhysics(w, h);
    } else if (mode === 'satellites') {
      renderSatellitePhysics(w, h);
    }

    // Update attitude HUD quaternion jitter
    if (attitudeDegrees && Math.random() < 0.15) {
      const p = (Math.sin(elapsed / 1200) * 1.5).toFixed(2);
      const r = (Math.cos(elapsed / 900) * 1.2).toFixed(2);
      const y = (Math.sin(elapsed / 1500) * 2.1).toFixed(2);
      attitudeDegrees.innerText = `${p}° / ${r}° / ${y}°`;
    }
  }

  function renderDronePhysics(w, h) {
    const targetX = mouse.active ? mouse.x : w / 2 + Math.sin(Date.now() / 1500) * 200;
    const targetY = mouse.active ? mouse.y : h / 2 + Math.cos(Date.now() / 1500) * 100;

    // Target Waypoint Marker
    ctx.strokeStyle = 'rgba(0, 255, 157, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(targetX, targetY, 18, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#00FF9D';
    ctx.fill();

    let collisions = 0;

    // Update & Draw Agents
    for (let i = 0; i < agents.length; i++) {
      const a = agents[i];

      // Swarm flocking forces towards target
      const dx = targetX - a.x;
      const dy = targetY - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Turbulence gust noise
      const turbX = (Math.sin(a.id + Date.now() / 600) * turbulence * 0.15);
      const turbY = (Math.cos(a.id + Date.now() / 600) * turbulence * 0.15);

      if (a.health > 0) {
        a.vx += (dx / (dist + 50)) * 0.25 + turbX;
        a.vy += (dy / (dist + 50)) * 0.25 + turbY;
      } else {
        // Degraded actuator / falling
        a.vy += 0.25;
      }

      // Drag friction
      a.vx *= 0.94;
      a.vy *= 0.94;
      a.x += a.vx;
      a.y += a.vy;

      // Wrap around bounds
      if (a.x < 0) a.x = w;
      if (a.x > w) a.x = 0;
      if (a.y < 0) a.y = h;
      if (a.y > h) a.y = 0;

      a.heading = Math.atan2(a.vy, a.vx);

      // Neighbor collision checking
      for (let j = i + 1; j < agents.length; j++) {
        const b = agents[j];
        const ndx = b.x - a.x;
        const ndy = b.y - a.y;
        const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

        if (nDist < 16) {
          collisions++;
          // Repulsion
          const repX = (ndx / nDist) * 0.8;
          const repY = (ndy / nDist) * 0.8;
          a.vx -= repX;
          a.vy -= repY;
          b.vx += repX;
          b.vy += repY;
        } else if (nDist < 48) {
          // Connect swarm mesh link
          ctx.strokeStyle = 'rgba(46, 91, 255, 0.12)';
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Draw Drone Body
      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.heading);

      if (a.health === 0) {
        ctx.fillStyle = '#FF3B30';
      } else {
        ctx.fillStyle = i % 5 === 0 ? '#00FF9D' : '#527BFF';
      }

      // Triangle drone fuselage
      ctx.beginPath();
      ctx.moveTo(a.size * 1.5, 0);
      ctx.lineTo(-a.size, -a.size);
      ctx.lineTo(-a.size * 0.5, 0);
      ctx.lineTo(-a.size, a.size);
      ctx.closePath();
      ctx.fill();

      // Velocity & Collision Cones
      if (showVectors) {
        ctx.strokeStyle = 'rgba(0, 255, 157, 0.25)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(a.size * 4, 0);
        ctx.stroke();
      }

      ctx.restore();
    }

    if (hudCollisions) {
      hudCollisions.innerText = collisions > 0 ? `${collisions} DETECTED` : '0 DETECTED';
      hudCollisions.style.color = collisions > 0 ? '#FF6B00' : '#00FF9D';
    }
  }

  function renderSatellitePhysics(w, h) {
    const cx = w / 2;
    const cy = h / 2;

    // Draw Simulated Earth Sphere
    const earthRadius = 90;
    const earthGrad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, earthRadius);
    earthGrad.addColorStop(0, '#1E43E2');
    earthGrad.addColorStop(0.6, '#0B1745');
    earthGrad.addColorStop(1, '#050B20');

    ctx.fillStyle = earthGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, earthRadius, 0, Math.PI * 2);
    ctx.fill();

    // Atmosphere Glow
    ctx.strokeStyle = 'rgba(46, 91, 255, 0.4)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw Orbits & Satellites
    agents.forEach((sat, idx) => {
      sat.angle += sat.speed;
      sat.x = cx + Math.cos(sat.angle) * sat.orbitR;
      sat.y = cy + Math.sin(sat.angle) * (sat.orbitR * 0.45);

      // Draw Orbit Path
      if (idx % 8 === 0) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, sat.orbitR, sat.orbitR * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw Satellite Node
      ctx.fillStyle = '#00FF9D';
      ctx.beginPath();
      ctx.arc(sat.x, sat.y, 3, 0, Math.PI * 2);
      ctx.fill();

      // Laser Cross-Links to next satellite
      if (idx < agents.length - 1 && Math.abs(sat.orbitR - agents[idx + 1].orbitR) < 10) {
        ctx.strokeStyle = 'rgba(0, 255, 157, 0.15)';
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(sat.x, sat.y);
        ctx.lineTo(agents[idx + 1].x, agents[idx + 1].y);
        ctx.stroke();
      }
    });
  }

  requestAnimationFrame(renderSim);
}

/* ==========================================================================
   3. MONTE CARLO TEST SUITE (100,000 Runs Visual Engine)
   ========================================================================== */

let mcChartInitialized = false;

function initMonteCarloChart() {
  const chartCanvas = document.getElementById('mc-chart-canvas');
  const runBtn = document.getElementById('run-mc-batch-btn');
  const progressBar = document.getElementById('mc-progress-bar');
  const runsCounter = document.getElementById('mc-runs-counter');
  const elapsedTime = document.getElementById('mc-elapsed-time');
  const survivalRate = document.getElementById('mc-survival-rate');

  if (!chartCanvas || mcChartInitialized) return;
  mcChartInitialized = true;

  const ctx = chartCanvas.getContext('2d');
  const w = chartCanvas.width;
  const h = chartCanvas.height;

  function drawEmptyChart() {
    ctx.fillStyle = '#060910';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    // Baseline grid
    for (let y = 30; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }
    ctx.fillStyle = '#8A99AD';
    ctx.font = '10px "IBM Plex Mono"';
    ctx.fillText('CLICK "EXECUTE 100,000 RUNS" TO COMMENCE STATISTICAL STRESS MATRIX', w / 2 - 200, h / 2);
  }
  drawEmptyChart();

  let isRunning = false;

  runBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    runBtn.disabled = true;
    runBtn.innerText = 'EXECUTING GPU BATCHES...';

    let runs = 0;
    const totalRuns = 100000;
    const startTime = performance.now();
    const histogramData = Array(50).fill(0);

    const interval = setInterval(() => {
      runs += 2500;
      const progress = Math.min(runs / totalRuns, 1);
      progressBar.style.width = `${progress * 100}%`;
      runsCounter.innerText = `${runs.toLocaleString()} / 100,000`;

      const currElapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      elapsedTime.innerText = `${currElapsed} s`;

      // Fill histogram normal distribution
      for (let i = 0; i < 50; i++) {
        const x = (i - 25) / 6;
        const norm = Math.exp(-0.5 * x * x);
        histogramData[i] = Math.min(h - 30, norm * (h - 50) * progress + Math.random() * 8);
      }

      // Redraw Chart
      ctx.fillStyle = '#060910';
      ctx.fillRect(0, 0, w, h);

      // Draw Histogram Bars
      const barWidth = (w - 60) / 50;
      for (let i = 0; i < 50; i++) {
        const barH = histogramData[i];
        const barX = 40 + i * barWidth;
        const barY = h - 20 - barH;

        ctx.fillStyle = i > 45 || i < 5 ? 'rgba(255, 59, 48, 0.7)' : 'rgba(0, 255, 157, 0.6)';
        ctx.fillRect(barX, barY, barWidth - 1, barH);
      }

      // Survival Rate update
      survivalRate.innerText = `${(99.85 + (Math.random() * 0.1)).toFixed(2)}%`;

      if (runs >= totalRuns) {
        clearInterval(interval);
        isRunning = false;
        runBtn.disabled = false;
        runBtn.innerText = 'RE-RUN 100,000 MONTE CARLO';
        survivalRate.innerText = '99.92%';
      }
    }, 35);
  });
}

/* ==========================================================================
   4. ONE CODEBASE PIPELINE SWITCHER (SITL & HITL)
   ========================================================================== */

function initPipelineSwitcher() {
  const tabSitl = document.getElementById('tab-sitl');
  const tabHitl = document.getElementById('tab-hitl');
  const sitlInfo = document.getElementById('sitl-info');
  const hitlInfo = document.getElementById('hitl-info');
  const codeDisplay = document.getElementById('code-snippet-display');
  const envBadge = document.getElementById('terminal-env-badge');
  const terminalFilename = document.getElementById('terminal-filename');

  if (!tabSitl || !tabHitl) return;

  const sitlSnippet = `
<span class="kw">use</span> ominis_core::prelude::*;
<span class="kw">use</span> ominis_sim::prelude::*;

<span class="comment">// SITL: Continuous physical control running in Cloud JAX/GPU</span>
<span class="attribute">#[derive(System)]</span>
<span class="kw">pub struct</span> <span class="type">AttitudeControlSystem</span> {
    <span class="kw">pub</span> target_attitude: <span class="type">Quaternion</span>,
    <span class="kw">pub</span> pid_gains: <span class="type">GainVector3</span>,
}

<span class="kw">impl</span> <span class="type">FlightLoop</span> <span class="kw">for</span> <span class="type">AttitudeControlSystem</span> {
    <span class="kw">fn</span> <span class="func">step</span>(&amp;<span class="kw">mut</span> <span class="self">self</span>, ctx: &amp;<span class="kw">mut</span> <span class="type">Context</span>) -&gt; <span class="type">ActuatorCommands</span> {
        <span class="comment">// Reads from 100,000 parallel GPU virtual sensor buffers</span>
        <span class="kw">let</span> imu = ctx.read_sensor::&lt;<span class="type">VirtualImu</span>&gt;();
        <span class="kw">let</span> error = <span class="self">self</span>.target_attitude * imu.quaternion.inverse();
        
        <span class="comment">// XLA JIT vectorizes 10,000x faster than real-time</span>
        <span class="kw">let</span> torque = <span class="self">self</span>.pid_gains.calculate(error.to_euler_angles());
        ActuatorCommands::from_torques(torque)
    }
}`;

  const hitlSnippet = `
<span class="kw">use</span> ominis_core::prelude::*;
<span class="kw">use</span> ominis_aleph::avionics::*;

<span class="comment">// HITL: Exact same code running natively on Aleph STM32H7 + Jetson Orin</span>
<span class="attribute">#[derive(System)]</span>
<span class="kw">pub struct</span> <span class="type">AttitudeControlSystem</span> {
    <span class="kw">pub</span> target_attitude: <span class="type">Quaternion</span>,
    <span class="kw">pub</span> pid_gains: <span class="type">GainVector3</span>,
}

<span class="kw">impl</span> <span class="type">FlightLoop</span> <span class="kw">for</span> <span class="type">AttitudeControlSystem</span> {
    <span class="kw">fn</span> <span class="func">step</span>(&amp;<span class="kw">mut</span> <span class="self">self</span>, ctx: &amp;<span class="kw">mut</span> <span class="type">Context</span>) -&gt; <span class="type">ActuatorCommands</span> {
        <span class="comment">// Direct DMA read from triple hardware BMI270 &amp; STM32 SPI bus</span>
        <span class="kw">let</span> imu = ctx.read_sensor::&lt;<span class="type">HardwareTripleImu</span>&gt;();
        <span class="kw">let</span> error = <span class="self">self</span>.target_attitude * imu.quaternion.inverse();
        
        <span class="comment">// Sub-millisecond deterministic PWM output on JST-GH pins</span>
        <span class="kw">let</span> torque = <span class="self">self</span>.pid_gains.calculate(error.to_euler_angles());
        ActuatorCommands::from_torques(torque)
    }
}`;

  tabSitl.addEventListener('click', () => {
    tabSitl.classList.add('active');
    tabHitl.classList.remove('active');
    sitlInfo.style.display = 'flex';
    hitlInfo.style.display = 'none';
    codeDisplay.innerHTML = sitlSnippet;
    envBadge.innerText = 'ENV: CLOUD SIMULATION (JAX/GPU)';
    envBadge.style.color = '#527BFF';
    terminalFilename.innerText = 'flight_controller.rs (SITL Mode)';
  });

  tabHitl.addEventListener('click', () => {
    tabHitl.classList.add('active');
    tabSitl.classList.remove('active');
    hitlInfo.style.display = 'flex';
    sitlInfo.style.display = 'none';
    codeDisplay.innerHTML = hitlSnippet;
    envBadge.innerText = 'ENV: ALEPH HARDWARE TARGET';
    envBadge.style.color = '#FF6B00';
    terminalFilename.innerText = 'flight_controller.rs (HITL Mode)';
  });
}

/* ==========================================================================
   5. ALEPH HARDWARE EXPLORER (Carrier Board vs Expansion Board)
   ========================================================================== */

function initHardwareExplorer() {
  const hwTabCarrier = document.getElementById('hw-tab-carrier');
  const hwTabExpansion = document.getElementById('hw-tab-expansion');
  const hwTabSpecs = document.getElementById('hw-tab-specs');
  const carrierLayer = document.getElementById('svg-carrier-layer');
  const expansionLayer = document.getElementById('svg-expansion-layer');
  const boardTitle = document.getElementById('schematic-board-title');
  const specHeaderTag = document.getElementById('spec-header-tag');
  const specHeaderTitle = document.getElementById('spec-header-title');
  const specHeaderDesc = document.getElementById('spec-header-desc');
  const specsTable = document.getElementById('specs-table');
  const btnInspectExpansion = document.getElementById('btn-inspect-expansion');

  if (!hwTabCarrier || !hwTabExpansion) return;

  function showCarrierBoard() {
    hwTabCarrier.classList.add('active');
    hwTabExpansion.classList.remove('active');
    hwTabSpecs.classList.remove('active');

    carrierLayer.style.display = 'block';
    expansionLayer.style.display = 'none';
    boardTitle.innerText = 'ALEPH CARRIER BOARD // LAYER 1 (EDGE AI)';

    specHeaderTag.className = 'spec-tag tag-orange';
    specHeaderTag.innerText = 'UPPER CARRIER BOARD';
    specHeaderTitle.innerText = 'NVIDIA Jetson Orin SOM';
    specHeaderDesc.innerText = 'Houses the NVIDIA Jetson Orin System-on-Module. Unlocks state-of-the-art neural perception, LiDAR SLAM, and autonomous decision policies directly on airborne or space hardware.';

    specsTable.innerHTML = `
      <tbody>
        <tr>
          <th>COMPUTE OPTIONS:</th>
          <td>Orin Nano 4GB (20 TOPS) &bull; Nano 8GB (40 TOPS) &bull; Orin NX 16GB (100 TOPS)</td>
        </tr>
        <tr>
          <th>SAMTEC INTERCONNECT:</th>
          <td>ERF5-050 high-density 50-pin board-to-board connector (PCIe x2, USB 2, 2x I2C, 2x SPI, CAN, UART)</td>
        </tr>
        <tr>
          <th>EXTERNAL I/O:</th>
          <td>M.2 Key-M PCIe x4, USB-C 10Gbps with DP/PD, GigE with PoE, MIPI CSI-2 camera ports</td>
        </tr>
        <tr>
          <th>POWER CONSUMPTION:</th>
          <td>7W - 25W configurable (Low-power standby mode available)</td>
        </tr>
      </tbody>`;
    btnInspectExpansion.innerText = 'Switch to Expansion Board';
  }

  function showExpansionBoard() {
    hwTabExpansion.classList.add('active');
    hwTabCarrier.classList.remove('active');
    hwTabSpecs.classList.remove('active');

    carrierLayer.style.display = 'none';
    expansionLayer.style.display = 'block';
    boardTitle.innerText = 'ALEPH EXPANSION BOARD // LAYER 2 (DETERMINISTIC IO)';

    specHeaderTag.className = 'spec-tag tag-blue';
    specHeaderTag.innerText = 'LOWER EXPANSION BOARD';
    specHeaderTitle.innerText = 'STM32H757 Dual-Core & Sensors';
    specHeaderDesc.innerText = 'Dedicated hard real-time microcontroller (Cortex-M7 @ 480MHz + Cortex-M4 @ 240MHz) with redundant triple IMUs, precision barometer, and solder-free JST-GH avionics ports.';

    specsTable.innerHTML = `
      <tbody>
        <tr>
          <th>MICROCONTROLLER:</th>
          <td>STM32H757XI Dual-core ARM Cortex-M7/M4 with hardware FPU</td>
        </tr>
        <tr>
          <th>INTEGRATED SENSORS:</th>
          <td>3x BMI270 6-DOF IMUs (Triple Redundant) &bull; BMP581 Barometer &bull; BMM350 Magnetometer</td>
        </tr>
        <tr>
          <th>AVIONICS PORTS:</th>
          <td>2x JST-GH 10-pin PWM/ESC &bull; 2x JST-GH 4-pin CAN &bull; 2x JST-GH 6-pin GPS/UART &bull; 1x JST-GH RC</td>
        </tr>
        <tr>
          <th>DEBUGGER:</th>
          <td>Integrated on-board Raspberry Pi RP2040 SWD debugger over dedicated USB-C</td>
        </tr>
      </tbody>`;
    btnInspectExpansion.innerText = 'Switch to Carrier Board';
  }

  hwTabCarrier.addEventListener('click', showCarrierBoard);
  hwTabExpansion.addEventListener('click', showExpansionBoard);
  btnInspectExpansion.addEventListener('click', () => {
    if (carrierLayer.style.display !== 'none') {
      showExpansionBoard();
    } else {
      showCarrierBoard();
    }
  });

  hwTabSpecs.addEventListener('click', () => {
    hwTabSpecs.classList.add('active');
    hwTabCarrier.classList.remove('active');
    hwTabExpansion.classList.remove('active');
    carrierLayer.style.display = 'block';
    expansionLayer.style.display = 'none';
    boardTitle.innerText = 'ALEPH COMPLETE AVIONICS DATASHEET';
    specHeaderTag.className = 'spec-tag tag-emerald';
    specHeaderTag.innerText = 'FULL SPECIFICATION';
    specHeaderTitle.innerText = 'Aleph Open Avionics Stack';
    specHeaderDesc.innerText = 'Complete technical breakdown of the Aleph dual-board mechanical, electrical, and thermal envelope.';
    specsTable.innerHTML = `
      <tbody>
        <tr>
          <th>DIMENSIONS:</th>
          <td>88mm &times; 64mm &times; 28mm (Including CNC anodized heatsink enclosure)</td>
        </tr>
        <tr>
          <th>WEIGHT:</th>
          <td>142g (bare boards) / 228g (with ruggedized aluminum casing)</td>
        </tr>
        <tr>
          <th>OPERATING TEMP:</th>
          <td>-40&deg;C to +85&deg;C (Industrial / Aerospace qualification)</td>
        </tr>
        <tr>
          <th>SHOCK &amp; VIBE:</th>
          <td>MIL-STD-810H vibration and shock compliant for rocket &amp; drone flights</td>
        </tr>
      </tbody>`;
  });
}

/* ==========================================================================
   6. PRICING & VALUE CAPTURE CALCULATORS
   ========================================================================== */

function initPricingCalculators() {
  const computeSlider = document.getElementById('compute-hours-slider');
  const computeVal = document.getElementById('compute-hours-val');
  const simCost = document.getElementById('sim-estimate-cost');

  const hwSlider = document.getElementById('hardware-units-slider');
  const hwVal = document.getElementById('hw-units-val');
  const hwCost = document.getElementById('hw-estimate-cost');

  if (computeSlider && computeVal && simCost) {
    computeSlider.addEventListener('input', (e) => {
      const hours = parseInt(e.target.value, 10);
      computeVal.innerText = `${hours.toLocaleString()} hrs`;
      // $5/hr blended rate
      const cost = hours * 5;
      simCost.innerText = `$${cost.toLocaleString()} / mo`;
    });
  }

  if (hwSlider && hwVal && hwCost) {
    hwSlider.addEventListener('input', (e) => {
      const units = parseInt(e.target.value, 10);
      hwVal.innerText = `${units} ${units === 1 ? 'unit' : 'units'}`;
      // Average flight-ready unit $1,260 (mix of nano & NX)
      const cost = units * 1260;
      hwCost.innerText = `$${cost.toLocaleString()} USD`;
    });
  }
}

/* ==========================================================================
   7. TECHNICAL FAQ ACCORDION
   ========================================================================== */

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(other => {
        other.classList.remove('active');
        const btn = other.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   8. MOBILE DRAWER NAVIGATION
   ========================================================================== */

function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-item');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => drawer.classList.add('open'));
  if (closeBtn) closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  drawerLinks.forEach(link => link.addEventListener('click', () => drawer.classList.remove('open')));
}

/* ==========================================================================
   9. ARCHITECTURE APPROVAL FORM
   ========================================================================== */

function initApprovalForm() {
  const form = document.getElementById('approval-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-approval-btn');
    if (btn) {
      btn.disabled = true;
      btn.innerText = 'Registering Architecture Approval...';
    }

    setTimeout(() => {
      feedback.style.display = 'flex';
      if (btn) btn.innerText = 'Architecture Authorized &bull; SDK Sent';
      form.reset();
    }, 800);
  });
}

/* ==========================================================================
   10. WEB AUDIO FEEDBACK (Subtle Aerospace Beeps)
   ========================================================================== */

function initAudioSynthesizer() {
  let audioCtx = null;
  let audioEnabled = false;
  const toggleBtn = document.getElementById('toggle-audio-btn');
  const statusLabel = document.getElementById('audio-status-label');

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    statusLabel.innerText = audioEnabled ? 'AUDIO: ON' : 'AUDIO: OFF';

    if (audioEnabled && !audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioEnabled) playTone(880, 0.08);
  });

  function playTone(freq, duration) {
    if (!audioEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Play subtle feedback on key buttons
  document.querySelectorAll('.btn, .mode-tab, .hw-tab').forEach(b => {
    b.addEventListener('click', () => {
      if (audioEnabled) playTone(1200, 0.04);
    });
  });
}
