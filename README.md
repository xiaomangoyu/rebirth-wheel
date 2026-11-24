# 重生之我是 XX 人

地球投胎办的静态网页。先按人口权重摇出生地，再抽家庭阶层，生成三段虚构人生和一张可以保存的结果卡。

打开 `docs/index.html` 即可试玩。修改 `src` 中的文件后，运行 `node scripts/build.mjs` 生成单文件网页。构建和运行均无需安装依赖。

Vercel 使用 `vercel.json` 构建，GitHub Pages 发布 `main` 分支的 `/docs`。分享按钮使用 `src/public-game-url.txt` 中的正式网址。在 GitHub Pages 上使用当前镜像的地址。

- 人口来自[联合国世界人口展望](https://population.un.org/wpp/)，采用 2024 年年中人口。
- 地图来自 [Natural Earth](https://www.naturalearthdata.com/)，城市来自 [GeoNames](https://www.geonames.org/)。
- 旗帜来自 [Country Flags](https://hampusborgos.github.io/country-flags/)。
