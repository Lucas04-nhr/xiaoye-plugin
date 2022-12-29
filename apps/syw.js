import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import util from "../model/sywUtil.js"
import cfg from '../model/readConfig.js'

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
                        reg: '^#*强化圣遗物[0-9]*$',
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

        //初始等级0
        let level = 0

        //确定主词条
        let zhucitiao = await util.getZhucitiao(buwei)

        //给主词条加初始值
        let zhucitiaoData = await util.getZhucitiaodata(zhucitiao, buwei, level)

        //确定副词条
        let fucitiao = await util.getFucitiao(zhucitiao, buwei)

        //给副词条加初始值
        let fucitiaoData = await util.getFucitiaoData(fucitiao)

        //加个符号%
        fucitiaoData = await util.fucitiaoAddfuhao(fucitiao, fucitiaoData)

        this._path = process.cwd().replace(/\\/g, "/");
        let data = {
            tplFile: './plugins/xiaoye-plugin/resources/html/syw/syw.html',
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
        let img = await puppeteer.screenshot("syw", data);
        await e.reply(img, false, { at: true, recallMsg: `${cfg.recall}` });
        await util.setGayCD(e)
        return true;

    }

    //强化
    async qianghua(e) {
        let up = e.msg.replace(/#|强化圣遗物/g, "").trim();
        up = parseInt(up)
        if (up > 20) {
            up = 20
        }

        //要强化的圣遗物数据
        let data = await redis.get('xiaoye:syw:qq:' + e.user_id)
        data = JSON.parse(data)
        if (data == null) {
            e.reply('当前没有圣遗物')
            return true
        }
        //获得等级
        let level = data.level
        level = parseInt(level)
        if (!up) {
            up = 20 - level
        }
        if (level == 20) {
            e.reply('当前圣遗物已强化')
            return true
        } else if (level + up > 20) {
            up = 20 - level
        }

        //根据等级获得强化次数
        let cishu = parseInt((level % 4 + up) / 4)

        //获取圣遗物名字
        let shengyiwu = data.shengyiwu
        //获取部位
        let buwei = data.buwei
        //获取主词条名字
        let zhucitiao = data.zhucitiao
        //获取主词条数据
        let zhucitiaoData = data.zhucitiaoData
        //获取副词条
        let fucitiao = data.fucitiao
        //获取副词条数值
        let fucitiaoData = data.fucitiaoData

        //如果强化次数大于0
        if (cishu > 0) {
            //去掉%
            for (let i = 0; i < fucitiaoData.length; i++) {
                fucitiaoData[i] = fucitiaoData[i].replace(/%/g, "").trim()
            }
            //四词条
            if (fucitiao[3] && level != '20') {

                //强化
                fucitiaoData = await util.qianghua(fucitiao, fucitiaoData, cishu)

            } else if (fucitiao[2] && level != '20') {
                //先加个词条
                let newCitiao = await util.getOneFucitiao(zhucitiao, fucitiao, buwei)
                fucitiao.push(newCitiao)
                let newShuzhi = await util.getOnefucitiaoData(newCitiao)
                fucitiaoData.push(newShuzhi)

                //要次数大于1才强化,不然就只加词条
                if (cishu > 1) {
                    //有一次用来加词条了,所以要减1
                    fucitiaoData = await util.qianghua(fucitiao, fucitiaoData, cishu - 1)
                }
            }
            //加上%
            fucitiaoData = await util.fucitiaoAddfuhao(fucitiao, fucitiaoData)
        }

        //等级加一下
        level = level + up
        //设置主词条数据
        zhucitiaoData = await util.getZhucitiaodata(zhucitiao, buwei, level)
        this._path = process.cwd().replace(/\\/g, "/");
        let newData = {
            tplFile: './plugins/xiaoye-plugin/resources/html//syw/syw.html',
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
        await e.reply(img, false, { at: true, recallMsg: `${cfg.recall}` });
        return true;
    }

}