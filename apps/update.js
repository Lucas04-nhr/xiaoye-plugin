import plugin from '../../../lib/plugins/plugin.js'
import { exec } from 'child_process'

const _path = process.cwd();

const checkAuth = async function (e) {
    if (!e.isMaster) {
        e.reply(`只有主人才能更新哦`)
        return false
    }
    return true
}

let timer

export class update extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '小叶插件更新',
            /** 功能描述 */
            dsc: '小叶插件更新',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 999,
            rule: [
                {
                    reg: '^#小叶(强制)?更新$',
                    fnc: 'update'
                }
            ]
        })
    }



    async update(e) {
        if (!await checkAuth(e)) {
            return true
        }
        let isForce = e.msg.includes('强制')
        let command = 'git  pull'
        if (isForce) {
            command = 'git  checkout . && git  pull'
            e.reply('正在执行强制更新操作，请稍等')
        } else {
            e.reply('正在执行更新操作，请稍等')
        }
        exec(command, { cwd: `${_path}/plugins/xiaoye-plugin/` }, async function (error, stdout, stderr) {
            if (/(Already up[ -]to[ -]date|已经是最新的)/.test(stdout)) {
                e.reply('目前已经是最新版小叶插件了')
                return true
            }
            if (error) {
                e.reply('小叶插件更新失败！\nError code: ' + error.code + '\n' + error.stack + '\n 请稍后重试。')
                return true
            }
            e.reply('小叶插件更新成功，请手动重新启动Yunzai以应用更新...')
        })
        return true
    }
}