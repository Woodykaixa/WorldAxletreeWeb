export type Side = {
  /** 中文全称 */
  name: string;
  /** 英文全称 */
  nameEn: string;
  /** 英文缩写 */
  nameEnAbbr: string;
  /** 阵营图标 */
  icon: Partial<{
    x128: string;
  }>;

  /** 阵营简介 */
  description: string[];
};

export const NACSF: Side = {
  name: '北美联合打击力量',
  nameEn: 'Northern American Coalition Strike Force',
  nameEnAbbr: 'NACSF',
  icon: {
    x128: '/assets/LOGO_NACSF.png',
  },
  description: [
    '北美联合打击力量成立于2021年，即北约解散后一年。是一个美国用于取代北约进行活动的军事联盟。CSF被用于对抗日益强大的远东合作组织以及欧洲联邦，而当俄罗斯摆脱了经济受限的枷锁后，北美联合打击力量感受到了前所未有的严峻形势。',
    '然而，美国依旧是拥有世界上最强大军队的国家。',
    '相较于其他仍然停留在过去水平的军事力量，北美联合打击力量依靠美国已经高度信息化的作战部队可以在战场上获得战略战术上的压倒性信息优势。在美国2022年正式成立太空军军种后，美国在太空和近地轨道武器上的经费投入逐年增加以用来应对老牌对手欧洲、中国与重新崛起的由俄罗斯主导的独联体国家联合部队。“权杖”全球打击系统（Scepter Global Strike System），作为北美全球战略武器网络的重要组成部分，是带给美国在新一轮太空军备竞赛中取得了绝对优势的最耀眼的成果结晶。该系统由虹（Regenbogen）提出构想并完成70%的实体部件，旨在以高精度动能武器逐渐替换核武器这种包含大量不稳定因素的战略武器，全系统由9个观测卫星和3个发射卫星构成。由美军自主研发而得的另一先进战术辅助系统，现实增强辅助系统（Enhanced Reality System），安装于18台多普勒Ⅲ型卫星，可在战术范围内为地面部队提供弹道辅助，标记目标等功能，使部队只需要按照计算结果进行快速反应。',
  ],
};

export const CISUF: Side = {
  name: '独联体国家联合部队',
  nameEn: 'Commonwealth of Independent States United Force',
  nameEnAbbr: 'CISUF',
  icon: {
    x128: '/assets/LOGO_CISUF.png',
  },
  description: [
    '第六次中东战争之后，俄罗斯成功脱离了美国对其的经济制裁，并且一跃成为了世界最大的石油和天然气供应商，在经历了一个经济高速发展的阶段后，通过其间赚取的财富，其军事实力再次达到了冷战后的顶峰，多极化的世界格局给了俄罗斯更多机会重新崛起。',
    '在北约解体之后，出于对自身安全的考虑，摩尔达维亚，乌克兰，白俄罗斯等独联体国家开始向俄罗斯示好，俄罗斯承诺保证几国的军事安全，而原本就与俄亲善的独联体其余国家更是与俄展开了全面的军事合作。2021年末，CISUF组建。',
    '从经验和实力来说，俄罗斯武装力量是世界上最强大的部队，无出其右，试图与这支久经大量地域性冲突考验的老兵们组成的队伍抗衡是极其不明智的，虽然在技术领域方面俄罗斯略逊于西方国家一筹，但是不能否认俄罗斯开发的武器是最迎合战争需求的，他们精于改造现有的装备而不是花费无意义的金钱和时间去开发新式装备，因此他们总能创造出即使是最初设计者也没法想到的密布多种设备的载具。',
    '由于俄罗斯人力资源匮乏，CISUF虽然以俄罗斯军队为主干，但是人数上仍旧以乌克兰等东欧加盟国为主。这些加盟国军队由俄罗斯提供先进实用的军事装备和训练，有着不亚于俄罗斯陆军的战斗力。',
  ],
};

export const RITC: Side = {
  name: '虹',
  nameEn: 'Regenbogen',
  nameEnAbbr: 'RITC',
  icon: {
    x128: '/assets/LOGO_RITC.png',
  },
  description: ['尚未获得足够情报。'],
};

export const EFRRF: Side = {
  name: '欧洲联邦快速反应部队',
  nameEn: 'European Federation Rapid Response Force',
  nameEnAbbr: 'EFRRF',
  icon: {},
  description: [
    '随着欧洲自主意识的逐渐加强，欧洲不愿再以类似美国的仆从国的角色出现在国际政治舞台。然而，这与美国作为世界唯一霸主的目标相悖，二者矛盾从经济、政治等各方面逐渐深化，北约这一组织的解体已成必然趋势。',
    '2020年7月，德国因反对美国的军事扩张政策而率先退出北约，随后，法国、英国等国也相继宣布退出。9月，北约宣布解体。',
    '之后便如滚雪球一般，英国首先公投退出欧盟，苏格兰随之脱英继续留在欧盟，然而随后希腊荷兰等国也陆续退欧，2017年初，德国宣布退出欧盟，标志着欧盟正式解体，接着由法德两国联合其余欧洲国家，包括独立的苏格兰共同签署了一个新的文件，成立欧洲联邦，与前欧盟不同，该文件使得所有签署的欧洲国家在未来根除恐怖主义的战争中无条件站在同一战线，并且从各国挑选精英成立了专司内部反恐的危机处理小组（Crisis Management Team）和在国际舞台上扮演反恐力量的快速反应部队（Rapid Response Force）作为直属武力。',
    'CMT和RRF有权使用全欧洲最强大的常规武力，精通于室内战斗，解救人质，劫机处理，要塞攻击，到专门的狙击行动，甚至拷问，内容相当广泛。',
    '尽管常常被称为欧盟的进化版本，实际上欧洲联邦的情况更为复杂，因为繁琐的体制已经彻底将整个欧洲联邦成员国连为一体，也凭借与此，欧洲经济以及军事力量重新开始复兴。',
  ],
};

export const FECO: Side = {
  name: '远东合作组织',
  nameEn: 'Far East Cooperation Organization',
  nameEnAbbr: 'FECO',
  icon: {},
  description: [
    '在第六次中东战争后，由于长期在海外投入过多的兵力以及美国本土的经济衰退，美国逐渐无法承受长期在亚太地区部署军队所消耗的人力财力物力。伴随着东南亚各国经济再次腾飞，美国实质上已经失去了长期对远东地区的控制权，而将整个远东地区拱手送给了中国，而中国对周边国家提出的远东合作组织是从单纯的军事合作进化到了经济军事政治合作，相对于美国暧昧的态度，中国的态度明显更亲切。于是，当中国提出组建远东合作组织时多数东南亚国家都对此表示愿意加入。',
    '亚太地区在进入新世纪以来一直是一个重点战略地区，为了保证好不容易获得的优势，中国一直推动与东南亚的合作关系，并且试图签订新的战略安保条约。',
    '远东合作组织的宗旨是对任何战争进行“有限干预”，限度则由各成员国投票表决，而投票权重按照该国在FECO中所占有的投入比重决定，少于2/3，则协议不通过。中国占有36%左右的比重，日本20%，韩国12%。',
    '虽然在2015年之后中国经历了多次裁军成功将军队规模降低到了顶峰时期的56%，但是中国依然拥有世界上规模最庞大的军队，然而实际上中国一直发扬着兵贵在精而不在多的理念，中国在无人机领域的技术研发已经远远超过了其他国家，他们拥有世界上最多的无人机，并且无人机的实际运用水平也相当成熟，这得益于中国敢于在军事领域投入巨量的研究经费。中国的无人机技术已经覆盖了几乎所有的坦克，战机，战舰，这毫无疑问是一支及其先进的现代化军队，改写了以往“中国制造=廉价”印象，除此之外，中国的信息战能力也是全球首屈一指的。',
  ],
};

export const WaSides = [NACSF, CISUF, EFRRF, FECO, RITC] as const;
export const ImplementedSides = [NACSF, CISUF, RITC] as const;
export const WipSides = [EFRRF, FECO] as const;