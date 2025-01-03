<template>
    Hello World {{ age }} {{ color }}
</template>

<script>
export default {
    data(){
        return {
            age: 18
        }
    },
    computed:{
        color(){
            return 'pink'
        },
    }
}
</script>