<script>
export default {
  props: ['user', 'search'],
  data: function () {
    return {
      search_key: ''
    }
  },
  methods: {
    searchResult: function () {
      this.$emit('update:search', this.search_key)
    }
  }
}
</script>

<template>
    <div class="vu_m-card">
        <input class="vu_search" type="text" placeholder="搜索" @keyup.enter="searchResult" v-model="search_key"><!--vu_model="search"-->
    </div>
</template>

<style>

</style>
