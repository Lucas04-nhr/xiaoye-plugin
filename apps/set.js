import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import sywData from "../resources/data/data.js"
import { set, setUtil } from "../model/index.js"

const _path = process.cwd().replace(/\\/g, "/");

export class xiaoyeSet extends plugin {
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
            return true
        }
        let setList = set.getData()
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
            return true
        }
        let i = e.msg.includes('三词条') ? 0 : 1
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        data.citiao[i] = num
        await setUtil.setYaml(data)
        return await this.set(e)
    }

    async setbuwei(e) {
        if (!e.isMaster) {
            return true
        }
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < sywData.Artifacts.length; i++) {
            if (e.msg.includes(sywData.Artifacts[i].name)) {
                data.buwei[i] = num
                break
            }
        }
        await setUtil.setYaml(data)
        return await this.set(e)
    }

    async setshizhisha(e) {
        if (!e.isMaster) {
            return true
        }
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < sywData.Artifacts[2].mainList.length; i++) {
            if (e.msg.includes(sywData.Artifacts[2].mainList[i].display)) {
                data.shizhisha[i] = num
                break
            }
        }
        await setUtil.setYaml(data)
        return await this.set(e)
    }

    async setkongzhibei(e) {
        if (!e.isMaster) {
            return true
        }
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < sywData.Artifacts[3].mainList.length; i++) {
            if (e.msg.includes(sywData.Artifacts[3].mainList[i].display)) {
                data.kongzhibei[i] = num
                break
            }
        }
        await setUtil.setYaml(data)
        return await this.set(e)
    }

    async setlizhiguan(e) {
        if (!e.isMaster) {
            return true
        }
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < sywData.Artifacts[4].mainList.length; i++) {
            if (e.msg.includes(sywData.Artifacts[4].mainList[i].display)) {
                data.lizhiguan[i] = num
                break
            }
        }
        await setUtil.setYaml(data)
        return await this.set(e)
    }

    async setfucitiao(e) {
        if (!e.isMaster) {
            return true
        }
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < sywData.viceList.length; i++) {
            if (e.msg.includes(sywData.viceList[i].option)) {
                data.fucitiao[i] = num
                break
            }
        }
        await setUtil.setYaml(data)
        return await this.set(e)
    }

    async setqianghua(e) {
        if (!e.isMaster) {
            return true
        }
        let qianghua = ['第一档', '第二档', '第三档', '第四档']
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < qianghua.length; i++) {
            if (e.msg.includes(qianghua[i])) {
                data.qianghua[i] = num
                break
            }
        }
        await setUtil.setYaml(data)
        return await this.set(e)
    }

    async setfucitiaoqianghua(e) {
        if (!e.isMaster) {
            return true
        }
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        for (let i = 0; i < sywData.viceList.length; i++) {
            if (e.msg.includes(sywData.viceList[i])) {
                data.fucitiaoqianghua[i] = num
                break
            }
        }
        await setUtil.setYaml(data)
        return await this.set(e)
    }

    async setcd(e) {
        if (!e.isMaster) {
            return true
        }
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        data.cd = num
        await setUtil.setYaml(data)
        return await this.set(e)
    }

    async setrecall(e) {
        if (!e.isMaster) {
            return true
        }
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        if (num > 120) {
            return true
        }
        data.recall = num
        await setUtil.setYaml(data)
        return await this.set(e)
    }

    async setcishu(e) {
        if (!e.isMaster) {
            return true
        }
        let data = await setUtil.getData()
        let num = parseInt(e.msg.match(/\d+/g))
        data.cishu = num
        await setUtil.setYaml(data)
        return await this.set(e)
    }
}