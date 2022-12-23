import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import { segment } from "oicq";
import syw from "../model/readConfig.js";
import util from "../model/util.js"

let GayCD = {};

export class ssyw extends plugin {
    constructor() {
        super(
            {
                name: '刷圣遗物',
                dsc: '刷指定副本的圣遗物和强化',
                event: 'message',
                priority: '5000',
                rule: [
                    {
                        reg: '^#*刷圣遗物.*$',
                        fnc: 'chuhuoba'
                    },
                    {
                        reg: '^#*强化圣遗物$',
                        fnc: 'qianghua'
                    },
                    {
                        reg: '^#*查看圣遗物$',
                        fnc: 'chakan'
                    },
                    {
                        reg: '^#*给我来个双(暴|爆).*$',
                        fnc: 'shuangbao'
                    }
                ]
            }
        )
    }

    //刷圣遗物
    async chuhuoba(e) {
        if (!e.isMaster) {
            if (GayCD[e.user_id]) {
                e.reply("1分钟cd");
                return true;
            }

            GayCD[e.user_id] = true;

            GayCD[e.user_id] = setTimeout(() => {
                if (GayCD[e.user_id]) {
                    delete GayCD[e.user_id];
                }
            }, 60000);
        }
        let shengyiwu
        let fuben = e.msg.replace(/#|刷圣遗物/g, "").trim();
        let buwei = await util.getRandomArrOne(syw.buweis)
        //确定圣遗物具体部位
        if (fuben == '火本' || fuben == '魔女' || fuben == '渡火' || fuben == '火套') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.huoben)
        } else if (fuben == '冰本' || fuben == '冰套' || fuben == '水本' || fuben == '水套') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.binben)
        } else if (fuben == '雷本' || fuben == '平雷' || fuben == '如雷' || fuben == '雷套') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.leiben)
        } else if (fuben == '风本' || fuben == '风套' || fuben == '少女') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.fengben)
        } else if (fuben == '岩本' || fuben == '磐岩' || fuben == '岩套' || fuben == '逆飞的流星') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.yanben)
        } else if (fuben == '宗室' || fuben == '骑士') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.zongshi)
        } else if (fuben == '千岩' || fuben == '苍白') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.qianyan)
        } else if (fuben == '追忆' || fuben == '绝缘') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.jueyuan)
        } else if (fuben == '华馆' || fuben == '海染' || fuben == '华冠' || fuben == '华倌') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.huaguan)
        } else if (fuben == '辰砂' || fuben == '来歆' || fuben == '余响') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.chensha)
        } else if (fuben == '草本' || fuben == '草套' || fuben == '饰金') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.caoben)
        } else if (fuben == '乐团' || fuben == '角斗士') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.qita)
        } else if (fuben == '楼阁' || fuben == '乐园' || fuben == '沙上楼阁史话' || fuben == '乐园遗落之花') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.louge)
        }
        else {
            e.reply('没有这个圣遗物')
            return true
        }

        //确定主词条
        let zhucitiao = await util.randomZhucitiao(buwei)

        //给主词条加初始值
        let zhucitiaoData = await util.zhucitiaoAddData(zhucitiao, buwei)

        //确定副词条
        let fucitiao = await util.randomFucitiao(zhucitiao, buwei)

        //给副词条加初始值
        let fucitiaoData = await util.fucitiaoAddData(fucitiao)

        let level = '0'



        this._path = process.cwd().replace(/\\/g, "/");
        let data = {
            tplFile: './plugins/xiaoye-plugin/resources/html/index.html',
            pluResPath: this._path,
            fucitiao: fucitiao,
            fucitiaoData: fucitiaoData,
            shengyiwu: shengyiwu,
            buwei: buwei,
            zhucitiao: zhucitiao,
            zhucitiaoData: zhucitiaoData,
            level: level
        }
        await redis.set('xiaoye:syw:qq:' + e.user_id, JSON.stringify(data), { EX: 86400 })
        let img = await puppeteer.screenshot("test", data);
        let msg = [segment.at(e.user_id), img]
        e.reply(msg)
        return true;

    }

    //来个双爆圣遗物
    async shuangbao(e) {
        if (!e.isMaster) {
            if (GayCD[e.user_id]) {
                e.reply("1分钟cd");
                return true;
            }

            GayCD[e.user_id] = true;

            GayCD[e.user_id] = setTimeout(() => {
                if (GayCD[e.user_id]) {
                    delete GayCD[e.user_id];
                }
            }, 60000);
        }
        let shengyiwu
        let fuben = e.msg.replace(/#|给我来个双暴|给我来个双爆/g, "").trim();
        let buwei = await util.getRandomArrOne(syw.buweis)
        //确定圣遗物具体部位
        if (fuben == '火本' || fuben == '魔女' || fuben == '渡火' || fuben == '火套') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.huoben)
        } else if (fuben == '冰本' || fuben == '冰套' || fuben == '水本' || fuben == '水套') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.binben)
        } else if (fuben == '雷本' || fuben == '平雷' || fuben == '如雷' || fuben == '雷套') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.leiben)
        } else if (fuben == '风本' || fuben == '风套' || fuben == '少女') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.fengben)
        } else if (fuben == '岩本' || fuben == '磐岩' || fuben == '岩套' || fuben == '逆飞的流星') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.yanben)
        } else if (fuben == '宗室' || fuben == '骑士') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.zongshi)
        } else if (fuben == '千岩' || fuben == '苍白') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.qianyan)
        } else if (fuben == '追忆' || fuben == '绝缘') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.jueyuan)
        } else if (fuben == '华馆' || fuben == '海染' || fuben == '华冠' || fuben == '华倌') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.huaguan)
        } else if (fuben == '辰砂' || fuben == '来歆' || fuben == '余响') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.chensha)
        } else if (fuben == '草本' || fuben == '草套' || fuben == '饰金') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.caoben)
        } else if (fuben == '乐团' || fuben == '角斗士') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.qita)
        } else if (fuben == '楼阁' || fuben == '乐园' || fuben == '沙上楼阁史话' || fuben == '乐园遗落之花') {
            shengyiwu = await util.randomShengyiwu(buwei, syw.louge)
        }
        else {
            e.reply('没有这个圣遗物')
            return true
        }

        //确定主词条
        let zhucitiao = await util.NBZhucitiao(buwei)

        //给主词条加初始值
        let zhucitiaoData = await util.zhucitiaoAddData(zhucitiao, buwei)

        //确定副词条
        let fucitiao = await util.NBFucitiao(zhucitiao, buwei)

        //给副词条加初始值
        let fucitiaoData = await util.fucitiaoAddData(fucitiao)

        let level = '0'



        this._path = process.cwd().replace(/\\/g, "/");
        let data = {
            tplFile: './plugins/xiaoye-plugin/resources/html/index.html',
            pluResPath: `${this._path}`,
            fucitiao: fucitiao,
            fucitiaoData: fucitiaoData,
            shengyiwu: shengyiwu,
            buwei: buwei,
            zhucitiao: zhucitiao,
            zhucitiaoData: zhucitiaoData,
            level: level
        }
        await redis.set('xiaoye:syw:qq:' + e.user_id, JSON.stringify(data), { EX: 86400 })
        let img = await puppeteer.screenshot("test", data);
        let msg = [segment.at(e.user_id), img]
        e.reply(msg)
        return true;
    }

    //强化
    async qianghua(e) {

        /* if (!e.isMaster) {
            if (GayCD[e.user_id]) {
                e.reply("该命令有1分钟cd");
                return true;
            }

            GayCD[e.user_id] = true;

            GayCD[e.user_id] = setTimeout(() => {
                if (GayCD[e.user_id]) {
                    delete GayCD[e.user_id];
                }
            }, 60000);
        } */

        //要强化的圣遗物数据
        let data = await redis.get('xiaoye:syw:qq:' + e.user_id)
        data = JSON.parse(data)
        if (data == null) {
            e.reply('当前没有圣遗物')
            return false
        }
        //获得等级
        let level = data.level
        if (level == 20) {
            e.reply('当前圣遗物已强化')
            return
        }
        //获取圣遗物名字
        let shengyiwu = data.shengyiwu
        //获取部位
        let buwei = data.buwei
        //获取主词条名字
        let zhucitiao = data.zhucitiao
        //获取主词条数据
        let zhucitiaoData = data.zhucitiaoData
        zhucitiaoData = zhucitiaoData.replace(/%/g, "").trim()
        //获取副词条
        let fucitiao = data.fucitiao
        //获取副词条数值
        let fucitiaoData = data.fucitiaoData
        //去掉%
        for (let i = 0; i < fucitiaoData.length; i++) {
            fucitiaoData[i] = fucitiaoData[i].replace(/%/g, "").trim()
        }

        //四词条
        if (fucitiao[3] && level != '20') {
            //循环五次强化
            for (let k = 0; k < 5; k++) {
                //随机获得强化的词条
                let benci = await util.getRandomArrOne(fucitiao)
                //获得强化的数值
                let fucitiaoUpData = await util.fucitiaoUpData(benci)
                //循环数值相加
                for (let j = 0; j < fucitiao.length; j++) {
                    if (fucitiao[j] == benci) {
                        fucitiaoData[j] = parseFloat(fucitiaoData[fucitiao.indexOf(benci)]) + parseFloat(fucitiaoUpData)
                        fucitiaoData[j] =
                            ((fucitiaoData[j] + '').indexOf('.') != -1) ? fucitiaoData[j].toFixed(1) : fucitiaoData[j]
                        break
                    }
                }
            }
        } else if (fucitiao[2] && level != '20') {
            //加个词条
            let newCitiao = await util.randomFucitiao4(zhucitiao, fucitiao, buwei)
            fucitiao.push(newCitiao)
            let newShuzhi = await util.fucitiao4AddData(newCitiao)
            fucitiaoData.push(newShuzhi)
            //循环四次强化
            for (let k = 0; k < 4; k++) {
                //获得强化的词条
                let benci = await util.getRandomArrOne(fucitiao)
                //获得强化的数值
                let fucitiaoUpData = await util.fucitiaoUpData(benci)
                //循环数值相加
                for (let j = 0; j < fucitiao.length; j++) {
                    if (fucitiao[j] == benci) {
                        fucitiaoData[j] = parseFloat(fucitiaoData[fucitiao.indexOf(benci)]) + parseFloat(fucitiaoUpData)
                        fucitiaoData[j] =
                            ((fucitiaoData[j] + '').indexOf('.') != -1) ? fucitiaoData[j].toFixed(1) : fucitiaoData[j]
                        break
                    }
                }
            }
        }
        //加上%
        for (let i = 0; i < fucitiaoData.length; i++) {
            fucitiaoData[i] = await util.fucitiaoAddfuhao(fucitiao[i], fucitiaoData[i])
        }
        //等级设置为20
        level = '20'
        //设置主词条+20数据
        zhucitiaoData = await util.randomUpZhucitiao(zhucitiao, buwei)
        this._path = process.cwd().replace(/\\/g, "/");
        let newData = {
            tplFile: './plugins/xiaoye-plugin/resources/html/index.html',
            pluResPath: `${this._path}`,
            fucitiao: fucitiao,
            fucitiaoData: fucitiaoData,
            shengyiwu: shengyiwu,
            buwei: buwei,
            zhucitiao: zhucitiao,
            zhucitiaoData: zhucitiaoData,
            level: level
        }
        await redis.set('xiaoye:syw:qq:' + e.user_id, JSON.stringify(newData), { EX: 86400 })
        let img = await puppeteer.screenshot("test", newData);
        let msg = [segment.at(e.user_id), img]
        e.reply(msg)
        return true;
    }

    //查看
    async chakan(e) {
        let data = await redis.get('xiaoye:syw:qq:' + e.user_id)
        data = JSON.parse(data)
        if (data == null) {
            e.reply('当前没有圣遗物')
            return false
        }
        let img = await puppeteer.screenshot("test", data);
        let msg = [segment.at(e.user_id), img]
        e.reply(msg)
        return true
    }


}