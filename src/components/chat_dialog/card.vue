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
.vu_m-card {
    padding: 9px;
}
.vu_m-card  footer {
    margin-top:0;
}
.vu_m-card .vu_avatar, .vu_name {
    vertical-align: middle;
}
.vu_m-card  .vu_avatar {
    border-radius: 2px;
}
.vu_m-card  .vu_name {
    display: inline-block;
    margin: 0 0 0 15px;
    font-size: 16px;
}
.vu_m-card .vu_search {
    padding: 0 10px;
    width: 100%;
    font-size: 12px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    border: solid 1px #dddddd;
    border-radius: 4px;
    outline: none;
    background-color: #dddddd;
}
</style>
