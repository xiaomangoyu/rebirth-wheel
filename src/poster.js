const posterWidth = 1080;
const posterHeight = 1440;
const posterFont = '"Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", system-ui, sans-serif';
const posterFlagSheet = new Image();
const flagSheetCss = getComputedStyle(document.documentElement).getPropertyValue('--flag-sheet').trim();
posterFlagSheet.src = flagSheetCss.replace(/^url\(["']?|["']?\)$/g, '');

function posterBox(context, x, y, width, height, radius, fill, stroke = true) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fillStyle = fill;
  context.fill();
  if (stroke) {
    context.lineWidth = 4;
    context.strokeStyle = '#241e36';
    context.stroke();
  }
}

function posterText(context, text, x, y, size, weight = 750, color = '#241e36', maxWidth) {
  context.fillStyle = color;
  context.font = weight + ' ' + size + 'px ' + posterFont;
  if (maxWidth) context.fillText(text, x, y, maxWidth);
  else context.fillText(text, x, y);
}

function posterLines(context, text, maxWidth, size) {
  context.font = '650 ' + size + 'px ' + posterFont;
  const lines = [];
  let line = '';
  for (const character of text) {
    if (line && context.measureText(line + character).width > maxWidth) {
      if ('，。！？：；、」）》'.includes(character)) {
        lines.push(line + character);
        line = '';
        continue;
      }
      lines.push(line);
      line = '';
    }
    line += character;
  }
  if (line) lines.push(line);
  return lines;
}

function drawPosterFlags(context, code, x, y) {
  const codes = code === 'JG' ? ['GG', 'JE'] : [code];
  if (!posterFlagSheet.complete || !posterFlagSheet.naturalWidth) return x;
  for (const id of codes) {
    const index = flagPositions[id];
    if (index === undefined) continue;
    const column = index % 16;
    const row = Math.floor(index / 16);
    context.drawImage(posterFlagSheet, column * 48, row * 32, 48, 32, x, y, 84, 56);
    x += 93;
  }
  return x;
}

function renderResultPoster(place, household, story, combo, publicUrl) {
  const poster = document.createElement('canvas');
  poster.width = posterWidth;
  poster.height = posterHeight;
  const context = poster.getContext('2d');
  const ink = '#241e36';
  const muted = '#574c66';
  const accent = ['#ff9f91','#d9cbff','#b9e9d5','#ffd964','#ffb5ce'][classes.indexOf(household)];
  context.fillStyle = '#fff3d6';
  context.fillRect(0, 0, posterWidth, posterHeight);
  context.fillStyle = '#ded2c4';
  for (let x = 24; x < posterWidth; x += 28) {
    for (let y = 24; y < posterHeight; y += 28) context.fillRect(x, y, 3, 3);
  }
  posterBox(context, 60, 61, 974, 1326, 35, ink, false);
  posterBox(context, 51, 52, 974, 1326, 35, '#fffdf3');
  posterBox(context, 90, 89, 68, 68, 13, '#ff8e81');
  posterText(context, '投', 103, 137, 41, 950);
  posterText(context, '地球投胎办', 179, 134, 33, 900);
  context.textAlign = 'right';
  posterText(context, '重生结果卡', 983, 132, 29, 850, muted);
  context.textAlign = 'left';

  posterBox(context, 90, 188, 895, 322, 26, accent);
  const titleX = drawPosterFlags(context, place.id, 130, 235);
  posterText(context, place.name, titleX + 1, 283, 64, 950, ink, 948 - titleX);
  posterText(context, story.city, 131, 385, 76, 950, ink, 805);
  posterText(context, household.name + '  ·  组合概率 ' + combo, 132, 459, 34, 850, ink, 805);

  const headings = ['出生', '巅峰', '结局'];
  const colors = ['#d9cbff', '#ff9f91', '#b9e9d5'];
  story.beats.forEach((beat, index) => {
    const top = 551 + index * 208;
    let lineSize = 34;
    let lines = posterLines(context, beat, 821, lineSize);
    while (lines.length > 3 && lineSize > 24) {
      lineSize -= 2;
      lines = posterLines(context, beat, 821, lineSize);
    }
    posterBox(context, 91, top, 894, 190, 20, index % 2 === 0 ? '#fff5d8' : '#f5eeff');
    posterBox(context, 118, top + 23, 112, 48, 10, colors[index]);
    posterText(context, headings[index], 142, top + 58, 31, 900);
    lines.forEach((line, row) => posterText(context, line, 119, top + 103 + row * 38, lineSize, 650, ink, 832));
  });
  context.beginPath();
  context.moveTo(99, 1203);
  context.lineTo(979, 1203);
  context.setLineDash([12, 9]);
  context.lineWidth = 3;
  context.strokeStyle = '#8f7d9e';
  context.stroke();
  context.setLineDash([]);
  posterText(context, '重生之我是XX人', 100, 1260, 36, 900);
  posterText(context, publicUrl ? publicUrl.replace(/^https:\/\//, '') : '幸运转盘 · 虚构人生', 101, 1314, 27, 700, muted, 765);
  context.textAlign = 'right';
  posterText(context, '已盖章', 975, 1264, 30, 900, '#a13c3c');
  return poster.toDataURL('image/png');
}

const cardDialog = byId('card-dialog');
const cardImage = byId('card-image');
const cardDownload = byId('card-download');
const cardStatus = byId('card-status');
const saveResult = byId('save-result');
let posterCache = '';

saveResult.addEventListener('click', () => {
  try {
    if (!posterCache) {
      const story = lifeStory(country, family, storySeed);
      posterCache = renderResultPoster(country, family, story, combinationProbability(), shareableGameUrl({ publicOnly:true }));
    }
    cardImage.src = posterCache;
    cardDownload.href = posterCache;
    cardDownload.download = '重生档案-' + country.id + '-' + family.id + '.png';
    cardStatus.hidden = true;
    cardDialog.showModal();
  } catch {
    cardStatus.textContent = '图片生成失败，可以截图保存当前结果。';
    cardStatus.hidden = false;
  }
});
