import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";

import { textToNumber, ForwardMsg, syw, cfg } from "../model/index.js"

let throttle = false
let resetCount = 0
const path = process.cwd();

export class ssyw extends plugin {
    constructor() {
        super(
            {
                name: '刷圣遗物',
                dsc: '刷指定副本的圣遗物和强化',
                event: 'message',
                priority: '5',
                rule: [
                    {
                        reg: '^#*刷圣遗物.*$',
                        fnc: 'chuhuoba'
                    },
                    {
                        reg: '^#*(一键)?强化圣遗物([一二三四五六七八九十]|[0-9])*([\+到至]([一二三四五六七八九十]|[0-9])+级?)?$',
                        fnc: 'qianghua'
                    },
                    {
                        reg: '^#*查看(副本|圣遗物)别名$',
                        fnc: 'alias'
                    },
                    {
                        reg: '^#*查看上次圣遗物$',
                        fnc: 'viewLastTime'
                    },
                ]
            }
        )
    }

    //刷圣遗物
    async chuhuoba(e) {
        resetCount = resetCount + 1
        if (resetCount > 1) {
            throttle = false
            resetCount = 0
        }
        if (throttle) {
            return true
        } else {
            throttle = true
        }
        //判断cd
        let cd = await syw.getCD(e)
        if (cd > 0) {
            await e.reply(`cd中,请${cd}秒后使用`, true)
            throttle = false
            return true
        }
        let reg = new RegExp('(([一二三四五六七八九十]|[0-9])+)[次个]$')
        let sywNum = 1
        if (reg.exec(e.msg)) {
            let num = reg.exec(e.msg)[1]
            num = textToNumber(num)
            if (num > 20) {
                num = 20
            } else if (num == -1) {
                num = 1
            }
            sywNum = num
            e.msg = e.msg.replace(/([一二三四五六七八九十]|[0-9])+[次个]/g, "").trim()
        }
        let cishu = await syw.getCishu(e)
        //看看剩余次数够不够
        let target = cishu - sywNum
        if (target >= 0) {
            const DomainName = e.msg.replace(/#|刷圣遗物/g, "").trim();

            let msg = []
            let dataList = []

            for (let i = 1; i <= sywNum; i++) {
                //先看看有没有这个副本
                const ArtifactsDomain = await syw.getArtifactsDomain(DomainName)
                if (!ArtifactsDomain) {
                    throttle = false
                    return true
                }

                //获得一个部位 {name : '生之花' ,id : 'FlowerOfLife'  mainList:[]}
                const Artifact = await syw.getArtifact()

                //圣遗物名字 {name : '雷鸟的怜悯' ,icom : '图片地址'}
                const ArtifactName = await syw.getArtifactName(Artifact.id, ArtifactsDomain)

                //初始等级0
                const level = 0

                //确定主词条 {id: 'HealthFlat',display: '生命值',percentage: false,suffix: ''}
                const main = await syw.getMain(Artifact.id, Artifact.mainList)

                //给主词条加初始值 717
                const mainData = await syw.getMaindata(main.id, level)

                //确定副词条
                let vice = await syw.getVice(main.id)

                //给副词条加初始值
                let viceData = await syw.getViceData(vice)

                let data = {
                    tplFile: './plugins/xiaoye-plugin/resources/html/syw/syw.html',
                    pluResPath: path,
                    Artifact,       //部位
                    ArtifactName,   //名字
                    level,          //等级
                    main,           //主词条
                    mainData,       //主词条数值
                    vice,           //副词条
                    viceData,       //副词条数值
                    isSave: false   //是否保存
                }
                let img = await puppeteer.screenshot("syw", data);
                if (!img) {
                    img = await puppeteer.screenshot("syw", data);
                }
                if (sywNum > 1) {
                    msg.push([`id:${i}`, img])
                } else {
                    msg.push(img)
                }
                dataList.push(data)
            }
            await redis.set('xiaoye:syw:qq:' + e.user_id, JSON.stringify(dataList), { EX: 86400 })
            await syw.setCishu(e, sywNum)
            await syw.setCD(e)
            if (msg.length > 1) {
                await e.reply(await ForwardMsg(e, msg), false, { at: false, recallMsg: cfg.recall })
            } else {
                await e.reply(msg, true, { at: false, recallMsg: cfg.recall })
            }
        } else {
            await e.reply('今天的次数不够刷这么多次了', true, { at: false, recallMsg: cfg.recall })
        }
        throttle = false
        return true
    }

    //强化
    async qianghua(e) {
        resetCount = resetCount + 1
        if (resetCount > 1) {
            throttle = false
            resetCount = 0
        }
        if (throttle) {
            return true
        } else {
            throttle = true
        }
        let reg = new RegExp('^#*(一键)?强化圣遗物(([一二三四五六七八九十]|[0-9])*)([\+到至](([一二三四五六七八九十]|[0-9])+)级?)?$')
        let regResult = reg.exec(e.msg)
        //是否一键强化
        let all = regResult[1] ? true : false
        //默认强化第一个
        let id = 1
        //默认强化到20级
        let up = 20

        //要强化的圣遗物数据
        let dataList = await redis.get('xiaoye:syw:qq:' + e.user_id)
        dataList = JSON.parse(dataList)
        if (dataList == null) {
            e.reply('还没有圣遗物哦,请先#刷圣遗物绝缘', true, { at: false, recallMsg: cfg.recall })
            throttle = false
            return true
        }
        if (!all) {
            //强化圣遗物2+20 如果后面带了参数
            if (regResult[2]) {
                //看看有没有+20 如果有+20就代表 2是id
                if (regResult[5]) {
                    //将中文数字转换成阿拉伯数字
                    id = textToNumber(regResult[2])
                    if (id == -1) {
                        id = 1
                    }
                    up = textToNumber(regResult[5])
                    if (up > 20 || up == -1) {
                        up = 20
                    }
                }
                //没有+20的话 如果一次刷了多个圣遗物那么 2就是id 只有一个圣遗物的话2就是等级
                else {
                    if (dataList.length > 1) {
                        //将中文数字转换成阿拉伯数字
                        id = textToNumber(regResult[2])
                        if (id == -1) {
                            id = 1
                        }
                    }
                    else {
                        up = textToNumber(regResult[2])
                        if (up > 20 || up == -1) {
                            up = 20
                        }
                    }
                }
            }
        }
        if (all) {
            let data = {
                data: [],
                msg: []
            }
            for (let i = 0; i < dataList.length; i++) {
                let result = await this.upgrade(dataList[i], up)
                if (result.data) {
                    data.data.push(result.data)
                    data.msg.push([`id:${i + 1}`, ...result.msg])
                } else {
                    data.data.push(dataList[i])
                    let img = await puppeteer.screenshot("syw", dataList[i]);
                    if (!img) {
                        img = await puppeteer.screenshot("syw", dataList[i]);
                    }
                    data.msg.push([`id:${i + 1}`, img])
                }
            }
            await e.reply(await ForwardMsg(e, data.msg), false, { at: false, recallMsg: cfg.recall })
            await redis.set('xiaoye:syw:qq:' + e.user_id, JSON.stringify(data.data), { EX: 86400 })
        } else {
            let data = await this.upgrade(dataList[id - 1], up)
            if (data.data) {
                dataList[id - 1] = data.data
                await redis.set('xiaoye:syw:qq:' + e.user_id, JSON.stringify(dataList), { EX: 86400 })
            }
            await e.reply(data.msg, true, { at: false, recallMsg: cfg.recall })
        }
        throttle = false
        return true
    }

    async alias(e) {
        await syw.getAlias(e)
        return true
    }

    async viewLastTime(e) {
        let dataList = await redis.get('xiaoye:syw:qq:' + e.user_id)
        dataList = JSON.parse(dataList)
        if (dataList == null) {
            e.reply('还没有圣遗物哦,请先#刷圣遗物绝缘', true, { at: false, recallMsg: cfg.recall })
            return true
        }
        if (dataList.length > 1) {
            let img = []
            for (let i = 0; i < dataList.length; i++) {
                let img2 = await puppeteer.screenshot("syw", dataList[i])
                if (!img2) {
                    img2 = await puppeteer.screenshot("syw", dataList[i])
                }
                img.push([`id:${i + 1}`, img2])
            }
            await e.reply(await ForwardMsg(e, img), false, { at: false, recallMsg: cfg.recall })
        } else {
            let img = await puppeteer.screenshot("syw", dataList[0]);
            await e.reply(img, true, { at: false, recallMsg: cfg.recall })
        }
        return true
    }

    async upgrade(data, up) {
        if (!data) {
            return {
                msg: '没有这么多圣遗物呢',
                data: null
            }
        }

        //获得等级
        let level = data.level
        level = parseInt(level)
        if (level == 20) {
            return { msg: '圣遗物已经强化完了,还想强化难道是小攻击拉满了吗', data: null }
        } else if (level + up > 20) {
            up = 20 - level
        }
        //根据等级获得强化次数
        let cishu = parseInt((level % 4 + up) / 4)

        //获取圣遗物名字
        let ArtifactName = data.ArtifactName
        //获取部位
        let Artifact = data.Artifact
        //获取主词条名字
        let main = data.main
        //获取主词条数据
        let mainData = data.mainData
        //获取副词条
        let vice = data.vice
        //获取副词条数值
        let viceData = data.viceData

        let procedure = []

        //如果强化次数大于0
        if (cishu > 0) {
            //四词条
            if (vice.length == 4) {

                let enhanceResult = await syw.enhance(vice, viceData, cishu)
                //强化
                viceData = enhanceResult.viceData

                procedure.push(...enhanceResult.procedure)

            } else if (vice.length == 3) {
                //先加个词条
                let newVice = await syw.getNewVice(main, vice)
                vice.push(newVice)
                let newViceData = (await syw.getViceData([newVice]))[0]
                viceData.push(newViceData)
                procedure.push(`${newVice.display}+${newViceData.display}${newVice.suffix}`)

                //要次数大于1才强化,不然就只加词条
                if (cishu > 1) {
                    //有一次用来加词条了,所以要减1
                    let enhanceResult = await syw.enhance(vice, viceData, cishu - 1)
                    viceData = enhanceResult.viceData
                    procedure.push(...enhanceResult.procedure)
                }
            }
        }

        //等级加一下
        level = level + up
        //设置主词条数据
        mainData = await syw.getMaindata(main.id, level)
        let newData = {
            tplFile: './plugins/xiaoye-plugin/resources/html/syw/syw.html',
            pluResPath: path,
            Artifact,       //部位
            ArtifactName,   //名字
            level,          //等级
            main,           //主词条
            mainData,       //主词条数值
            vice,           //副词条
            viceData,       //副词条数值
            isSave: false   //是否保存
        }
        let img = await puppeteer.screenshot("syw", newData);
        let str = procedure.join(',')
        return { data: newData, msg: [img, '强化过程为:\n' + str] }
    }

}