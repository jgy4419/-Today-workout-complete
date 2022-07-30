<template>
  <div>
      <Header/>
  </div>
</template>

<script>
// import Chart from 'chart.js';
import Header from './components/Header.vue'
export default {
  components: {
    Header
  },
  data(){
    return{
      day: new Date().getDate(),
      minute: new Date().getMinutes(),
    }
  },
  mounted(){
    // setInterval(() => {
    //   let test = this.$store.state.User.expire;
    //   console.log(test);
    // }, 500);
    // setTimeout(() => {
    //   if(localStorage.userInformation && Date.now() > this.$store.state.User.expire){
    //       alert(this.$store.state.User.expire);
    //       alert('로그아웃 되었습니다.');
    //       location.reload();
    //       localStorage.removeItem('userInformation');
    //   }
    // }, 10000)
  }
}
</script>

<style lang="scss">
// .importantText{
//   font-weight: 700;
//   color: #93B5C6;
// }
a{
  text-decoration: none;
}
</style>
