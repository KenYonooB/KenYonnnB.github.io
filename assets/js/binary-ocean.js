(() => {
  const backdrop = document.getElementById('ocean-backdrop');
  const main = document.getElementById('main');
  const toggle = document.getElementById('ocean-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const tau = 2 * Math.PI;

  // Top-down silhouette: snout, paired fins and a forked tail.
  const outline = [
    [1, 0], [.91, .105], [.72, .17], [.48, .18], [.19, .45], [.16, .42],
    [.25, .14], [-.15, .095], [-.53, .045], [-.65, .04], [-.99, .23],
    [-.91, 0], [-.99, -.23], [-.65, -.04], [-.53, -.045], [-.15, -.095],
    [.25, -.14], [.16, -.42], [.19, -.45], [.48, -.18], [.72, -.17], [.91, -.105]
  ];
  const colors = ['#536277', '#71839a', '#96a8be', '#bccbdc'];
  // Each orbit stores normalized center, radii, relative size and phase.
  const previewOrbits = [
    [.45, .38, .15, .18, 1, .65],
    [.68, .63, .14, .16, .72, 2.1],
    [.29, .72, .13, .12, .56, 4.6]
  ];
  const backdropOrbits = [
    [.08, .35, .045, .26, 1, .5],
    [.92, .62, .045, .25, .74, 2.8],
    [.61, .93, .18, .04, .56, 4.5]
  ];

  function noise(x, y) {
    const n = Math.imul(x + 17, 374761393) + Math.imul(y + 29, 668265263);
    const mixed = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((mixed ^ (mixed >>> 16)) >>> 0) / 4294967296;
  }

  function insideShark(x, y) {
    let inside = false;
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
      const [ax, ay] = outline[i];
      const [bx, by] = outline[j];
      if ((ay > y) !== (by > y) && x < ax + (y - ay) * (bx - ax) / (by - ay)) {
        inside = !inside;
      }
    }
    return inside;
  }

  function drawShark(scene, x, y, length, angle, time, seed) {
    const { context, width, height, cell } = scene;
    const half = length / 2;
    const reach = half * 1.2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const tailWave = Math.sin(time * 3.4 + seed) * .13;
    const firstX = Math.max(0, Math.floor((x - reach) / cell));
    const firstY = Math.max(0, Math.floor((y - reach) / cell));
    const lastX = Math.min(Math.ceil(width / cell), Math.ceil((x + reach) / cell));
    const lastY = Math.min(Math.ceil(height / cell), Math.ceil((y + reach) / cell));

    context.font = `${cell - 1}px monospace`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    for (let row = firstY; row < lastY; row++) {
      for (let column = firstX; column < lastX; column++) {
        const dx = (column + .5) * cell - x;
        const dy = (row + .5) * cell - y;
        const along = (dx * cos + dy * sin) / half;
        const bend = Math.max(0, .45 - along);
        const lateral = (-dx * sin + dy * cos) / half - tailWave * bend * bend;
        if (!insideShark(along, lateral)) continue;

        const grain = noise(Math.round(along * 31) + seed, Math.round(lateral * 41));
        const shade = Math.max(0, Math.min(3, Math.round(3 - Math.abs(lateral + .055) * 9 + grain * .8)));
        const left = column * cell;
        const top = row * cell;
        context.fillStyle = '#151a21';
        context.fillRect(left, top, cell - 1, cell - 1);
        context.fillStyle = colors[shade];
        context.fillText(grain < .53 ? '0' : '1', left + cell / 2, top + cell / 2);
      }
    }
  }

  function createScene(canvas, isBackdrop) {
    const context = canvas.getContext('2d');
    return context && { canvas, context, isBackdrop, width: 0, height: 0, cell: 8, dpr: 0, dots: [] };
  }

  function resizeScene(scene) {
    const { canvas, context, isBackdrop } = scene;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    if (!width || !height || (width === scene.width && height === scene.height && dpr === scene.dpr)) return;

    scene.width = width;
    scene.height = height;
    scene.dpr = dpr;
    scene.cell = isBackdrop ? 10 : width < 310 ? 7 : 8;
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    scene.dots = [];
    const spacing = isBackdrop ? 22 : 13;
    for (let row = 0; row * spacing < height; row++) {
      for (let column = 0; column * spacing < width; column++) {
        const grain = noise(column, row);
        if (grain > .48) continue;
        scene.dots.push({
          x: column * spacing + Math.floor(noise(column, row + 95) * spacing),
          y: row * spacing + Math.floor(noise(column + 106, row) * spacing),
          bright: grain < .085
        });
      }
    }
  }

  function drawScene(scene, time) {
    resizeScene(scene);
    const { context, width, height, dots, isBackdrop } = scene;
    if (!width || !height) return;

    context.clearRect(0, 0, width, height);
    for (const dot of dots) {
      context.fillStyle = dot.bright ? '#59697d' : '#2b3644';
      context.fillRect(dot.x, dot.y, 1, 1);
    }

    const length = Math.min(width * .51, height * .67, isBackdrop ? 255 : 215);
    const orbits = isBackdrop ? backdropOrbits : previewOrbits;
    for (const [cx, cy, rx, ry, scale, phase] of orbits) {
      const theta = phase + time * (.22 + scale * .07);
      const x = width * (cx + rx * Math.cos(theta));
      const y = height * (cy + ry * Math.sin(theta));
      const angle = Math.atan2(height * ry * Math.cos(theta), -width * rx * Math.sin(theta));
      drawShark(scene, x, y, length * scale, angle, time, phase * 10);
    }
  }

  const outerScene = createScene(backdrop, true);
  if (!outerScene) return;

  let heroScene;
  let frame = 0;
  let time = 0;
  let last = 0;
  let paused = false;

  function paint() {
    drawScene(outerScene, time);
    if (heroScene) drawScene(heroScene, time);
  }

  function tick(now) {
    if (!last) last = now;
    if (now - last >= 32) {
      time += (now - last) / 1000;
      last = now;
      paint();
    }
    frame = requestAnimationFrame(tick);
  }

  function updateMotion() {
    cancelAnimationFrame(frame);
    last = 0;
    const label = paused ? '播放背景动画' : '暂停背景动画';
    toggle.hidden = reducedMotion.matches;
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    toggle.classList.toggle('is-paused', paused);
    paint();
    if (!paused && !reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(tick);
  }

  function connectHero() {
    const canvas = main.querySelector('.ocean-preview');
    heroScene = canvas && createScene(canvas, false);
    paint();
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    updateMotion();
  });
  document.addEventListener('visibilitychange', updateMotion);
  reducedMotion.addEventListener('change', updateMotion);
  window.addEventListener('resize', paint);
  new MutationObserver(connectHero).observe(main, { childList: true });
  connectHero();
  updateMotion();
})();
