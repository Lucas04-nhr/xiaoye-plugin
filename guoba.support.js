import cfg from './model/readConfig.js'
import util from './model/setUtil.js'

const Path = process.cwd();
const Plugin_Name = 'xiaoye-plugin'
const Plugin_Path = `${Path}/plugins/${Plugin_Name}`;
// 支持锅巴
export function supportGuoba() {
  return {
    // 插件信息，将会显示在前端页面
    // 如果你的插件没有在插件库里，那么需要填上补充信息
    // 如果存在的话，那么填不填就无所谓了，填了就以你的信息为准
    pluginInfo: {
      name: 'xiaoye-plugin',
      title: 'xiaoye-plugin',
      author: '@小叶',
      authorLink: 'https://gitee.com/xiaoye12123',
      link: 'https://gitee.com/xiaoye12123/xiaoye-plugin',
      isV3: true,
      isV2: false,
      description: '提供模拟刷圣遗物和强化',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'mdi:stove',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: '#d19f56',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      iconPath: `${Plugin_Path}/resources/icon.jpg`,
    },
    // 配置项信息
    configInfo: {
      // 配置项 schemas
      schemas: [
        {
          field: 'sancitiao',
          label: '三词条',
          bottomHelpMessage: '词条数量概率',
          component: 'InputNumber',
        },
        {
          field: 'sicitiao',
          label: '四词条',
          bottomHelpMessage: '词条数量概率',
          component: 'InputNumber',
        },
        {
          //分隔线
          component: 'Divider',
        },
        {
          field: 'szh',
          label: '生之花概率',
          bottomHelpMessage: '各个部位掉落概率',
          component: 'InputNumber',
        },
        {
          field: 'szy',
          label: '死之羽概率',
          bottomHelpMessage: '各个部位掉落概率',
          component: 'InputNumber',
        },
        {
          field: 'szs',
          label: '时之沙概率',
          bottomHelpMessage: '各个部位掉落概率',
          component: 'InputNumber',
        },
        {
          field: 'kzb',
          label: '空之杯概率',
          bottomHelpMessage: '各个部位掉落概率',
          component: 'InputNumber',
        },
        {
          field: 'lzg',
          label: '理之冠概率',
          bottomHelpMessage: '各个部位掉落概率',
          component: 'InputNumber',
        },
        {
          //分隔线
          component: 'Divider',
        },
        {
          field: 'szsgjl',
          label: '攻击力',
          bottomHelpMessage: '时之沙主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'szscn',
          label: '充能',
          bottomHelpMessage: '时之沙主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'szsjt',
          label: '精通',
          bottomHelpMessage: '时之沙主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'szsfyl',
          label: '防御力',
          bottomHelpMessage: '时之沙主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'szssmz',
          label: '生命值',
          bottomHelpMessage: '时之沙主词条概率',
          component: 'InputNumber',
        },
        {
          //分隔线
          component: 'Divider',
        },
        {
          field: 'kzbgjl',
          label: '攻击力',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzbjt',
          label: '精通',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzbfyl',
          label: '防御力',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzbsmz',
          label: '生命值',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzbcys',
          label: '草元素伤害加成',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzblys',
          label: '雷元素伤害加成',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzbfys',
          label: '风元素伤害加成',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzbyys',
          label: '岩元素伤害加成',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzbhys',
          label: '火元素伤害加成',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzbsys',
          label: '水元素伤害加成',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzbbys',
          label: '冰元素伤害加成',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'kzbwl',
          label: '物理伤害加成',
          bottomHelpMessage: '空之杯主词条概率',
          component: 'InputNumber',
        },
        {
          //分隔线
          component: 'Divider',
        },
        {
          field: 'lzggjl',
          label: '攻击力',
          bottomHelpMessage: '理之冠主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'lzgjt',
          label: '精通',
          bottomHelpMessage: '理之冠主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'lzgfyl',
          label: '防御力',
          bottomHelpMessage: '理之冠主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'lzgsmz',
          label: '生命值',
          bottomHelpMessage: '理之冠主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'lzgbjl',
          label: '暴击率',
          bottomHelpMessage: '理之冠主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'lzgbjsh',
          label: '暴击伤害',
          bottomHelpMessage: '理之冠主词条概率',
          component: 'InputNumber',
        },
        {
          field: 'lzgzl',
          label: '治疗加成',
          bottomHelpMessage: '理之冠主词条概率',
          component: 'InputNumber',
        },
        {
          //分隔线
          component: 'Divider',
        },
        {
          field: 'bjl',
          label: '暴击率',
          bottomHelpMessage: '副词条出现概率',
          component: 'InputNumber',
        },
        {
          field: 'bjsh',
          label: '暴击伤害',
          bottomHelpMessage: '副词条出现概率',
          component: 'InputNumber',
        },
        {
          field: 'gjl',
          label: '攻击力',
          bottomHelpMessage: '副词条出现概率',
          component: 'InputNumber',
        },
        {
          field: 'jt',
          label: '精通',
          bottomHelpMessage: '副词条出现概率',
          component: 'InputNumber',
        },
        {
          field: 'smz',
          label: '生命值',
          bottomHelpMessage: '副词条出现概率',
          component: 'InputNumber',
        },
        {
          field: 'fyl',
          label: '防御力',
          bottomHelpMessage: '副词条出现概率',
          component: 'InputNumber',
        },
        {
          field: 'cn',
          label: '充能',
          bottomHelpMessage: '副词条出现概率',
          component: 'InputNumber',
        },
        {
          field: 'xgj',
          label: '小攻击',
          bottomHelpMessage: '副词条出现概率',
          component: 'InputNumber',
        },
        {
          field: 'xsm',
          label: '小生命',
          bottomHelpMessage: '副词条出现概率',
          component: 'InputNumber',
        },
        {
          field: 'xfy',
          label: '小防御',
          bottomHelpMessage: '副词条出现概率',
          component: 'InputNumber',
        },
        {
          //分隔线
          component: 'Divider',
        },
        {
          field: 'dyd',
          label: '第一档',
          bottomHelpMessage: '强化档位概率,第一档最大值',
          component: 'InputNumber',
        },
        {
          field: 'ded',
          label: '第二档',
          bottomHelpMessage: '强化档位概率',
          component: 'InputNumber',
        },
        {
          field: 'dsd',
          label: '第三档',
          bottomHelpMessage: '强化档位概率',
          component: 'InputNumber',
        },
        {
          field: 'dsid',
          label: '第四档',
          bottomHelpMessage: '强化档位概率,第四档最小值',
          component: 'InputNumber',
        },
        {
          //分隔线
          component: 'Divider',
        },
        {
          field: 'bjlqh',
          label: '暴击率',
          bottomHelpMessage: '副词条强化概率',
          component: 'InputNumber',
        },
        {
          field: 'bjshqh',
          label: '暴击伤害',
          bottomHelpMessage: '副词条强化概率',
          component: 'InputNumber',
        },
        {
          field: 'gjlqh',
          label: '攻击力',
          bottomHelpMessage: '副词条强化概率',
          component: 'InputNumber',
        },
        {
          field: 'jtqh',
          label: '精通',
          bottomHelpMessage: '副词条强化概率',
          component: 'InputNumber',
        },
        {
          field: 'smzqh',
          label: '生命值',
          bottomHelpMessage: '副词条强化概率',
          component: 'InputNumber',
        },
        {
          field: 'fylqh',
          label: '防御力',
          bottomHelpMessage: '副词条强化概率',
          component: 'InputNumber',
        },
        {
          field: 'cnqh',
          label: '充能',
          bottomHelpMessage: '副词条强化概率',
          component: 'InputNumber',
        },
        {
          field: 'xgjqh',
          label: '小攻击',
          bottomHelpMessage: '副词条强化概率',
          component: 'InputNumber',
        },
        {
          field: 'xsmqh',
          label: '小生命',
          bottomHelpMessage: '副词条强化概率',
          component: 'InputNumber',
        },
        {
          field: 'xfyqh',
          label: '小防御',
          bottomHelpMessage: '副词条强化概率',
          component: 'InputNumber',
        },
        {
          //分隔线
          component: 'Divider',
        },
        {
          field: 'cd',
          label: 'cd',
          bottomHelpMessage: 'cd,单位为秒',
          component: 'InputNumber',
        },
        {
          //分隔线
          component: 'Divider',
        },
        {
          field: 'recall',
          label: '撤回时间',
          bottomHelpMessage: '是否撤回,单位为秒,为0则不撤回',
          component: 'InputNumber',
        },
      ],
      // 获取配置数据方法（用于前端填充显示数据）
      getConfigData() {
        let config = cfg.getAll()
        return {
          sancitiao: config.citiao[0],
          sicitiao: config.citiao[1],
          szh: config.buwei[0],
          szy: config.buwei[1],
          szs: config.buwei[2],
          kzb: config.buwei[3],
          lzg: config.buwei[4],
          szsgjl: config.shizhisha[0],
          szscn: config.shizhisha[1],
          szsjt: config.shizhisha[2],
          szsfyl: config.shizhisha[3],
          szssmz: config.shizhisha[4],
          kzbgjl: config.kongzhibei[0],
          kzbjt: config.kongzhibei[1],
          kzbfyl: config.kongzhibei[2],
          kzbsmz: config.kongzhibei[3],
          kzbcys: config.kongzhibei[4],
          kzblys: config.kongzhibei[5],
          kzbfys: config.kongzhibei[6],
          kzbyys: config.kongzhibei[7],
          kzbhys: config.kongzhibei[8],
          kzbsys: config.kongzhibei[9],
          kzbbys: config.kongzhibei[10],
          kzbwl: config.kongzhibei[11],
          lzggjl: config.lizhiguan[0],
          lzgjt: config.lizhiguan[1],
          lzgfyl: config.lizhiguan[2],
          lzgsmz: config.lizhiguan[3],
          lzgbjl: config.lizhiguan[4],
          lzgbjsh: config.lizhiguan[5],
          lzgzl: config.lizhiguan[6],
          bjl: config.fucitiao[0],
          bjsh: config.fucitiao[1],
          gjl: config.fucitiao[2],
          jt: config.fucitiao[3],
          smz: config.fucitiao[4],
          fyl: config.fucitiao[5],
          cn: config.fucitiao[6],
          xgj: config.fucitiao[7],
          xsm: config.fucitiao[8],
          xfy: config.fucitiao[9],
          dyd: config.qianghua[0],
          ded: config.qianghua[1],
          dsd: config.qianghua[2],
          dsid: config.qianghua[3],
          bjlqh: config.fucitiaoqianghua[0],
          bjshqh: config.fucitiaoqianghua[1],
          gjlqh: config.fucitiaoqianghua[2],
          jtqh: config.fucitiaoqianghua[3],
          smzqh: config.fucitiaoqianghua[4],
          fylqh: config.fucitiaoqianghua[5],
          cnqh: config.fucitiaoqianghua[6],
          xgjqh: config.fucitiaoqianghua[7],
          xsmqh: config.fucitiaoqianghua[8],
          xfyqh: config.fucitiaoqianghua[9],
          cd: config.cd,
          recall: config.recall || 0
        }
      },
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData(data, { Result }) {
        let shizhisha = [data.szsgjl, data.szscn, data.szsjt, data.szsfyl, data.szssmz]
        let kongzhibei = [data.kzbgjl, data.kzbjt, data.kzbfyl, data.kzbsmz, data.kzbcys, data.kzblys, data.kzbfyl, data.kzbyys, data.kzbhys, data.kzbsys, data.kzbhys, data.kzbbys, data.kzbwl]
        let lizhiguan = [data.lzggjl, data.lzgjt, data.lzgfyl, data.lzgsmz, data.lzgbjl, data.lzgbjsh, data.lzgzl]
        let citiao = [data.sancitiao, data.sicitiao]
        let buwei = [data.szh, data.szy, data.szs, data.kzb, data.lzg]
        let fucitiao = [data.bjl, data.bjsh, data.gjl, data.jt, data.smz, data.fyl, data.cn, data.xgj, data.xsm, data.xfy]
        let qianghua = [data.dyd, data.ded, data.dsd, data.dsid]
        let fucitiaoqianghua = [data.bjlqh, data.bjshqh, data.gjlqh, data.jtqh, data.smzqh, data.fylqh, data.cnqh, data.xgjqh, data.xsmqh, data.xfyqh]
        let cd = data.cd
        let recall = data.recall
        util.setYaml({ shizhisha, kongzhibei, lizhiguan, citiao, buwei, fucitiao, qianghua, fucitiaoqianghua, cd, recall })
        return Result.ok({}, '保存成功~')
      },
    },
  }
}
