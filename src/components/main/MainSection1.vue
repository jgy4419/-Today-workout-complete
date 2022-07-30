<template>
    <div class="contain">
        <div class="inner">
            <p class="title">
                <span v-for="text in textLine" :key="text" class="textLine">
                    {{text}}
                    <br/>
                </span>
            </p>
            <router-link :to="startBtn">
                <button @click="loginOrCommunity()" class="btn">오운완이란?</button>
            </router-link>
        </div>
        <div class="halfBackground"/>
    </div>    
</template>

<script>
export default {
    data(){
        return{
            textLine: ['운동을', '과학적으로', '효율적으로'],
            startBtn: '/about'
        }
    },
    mounted(){
        this.loding();
    },
    methods: {
        loding(){
            let text = document.querySelectorAll('.textLine');
            for(let i = 0; i < text.length; i++){
                setTimeout(() => {
                    text[i].classList.add('event');
                    console.log(text[i]);
                }, 300);
            }
        },
    }   
}
</script>

<style lang="scss" scoped>
/*
text 그라데이션
color: transparent;
background: linear-gradient(to right top, #861657, #ffa69e);
-webkit-background-clip: text;
 */
.contain{
    position: relative;
    margin-top: 1.5%;
    height: 100vh;
    // margin-top: 100px;
    .inner{
        position: relative;
        top: 10%;
        z-index: 10;
        width: 80%;
        margin: auto;
        .title{
            color: rgb(226, 226, 226);
            font-size: 70px;
            font-weight: 700;
            z-index: 10;
            line-height: 150%;
            .textLine{
                opacity: 0;
                transform: translateY(0px);
            }
            .textLine:nth-child(1).event{
                transition: 1s;
                transform: translateY(100px);
                opacity: 1;
            }
            .textLine:nth-child(2).event{
                transition: 2s;
                transform: translateY(100px);
                opacity: 1;
            }
            .textLine:nth-child(3).event{
                transition: 3s;
                transform: translateY(100px);
                opacity: 1;
            }
        }
        .btn{
            background-color: transparent;
            font-size: 18px;
            font-weight: 700;
            background-color: #93B5C6;
            color: #fff;
            width: 150px;
            height: 60px;
            border: 0;
            border-radius: 30px;
            transition: .5s;
            cursor: pointer;
            margin-top: 6%;
        }
        .btn:hover{
            background-color: transparent;
            color: #333;
            background-color: #fff;
            border: 0;
        }
        .btn a{
            position: relative;
            z-index: 1;
        }
    }
    .halfBackground{
        position: absolute;
        z-index: 1;
        top: -10%;
        // bottom: -60%;
        width: 100vw;
        height: 100%;
        // height: 800px;
        // box-shadow:  inset 10px 10px 10px #fff;
        filter: blur(2px);
        background-image: url('https://tgzzmmgvheix1905536.cdn.ntruss.com/2020/12/0415c4378a98400fbd96d00de64e8112');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: left;
    }
    @media screen and (max-width: 768px){
        .inner{
            .title{
                padding-top: 20%;
                font-size: 50px;
                text-align: center;
            }
            .btn{
                position: absolute;
                left: 0;
                right: 0;
                margin: 10% auto;
                font-size: 15px;
                font-weight: 700;
                width: 100px;
                height: 50px;
            }
        }
        .halfBackground{
            width: 100%;
        }
    }
    @media screen and (max-width: 575px){
        .inner{
            width: 100%;
            height: 600px;
            .title{
                font-size: 40px;
            }
            .btn{
                position: absolute;
                left: 0;
                right: 0;
                margin: 10% auto;
                font-size: 12px;
                font-weight: 700;
                width: 80px;
                height: 40px;
            }
        }
        .halfBackground{
            width: 100%;
        }
    }
}
@media screen and (max-height: 500px){
    .contain{
        height: 500px;
        .halfBackground{
            height: 600px;
            background-size: cover;
            // bottom: 0;
        }
    }   
}
</style>