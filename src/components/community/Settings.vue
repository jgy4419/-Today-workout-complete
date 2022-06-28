<template>
    <div class="contain">
        <div class="inner">
            <div class="set">
                <div class="imgSet">
                    <img class="changeImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAIVBMVEXY2Njz8/Pq6urv7+/h4eHb29vo6Oje3t7j4+Pt7e3p6ekmc3lwAAADMElEQVR4nO2bC3KDMAxEMeab+x+4JZQBEkhBlq2NZt8JvGOtPkZUFSGEEEIIIYQQQgghhBBCCCEEnXbo6hjDLzHW3dBan0dEO9ThjfrrxDQHKv60NNZnu0ETz2Q8w+xbpPQfZTyl9NZnvEB7GlS7AIP3SnNFxgR4fHVXdYTQWZ/1A+14XUcII2x4tf+6fE8EVXJXB6qS+zpAldzyx8Jofep3buSrLXC563L9eAWsnrRSHSFg2eRSX3JMbX32Lb1cRwhIHaQg865E69OviJ0+g+P3pAsBupLEC8G5koSUNQOSuBJqyAJGLRnShQzWGp4kRxZKbKXrCMFaw4SCRTBMomARDJMIB5E9CGOJgtcx3J7Yn8wgdCluhGjogMi/FEIhmXBjdjdC3BRENy2Km6bRTRvvZrDyM+q6eXxw8xzk5oHOz5Opm0dsP58V3Hzo8fPpzc3HUD+fp90sDPhZ4fCzVONnzcnN4pmfVUA/y5mVm3XZys8Cs5+V8srNkv+Ek98uJpz8CDPh5NekGRc/ixFCCCHky2mb4TGO8cLkHuM4PoYGsGfph1r0Ih/rAWc2Oexz74DRE59PHre0GE8pvcoiykxnF2O96Ln3nNFGSqMs4ymlfIT9/1Qio/ADS6vojVe6gilMZUXrnFKbKfeeqiWUed5OXti4QgHTZ3THltxv9fnDaiFveOVKukfkTMRJmxr3yaakiM23ZLJ8cR2ZlBjoyKKksD8W1H1ipENdiWQ/QwflrYJidfAd1b2bQn3JMYrdiknCWlFLXSo/VqSgZRNDg8wo2STzPHgFlZnRPLAmNILLNGMtKGQus5K+J73Am5X0PckL9MYlZCW1mJin3oXEFAzikIk0l8BcSOKVAF1I2pVA1JCFlFpiffY9ch0wuXdGnoFVvnPqIf6JCaJd3CJtHQH69z3Sbh4ssuSxZX3ud2Q6oKrhjKwmwllEahI4i0hNAjJSbZGNV9anPkKiA64cTkhKIlijNSNptwCTlixtPawPfcRDIARoyl2RzLtuhACWEVkhcSPE+szHUAgaFIIGhaBBIWhQCBoUggaFoEEhaFAIGhSCBoWgQSFoUAgap8f9Ac1KQOtCVp1TAAAAAElFTkSuQmCC" alt="프로필">
                    <br/>
                    <input type="file" @change="uploadImg()" class="hidden" id="changeImg"/>
                    <label class="changeImg" for="changeImg">이미지 업로드</label>
                    <button @click="deleteImg()" class="imgDeleteBtn">이미지제거</button>
                </div>
                <div class="rightLine"/>
                <div class="introSet">
                    <p v-for="intro in set.intro" :key="intro"><span class = "beforeText">{{intro}}</span></p>
                    <input v-model="changeData.intro[i]" class = "afterText" v-for="intro, i in set.intro" :key="i" type="text"><br/>
                    <button @click="setInput()" class="setBtn">수정</button><br/><br/>
                    <button class="setBtn" @click="modalOpen()">비밀번호 변경</button>
                </div>
            </div>
            <hr/>
            <div class="userSecession">
                <span>회원 탈퇴</span>
                <button class="secessionBtn" @click="userDelete()">회원 탈퇴</button>
                <p>회원 탈퇴 시 작성한 글이 모두 삭제되며 다시 복구되지 않습니다.</p>
            </div>
            <hr/>
            <div>
                <button class="btn" @click="save()">저장하기</button>
            </div>

            <div class="changePasswordModal">
                <div class="modalInner">
                    <p class="closeBtn" @click="modalClose()">X</p>
                    <div class="passwordInputBox" v-for="passwordLabel, i in password.label.length" :key="i">
                        <label>{{password.label[i]}}</label><input class="passwordInput" :type="password.type[i]"/><br/>
                        <button class="passwordCheck btn" :style="{display: `${password.display[i]}`}">{{password.checkBtn[i]}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {uploadImg, deleteImg} from '../../../repeatFunc/loadImage';
export default {
    data(){
        return{
            set: {
                imgSet: [ '이미지 제거'],
                intro: ['이름', '자기소개'],
            },
            changeData: {
                intro: ['이름', '자기소개'],
            },
            changeImg: '',
            password: {
                checkBtn: ['확인하기', '', '저장하기'],
                label: ['기존 비밀번호를 입력해주세요', '새로운 비밀번호를 입력해주세요', '비밀번호를 한 번 더 입력해주세요'],
                display:['block', 'none', 'block'],
                type: ['password', 'password', 'password'],
                inputValue: ['password1', 'password2', 'password3'],
            },
            levelState: false, 
        }
    },
    mounted(){
        let userInformation = JSON.parse(localStorage.getItem("userInformation"));

        let changeImage = document.querySelector('.changeImage');
        console.log(userInformation.profile_img_path)
        if(document.cookie){
            changeImage.src = userInformation.profile_img_path;
            this.set.intro[0] = userInformation.nickname;
            this.set.intro[1] = userInformation.introduction;
            this.changeData.intro[0] = userInformation.nickname;
            this.changeData.intro[1] = userInformation.introduction;
        }

        // 비밀번호 체크
        let passwordCheckBtn = document.querySelectorAll('.passwordCheck');
        let passwordInput = document.querySelectorAll('.passwordInput');
        let state = this.levelState;
        console.log(state);
        passwordCheckBtn[0].addEventListener('click', function(){
            console.log(passwordInput[0].value)

            axios.post("/api/checkPassword", {password: passwordInput[0].value, mail: userInformation.mail})
            .then(res => {
                console.log(res.data.checkid);

                if(res.data.checkid === true){
                    alert('비밀번호가 일치합니다.')
                    state = res.data.checkid;
                }else{
                    alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
                }
            })
            .catch(err => console.log(err));
        });
        passwordCheckBtn[2].addEventListener('click', function(){
            if(passwordInput[1].value === passwordInput[2].value && state === true){
                alert('수정되었습니다! 재 로그인 해주세요.');
                axios.patch('/api/updatePassword', {password: passwordInput[2].value, mail: userInformation.mail})
                .then(res => {
                    localStorage.removeItem('userInformation');
                    // 쿠키를 전 시간으로 돌려서 로그아웃 시켜줌.
                    document.cookie = 'user=; expires=Thu, 18 Dec 2013 12:00:00 GMT'
                    location.replace('/');
                    console.log(res)
                })
                .catch(err => console.log(err));
            }else{
                alert('비밀번호가 다릅니다!');
            }
        })
    },
    methods: {
        uploadImg(){
            let fileName = document.getElementById('changeImg');
            const changeImage = document.querySelector('.changeImage');
            // 이미지 파일을 백엔드한테 전송하기 위해서는 .files[0]을 넣어서 보내주기.
            this.changeImg = fileName.files[0];
            uploadImg(fileName, changeImage, this.changeImg);
        },
        deleteImg(){
            const changeImage = document.querySelector('.changeImage');
            // '../../../repeatFunc/loadImage' 파일의 deleteImg 함수
            changeImage.src = deleteImg();
            console.log('changeImage', changeImage.src);
            // console.log(this.changeImg);
            // console.log(changeImage.src)
        },
        save(){
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            let frm = new FormData();
            frm.append('mail', userInformation.mail);
            frm.append('profileImage', this.changeImg);
            frm.append('nickname', this.set.intro[0]);
            frm.append('introduction', this.set.intro[1]);
            console.log(this.changeImg);

            axios.patch('/api/updateMyInfo', frm, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(res => {
                console.log('성공!', res)
                alert('변경에 성공했습니다. 재 로그인 해주세요.');
                localStorage.removeItem('userInformation');
                // 쿠키를 전 시간으로 돌려서 로그아웃 시켜줌.
                document.cookie = 'user=; expires=Thu, 18 Dec 2013 12:00:00 GMT'
                location.replace('/');
            }).catch(err => {
                console.log(err);
            })
        },
        userDelete(){
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
             if (confirm("정말로 회원을 탈퇴하시겠습니까?")) {
                // 확인 버튼 클릭 시 동작
                alert("탈퇴되었습니다.");
                alert(userInformation.mail);
                axios.delete('/api/deleteUserInfo', {params: {mail: userInformation.mail}})
                .then(res => {
                    console.log(res)
                    localStorage.removeItem('userInformation');
                    // 쿠키를 전 시간으로 돌려서 로그아웃 시켜줌.
                    document.cookie = 'user=; expires=Thu, 18 Dec 2013 12:00:00 GMT'
                    location.replace('/');
                }).catch(err => {
                    console.log(err);
                })
            } else {
                // 취소 버튼 클릭 시 동작
                alert("탈퇴하기를 취소하였습니다.");
            }
        },
        setInput(){
            const beforeText = document.querySelectorAll('.beforeText');
            const afterText = document.querySelectorAll('.afterText');
            // 버튼을 누르면 변경경 text 값 적용 시켜줌.
            for(let i = 0; i < beforeText.length; i++){
                beforeText[i].classList.toggle('event');
                afterText[i].classList.toggle('event');
                this.set.intro[i] = this.changeData.intro[i];
            }
        },
        modalOpen(){
            let modal = document.querySelector('.changePasswordModal');
            modal.style = 'display: block';
        },
        modalClose(){
            let modal = document.querySelector('.changePasswordModal');
            modal.style = 'display: none';
        },
    }
}
</script>

<style lang="scss" scoped>
.setBtn{
    background-color: transparent;
    border: 0;
    color: #93B5C6;
    text-decoration: underline;
}
.contain {
    width: 100vw;
    .inner{
        margin: auto;
        width: 700px;
        margin-top: 10%;
        .set{
            display: flex;
            .imgSet{
                img{
                    width: 150px;
                    height: 150px;
                    border-radius: 10px;
                }
                .imgDeleteBtn, .changeImg{
                    display: flex;
                    margin-top: 10px;
                    justify-content: center;
                    align-items: center;
                    border: 0px;
                    border-radius: 10px;
                    background-color: #93B5C6;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    width: 150px;
                    height: 40px;
                    cursor: pointer;
                }
                .imgDeleteBtn:hover, .changeImg:hover {
                    background-color: #C9CCD5;
                }
            }
            .rightLine{
                margin-left: 50px;
                width: 1px;
                height: 250px;
                background: rgb(151, 151, 151);
            }
            .introSet{
                margin-left: 100px;
                .beforeText{
                    font-size: 20px;
                    font-weight: 700;
                    color: #333;
                }
                .beforeText:nth-child(2) {
                    font-size: 20px;
                    color: rgb(151, 151, 151);
                }
                .beforeText.event{
                    display: none;
                }
                .afterText{
                    display: none;
                    background-color: rgb(240, 240, 240);
                    border: 1px solid rgb(202, 202, 202);
                    border-radius: 10px;
                    font-size: 18px;
                    font-weight: 500;
                    width: 300px;
                    height: 40px;
                    padding: 10px;
                    margin-top: 10px;
                }
                .afterText.event{
                    display: block;
                }
            }
        }
        .secessionBtn{
            font-size: 14px;
            font-weight: 700;
            border-radius: 10px;
            border: 0;
            background-color: rgb(252, 224, 224);
            width: 100px;
            height: 40px;
        }
        .userSecession{
            width: 100%;
            height: 80px;
            // background-color: #333;
            margin-top: 30px;
            span{
                font-weight: 700;
                font-size: 18px;
            }
            .secessionBtn{
                margin-left: 10%;
            }
            p{
                padding-top: 20px;
                font-size: 12px;
                color: rgb(215, 215, 215);
            }
        }
        .changePasswordModal {
            position: absolute;
            display: none;
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
                width: 500px;
                height: 70vh;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
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
        }
    }
    .btn{
        font-weight: 900;
    }
}
@media screen and (max-width: 900px){
    .contain{
        .inner{
            padding: 10%;
            width: 500px;
            .set{
                .imgSet{
                    img{
                        width: 100px;
                        height: 100px;
                    }   
                    .imgDeleteBtn, .changeImg{
                        width: 100px;
                        font-size: 12px;
                    }
                }
                .rightLine{
                    height: 200px;
                }
                .introSet{
                    margin-left: 20px;
                    .beforeText{
                        font-size: 18px;
                    }
                }
            }
            .secessionBtn{
                font-size: 12px;
                width: 80px;
                height: 40px;
            }
            .userSecession{
                span{
                    font-size: 15px;
                }
                p{
                    font-size: 10px;
                }
            }
        }
        @media screen and (max-width: 900px){
            .inner{
                .set{
                    .imgSet{
                        .changeImg, .imgDeleteBtn{
                            border-radius: 5px;
                            font-size: 12px;
                            height: 30px;
                        }
                    }
                    .introSet{
                        font-size: 12px;
                    }
                }
                .userSecession{
                    span{
                        font-size: 15px;
                    }
                    .secessionBtn{
                        height: 30px;
                    }
                }
            }
        }
    }
}
</style>