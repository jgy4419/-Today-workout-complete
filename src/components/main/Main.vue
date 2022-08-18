<template>
    <div class="main">
        <div class="section">
            <Section1/>
            <!-- <Slide class="slide"/> -->
            <MainNotice class="mainNotice"/>
            <Section2 class="section2"/>
            <Section3/>
        </div>
        <button class="upBtn" @click="scrollUp"><i class='fa fa-arrow-up'></i></button>
    </div>    
</template>

<script>
import Section1 from './MainSection1.vue';
import MainNotice from './MainNotice.vue';
import Section2 from './MainSection2.vue';
import Section3 from './MainSection3.vue';
export default {
    components: {
        Section1,
        MainNotice,
        // Slide,
        Section2,
        Section3,
    },
    mounted(){
        const upBtn = document.querySelector('.upBtn');
        document.addEventListener('scroll', () => {
            let currentScrollValue = document.documentElement.scrollTop;
            if(currentScrollValue > 1000){
                upBtn.style.display = 'block'
            }else{
                upBtn.style.display = 'none';
            }
        })

        if(document.cookie){
            // let getUserInformation = JSON.parse(localStorage.getItem('userInformation'));
            // this.$store.dispatch('User/loginUserAction', {
            //     mail: getUserInformation.mail,
            //     grant: getUserInformation.grant
            // })
            // 자동 로그아웃 기능. 
            if(Date.now() > JSON.parse(localStorage.getItem('expire'))){
                localStorage.removeItem('userInformation');
                // location.reload();
                // event.preventDefault();
            }
        }else{
            this.$store.dispatch('User/loginUserAction', {
                mail: '',
                grant: ''
            })
        }
    },
    methods: {
        scrollUp(){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        autoLogout(){
            alert('로그아웃 되었습니다.');
            localStorage.removeItem('userInformation');
            location.reload();
            // event.preventDefault();
        },
        cookie(){
            // 지금부터 하루 후 까지 쿠키 유지.
            let date = new Date(Date.now() + 86400e3);
            date = date.toUTCString();
            document.cookie = "user=jgy; expires=" + date;
            location.reload();
        }
    }
}
</script>

<style lang="scss" scoped>
    .main{
        .mainNotice{
            position: relative;
        }
        .upBtn{
            position: fixed;
            display: none;
            z-index: 10;
            bottom: 10%;
            right: 10%;
            background-color: transparent;
            color: #333;
            width: 50px;
            height:50px;
            font-size: 16px;
            border: 0;
            box-shadow: 0px 2px 10px 0px rgb(231, 231, 231);
            border-radius: 10px;
        }
    }
</style>