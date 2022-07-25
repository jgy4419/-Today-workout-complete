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
                <button v-for="modals, i in modal.length" :key="i" @click="modalState = i" class="btn">{{modal[i]}}</button>
            </div>
            <hr>
            <br>
            <div class="posts">
                <Post v-if="modalState === 0"/>
                <Sensors v-if="modalState === 1"/>
            </div>
        </div>
    </div>
</template>

<script>
import Post from './Post.vue';
import Sensors from './Sensors.vue';
export default {
    components: {
        Post,
        Sensors
    },
    data(){
        return{
            information: {},
            modalState: 0,
            modal: ['게시글', '센서']
        }
    },
    mounted(){
        // 만약 쿠키가 있으면
        let userInformation = JSON.parse(localStorage.getItem("userInformation"));

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
                border: 3px solid rgb(224, 224, 224);
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
            padding-bottom: 5%;
            .btn{
                width: 100px;
                height: 40px;
                font-size: 16px;
                font-weight: 700;
                border-radius: 10px;
                transition: .3s;
            }
            .btn:hover{
                background-color: #C9CCD5;
                color: #fff;
            }
            .btn:nth-child(2){
                margin: 20px;
            }
        }
    }
    @media screen and (max-width: 1000px){
        .inner{
            width: 80vw;
            .myPageModal{
                .btn{
                    width: 80px;
                    font-size: 15px;
                }
            }
        }
    }
}
</style>