<template>
    <div class="changePasswordModal" v-if="password_change_modal_state === true">
        <div class="modalInner">
            <p class="closeBtn" @click="$emit('close', '모달창 닫기')">X</p>
            <div v-if="$route.path !== '/login/SearchPw'">
                <label>기존 비밀번호를 입력해주세요</label><input class="passwordInput" type="password"/><br/>                
            </div>
            <div class="passwordInputBox" v-for="passwordLabel, i in password.label.length" :key="i">
                <label>{{password.label[i]}}</label><input v-model="password.inputValue[i]" class="passwordInput" :type="password.type[i]"/>
            </div>
            <button class="passwordCheck btn" @click="passwordChange()">비밀번호 변경</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    mounted() {
      console.log(this.$route.path);  
    },
    data() {
        return {
            state: false,
            password: {
                checkBtn: ['확인하기', '', '저장하기'],
                label: ['새로운 비밀번호를 입력해주세요', '비밀번호를 한 번 더 입력해주세요'],
                display:['none', 'block'],
                type: ['password', 'password'],
                inputValue: ['password2', 'password3'],
            }      
        }
    },
    props: {
        password_change_modal_state: Boolean,
        email: String,
    },
    methods: {
        passwordChange() {
            if (this.password.inputValue[0] === this.password.inputValue[1]) {
                axios.patch('/api/updatePassword', {
                password: this.password.inputValue[1],
                mail: this.email
                }).then(() => {
                    alert('변경 완료되었습니다!');
                    location.replace('/');
                }).catch(error => {
                    console.log(error);
                })   
            } else {
                alert('비밀번호가 다릅니다.');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.changePasswordModal {
    margin: auto;
    position: fixed;
    display: block;
    background: rgba($color: #333, $alpha: .7);
    z-index: 100;
    left: 0;
    width: 100vw;
    height: 100vh;
    top: 0;
    .modalInner{
        position: absolute;
        background-color: #fff;
        border-radius: 10px;
        width: 40%;
        height: 70vh;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        padding: 20px;
        .closeBtn{
            text-align: right;
            padding-right: 20px;
            font-size: 20px;
            font-weight: 700;
            cursor: pointer;
        }
        .passwordInputBox{
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            input{
                position: absolute;
                right: 8%;
            }
            .btn{
                margin-top: 8%;
                margin-right: 4%;
                color: #333;
            }
        }
    }
    @media screen and (max-width: 750px){
        .modalInner{
            width: 70%;
        }
    }
    @media screen and (max-width: 500px){
        .modalInner{
            width: 90%;
        }
    }
}
</style>