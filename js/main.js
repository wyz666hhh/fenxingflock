/**
 * Fenxing Flock — 全局 JavaScript
 * =====================================
 * 功能清单：
 *   1. 移动端汉堡菜单的展开/收起
 *   2. 页面内锚点链接的平滑滚动
 *   3. 色卡画廊：Tab 标签切换材质
 *   4. 色卡画廊：点击缩略图弹出灯箱大图
 *
 * 修改指南：
 *   - 所有页面共用这一个 JS 文件，改一处全站生效
 *   - 如需加新功能，在 DOMContentLoaded 里追加代码
 */

document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 功能 1：移动端导航菜单切换
  // ==========================================
  var navToggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('nav ul');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      navList.classList.toggle('active');
    });
  }

  // ==========================================
  // 功能 2：锚点链接平滑滚动
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // 功能 3：色卡画廊 — Tab 标签切换
  // ==========================================
  var swatchTabs = document.querySelectorAll('.swatch-tab');
  var swatchPanels = document.querySelectorAll('.swatch-panel');

  swatchTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var material = this.getAttribute('data-tab');   // nylon / rayon / polyester

      // 移除所有 Tab 的 active 状态
      swatchTabs.forEach(function (t) { t.classList.remove('active'); });
      // 当前 Tab 设为 active
      this.classList.add('active');

      // 隐藏所有面板
      swatchPanels.forEach(function (panel) { panel.classList.remove('active'); });
      // 显示对应的面板
      var targetPanel = document.getElementById('swatch-' + material);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // ==========================================
  // 功能 4：色卡画廊 — 灯箱（Lightbox）
  // ==========================================

  // 4a. 动态创建灯箱 HTML（只创建一次）
  if (document.querySelector('.swatch-item') && !document.querySelector('.lightbox')) {
    var lightboxHTML = '' +
      '<div class="lightbox" id="lightbox">' +
      '  <button class="lightbox-close" id="lightbox-close">&times;</button>' +
      '  <button class="lightbox-prev" id="lightbox-prev">&lsaquo;</button>' +
      '  <button class="lightbox-next" id="lightbox-next">&rsaquo;</button>' +
      '  <img src="" alt="" id="lightbox-img">' +
      '  <div class="lightbox-caption" id="lightbox-caption"></div>' +
      '</div>';
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var lightboxPrev = document.getElementById('lightbox-prev');
  var lightboxNext = document.getElementById('lightbox-next');

  // 收集页面上所有色卡图片的信息
  var swatchItems = [];          // [{src, caption}]
  var currentIndex = 0;          // 当前显示的图片索引

  function collectSwatchItems() {
    swatchItems = [];
    document.querySelectorAll('.swatch-item').forEach(function (item) {
      swatchItems.push({
        src: item.getAttribute('data-full'),
        caption: item.getAttribute('data-caption') || ''
      });
    });
  }

  // 4b. 点击缩略图 → 打开灯箱
  document.querySelectorAll('.swatch-item').forEach(function (item, index) {
    item.addEventListener('click', function () {
      collectSwatchItems();                     // 刷新图片列表
      currentIndex = index;                     // 记录当前索引
      var fullSrc = this.getAttribute('data-full');
      var caption = this.getAttribute('data-caption') || '';
      openLightbox(fullSrc, caption);
    });
  });

  // 4c. 打开灯箱
  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';     // 防止背景滚动
  }

  // 4d. 关闭灯箱
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // 4e. 切换到上一张/下一张
  function prevImage() {
    if (swatchItems.length === 0) return;
    currentIndex = (currentIndex - 1 + swatchItems.length) % swatchItems.length;
    var item = swatchItems[currentIndex];
    openLightbox(item.src, item.caption);
  }

  function nextImage() {
    if (swatchItems.length === 0) return;
    currentIndex = (currentIndex + 1) % swatchItems.length;
    var item = swatchItems[currentIndex];
    openLightbox(item.src, item.caption);
  }

  // 4f. 绑定关闭/切换事件
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
  }
  // 点击遮罩层（非图片区域）也关闭
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // 4g. 键盘操作：Esc 关闭 / ← → 切换
  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  });

  // ==========================================
  // 功能 5：产品导航滚动高亮（Scroll Spy）
  // ==========================================
  // 原理：监听页面滚动，判断当前可见的产品区块，
  // 自动高亮对应的导航按钮
  var productNav = document.getElementById('productNav');
  if (productNav) {
    var navLinks = productNav.querySelectorAll('.product-nav-link');
    var sections = [];
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var section = document.getElementById(href.substring(1));
        if (section) {
          sections.push({ link: link, section: section });
        }
      }
    });

    // 监听滚动（用 throttle 优化性能）
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateActiveNav();
          ticking = false;
        });
        ticking = true;
      }
    });

    function updateActiveNav() {
      var scrollY = window.scrollY + 160; // offset: header + nav 高度
      var currentSection = null;

      sections.forEach(function (item) {
        if (item.section.offsetTop <= scrollY) {
          currentSection = item;
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('active');
      });
      if (currentSection) {
        currentSection.link.classList.add('active');
      }
    }
  }

});
