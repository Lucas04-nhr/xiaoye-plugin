import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import fs from 'node:fs'

import { textToNumber, ForwardMsg } from "../model/index.js"

const path = process.cwd();

export class save extends plugin {
    constructor() {
        super(
            {
                name: '保存圣遗物',
                dsc: '保存圣遗物',
                event: 'message',
                priority: '5000',
                rule: [
                    {
                        reg: '^#*保存圣遗物([一二三四五六七八九十]|[0-9])*$',
                        fnc: 'save'
                    },
                    {
                        reg: '^#*查看圣遗物(第([一二三四五六七八九十]|[0-9])+页)?$',
                        fnc: 'view'
                    },
                    {
                        reg: '^#*删除圣遗物([一二三四五六七八九十]|[0-9])+$',
                        fnc: 'delete'
                    }
                ]
            }
        )
    }

    async save(e) {
        //先判断有没有圣遗物
        let dataList = await redis.get('xiaoye:syw:qq:' + e.user_id)
        dataList = JSON.parse(dataList)
        if (dataList == null) {
            e.reply('还没有圣遗物哦,请先#刷圣遗物绝缘', true)
            return true
        }
        //默认保存第一个
        let id = 1
        //一次刷多个的话需要id
        if (dataList.length > 1) {
            let reg = new RegExp('(([一二三四五六七八九十]|[0-9])*)$')
            if (reg.exec(e.msg)[1]) {
                let regResult = reg.exec(e.msg)[1]
                id = textToNumber(regResult)
                if (id == -1) {
                    id = 1
                }
            } else {
                await e.reply('要保存圣遗物的id呢', true)
                return true
            }

        }

        if (!dataList[id - 1]) {
            await e.reply(`没有id为${id}的圣遗物呢`, true)
            return true
        }
        if (dataList[id - 1].isSave) {
            e.reply('这个圣遗物已经保存了', true)
            return true
        }
        let newData = {
            tplFile: './plugins/xiaoye-plugin/resources/html/syw/syw.html',
            imgType: 'png',
            pluResPath: path,
            Artifact: dataList[id - 1].Artifact,
            ArtifactName: dataList[id - 1].ArtifactName,
            level: dataList[id - 1].level,
            main: dataList[id - 1].main,
            mainData: dataList[id - 1].mainData,
            vice: dataList[id - 1].vice,
            viceData: dataList[id - 1].viceData,
            isSave: dataList[id - 1].isSave,
        }

        try {
            let tempPic = `${path}/plugins/xiaoye-plugin/resources/userData/${e.user_id}`;
            //检查路径是否存在,不存在就创建
            if (!fs.existsSync(tempPic)) {
                fs.mkdirSync(tempPic, (err) => {
                    if (err) {
                        console.error(err);
                    }
                })
            }
            //获得最新的png到哪了
            const files = fs.readdirSync(`${tempPic}/`).filter(file => file.endsWith('.png')).sort((a, b) => {
                return fs.statSync(`${tempPic}/${a}`).mtime.getTime() -
                    fs.statSync(`${tempPic}/${b}`).mtime.getTime();
            })
            if (files.length) {
                let reg = new RegExp("([0-9]*)\.png")
                tempPic = tempPic + '/' + (Number(reg.exec(files[files.length - 1])[1]) + 1) + '.png'
            } else {
                tempPic = tempPic + '/' + '1.png'
            }

            newData.isSave = true
            dataList[id - 1] = newData
            let img = await puppeteer.screenshot("syw", newData);

            //保存图片
            fs.writeFileSync(tempPic, img.file, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        } catch (err) {
            e.reply(`保存失败\n${err}`, true)
            newData.isSave = false
            dataList[id - 1] = newData
            return true
        }
        await redis.set('xiaoye:syw:qq:' + e.user_id, JSON.stringify(dataList), { EX: 86400 })
        await e.reply('保存成功~', true);
        return true
    }

    async view(e) {
        let msg = []

        let tempPic = `${path}/plugins/xiaoye-plugin/resources/userData/${e.user_id}`;
        //检查路径是否存在
        if (!fs.existsSync(tempPic)) {
            e.reply('还没有保存圣遗物呢', true)
            return true
        }
        const files = fs.readdirSync(`${tempPic}/`).filter(file => file.endsWith('.png')).sort((a, b) => {
            return fs.statSync(`${tempPic}/${a}`).mtime.getTime() -
                fs.statSync(`${tempPic}/${b}`).mtime.getTime();
        })
        if (!files.length) {
            e.reply('还没有保存圣遗物呢', true)
            return true
        }

        let pageReg = new RegExp("^#*查看圣遗物(第(.*)页)*$")
        let page = pageReg.exec(e.msg)[2] || 1
        page = textToNumber(page)
        if (page == -1) {
            page = 1
        }

        // 计算页数（50条每页）
        let page_count = Math.ceil(files.length / 50);
        if (page > page_count) {
            e.reply(`没有这么多页数呢`, true);
            return true
        }

        // 取出指定的一页
        let selected_page = [];
        selected_page = files.slice((page - 1) * 50, page * 50);

        let reg = new RegExp("([0-9]*)\.png")
        selected_page.forEach(file => {
            let id = reg.exec(file)[1]
            let img = segment.image(`${tempPic}/${file}`)
            msg.push([`id:${id}`, img])
        });
        msg.unshift(`圣遗物列表,第${page}/${page_count}页,共${files.length}个\n可选择\n#查看圣遗物第1页\n#查看圣遗物第2页\n#删除圣遗物1...`)
        await e.reply(await ForwardMsg(e, msg))
        return true
    }

    async delete(e) {
        let tempPic = `${path}/plugins/xiaoye-plugin/resources/userData/${e.user_id}`;
        let targetId = e.msg.replace(/#|删除圣遗物/g, "").trim();
        let id = textToNumber(targetId)
        if (id == -1) {
            e.reply('输入错误!', true)
            return true
        }
        try {
            //有这个id就删 没有就无响应
            const files = fs.readdirSync(`${tempPic}/`).filter(file => file.endsWith('.png'))
            let reg = new RegExp("([0-9]*)\.png")
            files.forEach(file => {
                let id = reg.exec(file)[1]
                if (targetId == id) {
                    fs.unlinkSync(`${tempPic}/${file}`, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                    e.reply('删除成功~', true)
                    return
                }
            });
        } catch (err) {
            e.reply(`删除失败\n${err}`, true)
            return true
        }
        return true

    }
}