<template>
    <textarea size="small" :required="isRequired" @input="autoResize" :placeholder="pHolder"></textarea>
</template>

<script>
export default {
    props:['pHolder', 'isRequired'],
    methods:{
        autoResize(event){

            event.target.style.height = '35px';
            event.target.style.height = event.target.scrollHeight + 'px'
        }
    }
}
</script>

<style>
</style>