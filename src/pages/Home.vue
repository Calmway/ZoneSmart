<template lang="pug">
    .home-wrapper
        CustomHeader
        list
</template>

<script>
import store from '../store/index'
import CustomHeader from '../components/CustomHeader.vue'
import List from '../components/List.vue'
export default {
    name: 'home',
    components: { CustomHeader, List },
    async mounted() {
        await store.dispatch('getList')
    }

}
</script>

<style scoped lang="scss">
.home-wrapper {
    padding-top: 80px;
}
</style>
