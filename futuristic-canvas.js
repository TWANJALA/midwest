/*
 * Talent Constellation — an interactive futuristic network rendered on <canvas>.
 *
 * Drifting nodes represent healthcare professionals across the globe; proximity
 * draws luminous links between them, energy pulses travel those links, and a slow
 * radial sweep scans the field. The cursor becomes a gravity well that gathers
 * nearby talent and lights up its connections.
 *
 * Pure 2D canvas — no dependencies, DPR-aware, and fully disabled for visitors
 * who prefer reduced motion.
 */
(function () {
  "use strict";

  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  // Palette pulled from the site's "Rich Futuristic Green" theme.
  const PALETTE = ["0, 224, 122", "70, 224, 143", "92, 240, 168", "20, 184, 166", "196, 240, 77"];

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  const nodes = [];
  const pulses = [];
  const pointer = { x: -9999, y: -9999, active: false };

  let sweep = 0; // radial scan angle
  let rafId = null;
  let lastSpawn = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    nodes.length = 0;
    // Scale node count to area, capped for performance on large displays.
    const count = Math.min(120, Math.round((width * height) / 13000));
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 0.8 + Math.random() * 1.9,
        hue: PALETTE[(Math.random() * PALETTE.length) | 0],
        phase: Math.random() * Math.PI * 2, // for twinkle
      });
    }
  }

  const LINK_DIST = 132;
  const POINTER_DIST = 190;

  function step(now) {
    ctx.clearRect(0, 0, width, height);

    const linkSq = LINK_DIST * LINK_DIST;

    // --- update + draw links -------------------------------------------------
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];

      // Drift, with a gentle pull toward the cursor gravity well.
      if (pointer.active) {
        const dx = pointer.x - a.x;
        const dy = pointer.y - a.y;
        const d = Math.hypot(dx, dy);
        if (d < POINTER_DIST && d > 0.001) {
          const pull = (1 - d / POINTER_DIST) * 0.05;
          a.vx += (dx / d) * pull;
          a.vy += (dy / d) * pull;
        }
      }

      a.x += a.vx;
      a.y += a.vy;

      // Soft speed clamp so the well doesn't fling nodes off-screen.
      a.vx *= 0.992;
      a.vy *= 0.992;

      // Wrap around edges for a seamless, borderless field.
      if (a.x < -20) a.x = width + 20;
      else if (a.x > width + 20) a.x = -20;
      if (a.y < -20) a.y = height + 20;
      else if (a.y > height + 20) a.y = -20;

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < linkSq) {
          const alpha = (1 - distSq / linkSq) * 0.55;
          ctx.strokeStyle = "rgba(" + a.hue + ", " + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          // Occasionally fire an energy pulse down a fresh link.
          if (now - lastSpawn > 90 && Math.random() < 0.0009 && pulses.length < 40) {
            pulses.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, t: 0, hue: a.hue });
            lastSpawn = now;
          }
        }
      }

      // Links from the cursor to nearby talent.
      if (pointer.active) {
        const dx = a.x - pointer.x;
        const dy = a.y - pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < POINTER_DIST * POINTER_DIST) {
          const alpha = (1 - distSq / (POINTER_DIST * POINTER_DIST)) * 0.7;
          ctx.strokeStyle = "rgba(92, 240, 168, " + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(a.x, a.y);
          ctx.stroke();
        }
      }
    }

    // --- draw nodes ----------------------------------------------------------
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const twinkle = 0.6 + 0.4 * Math.sin(now * 0.002 + a.phase);
      const glow = a.r * 4;
      const grad = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, glow);
      grad.addColorStop(0, "rgba(" + a.hue + ", " + (0.9 * twinkle).toFixed(3) + ")");
      grad.addColorStop(1, "rgba(" + a.hue + ", 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(a.x, a.y, glow, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(" + a.hue + ", " + twinkle.toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- energy pulses travelling along links --------------------------------
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += 0.02;
      if (p.t >= 1) {
        pulses.splice(i, 1);
        continue;
      }
      const px = p.ax + (p.bx - p.ax) * p.t;
      const py = p.ay + (p.by - p.ay) * p.t;
      const fade = Math.sin(p.t * Math.PI);
      ctx.fillStyle = "rgba(196, 240, 77, " + (fade * 0.95).toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- slow radial scan sweep ---------------------------------------------
    sweep += 0.0045;
    const cx = width * 0.5;
    const cy = height * 0.5;
    const reach = Math.hypot(width, height) * 0.5;
    const sweepGrad = ctx.createLinearGradient(
      cx,
      cy,
      cx + Math.cos(sweep) * reach,
      cy + Math.sin(sweep) * reach
    );
    sweepGrad.addColorStop(0, "rgba(0, 224, 122, 0)");
    sweepGrad.addColorStop(0.85, "rgba(0, 224, 122, 0)");
    sweepGrad.addColorStop(1, "rgba(0, 224, 122, 0.07)");
    ctx.fillStyle = sweepGrad;
    ctx.fillRect(0, 0, width, height);

    rafId = window.requestAnimationFrame(step);
  }

  // Render a single calm frame for reduced-motion visitors.
  function renderStatic() {
    seed();
    ctx.clearRect(0, 0, width, height);
    const linkSq = LINK_DIST * LINK_DIST;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < linkSq) {
          ctx.strokeStyle = "rgba(" + a.hue + ", " + ((1 - distSq / linkSq) * 0.4).toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(" + a.hue + ", 0.85)";
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function pointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches && e.touches[0];
    const src = touch || e;
    pointer.x = src.clientX - rect.left;
    pointer.y = src.clientY - rect.top;
    pointer.active = true;
  }

  function pointerLeave() {
    pointer.active = false;
    pointer.x = -9999;
    pointer.y = -9999;
  }

  // Track the cursor across the whole hero, even though the canvas ignores clicks.
  const hero = canvas.closest(".hero") || window;
  let resizeTimer = null;

  function init() {
    resize();
    if (reduceMotion) {
      renderStatic();
      return;
    }
    hero.addEventListener("mousemove", pointerMove, { passive: true });
    hero.addEventListener("mouseleave", pointerLeave, { passive: true });
    hero.addEventListener("touchmove", pointerMove, { passive: true });
    hero.addEventListener("touchend", pointerLeave, { passive: true });
    rafId = window.requestAnimationFrame(step);
  }

  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      resize();
      if (reduceMotion) renderStatic();
    }, 180);
  });

  // Pause the loop when the hero scrolls out of view to save battery/CPU.
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (rafId === null) rafId = window.requestAnimationFrame(step);
          } else if (rafId !== null) {
            window.cancelAnimationFrame(rafId);
            rafId = null;
          }
        });
      },
      { threshold: 0 }
    );
    io.observe(canvas);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
