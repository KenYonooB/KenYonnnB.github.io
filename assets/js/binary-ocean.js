(() => {
  const backdrop = document.getElementById('ocean-backdrop');
  if (!backdrop) return;

  const main = document.getElementById('main');
  const toggle = document.getElementById('ocean-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const motionPreference = 'binary-ocean-paused';

  // Top-down silhouette: snout, paired fins and a forked tail.
  const outline = [
    [1, 0], [.91, .09], [.72, .15], [.47, .18], [.11, .40], [.04, .43],
    [.22, .14], [-.18, .11], [-.53, .065], [-.67, .04], [-1.01, .22],
    [-.89, .045], [-.89, -.045], [-1.01, -.22], [-.67, -.04], [-.53, -.065], [-.18, -.11],
    [.22, -.14], [.04, -.43], [.11, -.40], [.47, -.18], [.72, -.15], [.91, -.09]
  ];
  const colors = ['#535e6c', '#707b8a', '#959eac', '#c2c7d0'];
  const tiles = ['#0d0d0f', '#101114', '#131417', '#161719'];
  const digits = [
    ['0111110', '1000001', '1000001', '1000001', '1000001', '1000001', '1000001', '1000001', '0111110'],
    ['0001000', '0011000', '0101000', '0001000', '0001000', '0001000', '0001000', '0001000', '0111110']
  ];
  // Each orbit stores normalized center, radii, relative size and phase.
  const previewOrbits = [
    [.46, .33, .14, .12, 1, .65],
    [.73, .64, .14, .12, .70, 2.1],
    [.28, .70, .12, .10, .58, 4.6]
  ];
  const backdropOrbits = [
    [.34, .26, .13, .14, 1, 2.75],
    [.68, .55, .13, .14, .72, 4.2],
    [.39, .79, .12, .11, .86, .85]
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

  // Cache the dark tiles and pixel glyphs for each canvas resolution.
  function makeTileAtlas(cell, dpr) {
    const size = Math.max(10, Math.round(cell * dpr));
    const atlas = document.createElement('canvas');
    atlas.width = size * 3;
    atlas.height = size * colors.length;
    const ctx = atlas.getContext('2d');
    const step = Math.max(1, Math.floor((size - 1) / 9));
    const dx = Math.floor((size - 7 * step) / 2);
    const dy = Math.floor((size - 9 * step) / 2);
    for (let shade = 0; shade < colors.length; shade++) {
      const y = shade * size;
      for (let glyph = 0; glyph < 3; glyph++) {
        const x = glyph * size;
        ctx.fillStyle = tiles[shade];
        ctx.fillRect(x, y, size - 1, size - 1);
        ctx.fillStyle = colors[shade];
        if (glyph === 2) {
          ctx.fillRect(x + Math.floor(size / 2) - step, y + Math.floor(size / 2) - step, step * 2, step * 2);
          continue;
        }
        digits[glyph].forEach((row, j) => {
          for (let i = 0; i < row.length; i++) {
            if (row[i] === '1') ctx.fillRect(x + dx + i * step, y + dy + j * step, step, step);
          }
        });
      }
    }
    return { atlas, size };
  }

  function drawShark(scene, x, y, length, angle, time, seed) {
    const { context, width, height, cell, sprite: { atlas, size } } = scene;
    const half = length / 2;
    const reach = half * 1.2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const tailWave = Math.sin(time * 3.4 + seed) * .075;
    const firstX = Math.max(0, Math.floor((x - reach) / cell));
    const firstY = Math.max(0, Math.floor((y - reach) / cell));
    const lastX = Math.min(Math.ceil(width / cell), Math.ceil((x + reach) / cell));
    const lastY = Math.min(Math.ceil(height / cell), Math.ceil((y + reach) / cell));

    for (let row = firstY; row < lastY; row++) {
      for (let column = firstX; column < lastX; column++) {
        const dx = (column + .5) * cell - x;
        const dy = (row + .5) * cell - y;
        const along = (dx * cos + dy * sin) / half;
        const bend = Math.max(0, .45 - along);
        const lateral = (-dx * sin + dy * cos) / half - tailWave * bend * bend;
        if (!insideShark(along, lateral)) continue;

        const grain = noise(Math.round(along * 29) + seed, Math.round(lateral * 48));
        const shade = Math.max(0, Math.min(3, Math.round(
          3 - Math.abs(lateral + .047) * 12 - Math.max(0, -.30 - along) * 2 + (grain - .5) * 1.5
        )));
        const eye = Math.abs(along - .76) < .052 && Math.abs(Math.abs(lateral) - .075) < .038;
        const glyph = eye ? 2 : grain < .53 ? 0 : 1;
        context.globalAlpha = Math.abs(lateral) > .185 ? .56 : 1;
        context.drawImage(atlas, glyph * size, shade * size, size, size, column * cell, row * cell, cell, cell);
      }
    }
    context.globalAlpha = 1;
  }

  function createScene(canvas, isBackdrop) {
    const context = canvas.getContext('2d');
    return context && { canvas, context, isBackdrop, width: 0, height: 0, cell: 8, dpr: 0, dots: [] };
  }

  function resizeScene(scene) {
    const { canvas, context, isBackdrop } = scene;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (!width || !height || (width === scene.width && height === scene.height && dpr === scene.dpr)) return;

    scene.width = width;
    scene.height = height;
    scene.dpr = dpr;
    scene.cell = isBackdrop ? Math.max(10, Math.min(13, Math.round(width / 110))) : 10;
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.imageSmoothingEnabled = false;
    scene.sprite = makeTileAtlas(scene.cell, dpr);

    scene.dots = [];
    const spacing = isBackdrop ? 19 : 14;
    for (let row = 0; row * spacing < height; row++) {
      for (let column = 0; column * spacing < width; column++) {
        const grain = noise(column, row);
        if (grain > .28) continue;
        scene.dots.push({
          x: column * spacing + Math.floor(noise(column, row + 95) * spacing),
          y: row * spacing + Math.floor(noise(column + 106, row) * spacing),
          bright: grain < .038
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
      context.fillStyle = dot.bright ? '#637082' : '#282d36';
      context.fillRect(dot.x, dot.y, 1, 1);
    }

    const length = isBackdrop
      ? Math.min(width * .70, height * .62, 442)
      : Math.min(width * .70, height * .98, 335);
    const orbits = isBackdrop ? backdropOrbits : previewOrbits;
    for (const [cx, cy, rx, ry, scale, phase] of orbits) {
      const theta = phase + time * (.22 + scale * .07);
      const x = width * (cx + rx * Math.cos(theta));
      const y = height * (cy + ry * Math.sin(theta));
      const angle = Math.atan2(height * ry * Math.cos(theta), -width * rx * Math.sin(theta));
      drawShark(scene, x, y, length * scale, angle, time, Math.round(phase * 10));
    }
  }

  const outerScene = createScene(backdrop, true);
  if (!outerScene) return;

  let heroScene;
  let frame = 0;
  let time = 0;
  let last = 0;
  let paused = false;
  try { paused = sessionStorage.getItem(motionPreference) === 'yes'; } catch { /* File URLs can deny storage. */ }

  function paint() {
    drawScene(outerScene, time);
    if (heroScene) drawScene(heroScene, time);
  }

  function tick(now) {
    if (!last) last = now;
    if (now - last >= 33) {
      time += Math.min(now - last, 100) / 1000;
      last = now;
      paint();
    }
    frame = requestAnimationFrame(tick);
  }

  function updateMotion() {
    cancelAnimationFrame(frame);
    last = 0;
    const label = paused ? '播放背景动画' : '暂停背景动画';
    if (toggle) {
      toggle.hidden = reducedMotion.matches;
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
      toggle.classList.toggle('is-paused', paused);
    }
    paint();
    if (!paused && !reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(tick);
  }

  function connectHero() {
    const canvas = main.querySelector('.ocean-preview');
    heroScene = canvas && createScene(canvas, false);
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      paused = !paused;
      try { sessionStorage.setItem(motionPreference, paused ? 'yes' : 'no'); } catch { /* Storage is optional. */ }
      updateMotion();
    });
  }
  document.addEventListener('visibilitychange', updateMotion);
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', updateMotion);
  else reducedMotion.addListener(updateMotion);
  window.addEventListener('resize', paint);
  if (main) {
    connectHero();
    new MutationObserver(() => {
      connectHero();
      paint();
    }).observe(main, { childList: true });
  }
  updateMotion();
})();
