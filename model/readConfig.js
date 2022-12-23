import YAML from "yaml";
import fs from "fs";

const configPath = process.cwd() + '/plugins/xiaoye-plugin/resources/config/config.yaml'
let config = await YAML.parse(
    fs.readFileSync(configPath, "utf8")
);
let syw = {
    //圣遗物部位
    buweis: config.buweis,
    //时之沙主词条
    shizhishazhucitiaos: config.shizhishazhucitiaos,
    //空之杯主词条
    kongzhibeizhucitiaos: config.kongzhibeizhucitiaos,
    //理之冠主词条
    lizhiguanzhucitiaos: config.lizhiguanzhucitiaos,
    //副词条
    fucitiaos: config.fucitiaos,
    //暴击伤害成长值
    baojishanghai: config.baojishanghai,
    //暴击率成长值
    baojilv: config.baojilv,
    //攻击力成长值
    gongjili: config.gongjili,
    //小攻击成长值
    xiaogongji: config.xiaogongji,
    //生命值成长值
    shengmingzhi: config.shengmingzhi,
    //小生命成长值
    xiaoshengming: config.xiaoshengming,
    //防御力成长值
    fangyuli: config.fangyuli,
    //小防御成长值
    xiaofangyu: config.xiaofangyu,
    //充能成长值
    chongneng: config.chongneng,
    //精通成长值
    jingtong: config.jingtong,
    //副本掉落
    //火本
    huoben: config.huoben,
    //冰本
    binben: config.binben,
    //雷本
    leiben: config.leiben,
    //风本
    fengben: config.fengben,
    //岩本
    yanben: config.yanben,
    //宗室骑士
    zongshi: config.zongshi,
    //千岩苍白
    qianyan: config.qianyan,
    //绝缘追忆
    jueyuan: config.jueyuan,
    //华冠海染
    huaguan: config.huaguan,
    //辰砂余响
    chensha: config.chensha,
    //草本
    caoben: config.caoben,
    //角斗士乐团
    qita: config.qita,
    //楼阁
    louge: config.louge
}
export default syw