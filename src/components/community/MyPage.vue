<template>
    <div class="myContainer">
        <div class="inner">
            <div class="introduction">
                <div class="profileImg" :style="{backgroundImage: `url(${information.profile_img_path})`}"/> 
                <div class="profileBox">
                    <p class="name">{{information.nickname}}</p>
                    <p class="myIntroduction">{{information.introduction}}</p>
                </div>
            </div>
            <div class="myPageModal">
                <!-- <button v-for="modals, i in modal.length" :key="i" @click="$store.commit('Chart/wishlist_func', {
                    wishlist_state: i
                })" class="selectBtn">{{modal[i]}}</button> -->
                <button v-for="modals, i in modal.length" :key="i" @click="modalState_func(i)" class="selectBtn">{{modal[i]}}</button>
            </div>
            <br>
            <div class="posts">
                <Post v-if="modalState === 0"/>
                <Sensors v-if="modalState === 1"
                :modalState="modalState"/>
                <Sensors v-if="modalState === 2"
                :modalState="modalState"/>
            </div>
        </div>
    </div>
</template>

<script>
import Post from './Post.vue';
import Sensors from './Sensors.vue';
import default_image from '/root/TWC-BACKEND-BACKUP/public/img/userProfile/default.png';
export default {
    components: {
        Post,
        Sensors,
    },
    data(){
        return{
            information: {},
            modalState: 0,
            modal: ['게시글', '센서']
        }
    },
    methods: {
        modalState_func(index) {
            this.modalState = index;
            this.$store.commit('Chart/wishlist_func', {
                wishlist_state: index
            });
        }
    },
    mounted() {
        console.log(this.$store.state.Chart.chart_wishlist_state);
        // 만약 쿠키가 있으면
        let userInformation = JSON.parse(localStorage.getItem("userInformation"));
        console.log(userInformation);
        // 백엔드 한테 기본 이미지 잘 보여지게 해달라 하기
        if (userInformation && userInformation.profile_img_path === "http://118.67.132.81:3000/img/userProfile/default.png") {
           userInformation.profile_img_path = default_image;
        }
        if(localStorage.userInformation){
            this.information = userInformation;
        }
        
        if(this.modalState === 1){
            this.getSensor();
        }
    },
}
</script>

<style lang="scss" scoped>
.myContainer{
    width: 100vw;
    .inner{
        width: 70vw;
        // height: 91vh;
        margin: auto;
        .introduction{
            display: flex;
            align-items: center;
            margin: 7% auto;
            .profileImg{
                width: 120px;
                height: 120px;
                border: 2px solid rgb(224, 224, 224);
                border: 0;
                border-radius: 50%;
                margin-right: 10%;
                background-size: cover;
            }
            .profileBox{
                .name{
                    font-size: 25px;
                    font-weight: 700;
                    color: #333;
                }
                .myIntroduction{
                    font-size: 20px;
                    font-weight: 500;
                    color: rgb(169, 169, 169);
                }
            }
        }
        .myPageModal{
            margin-top: -5%;
            padding-bottom: 10%;
            .selectBtn{
                width: 100px;
                height: 40px;
                font-size: 16px;
                border: 0;
                font-weight: 700;
                border-radius: 10px;
                transition: .3s;
            }
            .selectBtn:hover{
                background-color: #C9CCD5;
                color: #fff;
            }
            .selectBtn:nth-child(2){
                margin: 20px;
            }
        }
    }
    @media screen and (max-width: 1000px){
        .inner{
            width: 80vw;
            .myPageModal{
                .selectBtn{
                    width: 80px;
                    font-size: 15px;
                }
            }
        }
    }
}
</style>