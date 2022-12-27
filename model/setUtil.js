import cfg from './readConfig.js'

let util = {
    async setYaml(data) {
        cfg.setYaml('config', 'config', data)
    },
    async getData() {
        return cfg.getConfig('config')
    }
}
export default util
