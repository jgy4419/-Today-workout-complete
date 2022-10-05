<template>
    <div class="contain">
        <div class="inner">
            <div class="text">
                <p class="title"><span class="importantText">오</span>늘 <span class="importantText">운</span>동 <span class="importantText">완</span>료했니?</p>
                <span class="textInner">
                    <!-- 저희 '오늘 운동 완료했니'는 하루동안  -->
                    혼자 운동하기 무섭거나 어려운 사람들은 같이 운동할 사람들을 
                    구할 수 있고,  <br/><br/>운동하는 방법이나, 노하우를 
                    다른 사람들이 작성한 것들을 참고해서 효과적인 운동이 가능합니다.
                </span>
                <p class="title">오늘 운동 제대로했네!</p>
                <span class="textInner">
                    운동 기록 작성 시 센서를 통한 데이터로 추가적인 설명이 가능합니다.<br/>
                    <br/>당일 운동 했던 부위를 조금 더 자세하게 설명해보세요.
                </span>
                <p class="title">운동 끝나고 보충제 한 잔?</p>
                <span class="textInner">
                    운동할 때 필요한 영양제들을 우리가 먹어도 되는지..?<br/>
                    설문을 통해 알아 볼 수 있는 시간을 가져요!
                </span>
                <!-- <div v-for="title, i in titles.length" :key="i">
                    <p class="title">{{titles[i]}}</p>
                    <span class="textInner">{{textInner[i]}}</span>
                </div> -->
            </div>
            <div class="imgBox">
                <div class="img"/>
            </div>
        </div>
    </div>
</template>

<script>
import img1 from '../../image/mainImg/main.jpeg'
import img2 from '../../image/mainImg/main2.jpeg'
import img3 from '../../image/mainImg/main3.jpeg'

import _ from 'lodash';
export default {
    data(){
        return{
            titles: [
                '혼자가기 무서울 때.',
                '오늘 운동 제대로했네!',
                '운동 끝나고 보충제 한 잔?'
            ],
            textInner: [
                `혼자 운동하기 무섭거나 어려운 사람들은 같이 운동할 사람들을구할 수 있고, 운동하는 방법이나, 노하우를 다른 사람들이 작성한 것들을 참고해서 효과적인 운동이 가능합니다.`,
                '운동 기록 작성 시 센서를 통한 데이터로 추가적인 설명이 가능합니다. 당일 운동 했던 부위를 조금 더 자세하게 설명해보세요.',
                '운동할 때 필요한 영양제들을 우리가 먹어도 되는지..?설문을 통해 알아 볼 수 있는 시간을 가져요!'
            ]
        }
    },
    mounted(){
        this.scrollEvent();
    },
    methods: {
        scrollEvent(){
            // 메인 페이지 전체 height 크기
            let screenHeight = document.documentElement.scrollHeight;
            let img = document.querySelector('.img');
            let title = document.querySelectorAll('.title');
            let textInner = document.querySelectorAll('.textInner');

            // lodash로 스크롤 최적화 시켜주기.
            document.addEventListener('scroll', _.throttle(() => {
                let currentScrollValue = document.documentElement.scrollTop;
                for(let i = 0; i < title.length; i++){
                    // 1700, 2200 // 3 2
                    if(currentScrollValue > screenHeight / 2.6 && currentScrollValue < screenHeight / 1.8){
                        img.style.backgroundImage = `url(${img2})`;
                        title[2].classList.add('event');
                        textInner[1].classList.add('event');
                        // 2200
                    }else if(currentScrollValue > screenHeight / 2.6){
                        img.style.backgroundImage = `url(${img3})`;
                        title[3].classList.add('event');
                        textInner[2].classList.add('event');
                    }else{
                        img.style.backgroundImage = `url(${img1})`;
                    }
                }
                // 0.3초에 한 번씩 함수 실행.
            }, 300));
        }
    },
    computed: {
        subTitle(){
            return this.textInner.replace("\n", "<br/>")
        }
    },
    
}
</script>

<style lang="scss" scoped>
.contain{
    width: 100vw;
    .inner{
        position: relative;
        color: #333;
        width: 80vw;
        height: 2800px;
        margin: auto;
        display: flex;
        .text{
            overflow-x: hidden;
            position: absolute;
            right: 0;
            width: 40%;
            margin-bottom: 20%;
             .title{
                margin-top: 80%;
                font-size: 50px;
                font-weight: 900;
                transition: .5s;
            }
            .textInner{
                font-size: 30px;
                font-weight: 500;
                line-height: 180%;
                transition: .5s;
                // margin-top: 10%;
            }
            .title:nth-child(3), .textInner:nth-child(4),
            .title:nth-child(5), .textInner:nth-child(6){
                opacity: 0;
                transform: translateX(200px);
            }
            .title:nth-child(3).event, .textInner:nth-child(4).event,
            .title:nth-child(5).event, .textInner:nth-child(6).event{
                opacity: 1;
                transform: translateX(0px);
            }   
            // }
        }
        .imgBox {
            position: relative;
            right: 12.5%;
            .img{
                position: sticky;
                border-radius: 20px;
                // background-image: url('https://www.dementianews.co.kr/news/photo/201902/1501_1270_5524.jpg');
                background-size: cover;
                background-position: 30%;
                background-repeat: no-repeat;
                transition: .3s;
                top: 10px;
                width: 50vw;
                height: 100vh;
                // margin-top: 20%;
            }   
        }
    }
    @media screen and (max-width: 1050px){
        .inner{
            .text{
                padding-top: 40%;
                .title{
                    font-size: 40px;
                }
                .textInner{
                    font-size: 20px;
                }
            }
            .img{
                // width: 40vw;
                height: 50vh;
            }
        }
    }
    @media screen and (max-width: 768px){
        .inner{
            .text{
                // padding-top: 130%;
                width: 30vw;
                .title{
                    font-size: 30px;
                }
                .textInner{
                    font-size: 20px;
                }
            }
            .img{
                width: 80vw;
                height: 40vh;
            }
        }
    }   
    @media screen and (max-width: 565px){
        .inner{
            height: 2000px;
            .text{
                width: 80vw;
            }
            .text:nth-child(2){
                margin-top: 30%;
            }
            .imgBox{
                .img{
                    width: 100vw;
                    height: 40vh;
                }
            }
        }
    }
}
</style>