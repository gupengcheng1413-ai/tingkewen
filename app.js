/* ======================================================
   听力音频 · 阿尔法蛋K6  —  app.js
   ====================================================== */

const app = {

  /* -------- 应用状态 -------- */
  currentPage: 'splashPage',
  selectedVersion: '统编版（六三学制）',
  selectedVersionType: 'primary',  // 'primary' | 'high'
  selectedGrade: 3,
  selectedVolume: '上册',
  currentLessonIndex: 0,
  isPlaying: false,
  loopMode: 'sequence',   // 'sequence' | 'single' | 'list'
  playbackSpeed: 1,
  timerEnabled: false,
  timerValue: 'chapter',  // 'chapter' | number(minutes)
  timerCountdown: 0,      // seconds remaining
  timerInterval: null,
  currentProgress: 0,     // 0–100
  currentLineIndex: 0,
  favorites: [],
  playedLessons: [],
  isFirstTime: true,
  progressInterval: null,

  /* -------- 课文数据 -------- */
  lessons: [
    {
      id: 1, unit: '第一单元', title: '大青树下的小学', duration: '01:32', durationSec: 92,
      lyrics: [
        '早晨，从山坡上，从坪坝里，从一条条开着绒球花和太阳花的小路上，走来了许多小学生，有傣族的，有景颇族的，有阿昌族和德昂族的，还有汉族的。',
        '大家穿戴不同，来到学校，都成了好朋友。',
        '那鲜艳的民族服装，把学校打扮得更加绚丽多彩。',
        '同学们向在校园里欢唱的小鸟打招呼，向敬爱的老师问好，向高高飘扬的国旗敬礼。',
        '上课了，不同民族的小学生，在同一间教室里学习。大家一起朗读课文，那声音真好听！',
        '这时候，窗外十分安静，树枝不摇了，鸟儿不叫了，蝴蝶停在花朵上，好像都在听同学们读课文。',
        '下课了，大家在大青树下跳孔雀舞、摔跤、做游戏，招引来许多小鸟，连松鼠、山狸也赶来看热闹。',
        '这就是我们的民族小学，一所边疆的民族小学。'
      ]
    },
    {
      id: 2, unit: '第一单元', title: '花的学校', duration: '01:21', durationSec: 81,
      lyrics: [
        '当雷云在天上轰响，六月的阵雨落下的时候，润湿的东风走过荒野，在竹林中吹着口笛。',
        '于是一群一群的花从无人知道的地方突然跑出来，在绿草上跳舞、狂欢。',
        '妈妈，我真的觉得那群花朵是在地下的学校里上学。',
        '它们关了门做功课，如果它们想在散学以前出来游戏，它们的老师是要罚它们站墙角的。',
        '树叶扑簌簌地响，是在说"来了！来了！"吗？',
        '雨一来，他们便放假了，于是他们就跑出来，各自找自己的妈妈。'
      ]
    },
    {
      id: 3, unit: '第一单元', title: '不懂就要问', duration: '01:46', durationSec: 106,
      lyrics: [
        '孙中山小时候在私塾读书。那时候上课，先生念，学生跟着念，咿咿呀呀，像唱歌一样。',
        '学生读熟了，先生就让他们一个一个地背诵。',
        '至于书里的意思，先生从来不讲。',
        '一天，孙中山来到学校，照例把书放到先生面前，流利地背出昨天所学的功课。',
        '先生听了，连连点头。',
        '孙中山想：这样糊里糊涂地背，有什么用呢？于是他壮着胆子向先生提问。',
        '先生讲得很仔细，大家听得很认真。',
        '孙中山笑了笑，说："学问学问，不懂就要问。为了弄清楚道理，就是挨打也值得。"'
      ]
    },
    {
      id: 4, unit: '第二单元', title: '古诗三首', duration: '01:07', durationSec: 67,
      lyrics: [
        '《山行》',
        '远上寒山石径斜，白云生处有人家。停车坐爱枫林晚，霜叶红于二月花。',
        '',
        '《赠刘景文》',
        '荷尽已无擎雨盖，菊残犹有傲霜枝。一年好景君须记，最是橙黄橘绿时。',
        '',
        '《夜书所见》',
        '萧萧梧叶送寒声，江上秋风动客情。知有儿童挑促织，夜深篱落一灯明。'
      ]
    },
    {
      id: 5, unit: '第二单元', title: '铺满金色巴掌的水泥道', duration: '01:15', durationSec: 75,
      lyrics: [
        '一夜秋风，一夜秋雨。当我背着书包去上学时，天开始放晴了。',
        '啊！多么明朗的天空！',
        '我一抬头，便看见梧桐树叶儿在阳光的照耀下，闪闪发光。',
        '它们像一个个金色的小巴掌，熨帖地、平展地粘在水泥道上。',
        '我走在铺满金色巴掌的水泥道上，觉得真美啊！'
      ]
    },
    {
      id: 6, unit: '第二单元', title: '秋天的雨', duration: '01:20', durationSec: 80,
      lyrics: [
        '秋天的雨，是一把钥匙。它带着清凉和温柔，轻轻地，轻轻地，趁你没留意，把秋天的大门打开了。',
        '秋天的雨，有一盒五彩缤纷的颜料。',
        '你看，它把黄色给了银杏树，黄黄的叶子像一把把小扇子，扇哪扇哪，扇走了夏天的炎热。',
        '它把红色给了枫树，红红的枫叶像一枚枚邮票，飘哇飘哇，邮来了秋天的凉爽。',
        '金黄色是给田野的，看，田野像金色的海洋。',
        '橙红色是给果树的，橘子、柿子你挤我碰，争着要人们去摘呢！'
      ]
    },
    {
      id: 7, unit: '第二单元', title: '听听，秋的声音', duration: '01:02', durationSec: 62,
      lyrics: [
        '听听，秋的声音，大树抖抖手臂，"刷刷"，是黄叶道别的话音。',
        '听听，秋的声音，蟋蟀振动翅膀，"瞿瞿"，是和阳台告别的歌韵。',
        '一排排大雁追上白云，撒下一阵暖暖的叮咛。',
        '一阵阵秋风掠过田野，送来一片丰收的歌吟。',
        '听听，走进秋，走进这辽阔透明的音乐厅，你好好地去听——秋的声音。'
      ]
    },
    {
      id: 8, unit: '第三单元', title: '去年的树', duration: '01:10', durationSec: 70,
      lyrics: [
        '一棵树和一只鸟儿是好朋友。鸟儿站在树枝上，天天给树唱歌。树呢，天天听着鸟儿唱。',
        '日子一天天过去，寒冷的冬天就要来到了。',
        '鸟儿必须离开树，飞到很远很远的地方去。',
        '树对鸟儿说："再见了，小鸟！明年春天请你回来，还唱歌给我听。"',
        '鸟儿说："好的，我明年春天一定回来，给你唱歌。请等着我吧！"',
        '春天来了，鸟儿飞回来了，树不见了，只留下树根在那里。',
        '鸟儿对着灯火唱起了去年唱过的歌。唱完了歌，鸟儿又看了看灯火，就飞走了。'
      ]
    },
    {
      id: 9, unit: '第三单元', title: '那一定会很好', duration: '00:55', durationSec: 55,
      lyrics: [
        '种子被泥土紧紧地包裹着，它不得不把身体缩成一团。',
        '"这真难受。"种子想，"我一定要站起来，大口大口地呼吸空气，那一定会很好。"',
        '种子一边想一边努力生长。过了些日子，它长成了一棵小树。',
        '小树每天站在那里，累得腰酸腿疼。',
        '"要是能做一把椅子，让人坐着休息，那一定会很好。"',
        '椅子经历了漫长岁月，变成了木地板，阳光照在它身上，它感到了舒适和满足。'
      ]
    },
    {
      id: 10, unit: '第三单元', title: '在牛肚子里旅行', duration: '01:18', durationSec: 78,
      lyrics: [
        '青头和红头是一对好朋友，它们都是小蟋蟀。一天，它们在草堆里捉迷藏。',
        '一头大黄牛来吃草了，红头正好在这堆草里，被卷进了大黄牛的嘴里。',
        '"救命啊！救命啊！"红头拼命叫起来。',
        '青头大声喊："红头！不要怕，你会出来的。我去想办法！"',
        '青头从牛鼻子里进去了，跑进牛的胃里。',
        '青头帮助红头终于从牛的鼻腔里逃了出来。红头看见了青头，激动地说："谢谢你！"'
      ]
    },
    {
      id: 11, unit: '第三单元', title: '一块奶酪', duration: '01:12', durationSec: 72,
      lyrics: [
        '蚂蚁队长把找到的一大块奶酪分成了很多小份，分给了蚂蚁们。',
        '他发现有一小块碎奶酪被自己搬运时不小心掉了一点儿。',
        '他很想吃这块碎奶酪，可是又想起了自己的命令：谁也不许偷嘴！',
        '最终，他把碎奶酪让给了最小的蚂蚁，自己走在了队伍的最后面。',
        '队员们心里都很佩服蚂蚁队长，脚步走得更整齐了。'
      ]
    },
    {
      id: 12, unit: '识字表', title: '词语表', duration: '00:42', durationSec: 42,
      lyrics: [
        '坪坝 穿戴 打扮 好奇 招引 飘扬 雪白',
        '摔跤 热闹 铜钟 绒球花 孔雀舞',
        '蝴蝶 山狸 民族 敬爱 国旗',
        '绚丽多彩 安静 迷人 边疆'
      ]
    }
  ],

  /* -------- 初始化 -------- */
  init() {
    this.loadState();
    this.startClock();
    // Splash 页自动跳转
    setTimeout(() => {
      if (this.isFirstTime) {
        this.showPage('selectVersionPage');
      } else {
        this.renderLessonList();
        this.updateTocHeader();
        this.showPage('lessonListPage');
      }
    }, 1500);
  },

  /* -------- LocalStorage -------- */
  loadState() {
    try {
      const raw = localStorage.getItem('tingkewen_v2');
      if (raw) {
        const s = JSON.parse(raw);
        this.isFirstTime = false;
        this.selectedVersion    = s.selectedVersion    || '统编版（六三学制）';
        this.selectedVersionType= s.selectedVersionType|| 'primary';
        this.selectedGrade      = s.selectedGrade      || 3;
        this.selectedVolume     = s.selectedVolume     || '上册';
        this.currentLessonIndex = s.currentLessonIndex || 0;
        this.currentProgress    = s.currentProgress    || 0;
        this.currentLineIndex   = s.currentLineIndex   || 0;
        this.loopMode           = s.loopMode           || 'sequence';
        this.playbackSpeed      = s.playbackSpeed      || 1;
        this.favorites          = s.favorites          || [];
        this.playedLessons      = s.playedLessons      || [];
      }
    } catch (e) { /* ignore */ }
  },

  saveState() {
    const s = {
      selectedVersion:    this.selectedVersion,
      selectedVersionType:this.selectedVersionType,
      selectedGrade:      this.selectedGrade,
      selectedVolume:     this.selectedVolume,
      currentLessonIndex: this.currentLessonIndex,
      currentProgress:    this.currentProgress,
      currentLineIndex:   this.currentLineIndex,
      loopMode:           this.loopMode,
      playbackSpeed:      this.playbackSpeed,
      favorites:          this.favorites,
      playedLessons:      this.playedLessons
    };
    try { localStorage.setItem('tingkewen_v2', JSON.stringify(s)); } catch (e) {}
  },

  /* -------- 页面导航 -------- */
  showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(id);
    if (page) { page.classList.add('active'); this.currentPage = id; }
  },

  goBack() {
    const flow = {
      selectVersionPage: 'splashPage',
      selectGradePage:   'selectVersionPage',
      lessonListPage:    this.isFirstTime ? 'selectGradePage' : 'splashPage',
      playerPage:        'lessonListPage',
      bigLyricsPage:     'playerPage'
    };
    const prev = flow[this.currentPage];
    if (prev) this.showPage(prev);
  },

  /* -------- PAGE 2: 选版本 -------- */
  selectVersion(el, version, type) {
    this.selectedVersion = version;
    this.selectedVersionType = type;
    document.querySelectorAll('.version-item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
  },

  confirmVersion() {
    this.renderGradeTabs();
    this.showPage('selectGradePage');
  },

  /* -------- PAGE 3: 选年级 -------- */
  renderGradeTabs() {
    const grades = this.selectedVersionType === 'high'
      ? ['高一', '高二', '高三']
      : ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'];

    // Clamp selectedGrade to valid range
    if (this.selectedGrade > grades.length) this.selectedGrade = 1;

    const tabsEl = document.getElementById('gradeTabs');
    tabsEl.innerHTML = grades.map((g, i) =>
      `<button class="grade-tab${i + 1 === this.selectedGrade ? ' active' : ''}"
         onclick="app.selectGrade(${i + 1}, this)">${g}</button>`
    ).join('');

    this.renderVolumes();
  },

  selectGrade(grade, el) {
    this.selectedGrade = grade;
    document.querySelectorAll('.grade-tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
    this.renderVolumes();
  },

  renderVolumes() {
    const gradeNames = this.selectedVersionType === 'high'
      ? ['高一', '高二', '高三']
      : ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'];
    const grade = gradeNames[this.selectedGrade - 1] || '三年级';
    const volumes = ['上册', '下册'];

    const sectionEl = document.getElementById('volumeSection');
    sectionEl.innerHTML =
      `<div class="volume-section-label">选择册别</div>` +
      volumes.map(v =>
        `<button class="volume-card ${v === this.selectedVolume ? 'selected' : 'unselected'}"
           onclick="app.selectVolume('${v}',this)">
           <div class="volume-card-title">${this.selectedVersion}</div>
           <div class="volume-card-sub">${grade} ${v}</div>
         </button>`
      ).join('');
  },

  selectVolume(vol, el) {
    this.selectedVolume = vol;
    document.querySelectorAll('.volume-card').forEach(c => {
      c.classList.remove('selected');
      c.classList.add('unselected');
    });
    if (el) { el.classList.remove('unselected'); el.classList.add('selected'); }
  },

  confirmGrade() {
    this.isFirstTime = false;
    this.currentLessonIndex = 0;
    this.currentProgress = 0;
    this.currentLineIndex = 0;
    this.saveState();
    this.renderLessonList();
    this.updateTocHeader();
    this.showPage('lessonListPage');
  },

  /* -------- PAGE 4: 课文目录 -------- */
  updateTocHeader() {
    const gradeNames = this.selectedVersionType === 'high'
      ? ['高一', '高二', '高三']
      : ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'];
    const grade = gradeNames[this.selectedGrade - 1] || '三年级';
    const tocTitle = document.getElementById('tocTitle');
    const tocSub   = document.getElementById('tocSubtitle');
    if (tocTitle) tocTitle.textContent = this.selectedVersion;
    if (tocSub)   tocSub.textContent   = `${grade} ${this.selectedVolume}`;
  },

  renderLessonList() {
    const listEl = document.getElementById('lessonList');
    if (!listEl) return;

    let html = '';
    let lastUnit = '';
    this.lessons.forEach((lesson, idx) => {
      if (lesson.unit !== lastUnit) {
        lastUnit = lesson.unit;
        html += `<div class="toc-unit-header">${lesson.unit}</div>`;
      }
      const isPlaying = idx === this.currentLessonIndex && this.isPlaying;
      const isFav = this.favorites.includes(lesson.id);
      html += `
        <div class="toc-item${isPlaying ? ' playing' : ''}" onclick="app.playLesson(${idx})">
          <span class="toc-item-num">${idx + 1}</span>
          <div class="toc-wave">
            <div class="toc-wave-bar"></div>
            <div class="toc-wave-bar"></div>
            <div class="toc-wave-bar"></div>
          </div>
          <span class="toc-item-title">${lesson.title}</span>
          <span class="toc-item-time">${lesson.duration}</span>
          ${isFav ? `<span class="toc-item-heart">♥</span>` : `<span class="toc-item-heart off">♡</span>`}
        </div>`;
    });
    listEl.innerHTML = html;

    // Now-playing bar
    const bar  = document.getElementById('nowPlayingBar');
    const txt  = document.getElementById('nowPlayingText');
    if (bar && txt) {
      if (this.playedLessons.length > 0) {
        bar.style.display = 'flex';
        txt.textContent = '正在播放：' + this.lessons[this.currentLessonIndex].title;
      } else {
        bar.style.display = 'none';
      }
    }
  },

  /* -------- 播放课文 -------- */
  playLesson(index) {
    this.currentLessonIndex = index;
    const lesson = this.lessons[index];
    if (!this.playedLessons.includes(lesson.id)) this.playedLessons.push(lesson.id);

    this.currentProgress = 0;
    this.currentLineIndex = 0;
    this.isPlaying = true;

    this.updatePlayerHeader();
    this.renderLyrics();
    this.renderBigLyrics();
    this.updatePlayButtons();
    this.updateFavButton();
    this.updateTimerBadge();

    const tf = document.getElementById('totalTime');
    const btf = document.getElementById('bigTotalTime');
    if (tf)  tf.textContent  = lesson.duration;
    if (btf) btf.textContent = lesson.duration;

    this.setProgressUI(0);
    this.startProgressSimulation();
    this.saveState();
    this.renderLessonList();

    // Update speed badge
    const sb = document.getElementById('speedBadge');
    if (sb) sb.textContent = this.playbackSpeed + 'x';

    this.showPage('playerPage');
  },

  updatePlayerHeader() {
    const lesson = this.lessons[this.currentLessonIndex];
    const gradeNames = this.selectedVersionType === 'high'
      ? ['高一', '高二', '高三']
      : ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'];
    const grade = gradeNames[this.selectedGrade - 1] || '三年级';
    const sub = `${this.selectedVersion} · ${grade} · ${this.selectedVolume}`;

    const ps = document.getElementById('playerSub');
    const pt = document.getElementById('playerTitle');
    if (ps) ps.textContent = sub;
    if (pt) pt.textContent = lesson.title;
  },

  /* -------- 歌词渲染 -------- */
  renderLyrics() {
    const lesson  = this.lessons[this.currentLessonIndex];
    const area    = document.getElementById('lyricsArea');
    if (!area) return;
    area.innerHTML = lesson.lyrics.map((line, i) => {
      const cls = i < this.currentLineIndex ? 'dim'
                : i === this.currentLineIndex ? 'highlight'
                : 'normal';
      return `<p class="lyric-line ${cls}">${line || '\u00A0'}</p>`;
    }).join('');
  },

  renderBigLyrics() {
    const lesson = this.lessons[this.currentLessonIndex];
    const area   = document.getElementById('bigLyricsArea');
    if (!area) return;
    area.innerHTML = lesson.lyrics.map((line, i) => {
      const cls = i < this.currentLineIndex ? 'dim'
                : i === this.currentLineIndex ? 'highlight'
                : 'normal';
      return `<p class="big-lyric-line ${cls}">${line || '\u00A0'}</p>`;
    }).join('');
  },

  /* -------- 进度模拟 -------- */
  startProgressSimulation() {
    if (this.progressInterval) clearInterval(this.progressInterval);
    const TICK = 500; // ms
    this.progressInterval = setInterval(() => {
      if (!this.isPlaying) return;

      const lesson    = this.lessons[this.currentLessonIndex];
      const totalMs   = lesson.durationSec * 1000;
      const stepPct   = (TICK * this.playbackSpeed) / totalMs * 100;

      this.currentProgress += stepPct;

      if (this.currentProgress >= 100) {
        this.currentProgress = 100;
        this.setProgressUI(100);
        this.handlePlaybackEnd();
        return;
      }

      this.setProgressUI(this.currentProgress);
      this.updateLyricHighlight();
      this.saveState();
    }, TICK);
  },

  setProgressUI(pct) {
    const lesson = this.lessons[this.currentLessonIndex];
    const elapsed = Math.floor(lesson.durationSec * pct / 100);
    const timeStr = this.formatTime(elapsed);

    const pf  = document.getElementById('progressFill');
    const bpf = document.getElementById('bigProgressFill');
    const ct  = document.getElementById('currentTime');
    const bct = document.getElementById('bigCurrentTime');

    if (pf)  pf.style.width  = pct + '%';
    if (bpf) bpf.style.width = pct + '%';
    if (ct)  ct.textContent  = timeStr;
    if (bct) bct.textContent = timeStr;
  },

  seekProgress(e, isBig) {
    const trackId = isBig ? 'bigProgressTrack' : 'progressTrack';
    const track   = document.getElementById(trackId);
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(100, (e.clientX - rect.left) / rect.width * 100));
    this.currentProgress = pct;
    this.setProgressUI(pct);
    this.updateLyricHighlight();
  },

  formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  },

  /* -------- 歌词高亮 -------- */
  updateLyricHighlight() {
    const lesson    = this.lessons[this.currentLessonIndex];
    const totalLines = lesson.lyrics.length;
    const line = Math.min(totalLines - 1, Math.floor(this.currentProgress / 100 * totalLines));

    if (line === this.currentLineIndex) return;
    this.currentLineIndex = line;

    // Player page lyrics
    document.querySelectorAll('#lyricsArea .lyric-line').forEach((el, i) => {
      el.className = 'lyric-line ' + (i < line ? 'dim' : i === line ? 'highlight' : 'normal');
    });
    // Big lyrics page
    document.querySelectorAll('#bigLyricsArea .big-lyric-line').forEach((el, i) => {
      el.className = 'big-lyric-line ' + (i < line ? 'dim' : i === line ? 'highlight' : 'normal');
    });

    // Auto-scroll active line into view
    this.scrollToActiveLyric('#lyricsArea .lyric-line.highlight', 'lyricsArea');
    this.scrollToActiveLyric('#bigLyricsArea .big-lyric-line.highlight', 'bigLyricsArea');
  },

  scrollToActiveLyric(selector, containerId) {
    const el        = document.querySelector(selector);
    const container = document.getElementById(containerId);
    if (!el || !container) return;
    const containerRect = container.getBoundingClientRect();
    const elRect        = el.getBoundingClientRect();
    const targetScroll  = container.scrollTop + (elRect.top - containerRect.top)
                          - containerRect.height / 2 + elRect.height / 2;
    container.scrollTo({ top: targetScroll, behavior: 'smooth' });
  },

  /* -------- 播放/暂停 -------- */
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.updatePlayButtons();
    if (this.isPlaying && this.currentProgress >= 100) {
      this.currentProgress = 0;
      this.currentLineIndex = 0;
      this.renderLyrics();
      this.renderBigLyrics();
    }
  },

  updatePlayButtons() {
    const playing = this.isPlaying;
    const show = (id, show) => {
      const el = document.getElementById(id);
      if (el) el.style.display = show ? '' : 'none';
    };
    show('playIcon',    !playing);
    show('pauseIcon',    playing);
    show('bigPlayIcon', !playing);
    show('bigPauseIcon', playing);
  },

  /* -------- 上 / 下一首 -------- */
  prevLesson() {
    if (this.loopMode === 'list' && this.currentLessonIndex === 0) {
      this._jumpToLesson(this.lessons.length - 1);
    } else if (this.currentLessonIndex > 0) {
      this._jumpToLesson(this.currentLessonIndex - 1);
    } else {
      this.showToast('已是第一首');
    }
  },

  nextLesson() {
    if (this.loopMode === 'list' && this.currentLessonIndex === this.lessons.length - 1) {
      this._jumpToLesson(0);
    } else if (this.currentLessonIndex < this.lessons.length - 1) {
      this._jumpToLesson(this.currentLessonIndex + 1);
    } else {
      this.showToast('已是最后一首');
    }
  },

  _jumpToLesson(index) {
    this.currentLessonIndex = index;
    const lesson = this.lessons[index];
    if (!this.playedLessons.includes(lesson.id)) this.playedLessons.push(lesson.id);
    this.currentProgress = 0;
    this.currentLineIndex = 0;
    this.updatePlayerHeader();
    this.renderLyrics();
    this.renderBigLyrics();
    this.updateFavButton();
    this.setProgressUI(0);
    const tf  = document.getElementById('totalTime');
    const btf = document.getElementById('bigTotalTime');
    if (tf)  tf.textContent  = lesson.duration;
    if (btf) btf.textContent = lesson.duration;
    this.isPlaying = true;
    this.updatePlayButtons();
    this.saveState();
    this.renderLessonList();
  },

  /* -------- 播放结束处理 -------- */
  handlePlaybackEnd() {
    if (this.timerEnabled && this.timerValue === 'chapter') {
      this.isPlaying = false;
      this.updatePlayButtons();
      this.showSnackbar('定时已到，已停止播放');
      this.timerEnabled = false;
      this.updateTimerBadge();
      return;
    }
    if (this.loopMode === 'single') {
      this.currentProgress = 0;
      this.currentLineIndex = 0;
      this.renderLyrics();
      this.renderBigLyrics();
    } else if (this.loopMode === 'list') {
      this._jumpToLesson((this.currentLessonIndex + 1) % this.lessons.length);
    } else { // sequence
      if (this.currentLessonIndex < this.lessons.length - 1) {
        this._jumpToLesson(this.currentLessonIndex + 1);
      } else {
        this.isPlaying = false;
        this.updatePlayButtons();
      }
    }
  },

  /* -------- 循环模式 -------- */
  toggleLoop() {
    const modes = ['sequence', 'single', 'list'];
    const names = { sequence: '顺序播放', single: '单曲循环', list: '列表循环' };
    this.loopMode = modes[(modes.indexOf(this.loopMode) + 1) % modes.length];
    this.updateLoopIcon();
    this.showSnackbar(`已切换为${names[this.loopMode]}`);
    this.saveState();
  },

  updateLoopIcon() {
    const seq   = document.getElementById('loopIconSequence');
    const single= document.getElementById('loopIconSingle');
    const list  = document.getElementById('loopIconList');
    if (seq)    seq.style.display    = this.loopMode === 'sequence' ? '' : 'none';
    if (single) single.style.display = this.loopMode === 'single'   ? '' : 'none';
    if (list)   list.style.display   = this.loopMode === 'list'     ? '' : 'none';
  },

  /* -------- 倍速面板 -------- */
  showSpeedPanel() {
    document.getElementById('speedSheet').classList.add('active');
  },
  closeSpeedPanel() {
    document.getElementById('speedSheet').classList.remove('active');
  },
  setSpeed(val, label) {
    this.playbackSpeed = val;
    const sb = document.getElementById('speedBadge');
    if (sb) sb.textContent = label;
    // Update active state in grid
    document.querySelectorAll('.speed-opt').forEach(opt => {
      opt.classList.toggle('active', opt.textContent.trim() === label);
    });
    this.showSnackbar(`播放速度已设置为 ${label}`);
    this.closeSpeedPanel();
    this.saveState();
  },

  /* -------- 定时面板 -------- */
  showTimerPanel() {
    document.getElementById('timerSheet').classList.add('active');
  },
  closeTimerPanel() {
    document.getElementById('timerSheet').classList.remove('active');
  },
  toggleTimerSwitch() {
    this.timerEnabled = !this.timerEnabled;
    const sw  = document.getElementById('timerToggleSwitch');
    const sub = document.getElementById('timerSwitchSub');
    if (sw) sw.classList.toggle('on', this.timerEnabled);
    if (sub) sub.textContent = this.timerEnabled ? '已开启，将按选项停止' : '已关闭';
    if (this.timerEnabled) {
      this.startTimerCountdown();
    } else {
      this.stopTimerCountdown();
    }
    this.updateTimerBadge();
    this.showSnackbar(this.timerEnabled ? '定时关闭已开启' : '定时关闭已关闭');
  },
  setTimer(value, el) {
    this.timerValue = value;
    document.querySelectorAll('.timer-opt').forEach(o => {
      o.classList.remove('active');
      o.classList.add('inactive');
    });
    if (el) { el.classList.remove('inactive'); el.classList.add('active'); }
    if (this.timerEnabled) this.startTimerCountdown();
    const label = typeof value === 'number' ? value + '分钟' : '播放完本章';
    this.showSnackbar(`定时已设为${label}`);
  },
  startTimerCountdown() {
    this.stopTimerCountdown();
    if (!this.timerEnabled || this.timerValue === 'chapter') return;
    this.timerCountdown = this.timerValue * 60;
    this.timerInterval = setInterval(() => {
      this.timerCountdown--;
      if (this.timerCountdown <= 0) {
        this.stopTimerCountdown();
        this.isPlaying = false;
        this.updatePlayButtons();
        this.timerEnabled = false;
        this.updateTimerBadge();
        this.showSnackbar('定时已到，已停止播放');
      }
    }, 1000);
  },
  stopTimerCountdown() {
    if (this.timerInterval) { clearInterval(this.timerInterval); this.timerInterval = null; }
  },
  updateTimerBadge() {
    const dot   = document.getElementById('timerDot');
    const label = document.getElementById('timerLabel');
    if (dot)   dot.style.display   = this.timerEnabled ? '' : 'none';
    if (label) label.textContent   = this.timerEnabled ? (typeof this.timerValue === 'number' ? this.timerValue + '分' : '本章') : '定时';
  },

  /* -------- 收藏 -------- */
  toggleFavorite() {
    const lesson = this.lessons[this.currentLessonIndex];
    const idx    = this.favorites.indexOf(lesson.id);
    if (idx === -1) {
      this.favorites.push(lesson.id);
      this.showToast('已收藏');
    } else {
      this.favorites.splice(idx, 1);
      this.showToast('已取消收藏');
    }
    this.updateFavButton();
    this.saveState();
    this.renderLessonList();
  },

  updateFavButton() {
    const lesson  = this.lessons[this.currentLessonIndex];
    const isFav   = this.favorites.includes(lesson.id);
    const favIcon = document.getElementById('favIcon');
    const favIconNav = document.getElementById('favIconNav');
    const fill    = isFav ? '#FF8C1A' : 'none';
    const stroke  = isFav ? '#FF8C1A' : '#555';
    const navFill = isFav ? '#FF8C1A' : 'none';
    const navStroke = isFav ? '#FF8C1A' : '#888';
    if (favIcon) {
      favIcon.setAttribute('stroke', stroke);
      favIcon.setAttribute('fill', fill);
    }
    if (favIconNav) {
      favIconNav.setAttribute('stroke', navStroke);
      favIconNav.setAttribute('fill', navFill);
    }
    const favLabel = document.getElementById('favLabel');
    if (favLabel) favLabel.textContent = isFav ? '已收藏' : '收藏';
  },

  /* -------- 大字幕 -------- */
  showBigLyrics() {
    this.renderBigLyrics();
    const btf = document.getElementById('bigTotalTime');
    if (btf) btf.textContent = this.lessons[this.currentLessonIndex].duration;
    this.setProgressUI(this.currentProgress);
    this.showPage('bigLyricsPage');
  },
  closeBigLyrics() {
    this.showPage('playerPage');
  },

  /* -------- Toast / Snackbar -------- */
  showToast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), 2000);
  },
  showSnackbar(msg) {
    const el = document.getElementById('snackbar');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(this._snackTimer);
    this._snackTimer = setTimeout(() => el.classList.remove('show'), 3000);
  },

  /* -------- 时钟 -------- */
  startClock() {
    this.updateClock();
    setInterval(() => this.updateClock(), 10000);
  },
  updateClock() {
    const now = new Date();
    const str = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    document.querySelectorAll('[data-clock]').forEach(el => el.textContent = str);
  }
};

document.addEventListener('DOMContentLoaded', () => app.init());
