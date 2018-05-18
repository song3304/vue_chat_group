<script>
	
    export default {    	
        props: ['userList', 'sessionIndex', 'session', 'search'],
        methods: {
//          select (value) {
//          	
//              this.sessionIndex = this.userList.indexOf(value);               
//          },
            deletePerson: function(index){
            	
	        }
        },
        filters: {
            search (list) {
                return list.filter(item => item.name.indexOf(this.search) > -1);
            }
        }
    };
</script>

<template>
    <div class="vu_m-list">
        <ul>
            <li v-for="item in userList" :class="{ active: session.userId === item.id }" @click="select(item)">
                <img class="vu_avatar"  width="30" height="30" :alt="item.name" :src="item.img">
                <div class="vu_m-cs-cs">
                	<p class="vu_name">{{item.name}}</p>
                	<p class="vu_m-xiang">这是一条消息</p>
                </div>   
                <div class="vu_m-list-del">
                	<p>17:15</p>
                	<p class="vu_m-list-del-num">6</p>
                	<div class="vu_delet-li"  @click="deletePerson($index)"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style>
    .vu_m-list {
        li {
            padding: 12px 15px;
            cursor: pointer;
            transition: background-color .1s;
            
            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }
            &.active {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        .vu_avatar, .vu_name {
            vertical-align: middle;
        }
        .vu_avatar {
            border-radius: 2px;
        }
        .vu_name {
            display: inline-block;
            margin: 0 0 0 15px;
        }
    }
</style>