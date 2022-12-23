import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import { segment } from "oicq";
import util from "../model/util.js"

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
                    }
                ]
            }
        )
    }

    //刷圣遗物
    async chuhuoba(e) {
        let cd = await util.getGayCD(e)
        if (cd > 0) {
            e.reply(`cd中,请${cd}秒后使用`)
            return true
        }

        let fuben = e.msg.replace(/#|刷圣遗物/g, "").trim();
        //获得一个部位
        let buwei = await util.getBuwei()

        //圣遗物名字
        let shengyiwu = await util.shengyiwu(buwei, fuben)
        if (!shengyiwu) {
            e.reply("没有这个圣遗物")
            return true
        }

        //确定主词条
        let zhucitiao = await util.getZhucitiao(buwei)

        //给主词条加初始值
        let zhucitiaoData = await util.zhucitiaoAddData(zhucitiao, buwei)

        //确定副词条
        let fucitiao = await util.getFucitiao(zhucitiao, buwei)

        //给副词条加初始值
        let fucitiaoData = await util.getFucitiaoData(fucitiao)

        //加个符号%
        fucitiaoData = await util.fucitiaoAddfuhao(fucitiao, fucitiaoData)

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
        await util.setGayCD(e)
        let img = await puppeteer.screenshot("syw", data);
        let msg = [segment.at(e.user_id), img]
        e.reply(msg)
        return true;

    }

    //强化
    async qianghua(e) {
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
                let benci = await util.getQianghuacitiao(fucitiao)
                //获得强化的数值
                let fucitiaoUpData = await util.getQianghuashuzhi(benci)
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
            let newCitiao = await util.getOneFucitiao(zhucitiao, fucitiao, buwei)
            fucitiao.push(newCitiao)
            let newShuzhi = await util.getOnefucitiaoData(newCitiao)
            fucitiaoData.push(newShuzhi)
            //循环四次强化
            for (let k = 0; k < 4; k++) {
                //获得强化的词条
                let benci = await util.getQianghuacitiao(fucitiao)
                //获得强化的数值
                let fucitiaoUpData = await util.getQianghuashuzhi(benci)
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
        //加个符号%
        fucitiaoData = await util.fucitiaoAddfuhao(fucitiao, fucitiaoData)
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
        let img = await puppeteer.screenshot("syw", newData);
        let msg = [segment.at(e.user_id), img]
        e.reply(msg)
        return true;
    }

}