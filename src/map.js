const mapCanvas = byId('world-map');
const mapStatus = byId('map-status');
const mapContext = mapCanvas.getContext('2d');
const mapBase = document.createElement('canvas');
mapBase.width = mapCanvas.width;
mapBase.height = mapCanvas.height;
const baseContext = mapBase.getContext('2d');
const [worldShapes, worldMarkers] = mapData;
const mapInset = 14;

function mapX(lon) {
  return mapInset + (lon + 180) / 360 * (mapCanvas.width - mapInset * 2);
}

function mapY(lat) {
  return mapInset + (86 - lat) / 149 * (mapCanvas.height - mapInset * 2);
}

function traceMap(polygons) {
  const path = new Path2D();
  for (const polygon of polygons) {
    for (const ring of polygon) {
      path.moveTo(mapX(ring[0] / 10), mapY(ring[1] / 10));
      for (let point = 2; point < ring.length; point += 2) {
        path.lineTo(mapX(ring[point] / 10), mapY(ring[point + 1] / 10));
      }
      path.closePath();
    }
  }
  return path;
}

const countryPaths = new Map(Object.entries(worldShapes).map(([id, shape]) => [id, traceMap(shape)]));
baseContext.fillStyle = '#dbdffa';
baseContext.fillRect(0, 0, mapBase.width, mapBase.height);
baseContext.beginPath();
for (const latitude of [-60, -30, 0, 30, 60]) {
  baseContext.moveTo(mapInset, mapY(latitude));
  baseContext.lineTo(mapBase.width - mapInset, mapY(latitude));
}
for (let longitude = -150; longitude <= 150; longitude += 30) {
  baseContext.moveTo(mapX(longitude), mapInset);
  baseContext.lineTo(mapX(longitude), mapBase.height - mapInset);
}
baseContext.strokeStyle = '#9390bf85';
baseContext.lineWidth = 1;
baseContext.setLineDash([3, 5]);
baseContext.stroke();
baseContext.setLineDash([]);
baseContext.fillStyle = '#fff9e5';
baseContext.strokeStyle = '#776b91';
baseContext.lineWidth = .95;
for (const path of countryPaths.values()) {
  baseContext.fill(path, 'evenodd');
  baseContext.stroke(path);
}

function showMap(place = null, phase = 'ready') {
  mapContext.drawImage(mapBase, 0, 0);
  mapStatus.dataset.mapState = phase;
  if (!place) {
    mapStatus.textContent = '待摇号';
    return;
  }
  setFlaggedText(mapStatus, (phase === 'locked' ? '锁定 · ' : '摇到 · ') + place.name, place.id);
  const keys = place.id === 'JG' ? ['GG', 'JE'] : [place.id];
  const color = phase === 'locked' ? '#ff786a' : '#ffd34d';
  for (const key of keys) {
    const path = countryPaths.get(key);
    if (path) {
      mapContext.fillStyle = color;
      mapContext.fill(path, 'evenodd');
      mapContext.strokeStyle = '#241e36';
      mapContext.lineWidth = 1.5;
      mapContext.stroke(path);
    }
    const [lon, lat] = worldMarkers[key];
    const x = mapX(lon);
    const y = mapY(lat);
    mapContext.beginPath();
    mapContext.arc(x, y, 8, 0, Math.PI * 2);
    mapContext.fillStyle = color;
    mapContext.fill();
    mapContext.lineWidth = 2;
    mapContext.strokeStyle = '#241e36';
    mapContext.stroke();
    mapContext.beginPath();
    mapContext.arc(x, y, 2.4, 0, Math.PI * 2);
    mapContext.fillStyle = '#241e36';
    mapContext.fill();
  }
}
