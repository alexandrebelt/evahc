<template>
    <loading :active="loading" :can-cancel="false"></loading>
</template>

<script>
import Loading from 'vue-loading-overlay';

export default {
    components: {
        Loading
    },
    data() {
        return {
            loading: true
        }
    },

    mounted() {

            window.addEventListener('load', () => {
                this.loading = false
            })

    }
}
</script>
<style lang="scss">
.vl-overlay.vl-active.vl-full-page {
    position: fixed;
    width: 100%;
    height: 100%;
    background: var(--preto);
    z-index: 10000;

    .vl-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        filter: invert(1);
        height: 100%;
    }
}
</style>