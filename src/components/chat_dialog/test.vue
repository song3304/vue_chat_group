<script>
    export default {
        props: ['session'],
        data () {
            return {
                text: ''
            };
        },
        methods: {
            inputing: function(e) {
				this.session.messages.push({
					text: this.text,
					date: new Date,
					self: !0
				}), this.text = ""
			},
			
        }
    };
</script>

<template>
    <div class="v-m-text">
        <textarea placeholder="" v-model="text"></textarea>
        <span class="v-send" @click="inputing">发送</span><span class="v-history">历史记录<p></p></span>
    </div>
</template>

<style>
.v-m-text {
    height: 140px;
    border-top: solid 1px #ddd;
}    
.v-m-text textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
}
   
</style>