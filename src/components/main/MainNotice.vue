<template>
    <div class="contain">
        <div class="inner">
            <Spinner class="spinner" v-if="spinnerState === 1"/>
            <div class="noticeHead">
                <p class="noticeTitle">오운완 공지</p>
                <div class="line"/>
                <ul class="noticeList">
                    <li class="noticeItem" @click="activate"
                    v-for="noticeList in noticeList" :key="noticeList">{{noticeList}}</li>
                </ul>
            </div>
                <div class="noticeSectionBox">
                    <router-link class="link" :to="`/${noticeData[i].nickname}/${noticeData[i].board_id}/${noticeData[i].post_id}`" 
                    v-for="a, i in noticeData.length" :key="i">
                        <div class="noticeSection">
                            <p class="itemTitle">
                                {{noticeData[i].title}}
                            </p>
                            <hr>
                            <p v-bind:id="'preview-click'+i"/>
                        </div>
                    </router-link>
                </div>
            <router-link to="/community">
                <p class="moreBtn">더 보기</p>
            </router-link>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';
import Spinner from '../Spinner.vue';
export default {
    components: {
        Spinner
    },
    data(){
        return{
            noticeList: ['전체', '자유', '운동'],
            noticeItem: {
                title: ['놓칠 수 없는 첫 회원 이벤트', '같이 운동 하자!', '운동량 측정 해볼래?'],
                content: ['첫 회원가입 시 추첨을 통해 선물 지급!', '사람들과 소통하면서 운동 방법을 공유할 수 있는 커뮤니티 생성!', '실제 자신이 운동한 운동량을 측정하고, 사람들한테 공유해보세요.']
            },
            notice: '전체',
            noticeData: [],
            noticeState: 0,
            spinnerState: 1,
        }
    },
    async mounted(){
        // 처음에 공지 부분에 전체 부분에 파란색 띄워놓기.
        document.querySelectorAll('.noticeItem')[0].classList.add('active');
        this.getNoticeData();
        this.watchData();
    },
    methods: {
        async watchData(){
            this.getNoticeData();
        },
        decode(text){
            // https://codepen.io/csmccoy/pen/yLNBpyW?editors=1010
            return $("<textarea/>").html(text).text();
        },
        activate({target}){
            this.noticeState = target.innerHTML;
            console.log(this.noticeState);
            let noticeItem = document.querySelector('.noticeList');
            [...noticeItem.children].forEach(info => {
                info.classList.toggle('active', info === target);
            })
        },
        getNoticeData(){
            // 전체 게시글 개수만큼 불러오고, notice에 보여주는건 3개로 제한해주기.
            if(this.noticeState === '전체' || this.noticeState === 0){
                axios.get('/api/showPostDesc', {params: {board_id: 1, limit: 0}})
                .then(res => {
                    console.log(res);
                    this.spinnerState = 0;
                    this.noticeData = [];
                    for(let i = 0; i < 3; i++){
                        this.noticeData.push(res.data[i]);
                        $(`#preview-click${i}`).html(this.decode(res.data[i].comment));
                    }
                }).catch(err => console.log(err));
            }else if(this.noticeState === '자유'){
                axios.get('/api/showAnotherBoard', {params: {board_id: 2}})
                .then(res => {
                    this.noticeData = [];
                    for(let i = 0; i < 3; i++){
                        this.noticeData.push(res.data[i]);
                        $(`#preview-click${i}`).html(this.decode(res.data[i].comment));
                    }
                }).catch(err => {console.log(err)});
            }else{
                axios.get('/api/showAnotherBoard', {params: {board_id: 3}})
                .then(res => {
                    this.noticeData = [];
                    for(let i = 0; i < 3; i++){
                        this.noticeData.push(res.data[i]);
                        $(`#preview-click${i}`).html(this.decode(res.data[i].comment));
                    }
                }).catch(err => {console.log(err)});
            }
        },
    },
    watch: {
        noticeState: function(){
            this.getNoticeData();
        }
    }
}
</script>


<style lang="scss" scoped>
// router-link 스타일 없애주기.
.link{
    text-decoration: none;
    color: #333;
}
.contain{
    width: 100vw;
    // background-color: #333;
    .inner{
        width: 80%;
        margin: auto;
        .spinner{
            position: absolute;
            top: 100px;
            z-index: 100;
            left: 0;
            right: 0;
            margin: auto;
        }
        .noticeHead{
            display: flex;
            justify-content: space-between;
            .noticeTitle{
                color: #93B5C6;
                font-size: 23px;
                font-weight: 900;
            }
            .line{
                width: 50vw;
                height: 1px;
                background-color: rgb(192, 192, 192);
                margin-top: 15px;
                margin-left: 3%;
            }
            .noticeList{
                display: flex;
                li{
                    color: rgb(123, 123, 123);
                    margin-left: 20px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                }
                li.active{
                    color: #93B5C6;
                }
            }
        }
        .noticeSectionBox{
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            .noticeSection{
                cursor: pointer;
                box-shadow: 4px 12px 30px 6px rgb(231, 231, 231);
                width: 25vw;
                height: 200px;
                padding: 20px;
                border-radius: 20px;
                transform: translateY(0);
                transition: .3s;
                .itemTitle{
                    font-size: 20px;
                    font-weight: 700;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                    white-space:nowrap;
                }
                .itemContent{
                    font-size: 16px;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                    white-space:nowrap;
                }
            }
            .noticeSection:hover{
                transition: .3s;
                transform: translateY(-10px);
            }
        }
        .moreBtn{
            position: absolute;
            z-index: 10;
            cursor: pointer;
            font-weight: 700;
            right: 10%;
            margin-top: 25px;
        }
    }
    @media screen and (max-height: 500px){
        .contain{
                            margin-top: 50px;   
            .inner{
            }
        }
    }
    @media screen and (max-width: 1200px){
        .inner{
            .noticeHead{
                .line{
                    width: 40vw;
                }
            } 
        }
    }
    @media screen and (max-width: 1000px){
        .inner{
            .noticeHead{
                .noticeTitle{
                    font-size: 20px;
                }
                .noticeList li{
                    font-size: 14px;
                }
            } 
            .noticeSectionBox{
                display: block;
                .noticeSection{
                    width: 100%;
                    height: 150px;
                    margin-top: 30px;
                }
            }
        }
    }
    @media screen and (max-width: 800px){
        .inner{
            .noticeHead{
                .line{
                    // width: 30vw;
                    display: none;
                }
                .noticeTitle{
                    font-size: 18px;
                }
                .noticeList li{
                    font-size: 12px;
                }
            }   
            .noticeSectionBox .noticeSection{
                .itemTitle{
                    font-size: 18px;
                }
                .itemContent{
                    font-size: 14px;
                }
            }
        }
    }
}
</style>

