// 构建成Markdown
class RenderMd {

    constructor (parserResult, options = {}) {
        this.parserResult = parserResult
        this.options = options
    }

    render () {
        let mdArr = []
        for (const key in this.parserResult) {
            const element = this.parserResult[key];
            if (element) {
                switch (key) {
                    case 'name': mdArr.push(...this.renderTitle(element, false, 2)); break;
                    case 'desc': mdArr.push(element); break;
                    case 'props':
                    case 'slots':
                    case 'events':
                    case 'methods':
                        if (this.options[key]) {
                            mdArr.push(...this[key + 'Render'](element, this.options[key]));
                        }
                        break;
                    default: break;
                }
            }
        }
        return mdArr.join('\n')
    }

    /**
     * 渲染属性
     * @param {*} propsRes
     * @param {*} config 表格配置
     * @returns 
     */
    propsRender (propsRes, config) {
        const kt = this._getKeysAndTitles(config, ['name', 'desc', 'type', 'default'])
        let mdArr = [...this.renderTitle('Attributes'), ...this.renderTabelHeader(kt.titles)]
        for (const key in propsRes) {
            if (Object.hasOwnProperty.call(propsRes, key)) {
                const element = propsRes[key];
                let row = []
                kt.keys.map(key => {
                    if (Object.keys(element).includes(key)) {
                        if (key === 'name') {
                            row.push(`${element[key]}${this._tag(element, 'sync')}${this._tag(element, 'model')}`)
                        } else {
                            row.push(element[key])
                        }
                    } else {
                        row.push('——')
                    }
                })
                mdArr.push(this.renderTabelRow(row))
            }
        }
        return mdArr
    }

    /**
     * 渲染插槽
     * @param {*} slotsRes 
     * @param {obj} config 表格配置
     * @returns 
     */
    slotsRender (slotsRes, config) {
        const kt = this._getKeysAndTitles(config, ['name', 'desc'])
        let mdArr = [...this.renderTitle('Slots'), ...this.renderTabelHeader(kt.titles)]
        for (const key in slotsRes) {
            if (Object.hasOwnProperty.call(slotsRes, key)) {
                const element = slotsRes[key];
                let row = []
                kt.keys.map(key => {
                    if (Object.keys(element).includes(key)) {
                        row.push(element[key])
                    } else {
                        row.push('——')
                    }
                })
                mdArr.push(this.renderTabelRow(row))
            }
        }
        return mdArr
    }

    /**
     * 渲染事件
     * @param {*} propsRes 
     * @param {*} config 表格配置
     * @returns 
     */
    eventsRender (propsRes, config) {
        const kt = this._getKeysAndTitles(config, ['name', 'desc'])
        let mdArr = [...this.renderTitle('Events'), ...this.renderTabelHeader(kt.titles)]
        for (const key in propsRes) {
            if (Object.hasOwnProperty.call(propsRes, key)) {
                const element = propsRes[key];
                let row = []
                kt.keys.map(key => {
                    if (Object.keys(element).includes(key)) {
                        row.push(element[key])
                    } else {
                        row.push('——')
                    }
                })
                mdArr.push(this.renderTabelRow(row))
            }
        }
        return mdArr
    }

    /**
     * 渲染方法
     * @param {*} slotsRes 
     * @param {*} config 表格配置
     * @returns 
     */
    methodsRender (slotsRes, config) {
        const kt = this._getKeysAndTitles(config, ['name', 'desc', 'params', 'res'])
        let mdArr = [...this.renderTitle('Methods'), ...this.renderTabelHeader(kt.titles)]
        for (const key in slotsRes) {
            if (Object.hasOwnProperty.call(slotsRes, key)) {
                const element = slotsRes[key];
                let row = []
                kt.keys.map(key => {
                    if (Object.keys(element).includes(key)) {
                        if (key === 'name') {
                            row.push(`${element[key]}${this._tag(element, 'async')}`)
                        } else if (key === 'params') {
                            row.push(this._funParam(element[key]))
                        } else {
                            row.push(element[key])
                        }
                    } else {
                        row.push('——')
                    }
                })
                mdArr.push(this.renderTabelRow(row))
            }
        }
        return mdArr
    }

    /**
     * 渲染表头
     * @param {Array} header 
     * @returns 
     */
    renderTabelHeader (header) {
        return [this.renderTabelRow(header), '|' + header.map(() => '------').join('|') + '|']
    }

    /**
     * 渲染表格的行
     * @param {Array} row 
     * @returns 
     */
    renderTabelRow (row) {
        return '|' + row.join('|') + '|'
    }

    /**
     * 渲染标题
     * @param {String} title 标题
     * @param {Bool} br 是否换行
     * @param {Number} num 标题级别1-6
     * @returns 
     */
    renderTitle (title, br = true, num = 3) {
        const h = ["#", "##", "###", "####", "#####", "######"]
        return br ? ['', '', `${h[num - 1]} ${title}`] : [`${h[num - 1]} ${title}`]
    }

    /**
     * 生成表格配置
     * @param {*} config 
     * @param {*} inKeys 
     * @returns 
     */
    _getKeysAndTitles (config, inKeys) {
        const keys = Object.keys(config).filter(key => inKeys.includes(key));
        const titles = keys.map(key => config[key])
        return { keys, titles }
    }

    /**
     * 生成入参格式
     * @param {Array}} params 参数
     * @returns 
     */
    _funParam (params) {
        if (!params) return '—'
        return params.map(item => `${item.name}:${item.type}${item.desc ? '(' + item.desc + ')' : ''}`).join(',')
    }

    /**
     * 生成标记 例: sync、v-model
     * @param {Obj} item 
     * @param {String} tag 标记
     * @returns 
     */
    _tag (item, tag) {
        return item[tag] ? ` \`${tag}\` ` : '';
    }
}

module.exports = {
    RenderMd
}