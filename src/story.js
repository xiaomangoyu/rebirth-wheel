const tierCityPools = {
  CN: [
    ['甘肃会宁县','贵州榕江县','湖南新化县'],
    ['东莞长安镇','佛山顺德','苏州昆山'],
    ['成都','武汉','南京','长沙','杭州'],
    ['深圳南山','杭州滨江','广州天河'],
    ['北京','上海']
  ],
  IN: [
    ['纳格尔科伊尔','布杰','比哈尔邦伽耶'],
    ['浦那','苏拉特','坎普尔'],
    ['班加罗尔','海得拉巴','金奈'],
    ['金奈','浦那','艾哈迈达巴德'],
    ['孟买','新德里']
  ],
  US: [
    ['俄亥俄州朴茨茅斯','西弗吉尼亚州贝克利','密西西比州格林维尔'],
    ['底特律','克利夫兰','匹兹堡'],
    ['西雅图','奥斯汀','丹佛'],
    ['波士顿','圣迭戈','迈阿密'],
    ['纽约','旧金山湾区']
  ],
  JP: [
    ['秋田县横手市','青森县弘前市'],
    ['埼玉县川口市','千叶县船桥市','大阪堺市'],
    ['名古屋','福冈','札幌'],
    ['横滨','神户'],
    ['东京港区','东京千代田区']
  ],
  GB: [
    ['布莱克浦','哈特尔浦'],
    ['谢菲尔德','利兹'],
    ['曼彻斯特','布里斯托','爱丁堡'],
    ['巴斯','剑桥'],
    ['伦敦梅费尔','伦敦肯辛顿']
  ],
  PK: [
    ['穆尔坦附近','海得拉巴郊区','费萨拉巴德附近'],
    ['费萨拉巴德','拉瓦尔品第','古杰兰瓦拉'],
    ['拉合尔','海得拉巴','白沙瓦'],
    ['卡拉奇','拉合尔','拉瓦尔品第'],
    ['伊斯兰堡','卡拉奇']
  ]
};

const regionalCityPools = {
  ID: ['马迪乌恩','帕雷帕雷','梭罗','泗水','雅加达','万隆'],
  NG: ['奥绍博','阿巴','伊巴丹','阿布贾','拉各斯'],
  BR: ['索布拉尔','卡鲁阿鲁','库里蒂巴','贝洛奥里藏特','圣保罗','里约热内卢'],
  BD: ['博格拉','杰索尔','库尔纳','吉大港','达卡'],
  RU: ['普斯科夫','彼尔姆','喀山','圣彼得堡','莫斯科'],
  MX: ['萨卡特卡斯','特皮克','普埃布拉','瓜达拉哈拉','蒙特雷','墨西哥城'],
  ET: ['阿达玛','巴赫达尔','哈瓦萨','德雷达瓦','亚的斯亚贝巴'],
  EG: ['明亚','法尤姆','坦塔','亚历山大','开罗','新开罗'],
  PH: ['纳牙','怡朗','达沃','宿务','奎松城','马卡蒂'],
  VN: ['清化','归仁','芹苴','岘港','河内','胡志明市'],
  TR: ['托卡特','锡瓦斯','开塞利','伊兹密尔','安卡拉','伊斯坦布尔'],
  DE: ['格尔利茨','开姆尼茨','莱比锡','科隆','柏林','慕尼黑'],
  FR: ['盖雷','讷韦尔','利摩日','图卢兹','里昂','巴黎'],
  TH: ['素辇','黎逸','呵叻','清迈','曼谷','普吉市'],
  KR: ['全州','木浦','大邱','釜山','首尔','仁川'],
  CA: ['科纳布鲁克','萨德伯里','温尼伯','蒙特利尔','多伦多','温哥华'],
  AU: ['布罗肯希尔','旺加拉塔','纽卡斯尔','布里斯班','墨尔本','悉尼'],
  IT: ['坎波巴索','波坦察','巴里','博洛尼亚','罗马','米兰'],
  ES: ['索里亚','特鲁埃尔','巴利亚多利德','瓦伦西亚','马德里','巴塞罗那'],
  AR: ['拉里奥哈','圣罗莎','罗萨里奥','科尔多瓦','布宜诺斯艾利斯'],
  ZA: ['纽卡斯尔','金伯利','布隆方丹','德班','约翰内斯堡','开普敦'],
  KE: ['基塔莱','卡卡梅加','纳库鲁','蒙巴萨','内罗毕'],
  AE: ['乌姆盖万','富查伊拉','阿治曼','沙迦','阿布扎比','迪拜'],
  SG: ['裕廊西','兀兰','淡滨尼','碧山','乌节','滨海湾'],
  HK: ['天水围','屯门','荃湾','沙田','九龙站','山顶'],
  TW: ['台东','斗六','嘉义','台中','新竹','台北'],
  MO: ['筷子基','青洲','黑沙环','氹仔','路环','路氹'],
  MC: ['拉康达米讷','丰维耶','摩纳哥城','蒙特卡洛'],
  VA: ['城墙边','梵蒂冈城','圣彼得广场一带'],
  QA: ['艾尔豪尔','沃克拉','赖扬','多哈','卢赛尔'],
  SA: ['艾卜哈','塔伊夫','达曼','吉达','利雅得']
};

function storyIndex(seed, length) {
  return Math.floor(seed * length / 4294967296);
}

function storyCity(place, tier, seed) {
  const tierPool = tierCityPools[place.id]?.[tier];
  if (tierPool) return tierPool[storyIndex(seed, tierPool.length)];

  const localPool = regionalCityPools[place.id];
  const choices = localPool ?? cityData[place.id] ?? [place.city];
  const position = localPool ? tier / 4 : (4 - tier) / 4;
  const base = Math.round(position * (choices.length - 1));
  const spread = choices.length > 5 ? 1 : 0;
  const options = choices.slice(Math.max(0, base - spread), base + spread + 1);
  const city = options[storyIndex(seed, options.length)];
  return city.startsWith('城墙') ? place.name + city : city;
}

function mixStorySeed(seed, salt) {
  let value = (seed ^ salt) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x21f0aaad);
  value = Math.imul(value ^ (value >>> 15), 0x735a2d97);
  return (value ^ (value >>> 15)) >>> 0;
}

function storyChoice(items, seed, salt) {
  return items[storyIndex(mixStorySeed(seed, salt), items.length)];
}

function lifeStory(place, household, seed) {
  const tier = classes.indexOf(household);
  const city = storyCity(place, tier, seed);
  const authored = place.id === 'CN' ? chinaCityStories[city] : undefined;
  if (authored) return { city, beats:authored };

  const [localGift, venue, destination] = cityDetails[place.id + '/' + city] ?? localAtlas[place.id];
  let placeSalt = 0;
  for (const char of place.id + '/' + city) {
    placeSalt = (Math.imul(placeSalt, 31) + char.codePointAt(0)) | 0;
  }
  const episodeSeed = mixStorySeed(seed, placeSalt ^ Math.imul(tier + 1, 0x9e3779b1));
  const denmark = place.id === 'DK';
  const gift = denmark ? storyChoice(danishGifts, episodeSeed, 0x6ab91f35) : localGift;
  const routes = denmark ? danishRoutes[tier] : regionalRoutes[tier];
  const [peak, endings] = storyChoice(routes, episodeSeed, 0x8daf53c7);
  const birth = storyChoice(regionalBirths[tier], episodeSeed, 0x26a931e1);
  const ending = storyChoice(endings, episodeSeed, 0x4ca12a55);
  const fields = { gift, venue, destination };
  const fill = text => text.replace(/\{(gift|venue|destination)\}/g, (_, key) => fields[key]);
  const line = storyChoice([
    '档案从' + city + '开始。接下来的事，连本人都猜不到。',
    '从' + city + '出发，计划写了一页，意外写了三页。',
    '出生地确认了。至于这一辈子怎么过，请当事人继续往下看。'
  ], episodeSeed, 0xa5d7c3ea);

  return {
    city,
    line,
    beats:['你刚在' + place.name + '出生，' + fill(birth), fill(peak), fill(ending)]
  };
}
