<template lang="pug">
  router-view
</template>
<script>
import store from './store/index'
export default {
  name: 'app',
  data() {
    return {

    }
  },
  computed: {
    count() {
      return store.state.count
    }
  },
  methods: {
    incr() {
      store.commit('increment')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
