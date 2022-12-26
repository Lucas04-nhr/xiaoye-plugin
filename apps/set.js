import plugin from '../../../lib/plugins/plugin.js'
import cfg from '../model/config.js'

export class ssyw extends plugin {
    constructor() {
        super(
            {
                name: '小叶插件设置',
                dsc: '小叶插件设置',
                event: 'message',
                priority: '5000',
                rule: [
                    {
                        reg: '^#*小叶(插件)?设置.*$',
                        fnc: 'set'
                    }
                ]
            }
        )
    }

    async set(e) {
        return
    }

}