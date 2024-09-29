/**
 * Artifacts 圣遗物部位
 */
const Artifacts = [
    {
        id: 'FlowerOfLife',
        name: '生之花',
        mainList: [
            {
                id: 'HealthFlat',
                display: '生命值',
                percentage: false,
                suffix: ''
            },
        ]
    },
    {
        id: 'PlumeOfDeath',
        name: '死之羽',
        mainList: [
            {
                id: 'AttackFlat',
                display: '攻击力',
                percentage: false,
                suffix: ''
            },
        ]
    },
    {
        id: 'SandsOfEon',
        name: '时之沙',
        mainList: [
            {
                id: 'Attack',
                display: '攻击力',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'EnergyRecharge',
                display: '元素充能效率',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'ElementalMastery',
                display: '元素精通',
                percentage: false,
                suffix: ''
            },
            {
                id: 'Defense',
                display: '防御力',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'Health',
                display: '生命值',
                percentage: true,
                suffix: '%'
            }
        ]
    },
    {
        id: 'GobletOfEonothem',
        name: '空之杯',
        mainList: [
            {
                id: 'Attack',
                display: '攻击力',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'ElementalMastery',
                display: '元素精通',
                percentage: false,
                suffix: ''
            },
            {
                id: 'Defense',
                display: '防御力',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'Health',
                display: '生命值',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'DendroDamage',
                display: '草元素伤害加成',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'ElectroDamage',
                display: '雷元素伤害加成',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'AnemoDamage',
                display: '风元素伤害加成',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'GeoDamage',
                display: '岩元素伤害加成',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'PyroDamage',
                display: '火元素伤害加成',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'HydroDamage',
                display: '水元素伤害加成',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'CryoDamage',
                display: '冰元素伤害加成',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'PhysicalDamage',
                display: '物理伤害加成',
                percentage: true,
                suffix: '%'
            }
        ]
    },
    {
        id: 'CircletOfLogos',
        name: '理之冠',
        mainList: [
            {
                id: 'Attack',
                display: '攻击力',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'ElementalMastery',
                display: '元素精通',
                percentage: false,
                suffix: ''
            },
            {
                id: 'Defense',
                display: '防御力',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'Health',
                display: '生命值',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'CriticalRate',
                display: '暴击率',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'CriticalDamage',
                display: '暴击伤害',
                percentage: true,
                suffix: '%'
            },
            {
                id: 'AdditionalHealing',
                display: '治疗加成',
                percentage: true,
                suffix: '%'
            }
        ]
    },
]

/**
 * viceList 副词条列表
 */
const viceList = [
    {
        id: 'CriticalRate',
        display: '暴击率',
        option: '暴击率',
        percentage: true,
        suffix: '%'
    },
    {
        id: 'CriticalDamage',
        display: '暴击伤害',
        option: '暴击伤害',
        percentage: true,
        suffix: '%'
    },
    {
        id: 'Attack',
        display: '攻击力',
        option: '攻击力',
        percentage: true,
        suffix: '%'
    },
    {
        id: 'ElementalMastery',
        display: '元素精通',
        option: '元素精通',
        percentage: false,
        suffix: ''
    },
    {
        id: 'Health',
        display: '生命值',
        option: '生命值',
        percentage: true,
        suffix: '%'
    },
    {
        id: 'Defense',
        display: '防御力',
        option: '防御力',
        percentage: true,
        suffix: '%'
    },
    {
        id: 'EnergyRecharge',
        display: '元素充能效率',
        option: '元素充能效率',
        percentage: true,
        suffix: '%'
    },
    {
        id: 'AttackFlat',
        display: '攻击力',
        option: '小攻击',
        percentage: false,
        suffix: ''
    },
    {
        id: 'HealthFlat',
        display: '生命值',
        option: '小生命',
        percentage: false,
        suffix: ''
    },
    {
        id: 'DefenseFlat',
        display: '防御力',
        option: '小防御',
        percentage: false,
        suffix: ''
    }
]

/**
 * viceUpData 副词条升级数据
 */
const viceUpData = {
    HealthFlat: {
        id: '小生命',
        name: '生命值',
        data: [209.13, 239.0, 268.88, 298.75]
    },
    Health: {
        id: '大生命',
        name: '生命值',
        data: [4.08, 4.66, 5.25, 5.83,]
    },
    AttackFlat: {
        id: '小攻击',
        name: '攻击力',
        data: [13.62, 15.56, 17.51, 19.45]
    },
    Attack: {
        id: '大攻击',
        name: '攻击力',
        data: [4.08, 4.66, 5.25, 5.83]
    },
    DefenseFlat: {
        id: '小防御',
        name: '防御力',
        data: [16.2, 18.52, 20.83, 23.15]
    },
    Defense: {
        id: '大防御',
        name: '防御力',
        data: [5.1, 5.83, 6.56, 7.29]
    },
    EnergyRecharge: {
        id: '元素充能效率',
        name: '元素充能效率',
        data: [4.53, 5.18, 5.83, 6.48]
    },
    ElementalMastery: {
        id: '元素精通',
        name: '元素精通',
        data: [16.32, 18.65, 20.98, 23.31]
    },
    CriticalRate: {
        id: '暴击率',
        name: '暴击率',
        data: [2.72, 3.11, 3.5, 3.89]
    },
    CriticalDamage: {
        id: '暴击伤害',
        name: '暴击伤害',
        data: [5.44, 6.22, 6.99, 7.77]
    },
}

/**
 * mainUpData 主词条升级数据
 */
const mainUpData = {
    Health: {
        id: '大生命',
        name: '生命值',
        percentage: true,
        data: [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6]
    },
    Attack: {
        id: '大攻击',
        name: '攻击力',
        percentage: true,
        data: [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6]
    },
    Defense: {
        id: '大防御',
        name: '防御力',
        percentage: true,
        data: [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31.0, 33.5, 36.0, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3]
    },
    EnergyRecharge: {
        id: '元素充能效率',
        name: '元素充能效率',
        percentage: true,
        data: [7.8, 10.0, 12.2, 14.4, 16.6, 18.8, 21.0, 23.2, 25.4, 27.6, 29.8, 32.0, 34.2, 36.4, 38.6, 40.8, 43.0, 45.2, 47.4, 49.6, 51.8]
    },
    ElementalMastery: {
        id: '元素精通',
        name: '元素精通',
        percentage: false,
        data: [28.0, 35.9, 43.8, 51.8, 59.7, 67.6, 75.5, 83.5, 91.4, 99.3, 107.2, 115.2, 123.1, 131.0, 138.9, 146.9, 154.8, 162.7, 170.6, 178.6, 186.5]
    },
    AttackFlat: {
        id: '小攻击',
        name: '攻击力',
        percentage: false,
        data: [47.0, 60.0, 73.0, 86.0, 100.0, 113.0, 126.0, 139.0, 152.0, 166.0, 179.0, 192.0, 205.0, 219.0, 232.0, 245.0, 258.0, 272.0, 285.0, 298.0, 311.0]
    },
    CriticalRate: {
        id: '暴击率',
        name: '暴击率',
        percentage: true,
        data: [4.7, 6.0, 7.3, 8.6, 9.9, 11.3, 12.6, 13.9, 15.2, 16.6, 17.9, 19.2, 20.5, 21.8, 23.2, 24.5, 25.8, 27.1, 28.4, 29.8, 31.1]
    },
    CriticalDamage: {
        id: '暴击伤害',
        name: '暴击伤害',
        percentage: true,
        data: [9.3, 12.0, 14.6, 17.3, 19.9, 22.5, 25.2, 27.8, 30.5, 33.1, 35.7, 38.4, 41.0, 43.7, 46.3, 49.0, 51.6, 54.2, 56.9, 59.5, 62.2,]
    },
    AdditionalHealing: {
        id: '治疗加成',
        name: '治疗加成',
        percentage: true,
        data: [5.4, 6.9, 8.4, 10.0, 11.5, 13.0, 14.5, 16.1, 17.6, 19.1, 20.6, 22.1, 23.7, 25.2, 26.7, 28.2, 29.8, 31.3, 32.8, 34.3, 35.9]
    },
    HealthFlat: {
        id: '小生命',
        name: '生命值',
        percentage: false,
        data: [717.0, 920.0, 1123.0, 1326.0, 1530.0, 1733.0, 1936.0, 2139.0, 2342.0, 2545.0, 2749.0, 2952.0, 3155.0, 3358.0, 3561.0, 3764.0, 3967.0, 4171.0, 4374.0, 4577.0, 4780.0]
    },
    PyroDamage: {
        id: '火元素伤害加成',
        name: '火元素伤害加成',
        percentage: true,
        data: [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6]
    },
    ElectroDamage: {
        id: '雷元素伤害加成',
        name: '雷元素伤害加成',
        percentage: true,
        data: [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6]
    },
    CryoDamage: {
        id: '冰元素伤害加成',
        name: '冰元素伤害加成',
        percentage: true,
        data: [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6]
    },
    HydroDamage: {
        id: '水元素伤害加成',
        name: '水元素伤害加成',
        percentage: true,
        data: [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6]
    },
    AnemoDamage: {
        id: '风元素伤害加成',
        name: '风元素伤害加成',
        percentage: true,
        data: [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6]
    },
    GeoDamage: {
        id: '岩元素伤害加成',
        name: '岩元素伤害加成',
        percentage: true,
        data: [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6]
    },
    DendroDamage: {
        id: '草元素伤害加成',
        name: '草元素伤害加成',
        percentage: true,
        data: [7.0, 9.0, 11.0, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6]
    },
    PhysicalDamage: {
        id: '物理伤害加成',
        name: '物理伤害加成',
        percentage: true,
        data: [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31.0, 33.5, 36.0, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3]
    },
}
/**
 * ArtifactsDomains 圣遗物副本
 */
const ArtifactsDomains = [
    {
        name: '仲夏庭园',
        alias: [
            '雷本',
            '雷套',
            '如雷',
            '平雷',
            '如雷的盛怒',
            '平息鸣雷的尊者',
            '仲夏庭园'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '雷鸟的怜悯',
                    '平雷之心'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/如雷的盛怒/1.webp',
                    'plugins/xiaoye-plugin/resources/img/平息鸣雷的尊者/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '雷灾的孑遗',
                    '平雷之羽'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/如雷的盛怒/2.webp',
                    'plugins/xiaoye-plugin/resources/img/平息鸣雷的尊者/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '雷霆的时计',
                    '平雷之刻'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/如雷的盛怒/3.webp',
                    'plugins/xiaoye-plugin/resources/img/平息鸣雷的尊者/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '降雷的凶兆',
                    '平雷之器'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/如雷的盛怒/4.webp',
                    'plugins/xiaoye-plugin/resources/img/平息鸣雷的尊者/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '唤雷的头冠',
                    '平雷之冠'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/如雷的盛怒/5.webp',
                    'plugins/xiaoye-plugin/resources/img/平息鸣雷的尊者/5.webp'
                ]
            }
        }
    },
    {
        name: '铭记之谷',
        alias: [
            '风本',
            '少女',
            '风套',
            '翠绿之影',
            '被怜爱的少女',
            '铭记之谷'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '野花记忆的绿野',
                    '远方的少女之心'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/翠绿之影/1.webp',
                    'plugins/xiaoye-plugin/resources/img/被怜爱的少女/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '猎人青翠的箭羽',
                    '少女飘摇的思念'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/翠绿之影/2.webp',
                    'plugins/xiaoye-plugin/resources/img/被怜爱的少女/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '翠绿猎人的笃定',
                    '少女苦短的良辰'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/翠绿之影/3.webp',
                    'plugins/xiaoye-plugin/resources/img/被怜爱的少女/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '翠绿猎人的容器',
                    '少女片刻的闲暇'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/翠绿之影/4.webp',
                    'plugins/xiaoye-plugin/resources/img/被怜爱的少女/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '翠绿的猎人之冠',
                    '少女易逝的芳颜'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/翠绿之影/5.webp',
                    'plugins/xiaoye-plugin/resources/img/被怜爱的少女/5.webp'
                ]
            }
        }
    },
    {
        name: '孤云凌霄之处',
        alias: [
            '岩本',
            '岩套',
            '磐岩',
            '流星',
            '逆飞的流星',
            '悠古的磐岩',
            '孤云凌霄之处'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '磐陀裂生之花',
                    '夏祭之花'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/悠古的磐岩/1.webp',
                    'plugins/xiaoye-plugin/resources/img/逆飞的流星/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '嵯峨群峰之翼',
                    '夏祭终末'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/悠古的磐岩/2.webp',
                    'plugins/xiaoye-plugin/resources/img/逆飞的流星/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '星罗圭璧之晷',
                    '夏祭之刻'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/悠古的磐岩/3.webp',
                    'plugins/xiaoye-plugin/resources/img/逆飞的流星/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '巉岩琢塑之樽',
                    '夏祭水玉'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/悠古的磐岩/4.webp',
                    'plugins/xiaoye-plugin/resources/img/逆飞的流星/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '不动玄石之相',
                    '夏祭之面'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/悠古的磐岩/5.webp',
                    'plugins/xiaoye-plugin/resources/img/逆飞的流星/5.webp'
                ]
            }
        }
    },
    {
        name: '无妄引咎密宫',
        alias: [
            '火本',
            '火套',
            '魔女',
            '渡火',
            '炽烈的炎之魔女',
            '渡过烈火的贤人',
            '无妄引咎密宫'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '魔女的炎之花',
                    '渡火者的决绝'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/炽烈的炎之魔女/1.webp',
                    'plugins/xiaoye-plugin/resources/img/渡过烈火的贤人/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '魔女常燃之羽',
                    '渡火者的解脱'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/炽烈的炎之魔女/2.webp',
                    'plugins/xiaoye-plugin/resources/img/渡过烈火的贤人/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '魔女破灭之时',
                    '渡火者的煎熬'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/炽烈的炎之魔女/3.webp',
                    'plugins/xiaoye-plugin/resources/img/渡过烈火的贤人/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '魔女的心之火',
                    '渡火者的醒悟'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/炽烈的炎之魔女/4.webp',
                    'plugins/xiaoye-plugin/resources/img/渡过烈火的贤人/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '焦灼的魔女帽',
                    '渡火者的智慧'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/炽烈的炎之魔女/5.webp',
                    'plugins/xiaoye-plugin/resources/img/渡过烈火的贤人/5.webp'
                ]
            }
        }
    },
    {
        name: '华池岩岫',
        alias: [
            '骑士',
            '宗室',
            '骑士染血之时',
            '昔日宗室之仪',
            '华池岩岫'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '染血的铁之心',
                    '宗室之花'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/染血的骑士道/1.webp',
                    'plugins/xiaoye-plugin/resources/img/昔日宗室之仪/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '染血的黑之羽',
                    '宗室之翎'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/染血的骑士道/2.webp',
                    'plugins/xiaoye-plugin/resources/img/昔日宗室之仪/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '骑士染血之时',
                    '宗室时计'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/染血的骑士道/3.webp',
                    'plugins/xiaoye-plugin/resources/img/昔日宗室之仪/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '染血骑士之杯',
                    '宗室银瓮'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/染血的骑士道/4.webp',
                    'plugins/xiaoye-plugin/resources/img/昔日宗室之仪/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '染血的铁假面',
                    '宗室面具'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/染血的骑士道/5.webp',
                    'plugins/xiaoye-plugin/resources/img/昔日宗室之仪/5.webp'
                ]
            }
        }
    },
    {
        name: '芬德尼尔之顶',
        alias: [
            '冰本',
            '水本',
            '冰套',
            '水套',
            '冰风迷途的勇士',
            '沉沦之心',
            '芬德尼尔之顶'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '历经风雪的思念',
                    '饰金胸花'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/冰风迷途的勇士/1.webp',
                    'plugins/xiaoye-plugin/resources/img/沉沦之心/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '摧冰而行的执望',
                    '追忆之风'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/冰风迷途的勇士/2.webp',
                    'plugins/xiaoye-plugin/resources/img/沉沦之心/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '冰雪故园的终期',
                    '坚铜罗盘'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/冰风迷途的勇士/3.webp',
                    'plugins/xiaoye-plugin/resources/img/沉沦之心/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '遍结寒霜的傲骨',
                    '沉波之盏'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/冰风迷途的勇士/4.webp',
                    'plugins/xiaoye-plugin/resources/img/沉沦之心/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '破冰踏雪的回音',
                    '酒渍船帽'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/冰风迷途的勇士/5.webp',
                    'plugins/xiaoye-plugin/resources/img/沉沦之心/5.webp'
                ]
            }
        }
    },
    {
        name: '山脊守望',
        alias: [
            '千岩',
            '苍白',
            '千岩牢固',
            '苍白之火',
            '山脊守望'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '勋绩之花',
                    '无垢之花'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/千岩牢固/1.webp',
                    'plugins/xiaoye-plugin/resources/img/苍白之火/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '昭武翎羽',
                    '贤医之羽'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/千岩牢固/2.webp',
                    'plugins/xiaoye-plugin/resources/img/苍白之火/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '金铜时晷',
                    '停摆之刻'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/千岩牢固/3.webp',
                    'plugins/xiaoye-plugin/resources/img/苍白之火/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '盟誓金爵',
                    '超越之盏'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/千岩牢固/4.webp',
                    'plugins/xiaoye-plugin/resources/img/苍白之火/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '将帅兜鍪',
                    '嗤笑之面'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/千岩牢固/5.webp',
                    'plugins/xiaoye-plugin/resources/img/苍白之火/5.webp'
                ]
            }
        }
    },
    {
        name: '椛染之庭',
        alias: [
            '绝缘',
            '追忆',
            '绝缘之旗印',
            '追忆之注连',
            '椛染之庭'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '明威之镡',
                    '羁缠之花'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/绝缘之旗印/1.webp',
                    'plugins/xiaoye-plugin/resources/img/追忆之注连/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '切落之羽',
                    '思忆之矢'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/绝缘之旗印/2.webp',
                    'plugins/xiaoye-plugin/resources/img/追忆之注连/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '雷云之笼',
                    '朝露之时'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/绝缘之旗印/3.webp',
                    'plugins/xiaoye-plugin/resources/img/追忆之注连/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '绯花之壶',
                    '祈望之心'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/绝缘之旗印/4.webp',
                    'plugins/xiaoye-plugin/resources/img/追忆之注连/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '华饰之兜',
                    '无常之面'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/绝缘之旗印/5.webp',
                    'plugins/xiaoye-plugin/resources/img/追忆之注连/5.webp'
                ]
            }
        }
    },
    {
        name: '沉眠之庭',
        alias: [
            '华冠',
            '华馆',
            '海染',
            '华馆梦醒形骸记',
            '海染砗磲',
            '沉眠之庭'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '荣花之期',
                    '海染之花'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/华馆梦醒形骸记/1.webp',
                    'plugins/xiaoye-plugin/resources/img/海染砗磲/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '华馆之羽',
                    '渊宫之羽'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/华馆梦醒形骸记/2.webp',
                    'plugins/xiaoye-plugin/resources/img/海染砗磲/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '众生之谣',
                    '离别之贝'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/华馆梦醒形骸记/3.webp',
                    'plugins/xiaoye-plugin/resources/img/海染砗磲/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '梦醒之瓢',
                    '真珠之笼'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/华馆梦醒形骸记/4.webp',
                    'plugins/xiaoye-plugin/resources/img/海染砗磲/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '形骸之笠',
                    '海祇之冠'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/华馆梦醒形骸记/5.webp',
                    'plugins/xiaoye-plugin/resources/img/海染砗磲/5.webp'
                ]
            }
        }
    },
    {
        name: '岩中幽谷',
        alias: [
            '辰砂',
            '余响',
            '辰砂往生录',
            '来歆余响',
            '岩中幽谷'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '生灵之华',
                    '魂香之花'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/辰砂往生录/1.webp',
                    'plugins/xiaoye-plugin/resources/img/来歆余响/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '潜光片羽',
                    '垂玉之叶'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/辰砂往生录/2.webp',
                    'plugins/xiaoye-plugin/resources/img/来歆余响/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '阳辔之遗',
                    '祝祀之凭'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/辰砂往生录/3.webp',
                    'plugins/xiaoye-plugin/resources/img/来歆余响/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '结契之刻',
                    '涌泉之盏'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/辰砂往生录/4.webp',
                    'plugins/xiaoye-plugin/resources/img/来歆余响/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '虺雷之姿',
                    '浮溯之珏'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/辰砂往生录/5.webp',
                    'plugins/xiaoye-plugin/resources/img/来歆余响/5.webp'
                ]
            }
        }
    },
    {
        name: '缘觉塔',
        alias: [
            '草本',
            '草套',
            '深林',
            '饰金',
            '深林的记忆',
            '饰金之梦',
            '缘觉塔'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '迷宫的游人',
                    '梦中的铁花'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/深林的记忆/1.webp',
                    'plugins/xiaoye-plugin/resources/img/饰金之梦/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '翠蔓的智者',
                    '裁断的翎羽'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/深林的记忆/2.webp',
                    'plugins/xiaoye-plugin/resources/img/饰金之梦/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '贤智的定期',
                    '沉金的岁月'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/深林的记忆/3.webp',
                    'plugins/xiaoye-plugin/resources/img/饰金之梦/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '迷误者之灯',
                    '如蜜的终宴'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/深林的记忆/4.webp',
                    'plugins/xiaoye-plugin/resources/img/饰金之梦/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '月桂的宝冠',
                    '沙王的投影'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/深林的记忆/5.webp',
                    'plugins/xiaoye-plugin/resources/img/饰金之梦/5.webp'
                ]
            }
        }
    },
    {
        name: '赤金的城墟',
        alias: [
            '楼阁',
            '乐园',
            '沙上楼阁史话',
            '乐园遗落之花',
            '赤金的城墟'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '月女的华彩',
                    '众王之都的开端'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/乐园遗落之花/1.webp',
                    'plugins/xiaoye-plugin/resources/img/沙上楼阁史话/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '谢落的筵席',
                    '黄金邦国的结末'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/乐园遗落之花/2.webp',
                    'plugins/xiaoye-plugin/resources/img/沙上楼阁史话/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '凝结的时刻',
                    '迷醉长梦的守护'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/乐园遗落之花/3.webp',
                    'plugins/xiaoye-plugin/resources/img/沙上楼阁史话/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '守秘的魔瓶',
                    '失落迷途的机芯'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/乐园遗落之花/4.webp',
                    'plugins/xiaoye-plugin/resources/img/沙上楼阁史话/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '紫晶的花冠',
                    '流沙贵嗣的遗宝'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/乐园遗落之花/5.webp',
                    'plugins/xiaoye-plugin/resources/img/沙上楼阁史话/5.webp'
                ]
            }
        }
    },
    {
        name: '熔铁的孤塞',
        alias: [
            "水仙",
            "新水套",
            "花海",
            "甘露",
            "水仙之梦",
            "花海甘露之光",
            "熔铁的孤塞"
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    "旅途中的鲜花",
                    "灵光源起之蕊"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/水仙之梦/1.webp",
                    "plugins/xiaoye-plugin/resources/img/花海甘露之光/1.webp"
                ]
            },
            PlumeOfDeath: {
                name: [
                    "坏巫师的羽杖",
                    "琦色灵彩之羽"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/水仙之梦/2.webp",
                    "plugins/xiaoye-plugin/resources/img/花海甘露之光/2.webp"
                ]
            },
            SandsOfEon: {
                name: [
                    "水仙的时时刻刻",
                    "久远花落之时"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/水仙之梦/3.webp",
                    "plugins/xiaoye-plugin/resources/img/花海甘露之光/3.webp"
                ]
            },
            GobletOfEonothem: {
                name: [
                    "勇者们的茶会",
                    "无边酣乐之筵"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/水仙之梦/4.webp",
                    "plugins/xiaoye-plugin/resources/img/花海甘露之光/4.webp"
                ]
            },
            CircletOfLogos: {
                name: [
                    "恶龙的单片镜",
                    "灵光明烁之心"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/水仙之梦/5.webp",
                    "plugins/xiaoye-plugin/resources/img/花海甘露之光/5.webp"
                ]
            }
        }
    },
    {
        name: '罪祸的终末',
        alias: [
            "逐影猎人",
            "黄金剧团",
            "逐影",
            "猎人",
            "黄金",
            "剧团",
            "罪祸的终末"
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    "猎人的胸花",
                    "黄金乐曲的变奏"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/逐影猎人/1.webp",
                    "plugins/xiaoye-plugin/resources/img/黄金剧团/1.webp"
                ]
            },
            PlumeOfDeath: {
                name: [
                    "杰作的序曲",
                    "黄金飞鸟的落羽"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/逐影猎人/2.webp",
                    "plugins/xiaoye-plugin/resources/img/黄金剧团/2.webp"
                ]
            },
            SandsOfEon: {
                name: [
                    "裁判的时刻",
                    "黄金时代的先声"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/逐影猎人/3.webp",
                    "plugins/xiaoye-plugin/resources/img/黄金剧团/3.webp"
                ]
            },
            GobletOfEonothem: {
                name: [
                    "遗忘的容器",
                    "黄金之夜的喧嚣"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/逐影猎人/4.webp",
                    "plugins/xiaoye-plugin/resources/img/黄金剧团/4.webp"
                ]
            },
            CircletOfLogos: {
                name: [
                    "老兵的容颜",
                    "黄金剧团的奖赏"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/逐影猎人/5.webp",
                    "plugins/xiaoye-plugin/resources/img/黄金剧团/5.webp"
                ]
            }
        }
    },
    {
        name: '临瀑之城',
        alias: [
            "昔时之歌",
            "回声之林夜话",
            "昔时",
            "回声",
            "回声之林",
            "临瀑之城"
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    "昔时遗落之誓",
                    "无私的妆饰花"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/昔时之歌/1.webp",
                    "plugins/xiaoye-plugin/resources/img/回声之林夜话/1.webp"
                ]
            },
            PlumeOfDeath: {
                name: [
                    "昔时浮想之思",
                    "诚恳的蘸水笔"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/昔时之歌/2.webp",
                    "plugins/xiaoye-plugin/resources/img/回声之林夜话/2.webp"
                ]
            },
            SandsOfEon: {
                name: [
                    "昔时回映之音",
                    "忠实的砂时计"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/昔时之歌/3.webp",
                    "plugins/xiaoye-plugin/resources/img/回声之林夜话/3.webp"
                ]
            },
            GobletOfEonothem: {
                name: [
                    "昔时应许之梦",
                    "慷慨的墨水瓶"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/昔时之歌/4.webp",
                    "plugins/xiaoye-plugin/resources/img/回声之林夜话/4.webp"
                ]
            },
            CircletOfLogos: {
                name: [
                    "昔时传奏之诗",
                    "慈爱的淑女帽"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/昔时之歌/5.webp",
                    "plugins/xiaoye-plugin/resources/img/回声之林夜话/5.webp"
                ]
            }
        }
    },
    {
        name: '褪色的剧场',
        alias: [
            "谐律异想断章",
            "未竟的遐思",
            "谐律",
            "遐思",
            "褪色的剧场"
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    "谐律交响的前奏",
                    "暗结的明花"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/谐律异想断章/1.webp",
                    "plugins/xiaoye-plugin/resources/img/未竟的遐思/1.webp"
                ]
            },
            PlumeOfDeath: {
                name: [
                    "古海玄幽的夜想",
                    "褪光的翠尾"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/谐律异想断章/2.webp",
                    "plugins/xiaoye-plugin/resources/img/未竟的遐思/2.webp"
                ]
            },
            SandsOfEon: {
                name: [
                    "命途轮转的谐谑",
                    "举业的识刻"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/谐律异想断章/3.webp",
                    "plugins/xiaoye-plugin/resources/img/未竟的遐思/3.webp"
                ]
            },
            GobletOfEonothem: {
                name: [
                    "灵露倾洒的狂诗",
                    "筹谋的共樽"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/谐律异想断章/4.webp",
                    "plugins/xiaoye-plugin/resources/img/未竟的遐思/4.webp"
                ]
            },
            CircletOfLogos: {
                name: [
                    "异想零落的圆舞",
                    "失冕的宝冠"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/谐律异想断章/5.webp",
                    "plugins/xiaoye-plugin/resources/img/未竟的遐思/5.webp"
                ]
            }
        }
    },
    {
        name: '虹灵的净土',
        alias: [
            "烬城勇者绘卷",
            "黑曜秘典",
            "烬城",
            "秘典",
            "黑曜",
            "勇者",
            "虹灵的净土"
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    "驯兽师的护符",
                    "异种的期许"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/烬城勇者绘卷/1.webp",
                    "plugins/xiaoye-plugin/resources/img/黑曜秘典/1.webp"
                ]
            },
            PlumeOfDeath: {
                name: [
                    "巡山客的信标",
                    "灵髓的根脉"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/烬城勇者绘卷/2.webp",
                    "plugins/xiaoye-plugin/resources/img/黑曜秘典/2.webp"
                ]
            },
            SandsOfEon: {
                name: [
                    "秘术家的金盘",
                    "夜域的迷思"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/烬城勇者绘卷/3.webp",
                    "plugins/xiaoye-plugin/resources/img/黑曜秘典/3.webp"
                ]
            },
            GobletOfEonothem: {
                name: [
                    "游学者的爪杯",
                    "纷争的前宴"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/烬城勇者绘卷/4.webp",
                    "plugins/xiaoye-plugin/resources/img/黑曜秘典/4.webp"
                ]
            },
            CircletOfLogos: {
                name: [
                    "魔战士的羽面",
                    "诸圣的礼冠"
                ],
                icon: [
                    "plugins/xiaoye-plugin/resources/img/烬城勇者绘卷/5.webp",
                    "plugins/xiaoye-plugin/resources/img/黑曜秘典/5.webp"
                ]
            }
        }
    },
    {
        name: 'BOSS掉落',
        alias: [
            '乐团',
            '角斗士',
            '流浪大地的乐团',
            '角斗士的终幕礼'
        ],
        Artifacts: {
            FlowerOfLife: {
                name: [
                    '角斗士的留恋',
                    '乐团的晨光'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/角斗士的终幕礼/1.webp',
                    'plugins/xiaoye-plugin/resources/img/流浪大地的乐团/1.webp'
                ]
            },
            PlumeOfDeath: {
                name: [
                    '角斗士的归宿',
                    '琴师的箭羽'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/角斗士的终幕礼/2.webp',
                    'plugins/xiaoye-plugin/resources/img/流浪大地的乐团/2.webp'
                ]
            },
            SandsOfEon: {
                name: [
                    '角斗士的希冀',
                    '终幕的时计'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/角斗士的终幕礼/3.webp',
                    'plugins/xiaoye-plugin/resources/img/流浪大地的乐团/3.webp'
                ]
            },
            GobletOfEonothem: {
                name: [
                    '角斗士的酣醉',
                    '吟游者之壶'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/角斗士的终幕礼/4.webp',
                    'plugins/xiaoye-plugin/resources/img/流浪大地的乐团/4.webp'
                ]
            },
            CircletOfLogos: {
                name: [
                    '角斗士的凯旋',
                    '指挥的礼帽'
                ],
                icon: [
                    'plugins/xiaoye-plugin/resources/img/角斗士的终幕礼/5.webp',
                    'plugins/xiaoye-plugin/resources/img/流浪大地的乐团/5.webp'
                ]
            }
        }
    }
]

export default {
    Artifacts,
    viceList,
    viceUpData,
    mainUpData,
    ArtifactsDomains
}