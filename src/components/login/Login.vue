<template>
    <div>
        <div class="contain">
            <div class="inner">
                <!-- <form action="/api/login" method="post" class="login">  -->
                <div class="login">
                    <p>로그인</p>
                    <div class="inputBox">
                        <input type="text" v-model="logins.mail" name="mail" placeholder="이메일를 입력하세요!"/>
                    </div>
                    <div class="inputBox">
                        <input type="password" v-model="logins.password" name="password" placeholder="비밀번호를 입력하세요!"/>
                    </div>
                    <!-- <router-link to="/community"> -->
                    <button @click="login()" class="loginBtn">로그인</button>
                    <!-- </router-link> -->
                <!-- </form> -->
                </div>
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
            loginList: ['회원가입', '아이디 찾기', '비밀번호 찾기'],
            route: ['/login/Join', '/login/SearchId', '/login/SearchPw'],
            logins: {
                mail: '',
                password: ''
            }
        }
    },
    methods: {
        async login(){
            // /api/login으로 값을 아이디, 비밀번호를 보냄 -> 백엔드는 DB에서 아이디, 비밀번호가 일치한게 있으면 가져와서 보내줌.(토큰) => 둥일한게 없으면 boolean 값이 false인 것을 넣어줌.
            axios.post('/api/login', {mail: this.logins.mail, password: this.logins.password})
            .then(res => {
                // console.log(res);
                if(res.data.result.length === 0){
                    alert('아이디나 비밀번호가 잘 못 되었습니다.');
                    // 결과로 받아온 result 배열의 길이가 0이 아니면 로그인 성공.
                }else if(res.data.result.length !== 0){
                    // DB에서 찾으면 cookie에 값을 넣어줌.
                    // let date = new Date(Date.now() + 86400e3);
                    // 로그인 시 회원 정보 로컬스토리지에 저장.categoryName  
                    
                    let userInformation = {
                        mail: res.data.result[0].mail,
                        grant: Number(res.data.result[0].grantion_level),
                        user_name: res.data.result[0].user_name,
                        introduction: res.data.result[0].introduction,
                        phonenumber: res.data.result[0].phonenumber,
                        address: res.data.result[0].address,
                        sex: res.data.result[0].sex,
                        nickname: res.data.result[0].nickname,
                        profile_img_path: `http://localhost:3000/img/userProfile/${res.data.result[0].profile_img_path}`,
                    }
                    
                    const user = userInformation;
                    const expire = Date.now() + 86400000;

                    localStorage.setItem('userInformation', JSON.stringify(user));
                    localStorage.setItem('expire', JSON.stringify(expire));
                    location.replace('/');
                }
            })
            .catch(err => {console.log(err)})
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
    width: 40vw;
    height: 50vh;
    border-radius: 10px;
    .inner{
        margin: auto;
        color: #636363;
        p{
            font-size: 20px;
            font-weight: 700;
        }
        .login{
            text-align: center;
            padding-top: 20%;
            input{
                margin: auto;
                font-size: 15px;
                width: 300px;
                height: 50px;
                border-radius: 10px;
                margin-top: 10px;
                border: 2px solid rgb(181, 181, 181);
                padding-left: 10px;
            }
            .loginBtn{
                margin-top: 20px;
                width: 300px;
                height: 50px;
                background-color: #93B5C6;
                color: #fcf3f3;
                font-weight: 900;
                box-sizing:content-box;
                border: 0px;
                border-radius: 10px;
                transition: .3s;
                cursor: pointer;
            }
            .loginBtn:hover{
                // box-sizing: border-box;
                // border: 2px solid #FFE3E3;
                background-color: #6d84c9;
                color: #fff;
            }
        }
        .loginList{
            margin: auto;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
        }
    }
}
@media screen and (max-width: 750px){
        .contain{
            margin: auto;
            .inner{
                // width: 100%;
                position: absolute;
                justify-content: center;
                p{
                    margin: auto;
                    font-size: 18px;
                }
                .login{
                    .inputBox input{
                        font-size: 12px;
                        width: 250px;
                        height: 50px;
                    }
                    .loginBtn{
                        width: 250px;
                    }
                }
                .loginList{
                    margin-right: 20px;
                    font-size: 12px;
                }
            }
        }
    }
    @media screen and (max-width: 500px){
        .inner{
            p{
                font-size: 15px;
            }
            .login{
                input{
                    font-size: 12px;
                    width: 200px;
                    height: 40px;
                }
                .loginBtn{
                    width: 185px;
                }
            }
            .loginList{
                font-size: 8px;
            }
        }
    }
</style>