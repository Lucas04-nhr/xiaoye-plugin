import syw from './readData.js'
import config from './readConfig.js'

let util = {

    //根据概率随机获得一个
    async randomGetOne(probability) {
        //概率总和
        let probabilitySum = probability.reduce((acc, cur) => acc + cur)
        let randomNumber = Math.floor(Math.random() * probabilitySum) + 1;
        let sum = 0
        let ret
        for (let i = 0; i < probability.length; i++) {
            sum = sum + probability[i]
            if (randomNumber <= sum) {
                ret = i
                break
            }
        }
        return ret
    },

    //获得一个部位
    async getBuwei() {
        //概率数组 [花,毛,沙,杯,头]
        let probability = config.buwei
        let i = await this.randomGetOne(probability)
        return syw.buweiList[i]
    },

    //获得主词条
    async getZhucitiao(buwei) {
        let zhucitiao
        //概率的数组
        let probability

        if (buwei == syw.buweiList[0]) {//生之花
            zhucitiao = '生命值'
        } else if (buwei == syw.buweiList[1]) {//死之羽
            zhucitiao = '攻击力'
        } else if (buwei == syw.buweiList[2]) {//时之沙
            //时之沙主词条的概率
            probability = config.shizhisha
            let i = await this.randomGetOne(probability)
            zhucitiao = syw.shizhishazhucitiaoList[i]
        } else if (buwei == syw.buweiList[3]) {//空之杯
            //空之杯主词条的概率
            probability = config.kongzhibei
            let i = await this.randomGetOne(probability)
            zhucitiao = syw.kongzhibeizhucitiaoList[i]
        } else if (buwei == syw.buweiList[4]) {//理之冠
            //理之冠主词条的概率
            probability = config.lizhiguan
            let i = await this.randomGetOne(probability)
            zhucitiao = syw.lizhiguanzhucitiaoList[i]
        }
        return zhucitiao;
    },

    //获得副词条
    async getFucitiao(zhucitiao, buwei) {
        //确定是三词条还是四词条  [3,4]
        let citiaoProbability = config.citiao
        let citiaoNum = await this.randomGetOne(citiaoProbability) == 0 ? 3 : 4

        //副词条列表
        let fucitiaolist = JSON.parse(JSON.stringify(syw.fucitiaoList))

        //副词条概率数组
        let fucitiaoProbability = JSON.parse(JSON.stringify(config.fucitiao))

        //把副词条和概率对应起来
        for (let i = 0; i < fucitiaolist.length; i++) {
            fucitiaolist[i] = [fucitiaolist[i], fucitiaoProbability[i]]
        }

        //副词条中不能出现主词条,同时也要移除副词条概率中的值
        if (buwei == syw.buweiList[0]) {//生之花
            fucitiaolist = await this.removeArr2(fucitiaolist, '小生命')
        } else if (buwei == syw.buweiList[1]) {//死之羽
            fucitiaolist = await this.removeArr2(fucitiaolist, '小攻击')
        } else {
            fucitiaolist = await this.removeArr2(fucitiaolist, zhucitiao)
        }

        //返回值
        let ret = []
        //根据词条数量循环获得副词条
        for (let i = 0; i < citiaoNum; i++) {
            //总概率
            let fucitiaoprobability = 0
            fucitiaolist.forEach(item => {
                fucitiaoprobability += item[1];
            });
            //根据总概率获得一个随机值
            let randomNumber = Math.floor(Math.random() * fucitiaoprobability) + 1;
            let sum = 0
            for (let j = 0; j < fucitiaolist.length; j++) {
                sum = sum + fucitiaolist[j][1]
                if (randomNumber <= sum) {
                    ret[i] = fucitiaolist[j][0]
                    fucitiaolist = await this.removeArr2(fucitiaolist, fucitiaolist[j][0])
                    break
                }
            }
        }
        return ret;
    },

    //给副词条加初始值
    async getFucitiaoData(fucitiao) {
        let ret = []
        //循环每个副词条
        for (let i = 0; i < fucitiao.length; i++) {
            //先判断是第几档
            //强化档位概率数组
            let qianghuadangwei = config.qianghua
            //判断强化第几档 [第一档最高,二,三,第四档最低]
            let j = await this.randomGetOne(qianghuadangwei)
            //然后获取这个圣遗物的强化数值
            ret[i] = await this.getData(fucitiao[i], j)
        }
        return ret
    },

    //给单个副词条加初始值
    async getOnefucitiaoData(fucitiao) {
        //先判断是第几档
        //强化档位概率数组
        let qianghuadangwei = config.qianghua
        //判断强化第几档 [第一档最高,二,三,第四档最低]
        let i = await this.randomGetOne(qianghuadangwei)
        //然后获取这个圣遗物的强化数值
        let ret = await this.getData(fucitiao, i)
        return ret
    },

    //获得第四个词条
    async getOneFucitiao(zhucitiao, fucitiao, buwei) {
        //副词条列表
        let fucitiaolist = JSON.parse(JSON.stringify(syw.fucitiaoList))

        //副词条概率数组
        let fucitiaoProbability = JSON.parse(JSON.stringify(config.fucitiao))

        //把副词条和概率对应起来
        for (let i = 0; i < fucitiaolist.length; i++) {
            fucitiaolist[i] = [fucitiaolist[i], fucitiaoProbability[i]]
        }

        //副词条中不能出现主词条,同时也要移除副词条概率中的值
        if (buwei == syw.buweiList[0]) {//生之花
            fucitiaolist = await this.removeArr2(fucitiaolist, '小生命')
        } else if (buwei == syw.buweiList[1]) {//死之羽
            fucitiaolist = await this.removeArr2(fucitiaolist, '小攻击')
        } else {
            fucitiaolist = await this.removeArr2(fucitiaolist, zhucitiao)
        }
        //移除已有的副词条
        for (let i = 0; i < fucitiao.length; i++) {
            fucitiaolist = await this.removeArr2(fucitiaolist, fucitiao[i])
        }
        //返回值
        let ret
        //总概率
        let fucitiaoprobability = 0
        fucitiaolist.forEach(item => {
            fucitiaoprobability += item[1];
        });
        //根据总概率获得一个随机值
        let randomNumber = Math.floor(Math.random() * fucitiaoprobability) + 1;
        let sum = 0
        for (let i = 0; i < fucitiaolist.length; i++) {
            sum = sum + fucitiaolist[i][1]
            if (randomNumber <= sum) {
                ret = fucitiaolist[i][0]
                fucitiaolist = await this.removeArr2(fucitiaolist, fucitiaolist[i][0])
                break
            }
        }
        return ret;
    },

    //获得强化的词条
    async getQianghuacitiao(fucitiao) {
        //强化的副词条概率数组
        let probability = config.fucitiaoqianghua
        probability = await this.getQianghuagailv(probability, fucitiao)
        //判断强化哪个词条
        let i = await this.randomGetOne(probability)
        return fucitiao[i]
    },

    //获得强化的数值
    async getQianghuashuzhi(fucitiao) {
        //强化档位概率数组
        let qianghuadangwei = config.qianghua
        //判断强化第几档 [第一档最高,二,三,第四档最低]
        let i = await this.randomGetOne(qianghuadangwei)
        //然后获取这个圣遗物的强化数值
        let ret = await this.getData(fucitiao, i)
        return ret
    },

    //获得每种词条的强化数值
    async getData(fucitiao, i) {
        let ret
        if (fucitiao == '精通') {
            ret = syw.jingtong[i]
        } else if (fucitiao == '攻击力') {
            ret = syw.gongjili[i]
        } else if (fucitiao == '防御力') {
            ret = syw.fangyuli[i]
        } else if (fucitiao == '充能') {
            ret = syw.chongneng[i]
        } else if (fucitiao == '生命值') {
            ret = syw.shengmingzhi[i]
        } else if (fucitiao == '暴击率') {
            ret = syw.baojilv[i]
        } else if (fucitiao == '暴击伤害') {
            ret = syw.baojishanghai[i]
        } else if (fucitiao == '小防御') {
            ret = syw.xiaofangyu[i]
        } else if (fucitiao == '小生命') {
            ret = syw.xiaoshengming[i]
        } else if (fucitiao == '小攻击') {
            ret = syw.xiaogongji[i]
        }
        return ret
    },

    //获得当前强化圣遗物的副词条概率
    async getQianghuagailv(qianghuagailv, fucitiao) {
        //返回值
        let ret = []
        //循环当前圣遗物副词条列表
        for (let i = 0; i < fucitiao.length; i++) {
            //循环总圣遗物副词条列表
            for (let j = 0; j < syw.fucitiaoList.length; j++) {
                //如果当前正在循环的圣遗物等于总圣遗物副词条列表中的圣遗物
                if (fucitiao[i] == syw.fucitiaoList[j]) {
                    //总圣遗物列表中的循序和概率中的循序是一样的,所以直接赋值
                    ret[i] = qianghuagailv[j]
                }
            }
        }
        return ret
    },

    //发送转发消息
    //输入data一个数组,元素是字符串,每一个元素都是一条消息.
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
            await e.reply(await Bot.makeForwardMsg(msgList));
        }
        return;
    },

    //给副词条加%
    async fucitiaoAddfuhao(fucitiao, fucitiaoData) {
        let data = fucitiaoData
        let arr = ['攻击力', '防御力', '充能', '生命值', '暴击率', '暴击伤害']
        for (let i = 0; i < fucitiaoData.length; i++) {
            if (arr.includes(fucitiao[i])) {
                data[i] = data[i] + '%'
            }

        }
        return data
    },


    //主词条升级+20
    async randomUpZhucitiao(zhucitiao, buwei) {
        let zhucitiaoData
        if (buwei == '生之花') {
            zhucitiaoData = '4780'
        } else if (buwei == '死之羽') {
            zhucitiaoData = '311'
        } else {
            if (zhucitiao == '精通') {
                zhucitiaoData = '187'
            } else if (zhucitiao == '攻击力') {
                zhucitiaoData = '46.6%'
            } else if (zhucitiao == '防御力') {
                zhucitiaoData = '58.3%'
            } else if (zhucitiao == '充能') {
                zhucitiaoData = '51.8%'
            } else if (zhucitiao == '生命值') {
                zhucitiaoData = '46.6%'
            } else if (zhucitiao == '暴击率') {
                zhucitiaoData = '31.1%'
            } else if (zhucitiao == '暴击伤害') {
                zhucitiaoData = '62.2%'
            } else if (zhucitiao == '治疗加成') {
                zhucitiaoData = '35.9%'
            } else {
                zhucitiaoData = '46.6%'
            }
        }
        return zhucitiaoData;
    },

    //给主词条加初始值
    async zhucitiaoAddData(zhucitiao, buwei) {
        let zhucitiaoData
        if (buwei == '生之花') {
            zhucitiaoData = '717'
        } else if (buwei == '死之羽') {
            zhucitiaoData = '47'
        } else {
            if (zhucitiao == '精通') {
                zhucitiaoData = '28'
            } else if (zhucitiao == '攻击力') {
                zhucitiaoData = '7.0%'
            } else if (zhucitiao == '防御力') {
                zhucitiaoData = '8.7%'
            } else if (zhucitiao == '充能') {
                zhucitiaoData = '7.8%'
            } else if (zhucitiao == '生命值') {
                zhucitiaoData = '7.0%'
            } else if (zhucitiao == '暴击率') {
                zhucitiaoData = '4.7%'
            } else if (zhucitiao == '暴击伤害') {
                zhucitiaoData = '9.3%'
            } else if (zhucitiao == '治疗加成') {
                zhucitiaoData = '5.4%'
            } else {
                zhucitiaoData = '7.0%'
            }
        }
        return zhucitiaoData;
    },

    //随机获得指定位置指定副本的套装之一
    async randomShengyiwu(buwei, fuben) {
        let shengyiwu
        if (buwei == '生之花') {
            shengyiwu = await this.getRandomArrOne(fuben.生之花)
        } else if (buwei == '死之羽') {
            shengyiwu = await this.getRandomArrOne(fuben.死之羽)
        } else if (buwei == '时之沙') {
            shengyiwu = await this.getRandomArrOne(fuben.时之沙)
        } else if (buwei == '空之杯') {
            shengyiwu = await this.getRandomArrOne(fuben.空之杯)
        } else if (buwei == '理之冠') {
            shengyiwu = await this.getRandomArrOne(fuben.理之冠)
        }
        return shengyiwu;
    },

    //确定圣遗物具体部位名字
    async shengyiwu(buwei, fuben) {
        let shengyiwu

        if (fuben == '火本' || fuben == '魔女' || fuben == '渡火' || fuben == '火套') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.huoben)
        } else if (fuben == '冰本' || fuben == '冰套' || fuben == '水本' || fuben == '水套') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.binben)
        } else if (fuben == '雷本' || fuben == '平雷' || fuben == '如雷' || fuben == '雷套') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.leiben)
        } else if (fuben == '风本' || fuben == '风套' || fuben == '少女') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.fengben)
        } else if (fuben == '岩本' || fuben == '磐岩' || fuben == '岩套' || fuben == '逆飞的流星') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.yanben)
        } else if (fuben == '宗室' || fuben == '骑士') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.zongshi)
        } else if (fuben == '千岩' || fuben == '苍白') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.qianyan)
        } else if (fuben == '追忆' || fuben == '绝缘') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.jueyuan)
        } else if (fuben == '华馆' || fuben == '海染' || fuben == '华冠' || fuben == '华倌') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.huaguan)
        } else if (fuben == '辰砂' || fuben == '来歆' || fuben == '余响') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.chensha)
        } else if (fuben == '草本' || fuben == '草套' || fuben == '饰金') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.caoben)
        } else if (fuben == '乐团' || fuben == '角斗士') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.qita)
        } else if (fuben == '楼阁' || fuben == '乐园' || fuben == '沙上楼阁史话' || fuben == '乐园遗落之花') {
            shengyiwu = await this.randomShengyiwu(buwei, syw.louge)
        }
        else {
            return false
        }
        return shengyiwu
    },

    //从数组中随机取一个值
    async getRandomArrOne(arr) {
        return arr[Math.floor((Math.random() * arr.length))]
    },

    //移除数组中的元素
    async removeArr(arr, removeItem) {
        let index = arr.indexOf(removeItem)
        let newArr = arr
        if (index > -1) {
            newArr.splice(index, 1)
        }
        return newArr;
    },

    //移除数组中的元素
    async removeArr2(arr, removeItem) {
        let index = arr.findIndex(item => item[0] == removeItem)
        let newArr = arr
        if (index > -1) {
            newArr.splice(index, 1)
        }
        return newArr;
    },

    async getGayCD(e) {
        if (config.cd > 0) {
            if (!e.isMaster) {
                let cd = await redis.ttl('xiaoye:syw:cd:qq:' + e.user_id)
                return cd
            }
        }
        return 0
    },

    async setGayCD(e) {
        if (config.cd > 0) {
            await redis.set('xiaoye:syw:cd:qq:' + e.user_id, JSON.stringify('cd'), { EX: config.cd })
        }
    }
}
export default util
