import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import fs from 'node:fs'
import { segment } from "oicq"

const path = process.cwd().replace(/\\/g, "/");

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
                        reg: '^#*保存圣遗物$',
                        fnc: 'save'
                    },
                    {
                        reg: '^#*查看圣遗物(第[0-9]*页)?$',
                        fnc: 'view'
                    },
                    {
                        reg: '^#*删除圣遗物[0-9]+$',
                        fnc: 'delete'
                    }
                ]
            }
        )
    }

    async save(e) {
        //先判断有没有圣遗物
        let data = await redis.get('xiaoye:syw:qq:' + e.user_id)
        if (!data) {
            e.reply('当前没有圣遗物')
            return true
        }
        data = JSON.parse(data)
        if (data.isSave) {
            e.reply('当前圣遗物已保存')
            return true
        }
        let newData = {
            tplFile: './plugins/xiaoye-plugin/resources/html/syw/syw.html',
            imgType: 'png',
            pluResPath: `${path}`,
            fucitiao: data.fucitiao,
            fucitiaoData: data.fucitiaoData,
            shengyiwu: data.shengyiwu,
            buwei: data.buwei,
            zhucitiao: data.zhucitiao,
            zhucitiaoData: data.zhucitiaoData,
            level: data.level,
            isSave: false
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
            let img = await puppeteer.screenshot("syw", newData);

            //保存图片
            fs.writeFileSync(tempPic, img.file, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        } catch (err) {
            e.reply(`保存失败\n${err}`)
            newData.isSave = false
            return true
        }
        await redis.set('xiaoye:syw:qq:' + e.user_id, JSON.stringify(newData), { EX: 86400 })
        await e.reply('保存成功~');
        return true
    }

    async view(e) {
        let msg = []

        let tempPic = `${path}/plugins/xiaoye-plugin/resources/userData/${e.user_id}`;
        //检查路径是否存在
        if (!fs.existsSync(tempPic)) {
            e.reply('当前没有圣遗物')
            return true
        }
        const files = fs.readdirSync(`${tempPic}/`).filter(file => file.endsWith('.png')).sort((a, b) => {
            return fs.statSync(`${tempPic}/${a}`).mtime.getTime() -
                fs.statSync(`${tempPic}/${b}`).mtime.getTime();
        })
        if (!files.length) {
            e.reply('当前没有圣遗物')
            return true
        }

        let pageReg = new RegExp("^#*查看圣遗物(第(.*)页)*$")
        let page = pageReg.exec(e.msg)[2] || 1
        page = Number(page)

        // 计算页数（50条每页）
        let page_count = Math.ceil(files.length / 50);
        if (page > page_count) {
            e.reply(`没有这么多页数呢`);
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
        msg.unshift(`圣遗物列表,第${page}/${page_count}页,共${files.length}个\n可选择\n#查看圣遗物第1页\n#查看圣遗物第2页...`)
        await this.ForwardMsg(e, msg)
        return true
    }

    async delete(e) {
        let tempPic = `${path}/plugins/xiaoye-plugin/resources/userData/${e.user_id}`;
        let targetId = e.msg.replace(/#|删除圣遗物/g, "").trim();
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
                    e.reply('删除成功~')
                    return
                }
            });
        } catch (err) {
            e.reply(`删除失败\n${err}`)
            return true
        }
        return true

    }

    async ForwardMsg(e, data) {
        let msgList = [];
        for (let i of data) {
            msgList.push({
                message: i,
                nickname: Bot.nickname,
                user_id: Bot.uin,
            });
        }
        if (msgList.length == 1) {
            await e.reply(msgList[0].message);
        }
        else {
            if (e.isGroup) {
                await e.reply(await e.group.makeForwardMsg(msgList))
            } else {
                await e.reply(await e.friend.makeForwardMsg(msgList))
            }
        }
        return true;
    }

}