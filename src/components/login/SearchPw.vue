<template>
    <div>
        <div class="contain">
            <div class="inner">
                <!-- <form action="/searchid" method="post" class="login">  -->
                <div class="login">
                    <p>비밀번호 찾기</p>
                    <div v-for="value, i in value" :key="i">
                        <input class="inputValue" :type = type[i] :placeholder = value>
                    </div>
                    <button class="searchPwBtn" @click="searchPw()">찾기</button>
                </div>
                <!-- </form> -->
                <ul class="loginList">
                        <li v-for="loginList, i in loginList" :key="i">
                            <router-link :to = route[i]>
                                {{loginList}}
                            </router-link>
                        </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            value: ['email', '이름', '휴대폰 번호'],
            type: ['email', 'text', 'tel'],
            loginList: ['로그인', '회원가입', '아이디 찾기'],
            route: ['/login', '/login/Join', '/login/SearchId']
        }
    },
    methods: {
        searchPw(){
            const input = document.querySelectorAll('.inputValue');
            console.log(input[0].value);
            console.log(input[1].value);
            console.log(input[2].value);
            axios.get('/api/findPassword', {
                params: {
                    mail: input[0].value,
                    uesr_name: input[1].value,
                    phonenumber: input[2].value
                }}, {withCredentials: true}
            ).then(res => {
                alert('비밀번호는' + res.data[0].password + '입니다!');
            }).catch(err => {
                alert('정보가 잘 못 되었습니다.');
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.contain{
    position: absolute;
    margin: auto;
    top: 20%;
    left: 0;
    right: 0;
    width: 100vw;
    // border: 2px solid #333;
    border-radius: 10px;
    padding-bottom: 3%;
    .inner{
        width: 50%;
        margin: auto;
        color: #636363;
        p{
            font-size: 20px;
            font-weight: 700;
        }
        .login{
            text-align: center;
            input, .searchPwBtn{
                font-size: 15px;
                width: 300px;
                height: 50px;
                border-radius: 10px;
                margin-top: 10px;
                border: 2px solid rgb(181, 181, 181);
                padding-left: 10px;
            }
            .searchPwBtn{
                background-color: #93B5C6;
                color: #fcf3f3;
                font-weight: 900;
                box-sizing: content-box;
                border: 0px;
                transition: .3s;
                cursor: pointer;
            }
            .searchPwBtn:hover{
                // box-sizing: border-box;
                // border: 2px solid #FFE3E3;
                background-color: #6d84c9;
                color: #fff;
            }
        }
        .loginList{
            margin-top: 30px;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
        }
    }
}
@media screen and (max-width: 750px){
    .contain{
        .inner{
            width: 85%;
            .login{
                input, .searchPwBtn{
                    font-size: 12px;
                }
            }
            .loginList{
                font-size: 12px;
            }
        }
    }
}
</style>