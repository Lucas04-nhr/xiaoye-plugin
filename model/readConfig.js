import YAML from 'yaml'
import fs from 'node:fs'
import chokidar from 'chokidar'


/** 配置文件 */
class Cfg {
  constructor() {
    this.config = {}

    /** 监听文件 */
    this.watcher = { config: {}, defSet: {} }

  }

  /** 时之沙主词条概率 */
  get shizhisha() {
    return this.getConfig('config').shizhisha
  }

  /** 空之杯主词条概率 */
  get kongzhibei() {
    return this.getConfig('config').kongzhibei
  }

  /** 理之冠主词条概率 */
  get lizhiguan() {
    return this.getConfig('config').lizhiguan
  }

  /** 词条数量概率 */
  get citiao() {
    return this.getConfig('config').citiao
  }

  /** 各个部位掉落概率 */
  get buwei() {
    return this.getConfig('config').buwei
  }

  /** 副词条出现概率 */
  get fucitiao() {
    return this.getConfig('config').fucitiao
  }

  /** 强化档位概率 */
  get qianghua() {
    return this.getConfig('config').qianghua
  }

  /** 副词条强化概率 */
  get fucitiaoqianghua() {
    return this.getConfig('config').fucitiaoqianghua
  }

  /** cd */
  get cd() {
    return this.getConfig('config').cd
  }


  /** 撤回时间 */
  get recall() {
    let recall = this.getConfig('config').recall
    if (!recall) {
      recall = 0
    }
    return recall
  }

  /** 用户配置 */
  getConfig(name) {
    return this.getYaml('config', name)
  }

  /**
   * 获取配置yaml
   * @param type 默认跑配置-defSet，用户配置-config
   * @param name 名称
   */
  getYaml(type, name) {
    const configPath = process.cwd().replace(/\\/g, "/") + '/plugins/xiaoye-plugin/'
    let file = configPath + `${type}/${name}.yaml`
    let key = `${type}.${name}`

    this.config[key] = YAML.parse(
      fs.readFileSync(file, 'utf8')
    )

    this.watch(file, name, type)

    return this.config[key]
  }

  /**
   * 修改配置yaml
   */
  setYaml(type, name, data) {
    const configPath = process.cwd().replace(/\\/g, "/") + '/plugins/xiaoye-plugin/'
    let file = configPath + `${type}/${name}.yaml`
    try {
      fs.writeFileSync(file, YAML.stringify(data), 'utf8')
    } catch (error) {
      logger.error(`[${type}] 写入失败 ${error}`)
      return false
    }
    return true
  }

  /** 监听配置文件 */
  watch(file, name, type = 'def') {
    let key = `${type}.${name}`

    if (this.watcher[key]) return

    const watcher = chokidar.watch(file)
    watcher.on('change', path => {
      delete this.config[key]
      if (typeof Bot == 'undefined') return
      logger.mark(`[修改配置文件][${type}][${name}]`)
      if (this[`change_${name}`]) {
        this[`change_${name}`]()
      }
    })

    this.watcher[key] = watcher
  }


}

export default new Cfg()
