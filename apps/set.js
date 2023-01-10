import plugin from '../../../lib/plugins/plugin.js'
import setUtil from '../model/set.js'
import util from '../model/setUtil.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import cfg from '../model/readConfig.js'
import syw from '../model/readData.js'

const _path = process.cwd().replace(/\\/g, "/");

export class set extends plugin {
    constructor() {
        super(
            {
                name: '小叶插件设置',
                dsc: '小叶插件设置',
                event: 'message',
                priority: '5000',
                rule: [
                    {
                        reg: `^#*小叶(插件)?设置$`,
                        fnc: 'set'
                    },
                    {
                        reg: '^#*小叶(插件)?设置(三词条|四词条)(概率)?[0-9]+$',
                        fnc: 'setcitiao'
                    },
                    {
                        reg: '^#*小叶(插件)?设置(生之花|死之羽|时之沙|空之杯|理之冠)(概率)?[0-9]+$',
                        fnc: 'setbuwei'
                    },
                    {
                        reg: '^#*小叶(插件)?设置时之沙(攻击力|元素充能效率|元素精通|防御力|生命值)(概率)?[0-9]+$',
                        fnc: 'setshizhisha'
                    },
                    {
                        reg: '^#*小叶(插件)?设置空之杯(攻击力|精通|防御力|生命值|(((草|雷|风|岩|火|水|冰)元素)|物理)伤害加成)(概率)?[0-9]+$',
                        fnc: 'setkongzhibei'
                    },
                    {
                        reg: '^#*小叶(插件)?设置理之冠(攻击力|精通|防御力|生命值|暴击率|暴击伤害|治疗加成)(概率)?[0-9]+$',
                        fnc: 'setlizhiguan'
                    },
                    {
                        reg: '^#*小叶(插件)?设置副词条(暴击率|暴击伤害|攻击力|元素精通|生命值|防御力|元素充能效率|小攻击|小生命|小防御)(概率)?[0-9]+$',
                        fnc: 'setfucitiao'
                    },
                    {
                        reg: '^#*小叶(插件)?设置(第一档|第二档|第三档|第四档)(概率)?[0-9]+$',
                        fnc: 'setqianghua'
                    },
                    {
                        reg: '^#*小叶(插件)?设置强化(暴击率|暴击伤害|攻击力|精通|生命值|防御力|充能|小攻击|小生命|小防御)(概率)?[0-9]+$',
                        fnc: 'setfucitiaoqianghua'
                    },
                    {
                        reg: '^#*小叶(插件)?设置(cd|CD)[0-9]+$',
                        fnc: 'setcd'
                    },
                    {
                        reg: '^#*小叶(插件)?设置撤回[0-9]+$',
                        fnc: 'setrecall'
                    },
                    {
                        reg: '^#*小叶(插件)?设置(每(天|日))?(使用)?次数[0-9]+$',
                        fnc: 'setcishu'
                    }
                ]
            }
        )
    }

    async set(e) {
        if (!e.isMaster) {
            return
        }
        let setList = setUtil.getData()
        let data = {
            tplFile: './plugins/xiaoye-plugin/resources/html/set/set.html',
            pluResPath: _path,
            setList
        }
        let img = await puppeteer.screenshot("set", data);
        e.reply(img)
        return true

    }

    async setcitiao(e) {
        if (!e.isMaster) {
            return
        }
        let i = e.msg.includes('三词条') ? 0 : 1
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        data.citiao[i] = num
        await util.setYaml(data)
        e.reply('成功!')
        return
    }

    async setbuwei(e) {
        if (!e.isMaster) {
            return
        }
        let buwei = syw.buweiList
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < buwei.length; i++) {
            if (e.msg.includes(buwei[i].name)) {
                data.buwei[i] = num
                break
            }
        }
        await util.setYaml(data)
        e.reply('成功!')
        return
    }

    async setshizhisha(e) {
        if (!e.isMaster) {
            return
        }
        let shizhisha = syw.shizhishazhucitiaoList
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < shizhisha.length; i++) {
            if (e.msg.includes(shizhisha[i].display)) {
                data.shizhisha[i] = num
                break
            }
        }
        await util.setYaml(data)
        e.reply('成功!')
        return
    }

    async setkongzhibei(e) {
        if (!e.isMaster) {
            return
        }
        let kongzhibei = syw.kongzhibeizhucitiaoList
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < kongzhibei.length; i++) {
            if (e.msg.includes(kongzhibei[i].display)) {
                data.kongzhibei[i] = num
                break
            }
        }
        await util.setYaml(data)
        e.reply('成功!')
        return
    }

    async setlizhiguan(e) {
        if (!e.isMaster) {
            return
        }
        let lizhiguan = syw.lizhiguanzhucitiaoList
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < lizhiguan.length; i++) {
            if (e.msg.includes(lizhiguan[i].display)) {
                data.lizhiguan[i] = num
                break
            }
        }
        await util.setYaml(data)
        e.reply('成功!')
        return
    }

    async setfucitiao(e) {
        if (!e.isMaster) {
            return
        }
        let fucitiao = syw.fucitiaoList
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < fucitiao.length; i++) {
            if (e.msg.includes(fucitiao[i].option)) {
                data.fucitiao[i] = num
                break
            }
        }
        await util.setYaml(data)
        e.reply('成功!')
        return
    }

    async setqianghua(e) {
        if (!e.isMaster) {
            return
        }
        let qianghua = ['第一档', '第二档', '第三档', '第四档']
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < qianghua.length; i++) {
            if (e.msg.includes(qianghua[i])) {
                data.qianghua[i] = num
                break
            }
        }
        await util.setYaml(data)
        e.reply('成功!')
        return
    }

    async setfucitiaoqianghua(e) {
        if (!e.isMaster) {
            return
        }
        let fucitiao = syw.fucitiaoList
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < fucitiao.length; i++) {
            if (e.msg.includes(fucitiao[i])) {
                data.fucitiaoqianghua[i] = num
                break
            }
        }
        await util.setYaml(data)
        e.reply('成功!')
        return
    }

    async setcd(e) {
        if (!e.isMaster) {
            return
        }
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        data.cd = num
        await util.setYaml(data)
        e.reply('成功!')
        return
    }

    async setrecall(e) {
        if (!e.isMaster) {
            return
        }
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        if (num > 120) {
            return
        }
        data.recall = num
        await util.setYaml(data)
        e.reply('成功!')
        return
    }

    async setcishu(e) {
        if (!e.isMaster) {
            return
        }
        let data = await util.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        data.cishu = num
        await util.setYaml(data)
        e.reply('成功!')
        return
    }
}