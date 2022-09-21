<template>
    <div class="farm-contain">
        <div class="farm-information">
            <h2 class="farm-title">{{test.farmName}}</h2>
            <img class="farm-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVGCXTRUebkmD2Yi3Zd4sRGWCryxfM4wdI8jZuPBqqA&s" alt="농가 사진"/>
        </div>
            <div class="farm-name-tel">
                <div class="farm-userName">
                    <h3 class="userName">이름</h3>
                    <p>{{test.name}}</p>
                </div>
                <div class="farm-tel">
                    <h3 class="tel">연락처</h3>
                    <p>{{test.tel}}</p>
                </div>
            </div>
            <div class="farm-description">
                <h3 class="description">농가설명</h3>
                <p>{{test.description}}</p>
            </div>
            <div class="buttons">
                <div class="farm-best">
                    <button class="best" @click="bestToggle()">주요 농작물</button>
                    <div v-if="bestState === true" class="best-detail">
                        <ul>
                            <li v-for="best, i in test.bestFarm.length" :key="i">{{i + 1}}. {{test.bestFarm[i]}}</li>
                        </ul>
                    </div>
                </div>
                <div class="farm-address">
                    <button @click="addressToggle()" class="address">농가 주소</button>
                    <div class="address-detail">
                        <div id="map" style="width: 100%; height: 300px" v-if="addressState === true">지도 생길 부분</div>
                    </div>
                </div>
            </div>        
    </div>
</template>

<script>
/* global kakao */
export default {
    data(){
        return {
            map: null,
            test: {
                farmName: '따과의 즐거운 농장',
                name: '김따과',
                tel: '010-1234-1234',
                description: '이 세상에서 농사짓는게 제일 행복한 김따과 입니다 ^~^',
                // 위치 좌표
                address: {
                    x: 0,
                    y: 0
                },
                bestFarm: ['사과', '오렌지', '망고', '수박'],
            },
            bestState: false,
            addressState: false,
        }
    },
    mounted(){
        // this.kakaoMap();
    },
    methods: {
        bestToggle(){
            this.bestState = !this.bestState;
        },
        addressToggle(){
            this.addressState = !this.addressState;
        },
        kakaoMap(){
            // martLocation에 마트 데이터 넣어주기
            var mapContainer = document.getElementById('map');
            var mapOptions = {
                // 현재위치 적용 완료.
                center: new kakao.maps.LatLng(36.97119012428337, 127.92837941506313),
                level: 7
            };
            // 지도생성
            this.map = new kakao.maps.Map(mapContainer, mapOptions);  
        }
    }
}
</script>

<style lang="scss" scoped>
.best, .address{
    width: 100vw;
    height: 70px;
    background-color: rgb(251, 247, 192);
    border: 0;
    border-bottom: .5px solid #333;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
}
.farm-contain{
    position: relative;
    margin: auto;
    width: 100vw;
    height: 100vh;
    .farm-information{
        position: relative;
        width: 100vw;
        height: 180px;
        margin: auto;
        .farm-title{
            font-size: 18px;
            font-weight: 700;
            color: #333;
            text-align: center;
        }
        .farm-image{
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            margin: auto;
            width: 85px;
            height: 85px;
            border-radius: 50%;
        }
    }
    .farm-name-tel{
        width: 100%;
        height: 70px;
        display: flex;
        .farm-userName, .farm-tel{
            font-size: 18px;
            padding-top: 3px;
            font-weight: 700;
            color: rgb(159, 158, 158);
            width: 50%;
            height: 60px;
            // border: 1px solid #333;
            text-align: center;
            p{
                color: #333;
                font-size: 16px;
                font-weight: 500;
            }
        }
    }
    .farm-best{
        .best-detail{
            ul{
                li{
                    font-size: 14px;
                    font-weight: 600;
                }
            }
        }
    }
    .farm-description{
        width: 100%;
        height: 80px;
        text-align: center;
        padding-top: 10px;
        .description{
            font-size: 16px;
            font-weight: 600
        }
        p{
            font-size: 14px;
        }
    }
}
</style>