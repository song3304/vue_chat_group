<script>
    export default {
        props: ['user', 'search']
    };
</script>

<template>
    <div class="v-m-card">
        <input class="v-search" type="text" placeholder="搜索"  ><!--v-model="search"-->
    </div>
</template>

<style>
.v-m-card {
    padding: 9px;
}    
.v-m-card  footer {
    margin-top:0;
}    
.v-m-card .v-avatar, .v-name {
    vertical-align: middle;
}
.v-m-card  .v-avatar {
    border-radius: 2px;
}
.v-m-card  .v-name {
    display: inline-block;
    margin: 0 0 0 15px;
    font-size: 16px;
}
.v-m-card .v-search {
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