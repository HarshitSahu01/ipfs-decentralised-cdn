<template>
    <p class="bg-red-400">
        Hello World
    </p>
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