/* ==========================================================================
   LiteKit Tools Suite Engine (CleanPaste · SnapCard · SafePic · FlowZone)
   纯浏览器原生实现：0 外部依赖 · 0 字节服务端上传 · 内置一键演示与 PM 复盘卡
   ========================================================================== */
(() => {
  'use strict';

  const ic = (n, cls) => `<svg class="ic ${cls || ''}" aria-hidden="true"><use href="#ic-${n}"/></svg>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ---------------- 1. 作品元数据与 PM 复盘卡片配置 ---------------- */
  const TOOLS = [
    {
      id: 'cleanpaste',
      code: 'TK-01',
      name: 'CleanPaste',
      cnName: 'AI 与 PDF 文本净化排版台',
      shortTag: '排版',
      category: '文本工作流',
      badge: '高频刚需',
      tagline: '一键清除 AI 星号井号、合并 PDF 断行、自动补齐中英文空格',
      pain: '从大模型对话框或 PDF 文献复制文字贴到微信、飞书、简历时，满屏 **星号**、莫名断行与中英粘连，手动逐行删改极其耗时。',
      highlight: '3 大办公预设 · 5 项独立规则开关 · 毫秒级清理计数统计',
      accentTag: '排版规则引擎',
      noteSlug: 'cleanpaste-pm-review',
      icon: 'doc',
      keywords: 'Markdown 乱码 星号 PDF 断行 空格 盘古 简历 微信 排版 格式清洗',
      pmCards: [
        ['真实痛点洞察', '大模型普及后，「AI 回复粘贴到微信/Word 满屏星号井号」成了每天发生十几次的新型办公摩擦。'],
        ['核心减法取舍', '砍掉重型富文本编辑与账号存储，只做「贴入脏文本 → 1 秒输出干净文本」的极速过水站。'],
        ['关键细节打磨', '将复杂正则封装成 3 个直白办公预设，并用等宽数字实时告知清洗了多少处符号与断行。']
      ]
    },
    {
      id: 'snapcard',
      code: 'TK-02',
      name: 'SnapCard',
      cnName: '极简金句与灵感分享卡片台',
      shortTag: '成图',
      category: '视觉美化',
      badge: '颜值担当',
      tagline: '输入文字实时渲染高质感渐变/磨砂/终端分享卡，支持荧光笔重点划线',
      pain: '看到好句子、读书笔记或灵感摘录想发小红书与朋友圈，直接截图太粗糙，打开专业设计软件调排版又太繁琐。',
      highlight: '6 款精选视觉主题 · ==重点荧光笔== 语法 · 2x 视网膜级高清导出',
      accentTag: 'Canvas 2D 排版',
      noteSlug: 'snapcard-pm-review',
      icon: 'spark',
      keywords: '卡片 美化 截图 金句 小红书 朋友圈 渐变 荧光笔 海报 PNG',
      pmCards: [
        ['真实痛点洞察', '日常分享缺的不是自由度，而是「怎么填字都不会丑」的审美约束画布。'],
        ['核心减法取舍', '不提供让人纠结的百种花哨字体，精选 6 套经过对比度校验的主题与 4 种主流社交画幅。'],
        ['关键细节打磨', '首创选中文字一键包裹 ==双等号== 绘制半透明圆角荧光底色，并支持中文避头尾断行与 2x 导出。']
      ]
    },
    {
      id: 'safepic',
      code: 'TK-03',
      name: 'SafePic',
      cnName: '纯本地证件水印与网申压缩箱',
      shortTag: '隐私',
      category: '隐私与文件',
      badge: '零上传安全',
      tagline: '100% 离线铺满防盗斜向水印 + 二分法精准压缩图片至网申限定 KB',
      pain: '网申报名、租房或入职提交身份证/学生证时，既怕上传到陌生网站泄露隐私，又常被「图片必须小于 200KB」卡住。',
      highlight: '0 字节网络上传 · 内置模拟校园卡样张 · 目标体积二分逼近压缩',
      accentTag: '离线二进制压缩',
      noteSlug: 'safepic-pm-review',
      icon: 'shield',
      keywords: '身份证 学生证 防盗水印 图片压缩 200KB 一寸照 网申 隐私 离线',
      pmCards: [
        ['真实痛点洞察', '收发证件照是求职季高频刚需，把防盗水印与体积达标合二为一，彻底消除隐私上传顾虑。'],
        ['核心减法取舍', '告别让用户盲猜的「画质百分比滑块」，直接提供「≤200KB / ≤100KB」目标体积按钮。'],
        ['关键细节打磨', '专门内置程序化生成的「模拟证件样张」，方便没有随手准备图片的 HR 点开即测。']
      ]
    },
    {
      id: 'flowzone',
      code: 'TK-04',
      name: 'FlowZone',
      cnName: '深海白噪音混音与心流专注舱',
      shortTag: '专注',
      category: '专注空间',
      badge: '全站深海联动',
      tagline: 'Web Audio 四轨实时合成环境音 + 联动全站二进制游鱼沉浸态 + 心流小票',
      pain: '宿舍与开放工位嘈杂易分心，白噪音 App 需下载注册，普通网页番茄钟切走标签页就看不见且缺乏成就反馈。',
      highlight: '4 轨零体积程序化声景 · 全屏深海游鱼沉浸 · 画中画悬浮窗与小票打印',
      accentTag: 'Web Audio + PiP',
      noteSlug: 'flowzone-pm-review',
      icon: 'wave',
      keywords: '白噪音 番茄钟 专注 心流 雨声 海浪 画中画 深海 小票',
      pmCards: [
        ['真实痛点洞察', '学习工作前最怕复杂的白噪音挑歌过程，一键调配顺耳的环境声才能快速跨过启动阻力。'],
        ['核心减法取舍', '抛弃几十 MB 的外部 MP3 音频依赖，用 Web Audio 滤波器实时合成永不机械重复的自然声景。'],
        ['关键细节打磨', '与全站 0/1 二进制游鱼背景深度联动开启全屏深海舱，并在结束时打印拟物「心流结账小票」。']
      ]
    }
  ];

  function getTool(id) {
    return TOOLS.find(t => t.id === String(id || '').toLowerCase()) || null;
  }

  /* ---------------- 2. 全局轻提示 Toast ---------------- */
  let toastTimer = 0;
  function toast(msg) {
    let el = document.getElementById('tk-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'tk-toast';
      el.className = 'tk-toast';
      document.body.appendChild(el);
    }
    el.innerHTML = `${ic('check-sm', 'sm')}<span>${esc(msg)}</span>`;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  async function copyText(text, okMsg) {
    try {
      await navigator.clipboard.writeText(text);
      toast(okMsg || '已复制到剪贴板');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      toast(okMsg || '已复制到剪贴板');
    }
  }

  /* ---------------- 3. 通用页面骨架渲染 ---------------- */
  function renderToolPage(id) {
    const idx = TOOLS.findIndex(t => t.id === String(id || '').toLowerCase());
    if (idx === -1) return '';
    const t = TOOLS[idx];
    const prev = TOOLS[(idx - 1 + TOOLS.length) % TOOLS.length];
    const next = TOOLS[(idx + 1) % TOOLS.length];

    return `
      <div class="crumb">
        ${ic('chev-r')}<a class="clickable" data-go="home">首页</a>
        <span style="color:var(--ink-4)">/</span><a class="clickable" data-go="works">作品集</a>
        <span style="color:var(--ink-4)">/</span><span>${t.code} · ${t.name}</span>
      </div>

      <div class="tool-header">
        <div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px">
            <span class="tag doing"><span class="d"></span>${t.code} · ${t.category}</span>
            <span class="tag done">${t.badge}</span>
            <span class="tag">${t.accentTag}</span>
          </div>
          <h1 class="page">${t.name} — ${t.cnName}</h1>
          <p class="lead" style="margin-top:5px">${t.tagline}</p>
        </div>
        <div class="tool-header-actions">
          <button type="button" class="btn ghost sm" id="tkDemoTrigger">${ic('spark', 'sm')}一键填入演示素材</button>
          <button type="button" class="btn ghost sm" id="tkPmToggle" aria-expanded="false">${ic('bulb', 'sm')}💡 PM 产品思考卡</button>
        </div>
      </div>

      <div class="pm-drawer" id="tkPmDrawer">
        <div class="bar" style="flex-wrap:wrap">
          <span style="font-size:var(--fs-sm);font-weight:600;color:var(--ink)">${ic('bulb', 'sm')} 为什么做 ${t.name}？（产品设计三问）</span>
          <a class="link clickable" data-go="note" data-slug="${t.noteSlug}" style="font-size:var(--fs-xs)">阅读完整迭代复盘长文 ${ic('arrow-r', 'sm')}</a>
        </div>
        <div class="pm-grid">
          ${t.pmCards.map(([title, desc]) => `
            <div class="pm-cell"><b>${esc(title)}</b>${esc(desc)}</div>
          `).join('')}
        </div>
      </div>

      <div class="tool-shell" id="tkWorkspace">
        ${renderWorkspaceMarkup(t.id)}
      </div>

      <div class="card plain" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:var(--fs-sm)">
        <a class="link clickable" data-go="tool" data-id="${prev.id}">${ic('arrow-l', 'ic-arrow')}上一款：${prev.name}（${prev.shortTag}）</a>
        <a class="link clickable" data-go="works">${ic('layers', 'sm')}返回作品集总览</a>
        <a class="link clickable" data-go="tool" data-id="${next.id}">下一款：${next.name}（${next.shortTag}）${ic('arrow-r', 'ic-arrow')}</a>
      </div>
    `;
  }

  function renderWorkspaceMarkup(id) {
    switch (id) {
      case 'cleanpaste': return markupCleanPaste();
      case 'snapcard':   return markupSnapCard();
      case 'safepic':    return markupSafePic();
      case 'flowzone':   return markupFlowZone();
      default: return '';
    }
  }

  /* ==========================================================================
     TOOL 01 · CleanPaste 文本净化排版台
     ========================================================================== */
  const CP_SAMPLES = {
    ai: {
      rules: { stripMd: true, fixPdfWrap: false, panguSpace: true, cleanBlank: true, normPunct: true },
      text: `### 一、本周产品迭代核心结论

根据最新的 **用户体验走查报告**，首屏改版后取得了以下进展：

1. **核心转化率提升**：新访客在30秒内的互动点击率从18.5%提升至46.2%，验证了\`免登录示例体验\`的有效性；
2. **高频反馈收敛**：完成了CleanPaste与SafePic两个模块的细节打磨，累计修复了12个边缘排版Bug；


*   下一步计划：联动 \`binary-ocean.js\` 上线 **FlowZone深海心流舱**，详情参考 [内部设计稿](https://asdas2345.asia/#/works) 。

> 备注：所有工具均保持 0字节服务端上传，确保100%本地隐私安全！`
    },
    pdf: {
      rules: { stripMd: true, fixPdfWrap: true, panguSpace: true, cleanBlank: true, normPunct: true },
      text: `在现代 Web 工具产品设计中，访客首屏 30 秒的认知负
荷直接决定了 75% 以上的留存意愿。大量实证研究表
明，去除非必要的账号注册拦截与 server-
side 上传等待，能够显著降低用户的初次尝
试阻力。

与此同时，在跨平台文档协作（如从 PDF 论文或 AI 对
话框摘录内容到即时通讯工具）时，硬回车断行与中英字符粘连会造成平均每次 90 秒的手动排版损耗。`
    },
    resume: {
      rules: { stripMd: true, fixPdfWrap: false, panguSpace: true, cleanBlank: true, normPunct: true },
      text: `### 个人项目经历
* **LiteKit效率工具集（独立产品策划&开发）**
- 针对日常学习办公4大痛点,借助AI协同在1周内完成从需求拆解、交互设计到GitHub部署全流程.
* 使用Canvas2D与WebAudioAPI实现纯前端离线架构,首屏加载耗时<0.8秒,实现0服务器运维成本;


- 内置一键Demo体验机制与4篇完整PM复盘文档,提升HR与面试官浏览效率50%以上.`
    }
  };

  function markupCleanPaste() {
    return `
      <div class="tool-toolbar">
        <div class="preset-group">
          <span class="lbl-c" style="margin-right:4px">场景预设：</span>
          <button type="button" class="chip active" data-cp-preset="ai">🤖 AI 回复转微信/飞书</button>
          <button type="button" class="chip" data-cp-preset="pdf">📄 PDF 论文断行修复</button>
          <button type="button" class="chip" data-cp-preset="resume">📝 简历/周报排版规范</button>
        </div>
        <div class="preset-group">
          <button type="button" class="chip demo-chip" id="cpCycleDemo">${ic('spark', 'sm')}切换脏乱文本示例</button>
          <button type="button" class="chip" id="cpClearBtn">清空</button>
        </div>
      </div>

      <div class="rule-bar">
        <label class="sw-label"><input type="checkbox" id="cpRuleMd" checked />清除 Markdown 星号/井号/反引号</label>
        <label class="sw-label"><input type="checkbox" id="cpRulePdf" />合并 PDF 跨行硬断行</label>
        <label class="sw-label"><input type="checkbox" id="cpRulePangu" checked />中英文与数字自动加空格</label>
        <label class="sw-label"><input type="checkbox" id="cpRuleBlank" checked />压缩多余空行与行尾空格</label>
        <label class="sw-label"><input type="checkbox" id="cpRulePunct" checked />统一列表符号与中英标点</label>
      </div>

      <div class="split-pane">
        <div class="pane-box">
          <div class="pane-head">
            <span><b>原始脏乱文本</b>（支持直接粘贴 AI 回复或 PDF 段落）</span>
            <span id="cpInCount" style="font-family:var(--mono)">0 字</span>
          </div>
          <textarea class="tk-textarea" id="cpInput" placeholder="在此粘贴带有 **星号**、### 井号、PDF 断行或中英粘连的原始文本…"></textarea>
        </div>

        <div class="pane-box">
          <div class="pane-head">
            <span><b style="color:var(--ok-ink)">净化后干净文本</b>（可直接粘贴至微信、飞书、Word）</span>
            <span id="cpOutCount" style="font-family:var(--mono)">0 字</span>
          </div>
          <textarea class="tk-textarea readonly-out" id="cpOutput" readonly placeholder="净化结果将实时显示在这里…"></textarea>
        </div>
      </div>

      <div class="telemetry-bar">
        <div class="telemetry-metrics" id="cpMetrics">
          <span>清除格式符 <b>0</b> 处</span>
          <span>合并断行 <b>0</b> 处</span>
          <span>补齐中英空格 <b>0</b> 处</span>
        </div>
        <div class="preset-group">
          <button type="button" class="btn ghost sm" id="cpDownloadBtn">${ic('download', 'sm')}导出 .txt</button>
          <button type="button" class="btn primary sm" id="cpCopyBtn">${ic('copy', 'sm')}一键复制净版文本</button>
        </div>
      </div>
    `;
  }

  function runCleanPasteEngine(raw, rules) {
    let text = String(raw || '').replace(/\r\n/g, '\n');
    let mdRemoved = 0;
    let wrapsMerged = 0;
    let spacesAdded = 0;

    if (rules.stripMd) {
      // 代码围栏保留内容去外壳
      text = text.replace(/```[\w-]*\n?([\s\S]*?)```/g, (_, code) => { mdRemoved++; return code.trim(); });
      // 标题 ###
      text = text.replace(/^\s{0,3}#{1,6}\s+/gm, () => { mdRemoved++; return ''; });
      // 粗体 / 斜体 / 删除线 / 行内代码
      text = text.replace(/\*\*([^*]+)\*\*/g, (_, s) => { mdRemoved++; return s; });
      text = text.replace(/__([^_]+)__/g, (_, s) => { mdRemoved++; return s; });
      text = text.replace(/`([^`\n]+)`/g, (_, s) => { mdRemoved++; return s; });
      text = text.replace(/~~([^~]+)~~/g, (_, s) => { mdRemoved++; return s; });
      // 引用块 >
      text = text.replace(/^\s*>\s?/gm, () => { mdRemoved++; return ''; });
      // 链接 [文字](url) -> 文字 (url)
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
        mdRemoved++;
        return `${label} (${url})`;
      });
    }

    if (rules.fixPdfWrap) {
      // 英文连字符跨行修复 inter-\nnational -> international
      text = text.replace(/([A-Za-z])-\n\s*([a-z])/g, (_, a, b) => {
        wrapsMerged++;
        return a + b;
      });
      // 非空行、非列表开头、且上一行不以句末标点结尾时合并断行
      const lines = text.split('\n');
      const merged = [];
      for (let i = 0; i < lines.length; i++) {
        const cur = lines[i].trimEnd();
        if (!merged.length) { merged.push(cur); continue; }
        const prev = merged[merged.length - 1];
        const prevTrim = prev.trim();
        const curTrim = cur.trim();
        const isBlank = !prevTrim || !curTrim;
        const isList = /^([•·\-*+]|\d+[.、)])\s*/.test(curTrim);
        const endsWithStop = /[。！？.!?;；：:”’）)\]】]$/.test(prevTrim);
        if (!isBlank && !isList && !endsWithStop) {
          const joiner = /[A-Za-z0-9]$/.test(prevTrim) && /^[A-Za-z0-9]/.test(curTrim) ? ' ' : '';
          merged[merged.length - 1] = prevTrim + joiner + curTrim;
          wrapsMerged++;
        } else {
          merged.push(cur);
        }
      }
      text = merged.join('\n');
    }

    if (rules.normPunct) {
      // 统一无序列表前导符为 "• "
      text = text.replace(/^\s*[*+-]\s+/gm, '• ');
      // 中文语境下的英文逗号句号转全角（避开小数点与网址）
      text = text.replace(/([\u4e00-\u9fa5]),\s*(?=[\u4e00-\u9fa5A-Za-z0-9])/g, '$1，');
      text = text.replace(/([\u4e00-\u9fa5A-Za-z0-9%])\.(?=\s*(\n|$))/gm, (m, p1) => {
        return /[\u4e00-\u9fa5]/.test(text) ? `${p1}。` : m;
      });
    }

    if (rules.panguSpace) {
      // 中文与英文字母/数字之间补空格（排除 % ° 等紧贴单位后跟中文外的前置粘连）
      text = text.replace(/([\u4e00-\u9fa5])([A-Za-z0-9])/g, (_, a, b) => {
        spacesAdded++;
        return `${a} ${b}`;
      });
      text = text.replace(/([A-Za-z0-9%])([\u4e00-\u9fa5])/g, (_, a, b) => {
        spacesAdded++;
        return `${a} ${b}`;
      });
    }

    if (rules.cleanBlank) {
      text = text.split('\n').map(l => l.replace(/[ \t]+$/g, '')).join('\n');
      text = text.replace(/\n{3,}/g, '\n\n').trim();
    }

    return { text, mdRemoved, wrapsMerged, spacesAdded };
  }

  function mountCleanPaste() {
    const input = document.getElementById('cpInput');
    const output = document.getElementById('cpOutput');
    const inCount = document.getElementById('cpInCount');
    const outCount = document.getElementById('cpOutCount');
    const metrics = document.getElementById('cpMetrics');
    const presetBtns = [...document.querySelectorAll('[data-cp-preset]')];

    const ruleEls = {
      stripMd: document.getElementById('cpRuleMd'),
      fixPdfWrap: document.getElementById('cpRulePdf'),
      panguSpace: document.getElementById('cpRulePangu'),
      cleanBlank: document.getElementById('cpRuleBlank'),
      normPunct: document.getElementById('cpRulePunct')
    };

    const order = ['ai', 'pdf', 'resume'];
    let curIdx = 0;

    function currentRules() {
      return {
        stripMd: ruleEls.stripMd.checked,
        fixPdfWrap: ruleEls.fixPdfWrap.checked,
        panguSpace: ruleEls.panguSpace.checked,
        cleanBlank: ruleEls.cleanBlank.checked,
        normPunct: ruleEls.normPunct.checked
      };
    }

    function refresh() {
      const raw = input.value;
      const res = runCleanPasteEngine(raw, currentRules());
      output.value = res.text;
      inCount.textContent = `${raw.length} 字符`;
      outCount.textContent = `${res.text.length} 字符`;
      metrics.innerHTML = `
        <span>清除格式符 <b>${res.mdRemoved}</b> 处</span>
        <span>合并断行 <b>${res.wrapsMerged}</b> 处</span>
        <span>补齐中英空格 <b>${res.spacesAdded}</b> 处</span>
      `;
    }

    function applyPreset(key, loadSample) {
      const cfg = CP_SAMPLES[key] || CP_SAMPLES.ai;
      presetBtns.forEach(b => b.classList.toggle('active', b.dataset.cpPreset === key));
      Object.keys(cfg.rules).forEach(k => { ruleEls[k].checked = cfg.rules[k]; });
      if (loadSample) input.value = cfg.text;
      refresh();
    }

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.cpPreset;
        curIdx = Math.max(0, order.indexOf(key));
        applyPreset(key, true);
        toast(`已切换至「${btn.textContent.trim()}」并载入示例`);
      });
    });

    Object.values(ruleEls).forEach(el => el.addEventListener('change', refresh));
    input.addEventListener('input', refresh);

    const cycleDemo = () => {
      curIdx = (curIdx + 1) % order.length;
      applyPreset(order[curIdx], true);
      toast('已填入新一组脏乱文本示例');
    };

    document.getElementById('cpCycleDemo').addEventListener('click', cycleDemo);
    const topDemo = document.getElementById('tkDemoTrigger');
    if (topDemo) topDemo.onclick = cycleDemo;

    document.getElementById('cpClearBtn').addEventListener('click', () => {
      input.value = '';
      refresh();
      input.focus();
    });

    document.getElementById('cpCopyBtn').addEventListener('click', () => {
      if (!output.value.trim()) { toast('当前没有可复制的文本'); return; }
      copyText(output.value, '已复制净化后的干净文本');
    });

    document.getElementById('cpDownloadBtn').addEventListener('click', () => {
      if (!output.value.trim()) { toast('当前内容为空'); return; }
      const blob = new Blob([output.value], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cleanpaste-result.txt';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast('已导出 cleanpaste-result.txt');
    });

    applyPreset('ai', true);
  }

  /* ==========================================================================
     TOOL 02 · SnapCard 极简金句与灵感分享卡片台
     ========================================================================== */
  const SC_THEMES = [
    {
      id: 'abyss', name: '深海极光', dot: 'linear-gradient(135deg,#0f1c38,#3157b6)',
      outer: ['#080b12', '#12254d', '#1c3b75'],
      cardBg: 'rgba(11, 16, 26, 0.82)', cardBorder: 'rgba(165, 205, 255, 0.28)',
      titleInk: '#f4f9ff', bodyInk: '#e4eef7', metaInk: '#93abc4',
      hlBg: 'rgba(59, 130, 246, 0.36)', accent: '#60a5fa', dark: true
    },
    {
      id: 'twilight', name: '暮光弥散', dot: 'linear-gradient(135deg,#3b1d5e,#9d3469)',
      outer: ['#1a1033', '#4b1e52', '#1e2f5c'],
      cardBg: 'rgba(18, 14, 28, 0.78)', cardBorder: 'rgba(244, 184, 228, 0.26)',
      titleInk: '#fdf4ff', bodyInk: '#f3e8ff', metaInk: '#c4b5fd',
      hlBg: 'rgba(236, 72, 153, 0.34)', accent: '#f472b6', dark: true
    },
    {
      id: 'paper', name: '晨雾纸感', dot: 'linear-gradient(135deg,#e6dfd3,#faf8f4)',
      outer: ['#dcd5c7', '#eae4d8', '#d5cec0'],
      cardBg: 'rgba(252, 250, 245, 0.96)', cardBorder: 'rgba(60, 52, 40, 0.12)',
      titleInk: '#18181b', bodyInk: '#27272a', metaInk: '#71717a',
      hlBg: 'rgba(250, 204, 21, 0.52)', accent: '#b45309', dark: false
    },
    {
      id: 'emerald', name: '森系翡翠', dot: 'linear-gradient(135deg,#092922,#1f6350)',
      outer: ['#071915', '#0f382e', '#164e40'],
      cardBg: 'rgba(9, 24, 20, 0.80)', cardBorder: 'rgba(134, 239, 172, 0.25)',
      titleInk: '#ecfdf5', bodyInk: '#d1fae5', metaInk: '#86efac',
      hlBg: 'rgba(16, 185, 129, 0.35)', accent: '#34d399', dark: true
    },
    {
      id: 'terminal', name: '极客终端', dot: 'linear-gradient(135deg,#181c24,#334155)',
      outer: ['#12161f', '#1e293b', '#0f172a'],
      cardBg: 'rgba(10, 12, 17, 0.94)', cardBorder: 'rgba(148, 163, 184, 0.28)',
      titleInk: '#f8fafc', bodyInk: '#e2e8f0', metaInk: '#94a3b8',
      hlBg: 'rgba(245, 158, 11, 0.32)', accent: '#38bdf8', dark: true, terminal: true
    },
    {
      id: 'mono', name: '瑞士黑白', dot: 'linear-gradient(135deg,#f8fafc,#94a3b8)',
      outer: ['#e2e8f0', '#cbd5e1', '#f1f5f9'],
      cardBg: '#ffffff', cardBorder: '#0f172a',
      titleInk: '#09090b', bodyInk: '#18181b', metaInk: '#52525b',
      hlBg: 'rgba(125, 211, 252, 0.58)', accent: '#0284c7', dark: false
    }
  ];

  const SC_QUOTES = [
    {
      title: '产品造物笔记 #01',
      body: '好的作品集从来不是把代码堆得有多厚，而是==在 30 秒内让人看懂你发现了什么真问题==，并用最克制、最顺手的交互把它干净利落地解决掉。',
      author: 'LiteKit · 个人数字实验室'
    },
    {
      title: '关于极简工具的思考',
      body: '当一个工具需要用户先阅读五百字说明书、注册账号、绑定邮箱才能开始使用时，==它已经在起跑线上输给了人的惰性==。\n\n免登录、点开即用，是对访客时间最大的尊重。',
      author: '产品设计日常摘录'
    },
    {
      title: 'AI Native 时代的执行力',
      body: '想法本身不再稀缺，==把模糊的痛点拆解成清晰的边界==，并把最后 10% 的边缘体验打磨到顺滑无感，才是真正的护城河。',
      author: 'Build in Public · 2026'
    },
    {
      title: '调试心流法则',
      body: '与其对着空荡荡的规划表焦虑三个月，不如==今天先上线一个能跑、能帮自己省下两分钟的小工具==。正反馈一旦转起来，路自然就宽了。',
      author: '写给动手探索的自己'
    }
  ];

  function markupSnapCard() {
    return `
      <div class="snap-layout">
        <div class="snap-controls">
          <div class="ctrl-group">
            <div class="ctrl-label">
              <span>卡片标题（可选）</span>
              <button type="button" class="chip demo-chip" id="scNextQuote">${ic('spark', 'sm')}换一组灵感金句</button>
            </div>
            <input type="text" class="tk-input" id="scTitle" value="${esc(SC_QUOTES[0].title)}" placeholder="输入小标题（留空则隐藏）" />
          </div>

          <div class="ctrl-group">
            <div class="ctrl-label">
              <span>正文内容（用 <code>==文字==</code> 标记荧光笔重点）</span>
              <button type="button" class="chip" id="scMarkHighlight">🖍️ 选中文字加高亮</button>
            </div>
            <textarea class="tk-textarea" id="scBody" style="min-height:150px">${esc(SC_QUOTES[0].body)}</textarea>
          </div>

          <div class="ctrl-group">
            <div class="ctrl-label"><span>署名与出处</span></div>
            <input type="text" class="tk-input" id="scAuthor" value="${esc(SC_QUOTES[0].author)}" placeholder="例如：@你的名字 · 读书摘录" />
          </div>

          <div class="ctrl-group">
            <div class="ctrl-label"><span>精选视觉主题</span></div>
            <div class="theme-swatches">
              ${SC_THEMES.map((th, i) => `
                <button type="button" class="swatch-btn ${i === 0 ? 'active' : ''}" data-sc-theme="${th.id}">
                  <span class="swatch-dot" style="background:${th.dot}"></span>
                  <span>${th.name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="ctrl-group">
            <div class="ctrl-label"><span>社交平台画幅比例</span></div>
            <div class="preset-group">
              <button type="button" class="chip active" data-sc-ratio="auto">自适应高度</button>
              <button type="button" class="chip" data-sc-ratio="3:4">小红书 3:4</button>
              <button type="button" class="chip" data-sc-ratio="1:1">正方形 1:1</button>
              <button type="button" class="chip" data-sc-ratio="16:9">横版 16:9</button>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="ctrl-group">
              <div class="ctrl-label"><span>正文字号</span><span class="val" id="scFontVal">22px</span></div>
              <input type="range" class="tk-range" id="scFontSize" min="17" max="30" value="22" />
            </div>
            <div class="ctrl-group">
              <div class="ctrl-label"><span>画布呼吸边距</span><span class="val" id="scPadVal">48px</span></div>
              <input type="range" class="tk-range" id="scPadding" min="28" max="76" value="48" />
            </div>
          </div>

          <div class="rule-bar" style="padding:8px 12px">
            <label class="sw-label"><input type="checkbox" id="scShowDate" checked />显示日期角标</label>
            <label class="sw-label"><input type="checkbox" id="scShowCount" checked />显示字数统计</label>
            <label class="sw-label"><input type="checkbox" id="scShowBrand" checked />底部极简水印</label>
          </div>
        </div>

        <div class="snap-stage">
          <div class="snap-canvas-wrap">
            <canvas id="scCanvas" width="1080" height="1080"></canvas>
          </div>
          <div class="telemetry-bar" style="width:100%">
            <span id="scResolutionInfo" style="font-family:var(--mono)">输出尺寸：-- × -- px (Retina 2x)</span>
            <div class="preset-group">
              <button type="button" class="btn ghost sm" id="scCopyImgBtn">${ic('copy', 'sm')}复制高清图片</button>
              <button type="button" class="btn primary sm" id="scDownloadImgBtn">${ic('download', 'sm')}下载 PNG 原图</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function roundRectPath(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  /* 解析 ==重点高亮== 为逐字符带属性数组，并按宽度与中文避头尾规则断行 */
  function parseHighlightRuns(paragraph) {
    const tokens = [];
    const re = /==([\s\S]+?)==/g;
    let last = 0;
    let m;
    while ((m = re.exec(paragraph)) !== null) {
      for (const ch of paragraph.slice(last, m.index)) tokens.push({ ch, hl: false });
      for (const ch of m[1]) tokens.push({ ch, hl: true });
      last = m.index + m[0].length;
    }
    for (const ch of paragraph.slice(last)) tokens.push({ ch, hl: false });
    return tokens;
  }

  function wrapStyledParagraph(ctx, paragraph, maxWidth) {
    if (!paragraph) return [[]];
    const chars = parseHighlightRuns(paragraph);
    const lines = [];
    let cur = [];
    let curW = 0;
    const noStart = /^[，。！？；：、）》】”’,.!?;:)\]]$/;

    for (let i = 0; i < chars.length; i++) {
      const item = chars[i];
      const cw = ctx.measureText(item.ch).width;
      if (curW + cw > maxWidth && cur.length > 0 && !noStart.test(item.ch)) {
        lines.push(cur);
        cur = [item];
        curW = cw;
      } else {
        cur.push(item);
        curW += cw;
      }
    }
    if (cur.length) lines.push(cur);
    return lines;
  }

  function mountSnapCard() {
    const canvas = document.getElementById('scCanvas');
    const ctx = canvas.getContext('2d');
    const titleEl = document.getElementById('scTitle');
    const bodyEl = document.getElementById('scBody');
    const authorEl = document.getElementById('scAuthor');
    const fontEl = document.getElementById('scFontSize');
    const padEl = document.getElementById('scPadding');
    const fontVal = document.getElementById('scFontVal');
    const padVal = document.getElementById('scPadVal');
    const showDateEl = document.getElementById('scShowDate');
    const showCountEl = document.getElementById('scShowCount');
    const showBrandEl = document.getElementById('scShowBrand');
    const resInfo = document.getElementById('scResolutionInfo');

    let curTheme = SC_THEMES[0];
    let curRatio = 'auto';
    let quoteIdx = 0;

    function drawCard() {
      const scale = 2; // Retina 2x 清晰度
      const logicalW = curRatio === '16:9' ? 680 : 540;
      const outerPad = Number(padEl.value);
      const cardPad = 36;
      const fontSize = Number(fontEl.value);
      const lineHeight = Math.round(fontSize * 1.72);
      const fontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';

      fontVal.textContent = `${fontSize}px`;
      padVal.textContent = `${outerPad}px`;

      const innerTextW = logicalW - outerPad * 2 - cardPad * 2;
      ctx.font = `400 ${fontSize}px ${fontStack}`;

      const rawBody = bodyEl.value || '输入一段文字，即刻生成高颜值分享卡片…';
      const plainCount = rawBody.replace(/==/g, '').replace(/\s+/g, '').length;
      const paragraphs = rawBody.split('\n');
      const allLines = [];
      paragraphs.forEach((p, idx) => {
        if (!p.trim()) {
          allLines.push(null); // 段落空行间距
        } else {
          const wrapped = wrapStyledParagraph(ctx, p, innerTextW);
          wrapped.forEach(l => allLines.push(l));
          if (idx < paragraphs.length - 1) allLines.push('gap');
        }
      });

      const hasTitle = Boolean(titleEl.value.trim());
      const hasFooter = Boolean(authorEl.value.trim() || showDateEl.checked || showCountEl.checked);
      const terminalBarH = curTheme.terminal ? 28 : 0;
      const titleBlockH = hasTitle ? 42 : 0;
      let textBlockH = 0;
      allLines.forEach(l => {
        if (l === null) textBlockH += Math.round(lineHeight * 0.55);
        else if (l === 'gap') textBlockH += Math.round(lineHeight * 0.35);
        else textBlockH += lineHeight;
      });
      const footerBlockH = hasFooter ? 48 : 0;
      const brandH = showBrandEl.checked ? 26 : 0;

      const contentCardH = cardPad * 2 + terminalBarH + titleBlockH + textBlockH + footerBlockH;
      let logicalH = outerPad * 2 + contentCardH + brandH;

      if (curRatio === '3:4') logicalH = Math.max(logicalH, Math.round(logicalW * 4 / 3));
      else if (curRatio === '1:1') logicalH = Math.max(logicalH, logicalW);
      else if (curRatio === '16:9') logicalH = Math.max(logicalH, Math.round(logicalW * 9 / 16));

      canvas.width = logicalW * scale;
      canvas.height = logicalH * scale;
      resInfo.textContent = `输出尺寸：${canvas.width} × ${canvas.height} px (2x 高清)`;

      ctx.save();
      ctx.scale(scale, scale);

      // 1. 绘制外部渐变背景
      const grad = ctx.createLinearGradient(0, 0, logicalW, logicalH);
      grad.addColorStop(0, curTheme.outer[0]);
      grad.addColorStop(0.52, curTheme.outer[1]);
      grad.addColorStop(1, curTheme.outer[2]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, logicalW, logicalH);

      // 柔和弥散光晕点缀
      const glow = ctx.createRadialGradient(logicalW * 0.82, logicalH * 0.18, 10, logicalW * 0.82, logicalH * 0.18, logicalW * 0.65);
      glow.addColorStop(0, curTheme.hlBg);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, logicalW, logicalH);

      // 2. 居中内卡片位置
      const availH = logicalH - brandH;
      const cardX = outerPad;
      const cardY = Math.max(outerPad, Math.round((availH - contentCardH) / 2));
      const cardW = logicalW - outerPad * 2;

      ctx.save();
      ctx.shadowColor = curTheme.dark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(24, 24, 27, 0.12)';
      ctx.shadowBlur = 32;
      ctx.shadowOffsetY = 12;
      roundRectPath(ctx, cardX, cardY, cardW, contentCardH, curTheme.id === 'mono' ? 4 : 18);
      ctx.fillStyle = curTheme.cardBg;
      ctx.fill();
      ctx.restore();

      roundRectPath(ctx, cardX, cardY, cardW, contentCardH, curTheme.id === 'mono' ? 4 : 18);
      ctx.lineWidth = curTheme.id === 'mono' ? 2 : 1;
      ctx.strokeStyle = curTheme.cardBorder;
      ctx.stroke();

      let cursorY = cardY + cardPad;
      const leftX = cardX + cardPad;

      // 终端红黄绿圆点
      if (curTheme.terminal) {
        const dots = ['#ef4444', '#f59e0b', '#22c55e'];
        dots.forEach((c, idx) => {
          ctx.beginPath();
          ctx.arc(leftX + 6 + idx * 18, cursorY + 6, 5.5, 0, Math.PI * 2);
          ctx.fillStyle = c;
          ctx.fill();
        });
        ctx.font = `500 12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        ctx.fillStyle = curTheme.metaInk;
        ctx.fillText('snapcard://note.md', leftX + 66, cursorY + 10);
        cursorY += terminalBarH;
      }

      // 3. 标题
      if (hasTitle) {
        ctx.fillStyle = curTheme.accent;
        ctx.fillRect(leftX, cursorY + 3, 3.5, 18);
        ctx.font = `700 17px ${fontStack}`;
        ctx.fillStyle = curTheme.titleInk;
        ctx.fillText(titleEl.value.trim(), leftX + 12, cursorY + 18);
        cursorY += titleBlockH;
      }

      // 4. 正文与荧光笔高亮绘制
      ctx.font = `400 ${fontSize}px ${fontStack}`;
      ctx.textBaseline = 'alphabetic';

      allLines.forEach(line => {
        if (line === null) { cursorY += Math.round(lineHeight * 0.55); return; }
        if (line === 'gap') { cursorY += Math.round(lineHeight * 0.35); return; }

        // 先扫一遍连续的 hl 区间画圆角荧光笔底色
        let xRun = leftX;
        let hlStart = null;
        let hlWidth = 0;
        for (let i = 0; i <= line.length; i++) {
          const item = line[i];
          const w = item ? ctx.measureText(item.ch).width : 0;
          if (item && item.hl) {
            if (hlStart === null) { hlStart = xRun; hlWidth = w; }
            else hlWidth += w;
          } else if (hlStart !== null) {
            ctx.fillStyle = curTheme.hlBg;
            roundRectPath(ctx, hlStart - 2, cursorY + fontSize * 0.16, hlWidth + 4, fontSize * 1.02, 5);
            ctx.fill();
            hlStart = null;
            hlWidth = 0;
          }
          xRun += w;
        }

        // 再逐字符绘制清晰文字
        let xChar = leftX;
        const baselineY = cursorY + fontSize * 0.94;
        line.forEach(item => {
          ctx.font = `${item.hl ? '600' : '400'} ${fontSize}px ${fontStack}`;
          ctx.fillStyle = item.hl ? curTheme.titleInk : curTheme.bodyInk;
          ctx.fillText(item.ch, xChar, baselineY);
          xChar += ctx.measureText(item.ch).width;
        });
        ctx.font = `400 ${fontSize}px ${fontStack}`;
        cursorY += lineHeight;
      });

      // 5. 底部署名与日期字数
      if (hasFooter) {
        const footY = cardY + contentCardH - cardPad;
        ctx.strokeStyle = curTheme.cardBorder;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(leftX, footY - 26);
        ctx.lineTo(cardX + cardW - cardPad, footY - 26);
        ctx.stroke();

        ctx.font = `500 13px ${fontStack}`;
        ctx.fillStyle = curTheme.metaInk;
        if (authorEl.value.trim()) {
          ctx.fillText(authorEl.value.trim(), leftX, footY - 4);
        }

        const rightParts = [];
        if (showCountEl.checked) rightParts.push(`${plainCount} 字`);
        if (showDateEl.checked) {
          const d = new Date();
          rightParts.push(`${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`);
        }
        if (rightParts.length) {
          const metaStr = rightParts.join(' · ');
          ctx.font = `500 12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
          const mw = ctx.measureText(metaStr).width;
          ctx.fillText(metaStr, cardX + cardW - cardPad - mw, footY - 4);
        }
      }

      // 6. 画布底部轻量署名水印
      if (showBrandEl.checked) {
        const brandStr = 'Crafted with SnapCard · LiteKit';
        ctx.font = `500 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        ctx.fillStyle = curTheme.dark ? 'rgba(226, 232, 240, 0.42)' : 'rgba(39, 39, 42, 0.45)';
        const bw = ctx.measureText(brandStr).width;
        ctx.fillText(brandStr, (logicalW - bw) / 2, logicalH - 12);
      }

      ctx.restore();
    }

    document.querySelectorAll('[data-sc-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        curTheme = SC_THEMES.find(t => t.id === btn.dataset.scTheme) || SC_THEMES[0];
        document.querySelectorAll('[data-sc-theme]').forEach(b => b.classList.toggle('active', b === btn));
        drawCard();
      });
    });

    document.querySelectorAll('[data-sc-ratio]').forEach(btn => {
      btn.addEventListener('click', () => {
        curRatio = btn.dataset.scRatio;
        document.querySelectorAll('[data-sc-ratio]').forEach(b => b.classList.toggle('active', b === btn));
        drawCard();
      });
    });

    [titleEl, bodyEl, authorEl, fontEl, padEl].forEach(el => el.addEventListener('input', drawCard));
    [showDateEl, showCountEl, showBrandEl].forEach(el => el.addEventListener('change', drawCard));

    document.getElementById('scMarkHighlight').addEventListener('click', () => {
      const start = bodyEl.selectionStart;
      const end = bodyEl.selectionEnd;
      const val = bodyEl.value;
      if (start !== end) {
        const sel = val.slice(start, end);
        const toggled = sel.startsWith('==') && sel.endsWith('==')
          ? sel.slice(2, -2)
          : `==${sel}==`;
        bodyEl.value = val.slice(0, start) + toggled + val.slice(end);
        drawCard();
        toast('已切换选中文字的荧光笔高亮');
      } else {
        toast('请先在文本框中鼠标划选一段要高亮的文字');
        bodyEl.focus();
      }
    });

    const cycleQuote = () => {
      quoteIdx = (quoteIdx + 1) % SC_QUOTES.length;
      const q = SC_QUOTES[quoteIdx];
      titleEl.value = q.title;
      bodyEl.value = q.body;
      authorEl.value = q.author;
      // 顺便切换一个好看主题演示视觉张力
      curTheme = SC_THEMES[quoteIdx % SC_THEMES.length];
      document.querySelectorAll('[data-sc-theme]').forEach(b => b.classList.toggle('active', b.dataset.scTheme === curTheme.id));
      drawCard();
      toast(`已切换灵感金句与「${curTheme.name}」主题`);
    };

    document.getElementById('scNextQuote').addEventListener('click', cycleQuote);
    const topDemo = document.getElementById('tkDemoTrigger');
    if (topDemo) topDemo.onclick = cycleQuote;

    document.getElementById('scDownloadImgBtn').addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `snapcard-${curTheme.id}-${Date.now()}.png`;
      a.click();
      toast('已下载 2x 高清 PNG 卡片');
    });

    document.getElementById('scCopyImgBtn').addEventListener('click', () => {
      canvas.toBlob(async blob => {
        if (!blob) return;
        try {
          if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            toast('高清卡片图片已复制到剪贴板，可直接粘贴发送');
          } else {
            throw new Error('ClipboardItem unsupported');
          }
        } catch {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `snapcard-${curTheme.id}.png`;
          a.click();
          toast('当前浏览器限制剪贴板写图，已自动为您下载 PNG');
        }
      }, 'image/png');
    });

    drawCard();
  }

  /* ==========================================================================
     TOOL 03 · SafePic 纯本地证件水印与网申压缩箱
     ========================================================================== */
  function markupSafePic() {
    return `
      <div class="privacy-banner">
        <span style="display:inline-flex;align-items:center;gap:7px;font-weight:600">
          ${ic('shield', 'sm')} 隐私安全承诺：图片仅在当前浏览器内存与 Canvas 中离线运算，0 字节网络请求，断网亦可正常使用
        </span>
        <button type="button" class="chip demo-chip" id="spMockBtn">${ic('spark', 'sm')}重新载入模拟证件样张</button>
      </div>

      <div class="split-pane">
        <div style="display:flex;flex-direction:column;gap:13px">
          <div class="dropzone" id="spDropzone" tabindex="0" role="button" aria-label="选择或拖入本地图片">
            <input type="file" id="spFileInput" accept="image/png,image/jpeg,image/webp" hidden />
            <div style="font-size:var(--fs-sm);font-weight:600;color:var(--ink)">${ic('image', 'sm')} 点击选择本地图片 / 拖拽至此 / 直接 Ctrl+V 粘贴</div>
            <div style="font-size:var(--fs-xs);color:var(--ink-4);margin-top:4px">支持 JPG / PNG / WebP · 默认已载入模拟样张供直接测试</div>
          </div>

          <div class="card plain" style="padding:14px 16px;display:flex;flex-direction:column;gap:11px">
            <div class="bar">
              <label class="sw-label" style="font-weight:600;color:var(--ink)">
                <input type="checkbox" id="spWmEnable" checked />开启满屏斜向防盗水印
              </label>
              <label class="sw-label">
                <input type="checkbox" id="spWmDate" checked />附带当天日期
              </label>
            </div>

            <input type="text" class="tk-input" id="spWmText" value="仅供 2026 网申资格审核使用 · 他用无效" placeholder="输入防盗水印文字…" />

            <div class="preset-group">
              <button type="button" class="chip" data-sp-text="仅供入职背景调查核验 · 复印他用无效">入职背调</button>
              <button type="button" class="chip" data-sp-text="仅供租房实名备案使用 · 他用无效">租房备案</button>
              <button type="button" class="chip" data-sp-text="仅供网申报名身份核验使用 · 他用无效">网申报名</button>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <div class="ctrl-group">
                <div class="ctrl-label"><span>水印不透明度</span><span class="val" id="spAlphaVal">24%</span></div>
                <input type="range" class="tk-range" id="spAlpha" min="8" max="55" value="24" />
              </div>
              <div class="ctrl-group">
                <div class="ctrl-label"><span>平铺间距密度</span><span class="val" id="spGapVal">190px</span></div>
                <input type="range" class="tk-range" id="spGap" min="120" max="300" value="190" />
              </div>
            </div>

            <div class="preset-group">
              <span class="lbl-c">水印配色：</span>
              <button type="button" class="chip active" data-sp-color="28,35,48">深炭防伪灰</button>
              <button type="button" class="chip" data-sp-color="255,255,255">半透纯白</button>
              <button type="button" class="chip" data-sp-color="196,43,43">警示印章红</button>
              <button type="button" class="chip" data-sp-color="49,87,182">极客钴蓝</button>
            </div>
          </div>

          <div class="card plain" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px">
            <div class="ctrl-label"><span style="color:var(--ink)">网申目标体积限制（二分法精准逼近）</span></div>
            <div class="preset-group">
              <button type="button" class="chip" data-sp-kb="0">不限体积（高画质）</button>
              <button type="button" class="chip" data-sp-kb="500">≤ 500 KB</button>
              <button type="button" class="chip active" data-sp-kb="200">≤ 200 KB（网申常用）</button>
              <button type="button" class="chip" data-sp-kb="100">≤ 100 KB（严苛系统）</button>
            </div>

            <div class="ctrl-label" style="margin-top:4px"><span>尺寸规格预设</span></div>
            <div class="preset-group">
              <button type="button" class="chip active" data-sp-dim="orig">保持原图比例</button>
              <button type="button" class="chip" data-sp-dim="1280">限制长边 1280px</button>
              <button type="button" class="chip" data-sp-dim="1inch">一寸证件照 (295×413)</button>
              <button type="button" class="chip" data-sp-dim="2inch">二寸证件照 (413×579)</button>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px">
          <div class="safe-preview-box">
            <canvas id="spPreviewCanvas"></canvas>
          </div>
          <div class="telemetry-bar">
            <div class="telemetry-metrics" id="spMetrics">
              <span>计算中…</span>
            </div>
            <div class="preset-group">
              <button type="button" class="btn primary sm" id="spDownloadBtn">${ic('download', 'sm')}下载处理后图片</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* 程序化生成逼真的「模拟校园一卡通 / 网申资格证明样张」供 HR 零素材直接体验 */
  function createMockCredentialCanvas(variant) {
    const c = document.createElement('canvas');
    c.width = 960;
    c.height = 600;
    const ctx = c.getContext('2d');

    const palettes = [
      ['#f4f7fb', '#dbeafe', '#1e3a8a'],
      ['#f5f7f4', '#dcfce7', '#14532d']
    ];
    const pal = palettes[variant % palettes.length];

    const g = ctx.createLinearGradient(0, 0, c.width, c.height);
    g.addColorStop(0, pal[0]);
    g.addColorStop(1, pal[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, c.width, c.height);

    // 卡片外框与顶部色带
    ctx.fillStyle = pal[2];
    ctx.fillRect(0, 0, c.width, 94);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 28px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(variant % 2 === 0 ? '数字实验室 · 示例学生证 / 资格核验样张' : '示例学历与在读证明附件（功能演示样张）', 42, 58);

    // 模拟照片框
    roundRectPath(ctx, 52, 138, 210, 270, 14);
    ctx.fillStyle = '#cbd5e1';
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 简约头像剪影
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(157, 232, 44, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(157, 376, 78, Math.PI * 1.12, Math.PI * 1.88);
    ctx.fill();

    // 模拟字段信息
    ctx.fillStyle = '#1e293b';
    ctx.font = '700 26px "PingFang SC", "Microsoft YaHei", sans-serif';
    const fields = [
      ['持证姓名', '林探索（示例样张 · 非真实证件）'],
      ['证件编号', 'LK-2026-00984210'],
      ['所属院系', '创新产品与智能工程学部'],
      ['有效期限', '2024.09 — 2028.07']
    ];
    fields.forEach(([k, v], i) => {
      const y = 182 + i * 62;
      ctx.font = '600 20px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText(k, 306, y);
      ctx.font = '700 23px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(v, 420, y);
    });

    ctx.fillStyle = '#475569';
    ctx.font = '500 17px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('提示：您可以拖动左侧滑块实时测试防盗斜向水印，或点击上方上传您自己的图片。', 52, 535);
    return c;
  }

  let safePasteHandler = null;

  function mountSafePic() {
    const previewCanvas = document.getElementById('spPreviewCanvas');
    const pCtx = previewCanvas.getContext('2d');
    const fileInput = document.getElementById('spFileInput');
    const dropzone = document.getElementById('spDropzone');
    const wmEnable = document.getElementById('spWmEnable');
    const wmDate = document.getElementById('spWmDate');
    const wmText = document.getElementById('spWmText');
    const alphaEl = document.getElementById('spAlpha');
    const gapEl = document.getElementById('spGap');
    const alphaVal = document.getElementById('spAlphaVal');
    const gapVal = document.getElementById('spGapVal');
    const metricsEl = document.getElementById('spMetrics');

    let srcImage = null; // HTMLImageElement or HTMLCanvasElement
    let origBytes = 0;
    let wmRgb = '28,35,48';
    let targetKb = 200;
    let dimMode = 'orig';
    let latestBlob = null;
    let mockVariant = 0;
    let jobToken = 0;

    function computeTargetDimensions(sw, sh) {
      if (dimMode === '1inch') return { w: 295, h: 413, crop: true };
      if (dimMode === '2inch') return { w: 413, h: 579, crop: true };
      if (dimMode === '1280') {
        const maxSide = Math.max(sw, sh);
        if (maxSide <= 1280) return { w: sw, h: sh, crop: false };
        const r = 1280 / maxSide;
        return { w: Math.round(sw * r), h: Math.round(sh * r), crop: false };
      }
      return { w: sw, h: sh, crop: false };
    }

    function paintWorkingCanvas(scaleFactor) {
      const sw = srcImage.naturalWidth || srcImage.width;
      const sh = srcImage.naturalHeight || srcImage.height;
      const base = computeTargetDimensions(sw, sh);
      const w = Math.max(120, Math.round(base.w * scaleFactor));
      const h = Math.max(120, Math.round(base.h * scaleFactor));

      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const ctx = off.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      if (base.crop) {
        const srcRatio = sw / sh;
        const dstRatio = w / h;
        let sx = 0, sy = 0, sWidth = sw, sHeight = sh;
        if (srcRatio > dstRatio) {
          sWidth = sh * dstRatio;
          sx = (sw - sWidth) / 2;
        } else {
          sHeight = sw / dstRatio;
          sy = (sh - sHeight) / 2;
        }
        ctx.drawImage(srcImage, sx, sy, sWidth, sHeight, 0, 0, w, h);
      } else {
        ctx.drawImage(srcImage, 0, 0, w, h);
      }

      if (wmEnable.checked && wmText.value.trim()) {
        const d = new Date();
        const dateSuffix = wmDate.checked
          ? ` · ${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
          : '';
        const fullLabel = wmText.value.trim() + dateSuffix;
        const alpha = Number(alphaEl.value) / 100;
        const step = Math.max(90, Math.round(Number(gapEl.value) * (w / 900)));
        const fontSize = Math.max(13, Math.round(w / 42));

        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.rotate(-26 * Math.PI / 180);
        ctx.font = `600 ${fontSize}px "PingFang SC", "Microsoft YaHei", sans-serif`;
        ctx.fillStyle = `rgba(${wmRgb}, ${alpha})`;
        ctx.textAlign = 'center';

        const diag = Math.hypot(w, h);
        const colStep = Math.max(step * 1.65, ctx.measureText(fullLabel).width + 54);
        for (let y = -diag; y <= diag; y += step) {
          const offset = (Math.round(y / step) % 2) * (colStep / 2);
          for (let x = -diag; x <= diag; x += colStep) {
            ctx.fillText(fullLabel, x + offset, y);
          }
        }
        ctx.restore();
      }
      return off;
    }

    function canvasToBlobAsync(c, type, q) {
      return new Promise(resolve => c.toBlob(b => resolve(b), type, q));
    }

    async function processPipeline() {
      if (!srcImage) return;
      const myToken = ++jobToken;
      alphaVal.textContent = `${alphaEl.value}%`;
      gapVal.textContent = `${gapEl.value}px`;

      let workCanvas = paintWorkingCanvas(1);
      const maxBytes = targetKb > 0 ? targetKb * 1024 : Infinity;
      let bestBlob = null;
      let usedQuality = 0.92;

      if (!isFinite(maxBytes)) {
        bestBlob = await canvasToBlobAsync(workCanvas, 'image/jpeg', 0.94);
      } else {
        // 二分查找最佳 JPEG quality；若最低画质仍超标则温和缩小分辨率重试
        let scale = 1;
        for (let attempt = 0; attempt < 4; attempt++) {
          if (attempt > 0) {
            scale *= 0.78;
            workCanvas = paintWorkingCanvas(scale);
          }
          let lo = 0.12, hi = 0.95;
          let candidate = null;
          for (let iter = 0; iter < 6; iter++) {
            const mid = (lo + hi) / 2;
            const b = await canvasToBlobAsync(workCanvas, 'image/jpeg', mid);
            if (myToken !== jobToken) return;
            if (b && b.size <= maxBytes) {
              candidate = b;
              usedQuality = mid;
              lo = mid;
            } else {
              hi = mid;
            }
          }
          if (candidate) {
            bestBlob = candidate;
            break;
          }
          bestBlob = await canvasToBlobAsync(workCanvas, 'image/jpeg', 0.12);
          usedQuality = 0.12;
          if (bestBlob && bestBlob.size <= maxBytes) break;
        }
      }

      if (myToken !== jobToken || !bestBlob) return;
      latestBlob = bestBlob;

      previewCanvas.width = workCanvas.width;
      previewCanvas.height = workCanvas.height;
      pCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      pCtx.drawImage(workCanvas, 0, 0);

      const outKb = (bestBlob.size / 1024).toFixed(1);
      const inKb = (origBytes / 1024).toFixed(1);
      const ratioTxt = origBytes > 0 && bestBlob.size < origBytes
        ? `(-${Math.round((1 - bestBlob.size / origBytes) * 100)}%)`
        : '';
      const passBadge = targetKb > 0 && bestBlob.size <= targetKb * 1024
        ? `<span style="color:var(--ok-ink)">✓ 符合 ≤${targetKb}KB 要求</span>`
        : '';

      metricsEl.innerHTML = `
        <span>原图参考 <b>${inKb} KB</b></span>
        <span>处理后 <b>${outKb} KB</b> ${ratioTxt}</span>
        <span>尺寸 <b>${workCanvas.width}×${workCanvas.height}</b></span>
        <span>画质 <b>${Math.round(usedQuality * 100)}%</b></span>
        ${passBadge}
      `;
    }

    async function loadMockSample(notify) {
      const mockCanvas = createMockCredentialCanvas(mockVariant++);
      const initBlob = await canvasToBlobAsync(mockCanvas, 'image/png', 1);
      origBytes = initBlob ? initBlob.size : 480 * 1024;
      srcImage = mockCanvas;
      await processPipeline();
      if (notify) toast('已切换内置模拟证件样张');
    }

    function loadUserFile(file) {
      if (!file || !file.type.startsWith('image/')) {
        toast('请选择 JPG / PNG / WebP 格式的图片文件');
        return;
      }
      origBytes = file.size;
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        srcImage = img;
        processPipeline();
        toast(`已本地载入图片：${file.name}`);
      };
      img.src = url;
    }

    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', e => {
      if (e.target.files && e.target.files[0]) loadUserFile(e.target.files[0]);
    });
    dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) loadUserFile(e.dataTransfer.files[0]);
    });

    safePasteHandler = e => {
      const items = e.clipboardData && e.clipboardData.items;
      if (!items) return;
      for (const it of items) {
        if (it.type.startsWith('image/')) {
          loadUserFile(it.getAsFile());
          break;
        }
      }
    };
    document.addEventListener('paste', safePasteHandler);

    [wmEnable, wmDate].forEach(el => el.addEventListener('change', processPipeline));
    [wmText, alphaEl, gapEl].forEach(el => el.addEventListener('input', processPipeline));

    document.querySelectorAll('[data-sp-text]').forEach(btn => {
      btn.addEventListener('click', () => {
        wmText.value = btn.dataset.spText;
        wmEnable.checked = true;
        processPipeline();
      });
    });

    document.querySelectorAll('[data-sp-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        wmRgb = btn.dataset.spColor;
        document.querySelectorAll('[data-sp-color]').forEach(b => b.classList.toggle('active', b === btn));
        processPipeline();
      });
    });

    document.querySelectorAll('[data-sp-kb]').forEach(btn => {
      btn.addEventListener('click', () => {
        targetKb = Number(btn.dataset.spKb);
        document.querySelectorAll('[data-sp-kb]').forEach(b => b.classList.toggle('active', b === btn));
        processPipeline();
      });
    });

    document.querySelectorAll('[data-sp-dim]').forEach(btn => {
      btn.addEventListener('click', () => {
        dimMode = btn.dataset.spDim;
        document.querySelectorAll('[data-sp-dim]').forEach(b => b.classList.toggle('active', b === btn));
        processPipeline();
      });
    });

    document.getElementById('spMockBtn').addEventListener('click', () => loadMockSample(true));
    const topDemo = document.getElementById('tkDemoTrigger');
    if (topDemo) topDemo.onclick = () => loadMockSample(true);

    document.getElementById('spDownloadBtn').addEventListener('click', () => {
      if (!latestBlob) return;
      const url = URL.createObjectURL(latestBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `safepic-${targetKb ? targetKb + 'kb-' : ''}${Date.now()}.jpg`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast(`已下载处理后图片（${(latestBlob.size / 1024).toFixed(1)} KB）`);
    });

    loadMockSample(false);
  }

  /* ==========================================================================
     TOOL 04 · FlowZone 深海白噪音混音与心流专注舱
     ========================================================================== */
  const FZ_TRACKS = [
    { id: 'ocean', name: '🌊 深海潜流 (Deep Ocean)', defaultVol: 65, desc: '低频海浪涌动，与二进制游鱼同步呼吸' },
    { id: 'rain',  name: '🌧️ 窗外夜雨 (Night Rain)',  defaultVol: 40, desc: '温润粉噪雨幕，屏蔽周围人声干扰' },
    { id: 'fire',  name: '🔥 壁炉篝火 (Warm Hearth)', defaultVol: 0,  desc: '温暖木柴微响，适合深夜阅读写作' },
    { id: 'alpha', name: '🧠 10Hz 心流波 (Alpha Binaural)', defaultVol: 20, desc: '双耳微频差纯音，辅助平稳进入专注态' }
  ];

  const FZ_PRESETS = {
    abyss: { label: '🐋 深海潜航预设', vols: { ocean: 75, rain: 20, fire: 0, alpha: 28 } },
    study: { label: '☔ 雨夜自习室',   vols: { ocean: 15, rain: 72, fire: 38, alpha: 15 } },
    hearth:{ label: '🔥 温暖篝火夜',   vols: { ocean: 10, rain: 25, fire: 78, alpha: 0 } }
  };

  function markupFlowZone() {
    return `
      <div class="tool-toolbar">
        <div class="preset-group">
          <span class="lbl-c">声景配方：</span>
          <button type="button" class="chip active" data-fz-preset="abyss">🐋 深海潜航</button>
          <button type="button" class="chip" data-fz-preset="study">☔ 雨夜自习室</button>
          <button type="button" class="chip" data-fz-preset="hearth">🔥 温暖篝火夜</button>
        </div>
        <div class="preset-group">
          <button type="button" class="chip demo-chip" id="fzEnterZenBtn">${ic('eye', 'sm')}🌌 开启深海全屏沉浸（联动游鱼背景）</button>
          <button type="button" class="chip" id="fzPipBtn">${ic('term', 'sm')}悬浮小窗计时</button>
        </div>
      </div>

      <div class="fz-grid">
        <div class="fz-timer-card">
          <div class="preset-group" style="justify-content:center">
            <button type="button" class="chip active" data-fz-min="25">25 分钟标准番茄</button>
            <button type="button" class="chip" data-fz-min="45">45 分钟深度心流</button>
            <button type="button" class="chip" data-fz-min="15">15 分钟轻启动</button>
            <button type="button" class="chip demo-chip" data-fz-sec="10">⚡ 10 秒快速演示</button>
          </div>

          <input type="text" class="tk-input" id="fzGoalInput" value="打磨个人作品集细节与简历投递" placeholder="写下当前这轮专注的唯一小目标…" style="text-align:center;max-width:360px" />

          <div class="fz-clock" id="fzClockDisplay">25:00</div>

          <div class="fz-progress-ring" style="max-width:360px">
            <div class="fz-progress-bar" id="fzProgressBar" style="width:0%"></div>
          </div>

          <div class="btns" style="justify-content:center">
            <button type="button" class="btn primary" id="fzStartBtn">${ic('play', 'sm')}开始专注 & 播放声景</button>
            <button type="button" class="btn ghost sm" id="fzResetBtn">${ic('refresh', 'sm')}重置</button>
            <button type="button" class="btn ghost sm" id="fzReceiptNowBtn">🧾 打印心流小票</button>
          </div>

          <div style="font-size:var(--fs-xs);color:var(--ink-3)" id="fzStreakInfo">
            本地累计完成专注：<b style="font-family:var(--mono);color:var(--ok-ink)">0</b> 次
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px">
          <div class="bar">
            <span class="sec-h">${ic('wave')} Web Audio 实时合成混音台（0 外部音频加载）</span>
            <button type="button" class="chip" id="fzAudioToggle">${ic('play', 'sm')}单独试听环境音</button>
          </div>

          <div class="mixer-list">
            ${FZ_TRACKS.map(tr => `
              <div class="mixer-track" id="fzTrackCard-${tr.id}">
                <div class="mixer-head">
                  <span>${tr.name}</span>
                  <span class="vol-txt" id="fzVolTxt-${tr.id}">${tr.defaultVol}%</span>
                </div>
                <div style="font-size:11px;color:var(--ink-4)">${tr.desc}</div>
                <input type="range" class="tk-range" data-fz-vol="${tr.id}" min="0" max="100" value="${tr.defaultVol}" />
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="receipt-modal" id="fzReceiptBox">
        <div class="receipt-paper" id="fzReceiptPaper"></div>
        <div class="preset-group">
          <button type="button" class="btn primary sm" id="fzSaveReceiptPng">${ic('download', 'sm')}保存心流小票图片</button>
          <button type="button" class="btn ghost sm" id="fzCloseReceipt">收起小票</button>
        </div>
      </div>
    `;
  }

  /* Web Audio 合成器状态与计时状态管理 */
  let audioState = null;
  let fzInterval = 0;
  let pipWin = null;

  function createSynthEngine() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.value = 0.85;
    master.connect(ctx.destination);

    // 4 秒立体声平滑噪声缓冲
    const len = ctx.sampleRate * 4;
    const noiseBuf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = noiseBuf.getChannelData(ch);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.997 * b0 + white * 0.029;
        b1 = 0.985 * b1 + white * 0.032;
        b2 = 0.950 * b2 + white * 0.048;
        data[i] = Math.max(-1, Math.min(1, (b0 + b1 + b2 + white * 0.018) * 2.4));
      }
    }

    function makeLoopSource(buf) {
      const s = ctx.createBufferSource();
      s.buffer = buf;
      s.loop = true;
      return s;
    }

    const gains = {};

    // 1. 深海潜流：低通噪声 + 0.11Hz 海浪呼吸 LFO
    const oceanSrc = makeLoopSource(noiseBuf);
    const oceanFilter = ctx.createBiquadFilter();
    oceanFilter.type = 'lowpass';
    oceanFilter.frequency.value = 240;
    const oceanLfo = ctx.createOscillator();
    oceanLfo.frequency.value = 0.11;
    const oceanLfoGain = ctx.createGain();
    oceanLfoGain.gain.value = 135;
    oceanLfo.connect(oceanLfoGain);
    oceanLfoGain.connect(oceanFilter.frequency);
    gains.ocean = ctx.createGain();
    gains.ocean.gain.value = 0;
    oceanSrc.connect(oceanFilter);
    oceanFilter.connect(gains.ocean);
    gains.ocean.connect(master);
    oceanSrc.start();
    oceanLfo.start();

    // 2. 窗外夜雨：带通 + 高架滤波
    const rainSrc = makeLoopSource(noiseBuf);
    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.value = 1250;
    rainFilter.Q.value = 0.55;
    gains.rain = ctx.createGain();
    gains.rain.gain.value = 0;
    rainSrc.connect(rainFilter);
    rainFilter.connect(gains.rain);
    gains.rain.connect(master);
    rainSrc.start();

    // 3. 壁炉篝火：温暖低频 + 随机细微火星噼啪缓冲
    const fireBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const fd = fireBuf.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.03 * w) / 1.03;
      const crackle = Math.random() > 0.9988 ? (Math.random() * 0.85) : 0;
      fd[i] = lastOut * 2.6 + crackle;
    }
    const fireSrc = makeLoopSource(fireBuf);
    const fireFilter = ctx.createBiquadFilter();
    fireFilter.type = 'lowpass';
    fireFilter.frequency.value = 1600;
    gains.fire = ctx.createGain();
    gains.fire.gain.value = 0;
    fireSrc.connect(fireFilter);
    fireFilter.connect(gains.fire);
    gains.fire.connect(master);
    fireSrc.start();

    // 4. 10Hz Alpha 双耳专注纯音（左 200Hz / 右 210Hz）
    const oscL = ctx.createOscillator();
    const oscR = ctx.createOscillator();
    oscL.type = 'sine';
    oscR.type = 'sine';
    oscL.frequency.value = 200;
    oscR.frequency.value = 210;
    gains.alpha = ctx.createGain();
    gains.alpha.gain.value = 0;
    if (ctx.createStereoPanner) {
      const panL = ctx.createStereoPanner();
      const panR = ctx.createStereoPanner();
      panL.pan.value = -0.8;
      panR.pan.value = 0.8;
      oscL.connect(panL); panL.connect(gains.alpha);
      oscR.connect(panR); panR.connect(gains.alpha);
    } else {
      oscL.connect(gains.alpha);
      oscR.connect(gains.alpha);
    }
    gains.alpha.connect(master);
    oscL.start();
    oscR.start();

    return { ctx, gains, playing: false };
  }

  function playBellChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = (audioState && audioState.ctx) || new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const t0 = ctx.currentTime + idx * 0.14;
        g.gain.setValueAtTime(0.001, t0);
        g.gain.exponentialRampToValueAtTime(0.14, t0 + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.1);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + 1.15);
      });
    } catch { /* Ignore audio errors */ }
  }

  function exitZenMode() {
    document.body.classList.remove('zen-ocean');
    const hud = document.getElementById('zen-hud');
    if (hud) hud.remove();
  }

  function stopFlowZoneResources() {
    clearInterval(fzInterval);
    fzInterval = 0;
    exitZenMode();
    if (pipWin && !pipWin.closed) {
      try { pipWin.close(); } catch { /* Ignore */ }
    }
    pipWin = null;
    if (audioState && audioState.ctx) {
      try { audioState.ctx.close(); } catch { /* Ignore */ }
    }
    audioState = null;
  }

  function mountFlowZone() {
    const clockEl = document.getElementById('fzClockDisplay');
    const progEl = document.getElementById('fzProgressBar');
    const startBtn = document.getElementById('fzStartBtn');
    const audioBtn = document.getElementById('fzAudioToggle');
    const goalInput = document.getElementById('fzGoalInput');
    const streakEl = document.getElementById('fzStreakInfo');
    const receiptBox = document.getElementById('fzReceiptBox');
    const receiptPaper = document.getElementById('fzReceiptPaper');

    let totalSeconds = 25 * 60;
    let remainSeconds = totalSeconds;
    let running = false;
    let audioEnabled = false;
    const volumes = { ocean: 65, rain: 40, fire: 0, alpha: 20 };

    function readStats() {
      try {
        return JSON.parse(localStorage.getItem('litekit-flow-stats') || '{"count":0,"mins":0}');
      } catch {
        return { count: 0, mins: 0 };
      }
    }
    function saveStats(st) {
      try { localStorage.setItem('litekit-flow-stats', JSON.stringify(st)); } catch { /* Optional */ }
    }

    function refreshStreakText() {
      const st = readStats();
      streakEl.innerHTML = `本地累计完成专注：<b style="font-family:var(--mono);color:var(--ok-ink)">${st.count}</b> 次 · 共 <b style="font-family:var(--mono);color:var(--accent-ink)">${st.mins}</b> 分钟`;
    }

    function fmtClock(sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function syncAudioGains() {
      FZ_TRACKS.forEach(tr => {
        const v = volumes[tr.id] || 0;
        const card = document.getElementById(`fzTrackCard-${tr.id}`);
        const txt = document.getElementById(`fzVolTxt-${tr.id}`);
        if (txt) txt.textContent = `${v}%`;
        if (card) card.classList.toggle('playing', audioEnabled && v > 0);
      });

      if (!audioState) return;
      const now = audioState.ctx.currentTime;
      const scaleMap = { ocean: 0.55, rain: 0.42, fire: 0.48, alpha: 0.08 };
      FZ_TRACKS.forEach(tr => {
        const target = audioEnabled ? (volumes[tr.id] / 100) * scaleMap[tr.id] : 0;
        audioState.gains[tr.id].gain.setTargetAtTime(target, now, 0.08);
      });

      if (audioBtn) {
        audioBtn.innerHTML = audioEnabled
          ? `${ic('pause', 'sm')}暂停环境音`
          : `${ic('play', 'sm')}单独试听环境音`;
      }
    }

    function ensureAudioStarted(turnOn) {
      if (!audioState) audioState = createSynthEngine();
      if (audioState && audioState.ctx.state === 'suspended') {
        audioState.ctx.resume();
      }
      audioEnabled = turnOn;
      syncAudioGains();
    }

    function updateClockUI() {
      const str = fmtClock(remainSeconds);
      clockEl.textContent = str;
      const pct = totalSeconds > 0 ? Math.min(100, ((totalSeconds - remainSeconds) / totalSeconds) * 100) : 0;
      progEl.style.width = `${pct.toFixed(1)}%`;

      const zenClock = document.getElementById('zenClockVal');
      if (zenClock) zenClock.textContent = str;
      if (pipWin && !pipWin.closed) {
        const pClock = pipWin.document.getElementById('pipClock');
        if (pClock) pClock.textContent = str;
      }
    }

    function renderReceipt(completedMinutesLabel) {
      const d = new Date();
      const ts = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      const st = readStats();
      const mixLines = FZ_TRACKS
        .filter(t => volumes[t.id] > 0)
        .map(t => `${t.name.slice(2).trim().padEnd(22, ' ')} ${String(volumes[t.id]).padStart(3, ' ')}%`)
        .join('<br>') || '静音专注模式 (Pure Silence)     100%';

      receiptPaper.innerHTML = `
        <div style="text-align:center;font-weight:700;font-size:15px;letter-spacing:.06em">LITEKIT · FLOWZONE</div>
        <div style="text-align:center;color:#57606a;font-size:11px">深海心流舱 · 专注结账小票</div>
        <hr/>
        <div>单号：#FZ-${String(Date.now()).slice(-6)}</div>
        <div>时间：${ts}</div>
        <div>专注事项：<b>${esc(goalInput.value.trim() || '沉浸心流任务')}</b></div>
        <hr/>
        <div style="font-weight:700;margin-bottom:3px">环境声景配方 (SOUNDSCAPE MIX)</div>
        <div style="white-space:pre-wrap;font-size:11px">${mixLines}</div>
        <hr/>
        <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:700">
          <span>本轮结算时长</span>
          <span>${esc(completedMinutesLabel)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;color:#57606a;font-size:11px;margin-top:3px">
          <span>历史累计专注</span>
          <span>${st.count} 次 / ${st.mins} min</span>
        </div>
        <hr/>
        <div style="text-align:center;font-size:11px;color:#57606a">“保持专注，每次微小的推进都算数”<br>asdas2345.asia/#/tool/flowzone</div>
      `;
      receiptBox.classList.add('show');
    }

    function setRunning(nextRun) {
      running = nextRun;
      clearInterval(fzInterval);
      if (running) {
        ensureAudioStarted(true);
        startBtn.innerHTML = `${ic('pause', 'sm')}暂停专注`;
        fzInterval = setInterval(() => {
          remainSeconds = Math.max(0, remainSeconds - 1);
          updateClockUI();
          if (remainSeconds <= 0) {
            setRunning(false);
            ensureAudioStarted(false);
            exitZenMode();
            playBellChime();
            const addMin = Math.max(1, Math.round(totalSeconds / 60));
            const st = readStats();
            st.count += 1;
            st.mins += addMin;
            saveStats(st);
            refreshStreakText();
            renderReceipt(totalSeconds < 60 ? `${totalSeconds} 秒 (快速体验)` : `${addMin} 分钟`);
            toast('🎉 专注完成！已为您打印今日心流小票');
          }
        }, 1000);
      } else {
        startBtn.innerHTML = `${ic('play', 'sm')}${remainSeconds < totalSeconds && remainSeconds > 0 ? '继续专注' : '开始专注 & 播放声景'}`;
      }
    }

    startBtn.addEventListener('click', () => {
      if (remainSeconds <= 0) remainSeconds = totalSeconds;
      setRunning(!running);
    });

    document.getElementById('fzResetBtn').addEventListener('click', () => {
      setRunning(false);
      ensureAudioStarted(false);
      remainSeconds = totalSeconds;
      updateClockUI();
    });

    audioBtn.addEventListener('click', () => {
      ensureAudioStarted(!audioEnabled);
      toast(audioEnabled ? 'Web Audio 实时环境音已开启' : '环境音已暂停');
    });

    document.querySelectorAll('[data-fz-vol]').forEach(slider => {
      slider.addEventListener('input', () => {
        volumes[slider.dataset.fzVol] = Number(slider.value);
        syncAudioGains();
      });
    });

    document.querySelectorAll('[data-fz-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = FZ_PRESETS[btn.dataset.fzPreset];
        if (!p) return;
        document.querySelectorAll('[data-fz-preset]').forEach(b => b.classList.toggle('active', b === btn));
        Object.entries(p.vols).forEach(([k, v]) => {
          volumes[k] = v;
          const sl = document.querySelector(`[data-fz-vol="${k}"]`);
          if (sl) sl.value = String(v);
        });
        ensureAudioStarted(true);
        toast(`已切换并播放「${p.label}」`);
      });
    });

    document.querySelectorAll('[data-fz-min], [data-fz-sec]').forEach(btn => {
      btn.addEventListener('click', () => {
        setRunning(false);
        document.querySelectorAll('[data-fz-min], [data-fz-sec]').forEach(b => b.classList.toggle('active', b === btn));
        totalSeconds = btn.dataset.fzSec ? Number(btn.dataset.fzSec) : Number(btn.dataset.fzMin) * 60;
        remainSeconds = totalSeconds;
        updateClockUI();
        if (btn.dataset.fzSec) {
          setRunning(true);
          toast('已启动 10 秒快速体验倒计时与深海声景');
        }
      });
    });

    /* 开启深海全屏沉浸模式（直接凸显全站 binary-ocean 二进制游鱼背景） */
    function enterZenOcean() {
      if (!running) setRunning(true);
      // 确保背景游鱼处于播放态
      const oceanToggle = document.getElementById('ocean-toggle');
      if (oceanToggle && oceanToggle.classList.contains('is-paused')) {
        oceanToggle.click();
      }
      exitZenMode();
      const hud = document.createElement('div');
      hud.id = 'zen-hud';
      hud.className = 'zen-hud';
      hud.innerHTML = `
        <div class="zen-capsule">
          <span class="tag doing"><span class="d"></span>0101 · 深海游鱼沉浸专注中</span>
          <div style="font-size:var(--fs-sm);color:var(--ink-2)">${esc(goalInput.value.trim() || '保持心流专注')}</div>
          <div class="fz-clock" id="zenClockVal">${fmtClock(remainSeconds)}</div>
          <div style="font-size:var(--fs-xs);color:var(--ink-4)">按 ESC 键或点击下方按钮随时返回工作台</div>
          <button type="button" class="btn ghost sm" id="zenExitBtn">退出全屏深海沉浸</button>
        </div>
      `;
      document.body.appendChild(hud);
      document.body.classList.add('zen-ocean');
      document.getElementById('zenExitBtn').addEventListener('click', exitZenMode);
    }

    document.getElementById('fzEnterZenBtn').addEventListener('click', enterZenOcean);

    const triggerFastDemo = () => {
      const fastBtn = document.querySelector('[data-fz-sec="10"]');
      if (fastBtn) fastBtn.click();
    };
    const topDemo = document.getElementById('tkDemoTrigger');
    if (topDemo) topDemo.onclick = triggerFastDemo;

    /* 浏览器画中画悬浮窗 PiP */
    document.getElementById('fzPipBtn').addEventListener('click', async () => {
      if ('documentPictureInPicture' in window) {
        try {
          pipWin = await window.documentPictureInPicture.requestWindow({ width: 300, height: 170 });
          pipWin.document.body.style.cssText = 'margin:0;background:#0a0d14;color:#f1f8fa;font-family:ui-monospace,Consolas,monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:6px;text-align:center;';
          pipWin.document.body.innerHTML = `
            <div style="font-size:11px;color:#93c5fd;padding:0 12px">${esc(goalInput.value.trim() || 'FlowZone 专注中')}</div>
            <div id="pipClock" style="font-size:42px;font-weight:700">${fmtClock(remainSeconds)}</div>
            <div style="font-size:11px;color:#94a3b8">LiteKit · 深海心流舱</div>
          `;
          if (!running) setRunning(true);
          toast('已开启桌面悬浮小窗计时');
          return;
        } catch { /* Fall through to zen hint */ }
      }
      enterZenOcean();
      toast('当前环境不支持独立小窗，已为您切换至深海沉浸视图');
    });

    /* 心流小票生成与 PNG 导出 */
    document.getElementById('fzReceiptNowBtn').addEventListener('click', () => {
      const elapsedMin = Math.max(1, Math.round((totalSeconds - remainSeconds) / 60) || Math.round(totalSeconds / 60));
      renderReceipt(`${elapsedMin} 分钟`);
      receiptBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    document.getElementById('fzCloseReceipt').addEventListener('click', () => {
      receiptBox.classList.remove('show');
    });

    document.getElementById('fzSaveReceiptPng').addEventListener('click', () => {
      const c = document.createElement('canvas');
      c.width = 720;
      c.height = 820;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#f6f4ee';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#0a0a0b';
      for (let x = 0; x < c.width; x += 24) {
        ctx.fillRect(x, 0, 14, 8);
        ctx.fillRect(x, c.height - 8, 14, 8);
      }
      ctx.fillStyle = '#1c2128';
      ctx.font = '700 28px ui-monospace, Menlo, Consolas, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('LITEKIT · FLOWZONE RECEIPT', c.width / 2, 74);
      ctx.font = '500 18px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#57606a';
      ctx.fillText('深海心流舱 · 今日专注结账单', c.width / 2, 110);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#1c2128';
      ctx.font = '500 20px ui-monospace, "PingFang SC", "Microsoft YaHei", monospace';
      const lines = receiptPaper.innerText.split('\n').filter(Boolean).slice(2);
      let y = 175;
      lines.forEach(line => {
        ctx.fillText(line.slice(0, 38), 54, y);
        y += 42;
      });

      const a = document.createElement('a');
      a.href = c.toDataURL('image/png');
      a.download = `flowzone-receipt-${Date.now()}.png`;
      a.click();
      toast('已保存心流小票 PNG 图片');
    });

    refreshStreakText();
    syncAudioGains();
    updateClockUI();
  }

  /* ---------------- 4. 统一挂载与卸载生命周期 ---------------- */
  function mount(id) {
    const pmBtn = document.getElementById('tkPmToggle');
    const pmDrawer = document.getElementById('tkPmDrawer');
    if (pmBtn && pmDrawer) {
      pmBtn.addEventListener('click', () => {
        const open = pmDrawer.classList.toggle('open');
        pmBtn.setAttribute('aria-expanded', String(open));
      });
    }

    switch (String(id || '').toLowerCase()) {
      case 'cleanpaste': mountCleanPaste(); break;
      case 'snapcard':   mountSnapCard();   break;
      case 'safepic':    mountSafePic();    break;
      case 'flowzone':   mountFlowZone();   break;
    }
  }

  function unmount() {
    if (safePasteHandler) {
      document.removeEventListener('paste', safePasteHandler);
      safePasteHandler = null;
    }
    stopFlowZoneResources();
  }

  window.LiteKitTools = {
    TOOLS,
    getTool,
    renderToolPage,
    mount,
    unmount,
    exitZenMode
  };
})();
