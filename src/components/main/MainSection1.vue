<template>
    <div class="contain">
        <div class="section-images">
            <div class="section-image" v-for="image, i in image" :key="i"
            :style="{backgroundImage: `url(${image})`}"/>
        </div>
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
        <!-- <div class="halfBackground"/> -->
    </div>    
</template>

<script>
import image1 from '../../image/mainImg/main1-1.jpeg'
import image2 from '../../image/mainImg/main1-2.jpeg'
import image3 from '../../image/mainImg/main1-3.jpeg'
export default {
    data(){
        return{
            textLine: ['운동을', '과학적으로', '효율적으로'],
            startBtn: '/about',
            image: [image2, image1, image3],
        }
    },
    mounted(){
        this.loding();
        console.log(this.image);
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
    height: 100vh;
    .section-images{
        position: absolute;
        top: 0;
        display: flex;
        .section-image{
            width: 33.5vw;
            height: 95vh;
            // object-fit: cover;
            background-size: cover;
            background-repeat: no-repeat;
        }
        .section-image:nth-child(2){
            background-attachment: fixed;
            // background-size: contain;
        }
    }
    .inner{
        position: relative;
        top: 20%;
        z-index: 10;
        width: 80%;
        margin: auto;
        .title{
            color: rgb(226, 226, 226);
            font-size: 50px;
            font-weight: 700;
            text-align: center;
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
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            background-color: transparent;
            font-size: 18px;
            font-weight: 700;
            background-color: #35a8e2;
            color: #fff;
            width: 150px;
            height: 60px;
            border: 0;
            border-radius: 30px;
            transition: .5s;
            cursor: pointer;
            margin-top: 3%;
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
}
@media screen and (max-height: 500px){
    .contain{
        height: 0;
        .section-images{
            .section-image{
                height: 500px;
            }
        }
        .inner{
            height: 0px;
        }
    }
}
@media screen and (max-width: 768px){
    .contain{
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
}
@media screen and (max-width: 575px){
    .contain{
        .inner{
            width: 100%;
            // height: 600px;
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
        // .halfBackground{
        //     width: 100%;
        // }
        .section-images{
            .section-image:nth-child(1), .section-image:nth-child(3){
                display: none;
            }
            .section-image:nth-child(2){
                width: 100vw;
                background-position: 30%;
            }
        }
    }
}
@media screen and (max-height: 500px){
    .contain{
        height: 500px;
        .inner{
            top: 0;
        }
        .halfBackground{
            height: 600px;
            background-size: cover;
            // bottom: 0;
        }
    }   
}
</style>