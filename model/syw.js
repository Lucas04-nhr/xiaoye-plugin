import cfg from './readConfig.js'
import moment from "moment";
import { ForwardMsg } from "./index.js"
import data from '../resources/data/data.js'

export default new class syw {
    /**
     * 定义一个函数，用于根据给定的概率数组从一个数组中随机选择一个元素
     * @param {*} arr 指定的数组
     * @param {*} prob 指定的概率
     * @returns 数组种一项
     */
    async getRandomItem(arr, prob) {
        // 计算概率数组的总和
        let sum = prob.reduce((acc, val) => acc + val);
        // 生成一个随机数
        let rand = Math.random() * sum;
        // 定义累积概率变量
        let cumulativeProb = 0;
        // 遍历数组
        for (let i = 0; i < arr.length; i++) {
            // 累加概率
            cumulativeProb += prob[i];
            // 如果随机数小于累积概率，则返回当前元素
            if (rand < cumulativeProb) {
                return arr[i];
            }
        }
    }

    /**
     * 看看有没有这个副本
     * @param {*} DomainName 用户输入的副本名字 
     * @returns 这个副本的圣遗物
     */
    async getArtifactsDomain(DomainName) {
        if (DomainName == '随机') {
            const i = Math.floor((Math.random() * data.ArtifactsDomains.length))
            return data.ArtifactsDomains[i].Artifacts
        }
        for (let i = 0; i < data.ArtifactsDomains.length; i++) {
            if (data.ArtifactsDomains[i].alias.includes(DomainName)) {
                return data.ArtifactsDomains[i].Artifacts
            }
        }
        return false
    }

    /**
     * 获得一个部位
     * @returns id,name,mainList
     */
    async getArtifact() {
        const prob = cfg.buwei
        const arr = data.Artifacts
        return await this.getRandomItem(arr, prob)
    }

    /**
     * 获得圣遗物名字和图片
     * @param {*} id 部位id
     * @param {*} ArtifactsDomain 副本
     * @returns 圣遗物名字,图片地址
     */
    async getArtifactName(id, ArtifactsDomain) {
        const ArtifactName = {
            name: null,
            icon: null
        }
        let random = Math.round(Math.random())
        ArtifactName.name = ArtifactsDomain[id].name[random]
        ArtifactName.icon = ArtifactsDomain[id].icon[random]
        return ArtifactName
    }

    /**
     * 获得主词条
     * @param {*} id
     * @param {*} mainList 
     * @returns 
     */
    async getMain(id, mainList) {
        if (mainList.length == 1) {
            return mainList[0]
        } else {
            //概率的数组
            let prob
            //时之沙
            if (id == 'SandsOfEon') {
                prob = cfg.shizhisha
            }
            //空之杯
            else if (id == 'GobletOfEonothem') {
                prob = cfg.kongzhibei
            }
            //理之冠
            else if (id == 'CircletOfLogos') {
                prob = cfg.lizhiguan
            }
            return await this.getRandomItem(mainList, prob)
        }
    }

    /**
     * 根据等级给主词条加数值
     * @param {*} id 
     * @param {*} level 
     * @returns 
     */
    async getMaindata(id, level) {
        if (data.mainUpData[id].percentage) {
            return data.mainUpData[id].data[level].toFixed(1)
        } else {
            return Math.round(data.mainUpData[id].data[level])
        }
    }

    /**
     * 获得副词条
     * @param {*} mainId 
     */
    async getVice(mainId) {
        //确定是三词条还是四词条
        let entryProb = cfg.citiao
        let entryCount = await this.getRandomItem([3, 4], entryProb)

        let viceList = data.viceList
        let viceProb = cfg.fucitiao
        let result = [];
        let maxIterations = 100;
        for (let i = 0; i < entryCount; i++) {
            let item;
            let iterations = 0;
            do {
                item = await this.getRandomItem(viceList, viceProb);
                iterations++;
                if (iterations > maxIterations) {
                    //防止这个老毕登改的概率贼奇葩整了个死循环
                    item = await this.getRandomItem(viceList, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
                }
            } while (result.includes(item) || item.id == mainId);
            result.push(item);
        }
        return result
    }

    /**
     * 给副词条加初始值
     * @param {*} vice 
     * @returns 
     */
    async getViceData(vice) {
        let result = []
        //循环每个副词条
        for (let i = 0; i < vice.length; i++) {
            //先判断是第几档
            //强化档位概率数组
            let qualityProb = cfg.qianghua
            //判断强化第几档 [第一档最高,二,三,第四档最低]
            let quality = await this.getRandomItem([3, 2, 1, 0], qualityProb)
            //初始值
            let oldValue = data.viceUpData[vice[i].id].data[quality]
            //四舍五入后的值
            let display = vice[i].percentage ? oldValue.toFixed(1) : Math.round(oldValue)
            //然后获取这个圣遗物的强化数值
            result.push({ oldValue, display })
        }
        return result
    }

    /**
     * 强化
     * @param {*} vice 
     * @param {*} viceData 
     * @param {*} cishu 
     * @returns 
     */
    async enhance(vice, viceData, cishu) {
        //过程
        let procedure = []
        for (let k = 0; k < cishu; k++) {
            //获得强化的词条
            let thisEnhanceVice = await this.getOneEnhanceVice(vice)
            //获得强化的数值
            let thisEnhanceViceData = await this.getOneEnhanceViceData(thisEnhanceVice)
            let thisEnhanceViceDataDisplay = thisEnhanceVice.percentage ? thisEnhanceViceData.toFixed(1) : Math.round(thisEnhanceViceData)
            procedure.push(`${thisEnhanceVice.display}+${thisEnhanceViceDataDisplay}${thisEnhanceVice.suffix}`)
            //循环副词条找到这个副词条然后相加
            for (let j = 0; j < vice.length; j++) {
                if (vice[j].id == thisEnhanceVice.id) {
                    viceData[j].oldValue = viceData[j].oldValue + thisEnhanceViceData
                    viceData[j].display = vice[j].percentage ? viceData[j].oldValue.toFixed(1) : Math.round(viceData[j].oldValue)
                    break
                }
            }
        }
        return { viceData, procedure }
    }

    /**
     * 获得本次强化的词条
     * @param {*} vice 
     * @returns 
     */
    async getOneEnhanceVice(vice) {
        //强化的副词条概率数组
        let probability = cfg.fucitiaoqianghua
        let viceProp = []
        //循环当前圣遗物副词条列表
        for (let i = 0; i < vice.length; i++) {
            //循环总圣遗物副词条列表
            for (let j = 0; j < data.viceList.length; j++) {
                //如果当前正在循环的圣遗物等于总圣遗物副词条列表中的圣遗物
                if (vice[i].id == data.viceList[j].id) {
                    //总圣遗物列表中的循序和概率中的循序是一样的,所以直接赋值
                    viceProp.push(probability[j])
                }
            }
        }
        //判断强化哪个词条
        return await this.getRandomItem(vice, viceProp)
    }

    /**
     * 获得本次强化的数值
     * @param {*} thisEnhanceVice 
     * @returns 
     */
    async getOneEnhanceViceData(thisEnhanceVice) {
        //强化档位概率数组
        let qianghuadangwei = cfg.qianghua
        //判断强化第几档 [第一档最高,二,三,第四档最低]
        let i = await this.getRandomItem([3, 2, 1, 0], qianghuadangwei)
        //然后获取这个圣遗物的强化数值
        return data.viceUpData[thisEnhanceVice.id].data[i]
    }

    /**
     * 加第四个词条
     * @param {*} zhucitiao 
     * @param {*} fucitiao 
     * @param {*} buwei 
     * @returns 
     */
    async getNewVice(main, vice) {
        let item
        let maxIterations = 100;
        let iterations = 0;
        do {
            item = await this.getRandomItem(data.viceList, cfg.fucitiao)
            iterations++;
            if (iterations > maxIterations) {
                //防止这个老毕登改的概率贼奇葩整了个死循环
                item = await this.getRandomItem(viceList, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
            }
        } while (vice.find(element => element.id === item.id) || item.id == main.id);
        return item
    }

    /**
     * 获得副本别名
     * @param {*} e 
     */
    async getAlias(e) {
        let msg = ['当前副本别名']
        for (let i = 0; i < data.ArtifactsDomains.length; i++) {
            msg.push(data.ArtifactsDomains[i].name + '：' + data.ArtifactsDomains[i].alias.join('，'))
        }
        await e.reply(await ForwardMsg(e, msg))
    }

    /**
     * 检查cd
     * @param {*} e 
     * @returns 
     */
    async getCD(e) {
        if (cfg.cd > 0) {
            if (!e.isMaster) {
                return await redis.ttl('xiaoye:syw:cd:qq:' + e.user_id)
            }
        }
        return 0
    }

    /**
     * 设置cd
     * @param {*} e 
     */
    async setCD(e) {
        if (cfg.cd > 0) {
            await redis.set('xiaoye:syw:cd:qq:' + e.user_id, JSON.stringify('cd'), { EX: cfg.cd })
        }
    }

    /**
     * 查看次数
     * @param {*} e 
     * @returns 
     */
    async getCishu(e) {
        if (cfg.cishu > 0) {
            if (!e.isMaster) {
                let data = await redis.get(`xiaoye:syw:cishu:qq:${e.user_id}`)
                if (!data) {
                    return cfg.cishu
                } else {
                    return cfg.cishu - data
                }
            }
        }
        return 999
    }

    /**
     * 设置次数
     * @param {*} e 
     * @param {*} i 
     */
    async setCishu(e, i) {
        if (cfg.cishu > 0) {
            if (!e.isMaster) {
                let time = moment(Date.now()).add(1, "days").format("YYYY-MM-DD 00:00:00");
                // 到明日0点的剩余秒数
                let exTime = Math.round(
                    (new Date(time).getTime() - new Date().getTime()) / 1000
                );
                let data = await redis.get(`xiaoye:syw:cishu:qq:${e.user_id}`)
                if (!data) {
                    await redis.set(`xiaoye:syw:cishu:qq:${e.user_id}`, i * 1, { EX: exTime })
                } else {
                    await redis.set(`xiaoye:syw:cishu:qq:${e.user_id}`, Number(data) + i, { EX: exTime })
                }
            }
        }
    }

}