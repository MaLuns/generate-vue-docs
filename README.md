## generate-vue-docs
为vue单文件组件生成文档说明。

### 使用
``` js
const { parseDocs } = require('generate-vue-docs')

// vueStr 组件内容,默认返回json文档
parseDocs(vueStr) 

// 返回md文档，并去掉slot部分，props只显示name和desc
parseDocs(vueStr, {
    md: true,
    mdOptions: {
        slots: false,
        props: { name: '参数', desc: '说明' }
    }
})
```

### 默认配置
``` js
{
    md: false,
    mdOptions: {
        // md 生成的表格 会根据此配置 生成标题和列顺序
        props: { name: '参数', desc: '说明', type: '类型', default: '默认值' },
        slots: { name: 'name', desc: '说明' },
        events: { name: '事件名称', desc: '说明' },
        methods: { name: '方法名', desc: '说明', params: '参数' }
    }
}
```

### 生成vue组件 md 示例

## MyComponent
这里是组件的描述


### Attributes
| 参数          | 类型           | 说明                  | 默认值 |
| ------------- | -------------- | --------------------- | ------ |
| name `sync`   | String、Number | name属性,支持 `.sync` | ——     |
| value `model` | String、Number | v-model               | ——     |


### Slots
| name   | 说明         |
| ------ | ------------ |
| header | header slot  |
| -      | default slot |
| footer | footer slot  |


### Events
| 事件名称 | 说明            |
| -------- | --------------- |
| onclear  | 描述onclear事件 |


### Methods
| 方法名        | 说明              | 参数                | 返回值     |
| ------------- | ----------------- | ------------------- | ---------- |
| clear `async` | 这是一个`async`方法 | type:Bool(清除类型) | 返回值描述 |