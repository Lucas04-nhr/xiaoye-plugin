import YAML from 'yaml'
import fs from 'node:fs'
import chokidar from 'chokidar'


/** 配置文件 */
class syw {
    constructor() {
        this.data = {}

    }

    /** 部位列表 */
    get buweiList() {
        return this.getData().buweiList
    }

    /** 时之沙主词条列表 */
    get shizhishazhucitiaoList() {
        return this.getData().shizhishazhucitiaoList
    }

    /** 空之杯主词条列表 */
    get kongzhibeizhucitiaoList() {
        return this.getData().kongzhibeizhucitiaoList
    }

    /** 理之冠主词条列表 */
    get lizhiguanzhucitiaoList() {
        return this.getData().lizhiguanzhucitiaoList
    }

    /** 副词条列表 */
    get fucitiaoList() {
        return this.getData().fucitiaoList
    }

    /** 暴击伤害成长值 */
    get baojishanghai() {
        return this.getData().baojishanghai
    }

    /** 暴击率成长值 */
    get baojilv() {
        return this.getData().baojilv
    }

    /** 攻击力成长值 */
    get gongjili() {
        return this.getData().gongjili
    }

    /** 小攻击成长值 */
    get xiaogongji() {
        return this.getData().xiaogongji
    }

    /** 生命值成长值 */
    get shengmingzhi() {
        return this.getData().shengmingzhi
    }

    /** 小生命成长值 */
    get xiaoshengming() {
        return this.getData().xiaoshengming
    }

    /** 防御力成长值 */
    get fangyuli() {
        return this.getData().fangyuli
    }

    /** 小防御成长值 */
    get xiaofangyu() {
        return this.getData().xiaofangyu
    }

    /** 充能成长值 */
    get chongneng() {
        return this.getData().chongneng
    }

    /** 精通成长值 */
    get jingtong() {
        return this.getData().jingtong
    }

    /** 生之花主词条成长值 */
    get shengzhihuaupdata() {
        return this.getData().shengzhihuaupdata
    }

    /** 死之羽主词条成长值 */
    get sizhiyuupdata() {
        return this.getData().sizhiyuupdata
    }

    /** 精通主词条成长值 */
    get jingtongupdata() {
        return this.getData().jingtongupdata
    }

    /** 攻击力主词条成长值 */
    get gongjiliupdata() {
        return this.getData().gongjiliupdata
    }

    /** 充能主词条成长值 */
    get chongnengupdata() {
        return this.getData().chongnengupdata
    }

    /** 防御力主词条成长值 */
    get fangyuliupdata() {
        return this.getData().fangyuliupdata
    }

    /** 生命值主词条成长值 */
    get shengmingzhiupdata() {
        return this.getData().shengmingzhiupdata
    }

    /** 元素伤害主词条成长值 */
    get shanghaijiachengupdata() {
        return this.getData().shanghaijiachengupdata
    }

    /** 物理伤害主词条成长值 */
    get wulishanghaiupdata() {
        return this.getData().wulishanghaiupdata
    }

    /** 暴击率主词条成长值 */
    get baojilvupdata() {
        return this.getData().baojilvupdata
    }

    /** 暴击伤害主词条成长值 */
    get baojishanghaiupdata() {
        return this.getData().baojishanghaiupdata
    }

    /** 治疗主词条成长值 */
    get zhiliaoupdata() {
        return this.getData().zhiliaoupdata
    }

    /** 副本 */
    get fuben() {
        return this.getData().fuben
    }

    /** 用户配置 */
    getData() {
        return this.getYaml('data')
    }

    /**
     * 获取配置yaml
     * @param name 名称
     */
    getYaml(name) {
        const dataPath = process.cwd().replace(/\\/g, "/") + '/plugins/xiaoye-plugin/resources/data/'
        let file = dataPath + `${name}.yaml`
        let key = `${name}`
        if (this.data[key]) return this.data[key]
        this.data[key] = YAML.parse(
            fs.readFileSync(file, 'utf8')
        )

        return this.data[key]
    }


}

export default new syw()
