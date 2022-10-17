<template>
    <div>
        <div class="contain">
            <div class="inner">
                <PasswordChange 
                :password_change_modal_state="password_change_modal_state"
                :email="email"
                @close="modalClose"/>
                <!-- <form action="/searchid" method="post" class="login">  -->
                <div class="login">
                    <p>비밀번호 찾기</p>
                    <!-- <div> -->
                    <input ref="email" class="inputValue" :type = type[i] placeholder = 'email'><br/>
                    <!-- </div> -->
                    <!-- <div v-for="value, i in value" :key="i">
                        <input class="inputValue" :type = type[i] :placeholder = value>
                    </div> -->
                    <input v-model="auth.auth_input" v-if="auth.authState === 1" placeholder="인증번호를 입력해주세요." type="number" class="inputValue_auth"/> 
                    <p class="timer" v-if="timerState === 1">
                        {{String(Math.floor((auth.authCounter  / (1000 * 60 )) % 60 )).padStart(2, "0")}} :
                        {{String(Math.floor((auth.authCounter / 1000 ) % 60)).padStart(2, "0")}}
                    </p><br/>
                    <button v-if="auth.auth_step === 0" class="auth_button get" @click="get_auth()">인증번호 받기</button>
                    <button v-if="auth.auth_step === 1" class="auth_button put" @click="put_auth()">인증확인</button>
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
import PasswordChange from '../PasswordChange.vue';
export default {
    components: {
        PasswordChange
    },
    data(){
        return {
            email: '',
            auth: {
                authCounter: 180000,
                auth_input: '',
                auth_step: 0,
                timerState: 0,
                authState: 0,
                authRes: 0,
            },
            password_change_modal_state: false,
            value: ['email'],
            type: ['email'],
            loginList: ['로그인', '회원가입', '아이디 찾기'],
            route: ['/login', '/login/Join', '/login/SearchId']
        }
    },
    unmounted(){
        this.auth.authCounter = 0;
    },
    methods: {
        get_auth() {
            this.timerState = 1;
            setInterval(() => {
                this.auth.authCounter -= 1000;
                if(this.auth.authCounter === 0){
                    alert('시간이 초과되었습니다.');
                    location.reload(true);
                }
            }, 1000);
            this.email = this.$refs.email.value;
            console.log(this.$refs.email.value);
            this.auth.authState = 1;
            this.auth.auth_step = 1;
            axios.post('/api/mailauth', {
                mail: this.$refs.email.value
            }).then(res => {
                console.log(res);
                this.auth.authRes = res.data;
            }).catch(err => console.log(err));
        },
        put_auth() {
            if (this.auth.authRes === this.auth.auth_input) {
                this.password_change_modal_state = true;   
            } else {
                alert('인증번호가 다릅니다!');
            }
        },
        modalClose() {
            this.password_change_modal_state = false;
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
            .timer{
                position: absolute;
                right: 10%;
                font-size: 12px;
            }
            input, .auth_button{
                font-size: 15px;
                width: 300px;
                height: 50px;
                border-radius: 10px;
                margin-top: 10px;
                border: 2px solid rgb(181, 181, 181);
                padding-left: 10px;
            }
            .auth_button{
                margin-top: 20px;
                background-color: #93B5C6;
                color: #fcf3f3;
                font-weight: 900;
                box-sizing: content-box;
                border: 0px;
                transition: .3s;
                cursor: pointer;
            }
            .auth_button:hover{
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
                input, .auth_button{
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