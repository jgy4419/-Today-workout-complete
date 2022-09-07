<template>
    <div>
        <div class="contain">
            <div class="inner">
                <!-- <form action="/api/findId" method="post" class="login">  -->
                <div class="login">
                    <p>아이디 찾기</p>
                    <div class="inputBox" v-for="value, i in value" :key="i">
                        <!-- <label for="input">{{label[i]}}</label> -->
                        <input class="input" :name = name[i] :type = type[i] :placeholder = value>
                    </div>
                    <button @click="searchId()" class="loginBtn">찾기</button>
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
import axios from 'axios'
export default {
    data(){
        return{
            name: ['user_name', 'phonenumber'],
            label: ['이름', '전화번호'],
            value: ['이름을 입력하세요', '전화번호'],
            type: ['text', 'tel'],
            loginList: ['로그인', '회원가입', '비밀번호 찾기'],
            route: ['/login', '/login/Join', '/login/SearchPw']
        }
    },
    methods: {
        searchId(){
            const input = document.querySelectorAll('.input');
            console.log(input[0].value);
            console.log(input[1].value);
            axios.get('/api/findId', {
                params: {
                    uesr_name: input[0].value,
                    phonenumber: input[1].value
                }}, {withCredentials: true}
            ).then(res => {
                alert('아이디는' + res.data[0].mail + '입니다!');
            }).catch(err => {
                alert('정보가 잘 못 되었습니다.');
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
a{
    text-decoration: none;
}
a:hover{
    color: grey;
}
.contain{
    position: absolute;
    width: 100vw;
    margin: auto;
    top: 30%;
    left: 0;
    right: 0;
    // border: 2px solid #333;
    border-radius: 10px;
    padding-bottom: 3%;
    .inner{
        margin: auto;
        width: 50%;
        color: #636363;
        p{
            font-size: 20px;
            font-weight: 700;
        }
        .login{
            text-align: center;
            input, .loginBtn{
                font-size: 15px;
                width: 300px;
                height: 50px;
                border-radius: 10px;
                border: 2px solid rgb(181, 181, 181);
                padding-left: 10px;
                margin-top: 10px;
            }
            .loginBtn{
                background-color: #93B5C6;
                color: #fcf3f3;
                font-weight: 900;
                box-sizing:content-box;
                border: 0px;
                transition: .3s;
                cursor: pointer;
            }
            .loginBtn:hover{
                background-color: #6d84c9;
                color: #fff;
            }
        }
        .loginList{
            font-size: 15px;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
        }
    }
}
@media screen and (max-width: 750px){
    .contain{
        .inner{
            width: 80%;
            .login{
                input, .loginBtn{
                    width: 250px;
                    height: 50px;
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