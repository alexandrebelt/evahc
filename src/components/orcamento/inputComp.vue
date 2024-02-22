<template>
    <input :required="isRequired" :type="inputType" :placeholder="pHolder"/>
</template>

<script>
export default {
    props:['inputType', 'pHolder', 'isRequired']    
}
</script>

<style>
</style>