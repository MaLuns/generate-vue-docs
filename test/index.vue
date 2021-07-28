<template>
    <section>
        <header>
            <!-- header slot -->
            <slot name="header">
                <th>title</th>
            </slot>
        </header>
        <div class="main">
            <!-- default slot -->
            <slot> </slot>
        </div>
        <footer>
            <!-- footer slot -->
            <slot name="footer"> </slot>
        </footer>
    </section>
</template>

<script>
// 这里是组件的描述
export default {
    name: 'MyComponent',
    props: {
        // name属性,支持 `.sync`
        name: {
            type: [String, Number],
            required: true,
            validator () {
            }
        },
        // v-model
        value: [String, Number]
    },
    methods: {
        /**
         * 这是一个`async`方法
         * @param {Bool} type 清除类型
         * @returns 返回值描述
         */
        async clear (type) {
            // 描述onclear事件
            this.$emit('onclear', type)
            return true
        },
        _private (val) {
            this.$emit('update', val)
            this.$emit('update:name', val)
        }
    }
}
</script>