<template>
    <div class="contain">
        <div class="inner">
            <p>문의</p>
            <div class="line"/>
            <div class="users">
                <div class="devUser" v-for="name, i in name" :key="i">
                    <p>{{inquiry[i]}}</p>
                    <img class="profileImg" :src="profile[i]"/>
                    <div class="textIntroduction">
                        <p>Name : {{name}}</p>
                        <p>Dev : {{dev[i]}}</p>
                        <p>Email : {{email[i]}}</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>    
</template>

<script>
import Footer from '../Footer.vue';
export default {
    components: {
        Footer,
    },
    data(){
        return{
            inquiry: ['페이지 개선사항', '모바일 및 센서 문의', '추가기능'],
            profile: ['https://avatars.githubusercontent.com/u/76980526?v=4', 'https://avatars.githubusercontent.com/u/93364085?v=4', 'https://avatars.githubusercontent.com/u/93367718?v=4'],
            name: ['정규영', '박세승', '문정환'],
            dev: ['FrontEnd', 'Backend', 'Backend'],
            email: ['jgy_98@naver.com', 'abc@naver.com', 'def@naver.com'],
        }
    }
}
</script>

<style lang="scss" scoped>
.contain{
    width: 100vw;
    height: 500px;
    .inner{
        position: relative;
        z-index: 10;
        padding-top: 5%;
        width: 800px;
        margin: auto;
        p{
            font-size: 25px;
            font-weight: 700;
        }
        p:nth-child(2){
            color: rgb(168, 168, 168);
        }
        .line{
            width: 45px;
            height: 3px;
            background-color: #333;
        }
        .users{
            width: 100%;
            right: 0;
            display: flex;
            justify-content: space-between;
            .devUser{
                text-align: center;
                margin-top: 30px;
                width: 100%;
                height: 300px;
                .profileImg{
                    width: 150px;
                    border-radius: 10px;
                }
                p{
                    font-size: 15px;
                    font-weight: 700;
                    margin-top: 20px;
                }
            }
        }
    }
    .footer{
        margin-top: 50px;
    }
    @media screen and (max-width: 800px){
        .inner{
            width: 400px;
            .users{
                display: block;
            }
        }
    }
    @media screen and (max-width: 400px){
        .inner{
            width: 100%;
            p{
                text-align: center;
                font-size: 20px;
            }
            .line{
                margin: auto;
            }
            .users{
                .devUser{
                    .textIntroduction{
                        p{
                            font-size: 15px;
                        }
                    }
                }
            }
        }
    }
}
</style>