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
                <button v-for="modals, i in modal.length" :key="i" @click="modalState = i" class="selectBtn">{{modal[i]}}</button>
            </div>
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
        Sensors,
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
        console.log(userInformation);
        // 백엔드 한테 기본 이미지 잘 보여지게 해달라 하기
        if (userInformation && userInformation.profile_img_path === "http://118.67.132.81:3000/img/userProfile/default.png") {
            userInformation.profile_img_path = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAIVBMVEXY2Njz8/Pq6urv7+/h4eHb29vo6Oje3t7j4+Pt7e3p6ekmc3lwAAADMElEQVR4nO2bC3KDMAxEMeab+x+4JZQBEkhBlq2NZt8JvGOtPkZUFSGEEEIIIYQQQgghhBBCCCEEnXbo6hjDLzHW3dBan0dEO9ThjfrrxDQHKv60NNZnu0ETz2Q8w+xbpPQfZTyl9NZnvEB7GlS7AIP3SnNFxgR4fHVXdYTQWZ/1A+14XUcII2x4tf+6fE8EVXJXB6qS+zpAldzyx8Jofep3buSrLXC563L9eAWsnrRSHSFg2eRSX3JMbX32Lb1cRwhIHaQg865E69OviJ0+g+P3pAsBupLEC8G5koSUNQOSuBJqyAJGLRnShQzWGp4kRxZKbKXrCMFaw4SCRTBMomARDJMIB5E9CGOJgtcx3J7Yn8wgdCluhGjogMi/FEIhmXBjdjdC3BRENy2Km6bRTRvvZrDyM+q6eXxw8xzk5oHOz5Opm0dsP58V3Hzo8fPpzc3HUD+fp90sDPhZ4fCzVONnzcnN4pmfVUA/y5mVm3XZys8Cs5+V8srNkv+Ek98uJpz8CDPh5NekGRc/ixFCCCHky2mb4TGO8cLkHuM4PoYGsGfph1r0Ih/rAWc2Oexz74DRE59PHre0GE8pvcoiykxnF2O96Ln3nNFGSqMs4ymlfIT9/1Qio/ADS6vojVe6gilMZUXrnFKbKfeeqiWUed5OXti4QgHTZ3THltxv9fnDaiFveOVKukfkTMRJmxr3yaakiM23ZLJ8cR2ZlBjoyKKksD8W1H1ipENdiWQ/QwflrYJidfAd1b2bQn3JMYrdiknCWlFLXSo/VqSgZRNDg8wo2STzPHgFlZnRPLAmNILLNGMtKGQus5K+J73Am5X0PckL9MYlZCW1mJin3oXEFAzikIk0l8BcSOKVAF1I2pVA1JCFlFpiffY9ch0wuXdGnoFVvnPqIf6JCaJd3CJtHQH69z3Sbh4ssuSxZX3ud2Q6oKrhjKwmwllEahI4i0hNAjJSbZGNV9anPkKiA64cTkhKIlijNSNptwCTlixtPawPfcRDIARoyl2RzLtuhACWEVkhcSPE+szHUAgaFIIGhaBBIWhQCBoUggaFoEEhaFAIGhSCBoWgQSFoUAgap8f9Ac1KQOtCVp1TAAAAAElFTkSuQmCC';
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