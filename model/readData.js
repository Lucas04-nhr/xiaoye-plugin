import YAML from "yaml";
import fs from "fs";

const dataPath = process.cwd() + '/plugins/xiaoye-plugin/resources/data/data.yaml'
let data = await YAML.parse(
    fs.readFileSync(dataPath, "utf8")
);
let syw = {
    //圣遗物部位
    buweiList: data.buweiList,
    //时之沙主词条
    shizhishazhucitiaoList: data.shizhishazhucitiaoList,
    //空之杯主词条
    kongzhibeizhucitiaoList: data.kongzhibeizhucitiaoList,
    //理之冠主词条
    lizhiguanzhucitiaoList: data.lizhiguanzhucitiaoList,
    //副词条
    fucitiaoList: data.fucitiaoList,
    //暴击伤害成长值
    baojishanghai: data.baojishanghai,
    //暴击率成长值
    baojilv: data.baojilv,
    //攻击力成长值
    gongjili: data.gongjili,
    //小攻击成长值
    xiaogongji: data.xiaogongji,
    //生命值成长值
    shengmingzhi: data.shengmingzhi,
    //小生命成长值
    xiaoshengming: data.xiaoshengming,
    //防御力成长值
    fangyuli: data.fangyuli,
    //小防御成长值
    xiaofangyu: data.xiaofangyu,
    //充能成长值
    chongneng: data.chongneng,
    //精通成长值
    jingtong: data.jingtong,
    //副本掉落
    //火本
    huoben: data.huoben,
    //冰本
    binben: data.binben,
    //雷本
    leiben: data.leiben,
    //风本
    fengben: data.fengben,
    //岩本
    yanben: data.yanben,
    //宗室骑士
    zongshi: data.zongshi,
    //千岩苍白
    qianyan: data.qianyan,
    //绝缘追忆
    jueyuan: data.jueyuan,
    //华冠海染
    huaguan: data.huaguan,
    //辰砂余响
    chensha: data.chensha,
    //草本
    caoben: data.caoben,
    //角斗士乐团
    qita: data.qita,
    //楼阁
    louge: data.louge
}
export default syw