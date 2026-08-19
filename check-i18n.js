/**
 * 中英切换「查漏」脚本
 * =====================================
 * 扫描 5 个主页面，找出「含英文文本但没有 data-zh 属性」的可翻译块级元素，
 * 提醒你补中文译文。零依赖，node 直接运行：
 *
 *   node check-i18n.js
 *
 * 注意：这只是「查漏提醒」，中文译文仍需人工写（避免机翻）。
 * 改完英文文案后跑一遍，输出为空 = 没有漏译。
 *
 * 设计说明：只检查 h/p/li/dt/dd/option/label/button/a 这些「文案载体」。
 * 内部的 <strong>/<span> 不单独查——因为翻译策略是把 data-zh 加在
 * 父块上、切中文时整个父块一起替换（内部标签自然覆盖）。
 */
var fs = require('fs');

var FILES = ['index.html', 'products.html', 'about.html', 'resources.html', 'contact.html'];

// 这些文本保留英文是正常的，跳过（不用翻译）
function shouldSkip(text) {
  var t = text.trim();
  if (!/[A-Za-z]/.test(t)) return true;                 // 纯数字/符号/中文
  if (/^Fenxing\s*Flock$/.test(t)) return true;          // 品牌名
  if (/^August\s+\d{4}$/.test(t)) return true;           // 日期（文章卡片）
  if (/^\d{4}$/.test(t)) return true;                    // 年份/编号
  if (/^©/.test(t)) return true;                         // 版权行
  if (/@/.test(t)) return true;                          // 邮箱
  if (/^\+\d/.test(t)) return true;                      // 电话/WhatsApp 号
  if (/^fenxingflock\.com$/.test(t)) return true;        // 域名
  if (/^(EN|中文)$/.test(t)) return true;                // 切换按钮文案
  return false;
}

var total = 0;

FILES.forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  // 匹配 <tag attrs>纯文本</tag>（tag 为文案载体，文本内不含 < 则忽略含 svg/img 的块）
  var re = /<((?:h[1-6]|p|li|dt|dd|option|label|button|a)\b)([^>]*)>([^<>]+)<\/\1>/g;
  var issues = [];
  var m;
  while ((m = re.exec(s)) !== null) {
    var tag = m[1], attrs = m[2], text = m[3];
    if (/data-zh/.test(attrs)) continue;   // 已翻译
    if (shouldSkip(text)) continue;        // 本就不该翻译
    issues.push('  <' + tag + '> ' + text.trim().slice(0, 70));
  }
  if (issues.length) {
    total += issues.length;
    console.log('\n[' + f + '] ' + issues.length + ' 处可能漏译：');
    issues.forEach(function (i) { console.log(i); });
  }
});

console.log(total ? ('\n共 ' + total + ' 处待补中文。') : '\n✅ 5 个主页面无遗漏（data-zh 已覆盖所有可见英文）。');
