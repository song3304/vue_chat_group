<template>
  <div class="hello">
    <yi></yi>
    <hb></hb>
    <chat></chat>
  </div>
</template>

<script>
import yi from './friendlist'
import hb from './dialog'
import chat from './chat'
export default {
  data () {
    return {
    }
  },
  components:{
    hb,yi,chat
  }
}
</script>

<style scoped>

</style>
