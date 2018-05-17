<script>
    export default {
        props: ['user', 'search']
    };
</script>

<template>
    <div class="m-card">
        <input class="search" type="text" placeholder="搜索"  ><!--v-model="search"-->
    </div>
</template>

<style>
.m-card {
    padding: 9px;
}    
.m-card  footer {
    margin-top:0;
}    
.m-card .avatar, .name {
    vertical-align: middle;
}
.m-card  .avatar {
    border-radius: 2px;
}
.m-card  .name {
    display: inline-block;
    margin: 0 0 0 15px;
    font-size: 16px;
}
.m-card .search {
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