<template>
    Hello World {{ age }} {{ color }}
</template>

<script>
export default {
    name: 'Test',
    data() {
        return {
            age: 18
        }
    },
    computed(){
        return {
            color: 'pink'
        }
    }
}
</script>