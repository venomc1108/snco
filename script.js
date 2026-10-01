(function () {
  'use strict';

  /* =========================================================
     ⚙️ CẤU HÌNH — SỬA TẠI ĐÂY
     ========================================================= */
  const PASSWORD    = "01101988";
  const MUSIC       = "assets/music.mp3";
  const SENDER_NAME = "venom";

  const MESSAGES = [
    "Kính gửi cô – người giáo viên của tập thể 10A6!",
    "Nhân ngày sinh nhật cô, tập thể lớp 10A6 xin gửi đến cô những lời chúc tốt đẹp và chân thành nhất. Dù chúng em và cô mới đồng hành cùng nhau trong một khoảng thời gian chưa dài, nhưng những tiết học, những bài Toán và cả những khoảnh khắc trên lớp đã giúp chúng em dần cảm nhận được sự tận tâm và nhiệt huyết của cô dành cho học trò.",
    "Trên hành trình của sự nghiệp “trồng người”, có lẽ mỗi thế hệ học sinh sẽ là một dấu ấn nhỏ trong chặng đường của cô. Và chúng em rất vui khi 10A6 cũng được trở thành một phần trong hành trình ấy. Mong rằng trong khoảng thời gian sắp tới, cô và chúng em sẽ có thêm thật nhiều tiết học đáng nhớ, thật nhiều tiếng cười và những kỉ niệm đẹp dưới mái trường.",
    "Tuổi mới, tập thể 10A6 chúc cô luôn mạnh khỏe, vui vẻ, hạnh phúc và luôn giữ được ngọn lửa nhiệt huyết với nghề. Chúc cho hành trình gieo những “hạt mầm” tri thức của cô sẽ luôn nở hoa bằng thật nhiều thế hệ học trò trưởng thành, thành công và luôn nhớ đến cô.",
    "Cảm ơn cô vì đã đồng hành cùng 10A6 trong những bước đầu tiên của chặng đường cấp THPT. Chúc cô có một sinh nhật thật vui vẻ, ấm áp và tràn ngập yêu thương!",
  ];

  const CLOSING = [
    "10A6-K65"
  ];

  /* =========================================================
     DOM
     ========================================================= */
  const screenCake     = document.getElementById('screenCake');
  const screenPassword = document.getElementById('screenPassword');
  const screenLetter   = document.getElementById('screenLetter');

  const cakeWrap       = document.getElementById('cakeWrap');
  const passwordCard   = document.getElementById('passwordCard');
  const passwordInput  = document.getElementById('passwordInput');
  const passwordBtn    = document.getElementById('passwordBtn');
  const passwordError  = document.getElementById('passwordError');

  const letter         = document.getElementById('letter');
  const letterBody     = document.getElementById('letterBody');
  const letterClosing  = document.getElementById('letterClosing');
  const letterHeart    = document.getElementById('letterHeart');
  const letterName     = document.getElementById('letterName');

  const finalMessage   = document.getElementById('finalMessage');
  const confettiLayer  = document.getElementById('confettiLayer');

  const musicBtn       = document.getElementById('musicBtn');
  const bgMusic        = document.getElementById('bgMusic');

  const particlesCanvas = document.getElementById('particlesCanvas');
  const bgBokeh        = document.getElementById('bgBokeh');
  const bgPetals       = document.getElementById('bgPetals');

  /* =========================================================
     BACKGROUND
     ========================================================= */
  function createBokeh() {
    bgBokeh.innerHTML = '';
    const count = window.innerWidth < 768 ? 15 : 28;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'bokeh-dot';
      const size = Math.random() * 40 + 15;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = (Math.random() * 30 + 90) + '%';
      dot.style.animationDuration = (12 + Math.random() * 15) + 's';
      dot.style.animationDelay = (-Math.random() * 20) + 's';
      bgBokeh.appendChild(dot);
    }
  }

  const PETAL_ICONS = ['🌸', '🌷', '🌺', '💮', '🌹', '💖'];

  function createPetals() {
    bgPetals.innerHTML = '';
    const count = window.innerWidth < 768 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = PETAL_ICONS[Math.floor(Math.random() * PETAL_ICONS.length)];
      petal.style.left = Math.random() * 100 + '%';
      petal.style.top = '-10vh';
      petal.style.fontSize = (14 + Math.random() * 14) + 'px';
      petal.style.animationDuration = (18 + Math.random() * 15) + 's';
      petal.style.animationDelay = (-Math.random() * 30) + 's';
      bgPetals.appendChild(petal);
    }
  }

  /* =========================================================
     PARTICLES CANVAS
     ========================================================= */
  let particlesCtx, particlesDpr;
  let particles = [];

  function initParticles() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    particlesCanvas.width = window.innerWidth * dpr;
    particlesCanvas.height = window.innerHeight * dpr;
    particlesCanvas.style.width = window.innerWidth + 'px';
    particlesCanvas.style.height = window.innerHeight + 'px';
    particlesCtx = particlesCanvas.getContext('2d');
    particlesDpr = dpr;

    particles = [];
    const count = window.innerWidth < 768 ? 50 : 90;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * particlesCanvas.width,
        y: Math.random() * particlesCanvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.5 + 0.2,
        hue: 330 + Math.random() * 40
      });
    }
  }

  function drawParticles() {
    if (!particlesCtx) return;
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = particlesCanvas.width;
      if (p.x > particlesCanvas.width) p.x = 0;
      if (p.y < 0) p.y = particlesCanvas.height;
      if (p.y > particlesCanvas.height) p.y = 0;

      const twinkle = 0.7 + Math.sin(Date.now() * 0.001 + i) * 0.3;
      particlesCtx.beginPath();
      particlesCtx.arc(p.x, p.y, p.r * particlesDpr, 0, Math.PI * 2);
      particlesCtx.fillStyle = 'hsla(' + p.hue + ', 80%, 78%, ' + (p.alpha * twinkle) + ')';
      particlesCtx.fill();
    }
    requestAnimationFrame(drawParticles);
  }

  /* =========================================================
     SCREEN MANAGEMENT
     ========================================================= */
  function showScreen(screen) {
    [screenCake, screenPassword, screenLetter].forEach(function (s) {
      s.classList.remove('active');
    });
    screen.classList.add('active');
  }

  /* =========================================================
     SCREEN 1 → 2: CAKE CLICK
     ========================================================= */
  let cakeClicked = false;
  cakeWrap.addEventListener('click', function () {
    if (cakeClicked) return;
    cakeClicked = true;

    const glow = document.querySelector('.cake-glow');
    if (glow) {
      glow.style.transition = 'all 0.8s ease';
      glow.style.transform = 'scale(3)';
      glow.style.opacity = '0';
    }

    cakeWrap.style.transition = 'all 0.8s ease';
    cakeWrap.style.transform = 'scale(1.3)';
    cakeWrap.style.opacity = '0';

    burstParticles(window.innerWidth / 2, window.innerHeight / 2);

    setTimeout(function () {
      showScreen(screenPassword);
      setTimeout(function () {
        passwordCard.classList.add('show');
        passwordInput.focus();
      }, 200);
    }, 700);
  });

  /* =========================================================
     PARTICLE BURST
     ========================================================= */
  function burstParticles(cx, cy) {
    const count = 35;
    const icons = ['✨', '💫', '⭐', '🌟', '💖', '🌸'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.textContent = icons[Math.floor(Math.random() * icons.length)];
      el.style.cssText =
        'position:fixed;left:' + cx + 'px;top:' + cy + 'px;' +
        'font-size:' + (Math.random() * 16 + 14) + 'px;' +
        'pointer-events:none;z-index:100;' +
        'transition:all 1.2s cubic-bezier(0.22,1,0.36,1);' +
        'opacity:1;filter:drop-shadow(0 0 10px rgba(255,200,220,0.9));';
      document.body.appendChild(el);

      const angle = (i / count) * Math.PI * 2;
      const dist = 150 + Math.random() * 250;

      requestAnimationFrame(function () {
        el.style.transform = 'translate(' +
          (Math.cos(angle) * dist) + 'px, ' +
          (Math.sin(angle) * dist) + 'px) scale(0.3) rotate(' + (Math.random() * 720) + 'deg)';
        el.style.opacity = '0';
      });

      setTimeout(function () { el.remove(); }, 1300);
    }
  }

  /* =========================================================
     SCREEN 2: PASSWORD
     ========================================================= */
  function checkPassword() {
    const value = passwordInput.value.trim();

    if (value === PASSWORD) {
      passwordError.classList.remove('show');
      passwordCard.classList.remove('show');
      passwordCard.style.transition = 'all 0.6s ease';
      passwordCard.style.transform = 'scale(0.8)';
      passwordCard.style.opacity = '0';

      burstParticles(window.innerWidth / 2, window.innerHeight / 2);

      setTimeout(function () {
        showScreen(screenLetter);
        setTimeout(startLetter, 500);
      }, 800);
    } else {
      passwordError.classList.add('show');
      passwordCard.classList.remove('shake');
      void passwordCard.offsetWidth;
      passwordCard.classList.add('shake');

      passwordInput.style.borderColor = '#b91c3c';
      setTimeout(function () {
        passwordInput.style.borderColor = '';
      }, 1500);
    }
  }

  passwordBtn.addEventListener('click', checkPassword);
  passwordInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') checkPassword();
  });

  passwordInput.addEventListener('input', function () {
    passwordError.classList.remove('show');
  });

  /* =========================================================
     SCREEN 3: LETTER + TYPEWRITER TỪNG DÒNG
     ========================================================= */

  /* Type ký tự từng chữ cho 1 dòng */
  function typeLine(el, text, speed, done) {
    let i = 0;
    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    cursor.textContent = '|';
    el.appendChild(cursor);

    function step() {
      if (i <= text.length) {
        // Xóa cursor, gõ text, thêm lại cursor
        el.textContent = text.slice(0, i);
        if (i < text.length) el.appendChild(cursor);
        i++;
        setTimeout(step, speed);
      } else {
        el.classList.add('done');
        if (done) done();
      }
    }
    step();
  }

  /* Type lần lượt từng dòng */
  function typeLinesSequential(container, lines, speedPerChar, pauseBetween, done) {
    container.innerHTML = '';
    let idx = 0;

    function nextLine() {
      if (idx >= lines.length) {
        if (done) done();
        return;
      }
      const lineEl = document.createElement('p');
      lineEl.className = 'letter-line';
      container.appendChild(lineEl);

      typeLine(lineEl, lines[idx], speedPerChar, function () {
        idx++;
        setTimeout(nextLine, pauseBetween);
      });
    }
    nextLine();
  }

  /* Type closing (dùng cùng hiệu ứng typewriter) */
  function typeClosing(el, text, speed, done) {
    let i = 0;
    el.textContent = '';
    el.classList.add('show');

    function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else {
        if (done) done();
      }
    }
    step();
  }

  function startLetter() {
    letter.classList.add('show');

    // Bắt đầu type từng dòng với speed ~28ms/ký tự, pause 700ms giữa các dòng
    setTimeout(function () {
      typeLinesSequential(letterBody, MESSAGES, 28, 800, function () {

        // Sau khi hết các dòng → đợi 1.2s rồi type lời kết
        setTimeout(function () {
          typeClosing(letterClosing, CLOSING, 25, function () {

            // Sau khi type xong closing → đợi 800ms rồi hiện tim
            setTimeout(function () {
              letterHeart.classList.add('show');

              // Đợi 1.2s nữa → hiện chữ ký tên
              setTimeout(function () {
                letterName.textContent = SENDER_NAME;
                letterName.classList.add('show');

                // Sau khi chữ ký hiện xong → confetti + final message
                setTimeout(function () {
                  launchConfetti();
                  finalMessage.classList.add('show');
                }, 1600);

              }, 1200);
            }, 800);
          });
        }, 1200);
      });
    }, 600);
  }

  /* =========================================================
     CONFETTI
     ========================================================= */
  function launchConfetti() {
    const icons = ['🌸', '💖', '✨', '🌷', '💐', '⭐', '💫', '🎉', '🎊', '🌺', '💝'];
    const count = window.innerWidth < 768 ? 30 : 60;

    for (let i = 0; i < count; i++) {
      setTimeout(function () {
        const el = document.createElement('div');
        el.className = 'confetti';
        el.textContent = icons[Math.floor(Math.random() * icons.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (14 + Math.random() * 14) + 'px';
        el.style.animationDuration = (4 + Math.random() * 4) + 's';
        confettiLayer.appendChild(el);

        setTimeout(function () { el.remove(); }, 9000);
      }, i * 80);
    }
  }

  /* =========================================================
     MUSIC
     ========================================================= */
  let musicPlaying = false;

  function tryPlayMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.4;
    const p = bgMusic.play();
    if (p && p.then) {
      p.then(function () {
        musicPlaying = true;
        musicBtn.classList.add('playing');
      }).catch(function () {});
    }
  }

  function toggleMusic() {
    if (musicPlaying) {
      bgMusic.pause();
      musicPlaying = false;
      musicBtn.classList.remove('playing');
    } else {
      tryPlayMusic();
    }
  }

  musicBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMusic();
  });

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    createBokeh();
    createPetals();
    initParticles();
    requestAnimationFrame(drawParticles);

    if (bgMusic) {
      const source = bgMusic.querySelector('source');
      if (source) source.src = MUSIC;
      bgMusic.load();
    }

    showScreen(screenCake);
  }

  window.addEventListener('resize', function () {
    clearTimeout(window.__resizeTimer);
    window.__resizeTimer = setTimeout(function () {
      initParticles();
      createBokeh();
      createPetals();
    }, 300);
  });

  init();

  console.log(
    '%c🎂 Website chúc mừng sinh nhật cô giáo',
    'color:#d4788a; font-size:14px; font-weight:bold;'
  );
  console.log(
    '%cMật khẩu: ' + PASSWORD + ' | Người gửi: ' + SENDER_NAME,
    'color:#c9a961; font-size:12px;'
  );

})();