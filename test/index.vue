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
// This is a description of the component
export default {
    name: 'MyComponent',
    props: {
        // The name of the form, up to 8 characters
        name: {
            type: [String, Number],
            required: true,
            validator (val) {
                return ['test', 0].indexOf(val) > -1
            }
        },
        // v-model
        value: [String, Number]
    },
    methods: {
        /**
         * Used to manually clear the form
         * @param {Bool} type 
         * @returns return true
         */
        clear (type) {
            // Fire when the form is cleared
            this.$emit('onclear', type)
            return true
        },
        _private (val) {
            this.$emit('update', val)
        }
    }
}
</script>