<template>
    <div class="contain">
        <div class="containHead">
            <div id="categoryName">{{$store.state.Community.categoryName}}</div>
            <select @change="sortPost()" name="sort" id="sort" class="sort">
                <option v-for="option in option.value" class="sortPost" :key="option">{{option}}</option>
            </select>
        </div>
        <div class="inner">
            <Spinner class="spinner" v-if="spinnerState === 1"/>
            <div class="inner" v-if="spinnerState === 1">
                <Skeleton class="post" v-for="i in 9" :key="i"/>
            </div>
            <p class="not_data_text" v-if="data_state === 1">{{'아직 게시글이 없습니다!'}}</p>
            <div class="post" v-for="data, i in postCount" :key="i">
                <router-link style="text-decoration: none; color: #333" class="postUrl" :to="`/${getData.data[i].nickname}/${getData.data[i].board_id}/${getData.data[i].post_id}`">
                    <div :style="{backgroundImage:`url('http://118.67.132.81:3000/img/postPhoto/${getData.data[i].photographic_path}')`}" class="titleImg"/>
                    <ul class="sideIcon">
                        <li class="icon" v-for="icon in sideMenu" :key="icon">
                            {{icon}}
                        </li>
                    </ul>
                    <ul class="sideValue">
                        <!-- <li class="value" v-for="value, i in sideMenuValues.watch.length" :key="i">{{sideMenuValues.watch[i]}}</li> -->
                        <li class="value">{{sideMenuValues.watch[i]}}</li>
                        <li >{{sideMenuValues.like[i]}}</li>
                        <li class="value">{{sideMenuValues.comment[i]}}</li>
                    </ul>
                    <div>
                        <div class="bottom">
                            <p>{{getData.data[i].post_id}}</p>
                            <p style="display: none">글 ID: {{getData.data[i].post_id}}</p>
                            <h3 class="postTitle"><strong>글 제목 : {{getData.data[i].title}}</strong></h3>
                            <p>닉네임 / 아이디 : {{getData.data[i].nickname}}</p>
                            <!-- 게시날짜 표시 (년 - 월 - 일) -->
                            <p>날짜: {{dayJS(getData.data[i].creation_datetime).format("YYYY-MM-DD")}}</p>
                            {{searchRes}}
                            <p>{{$store.state.Search.searchValue}}</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="btnBox">
                <button @click="moreData" class="moreBtn">더 보기</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'; 
import {mapState} from 'vuex';
import Skeleton from '../Skeleton.vue';
import Spinner from '../Spinner.vue';
import dayjs from 'dayjs';
export default {
    components: {
        Spinner,
        Skeleton
    },
    // 데이터가 추가적으로 저장이 되면 
    // test 서버 불러오기 => npx json-server ./exerciseData.json --watch --port 8800
    data(){
        return {
            // 최신순 일 때는 0 오래된 순일 때는 1
            sortState: 0,
            data_state: 0,
            sideMenu: {
                watch: '🤓',
                like: '🖤',
                comment: '💬'
            },
            // sideMenuValues에 조회수, 좋아요 개수, 댓글 개수 들어감.
            sideMenuValues: {
                watch: [],
                like: [],
                comment: []
            },
            searchRes: this.$store.state.Search.searchValue,
            postUrl: '/login',
            option: {
                value: ['최신순', '오래된순'],
                class: ['up', 'up'],    
            },
            getData: [],
            postCount: 0,
            spinnerState: 1,
            // dayjs 적용할 변수
            dayJS: dayjs,
        }
    },
    computed: {
        ...mapState('Community', ['categoryName', 'categoryState', 'post', 'category']),
        ...mapState('Search', ['searchRes']),
    },
    props:{
        propsRes: String,
    },
    watch: {
        // vuex의 categoryName값이 변경되면 getPost(데이터 불러오는 함수)를 호출한다.
        categoryName(after){
            console.log(after);
            if(after === '전체'){
                this.getPost();
            }else if(after === '자유게시판'){
                this.changePost(2);
            }else if(after === '운동게시판'){
                this.changePost(3);
            }
        },
        // 검색창이 변경될 때마다 
        propsRes(result){
            // search 값이 변경되면, 데이터 들을 불러와서 post img, title, id 등에 각각 넣어주기.
            console.log(result);
            axios.get('/api/searchtitle', {
                params: {title: result}}, 
                {withCredentials: true})
            .then(res => {
                if(result === ''){
                    this.getPost();
                    console.log(this.getData);
                }else{
                    this.postCount = res.data.length;
                    this.getData.data = res.data;
                    console.log(this.getData);
                }
            }).catch(err => console.log(err));
        },
        $route: function () {
            this.sortState = 0;
        }
    },
    async mounted(){
        this.postCount = 0;
        this.getPost();
    },
    methods: {
        async sortPost(){
            this.sortState === 0 ? this.sortState = 1 : this.sortState = 0;
            let apiUrl = '';
            if (this.sortState === 0) {
                apiUrl = 'showPostDesc';
            } else {
                apiUrl = 'showPostAsc';
            }
            await axios.get(`/api/${apiUrl}`, {params: {board_id: 1, limit: 0}})
            .then(res => {
                this.getData = res;
                this.postCount = this.getData.data.length;
                this.sideMenuValues.like = [];
                this.sideMenuValues.comment = [];
                res.data.forEach(async (res) => {
                    this.sideMenuValues.watch.push(res.views);
                    await axios.get('/api/countComments', {
                    params: {post_id: res.post_id}})
                        .then(res => {
                            console.log(res);
                        // console.log(res.data[0].);
                        this.sideMenuValues.comment.push(res.data[0].comments_count);
                        // console.log(this.sideMenuValues.comment)
                    }).catch(err => {
                        console.log(err);
                    })
                    await axios.get('/api/likePostWho', {
                        params: {post_id: res.post_id}
                    }).then(likeRes => {
                        console.log(likeRes.data);
                        likeRes.data == 'failure'
                            ? this.sideMenuValues.like.push(0)
                            : this.sideMenuValues.like.push(likeRes.data.length);
                    });
                })
            }).catch(err => console.log(err));
        },
        async getPost(){
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));

            let apiUrl = ''; let paramsKey = ''; let paramsValue = '';
            console.log(paramsKey);
            console.log(this.$route.name);
            if (this.$route.name === 'MyPage') {
                apiUrl = 'myPagePost';
                paramsKey = 'nickname';
                paramsValue = userInformation.nickname;
            } else if(this.$route.name === 'Community'){
                apiUrl = 'showPostDesc';
                paramsKey = 'border_id';
                paramsValue = 1;
            }
            console.log(paramsValue, paramsKey);
            await axios.get(`/api/${apiUrl}`, { params: { [paramsKey]: paramsValue, limit: this.postCount}})
                .then(res => {
                    console.log(userInformation.nickname);
                    console.log(res);
                    this.spinnerState = 0;
                    this.getData = [];
                    this.getData = res;
                    this.postCount = this.getData.data.length;
                    // 데이터가 하나도 없을 때 빈 데이터 넣어주기 (화면에 안뜨도록 설정)
                    if (res.data === 'failure') {
                        this.getData = [];
                        this.data_state = 1;
                        this.postCount = 0;
                        return;
                    }
                    res.data.forEach(async (res) => {
                        this.sideMenuValues.watch.push(res.views);
                        await axios.get('/api/countComments', {
                            params: { post_id: res.post_id }
                        })
                        .then(res => {
                            // console.log(res);
                            this.sideMenuValues.comment.push(res.data[0].comments_count);
                            // console.log(this.sideMenuValues.comment)
                        }).catch(err => {
                            console.log(err);
                        })

                        await axios.get('/api/likePostWho', {
                            params: {post_id: res.post_id}
                        }).then(likeRes => {
                            // console.log(likeRes);
                            if (likeRes.data === 'failure') {
                                likeRes.data = '';
                            }
                            this.sideMenuValues.like.push(likeRes.data.length)
                        });
                    })
                }).catch(err => console.log(err));
        },
        // 카테고리가 변경되면 나타나는 게시물들
        changePost(boardID){
            axios.get('/api/showAnotherBoard', {params: {board_id: boardID}})
            .then(res => {
                console.log(res);
                this.getData = res;
                this.postCount = this.getData.data.length;
                if (res.data === 'failure') {
                    this.postCount = 0;
                    this.getData = [];
                }
                res.data.forEach(async (res) => {
                        this.sideMenuValues.watch.push(res.views);
                        await axios.get('/api/countComments', {
                            params: { post_id: res.post_id }
                        })
                        .then(res => {
                            // console.log(res);
                            this.sideMenuValues.comment.push(res.data[0].comments_count);
                            // console.log(this.sideMenuValues.comment)
                        }).catch(err => {
                            console.log(err);
                        })

                        await axios.get('/api/likePostWho', {
                            params: {post_id: res.post_id}
                        }).then(likeRes => {
                            // console.log(likeRes);
                            if (likeRes.data === 'failure') {
                                likeRes.data = '';
                            }
                            this.sideMenuValues.like.push(likeRes.data.length)
                        });
                    })
            }).catch(err => {console.log(err)});
        },
        // 데이터 더 보기 버튼 기능.
        async moreData() {
            this.spinnerState = 1;
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            let array = [];

            let apiUrl = ''; let paramsKey = ''; let paramsValue = '';

            if (this.$route.name === 'MyPage') {
                apiUrl = 'myPagePost';
                paramsKey = 'nickname';
                paramsValue = userInformation;
            } else {
                paramsKey = 'border_id';
                paramsValue = 1;
                if (this.sortState === 1) {
                    apiUrl = 'showPostAsc';
                } else {
                    apiUrl = 'showPostDesc';
                }
            }
            console.log(paramsKey);
            axios.get(`/api/${apiUrl}`, {params: {[paramsKey]: paramsValue, limit: this.postCount}})
                .then(res => {
                    console.log(res);
                    for (let i = 0; i < this.getData.data.length; i++){
                        if (res.data[0].post_id === this.getData.data[i].post_id) {
                            array.push(...this.getData.data, ...res.data);
                            this.getData.data = array;
                            this.postCount += res.data.length;
                            alert('더 이상 가져올 게시글이 없습니다2.');
                            this.spinnerState = 0;
                            return;                                
                        }
                    }
                    console.log(res.data);
                    if (res.data === 'failure') {
                        alert('더 이상 가져올 게시글이 없습니다.');
                        this.spinnerState = 0;
                        return;
                    }
                    if (res.data.length < 9) {
                        this.postCount += res.data.length;
                    } else {
                        this.postCount += 9;
                    }
                    this.spinnerState = 0;
                    array.push(...this.getData.data, ...res.data);
                    this.getData.data = array;
                    res.data.forEach(async (res) => {
                    this.sideMenuValues.watch.push(res.views);
                    
                    await axios.get('/api/countComments', {
                        params: {post_id: res.post_id}})
                        .then(res => {
                            this.sideMenuValues.comment.push(res.data[0].comments_count);
                            console.log(res);
                        }).catch(err => {
                            console.log(err);
                        })
                            
                    await axios.get('/api/likePostWho', {
                        params: {post_id: res.post_id}
                    }).then(likeRes => {
                        console.log(likeRes.data);
                        likeRes.data == 'failure'
                            ? this.sideMenuValues.like.push(0)
                            : this.sideMenuValues.like.push(likeRes.data.length);
                        });
                    })
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.contain{
    position: relative;
    height: 100vh;
    .containHead{
        position: relative;
        bottom: 50px;
        z-index: 99;
        width: 70vw;
        display: flex; 
        justify-content: space-between;
        .sort{
            font-size: 15px;
            font-weight: 500;
            border: 0;
            margin-right: 30px;
        }
    }
    #categoryName{
        font-size: 30px;
        font-weight: 700;
        // margin-top: -20px;
    }
    .inner{
        position: absolute;
        top: 0;
        width: 70vw;
        height: 100%;
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        .spinner{
            position: fixed;
            z-index: 101;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        .not_data_text{
            margin-top: 50px;
            width: 100%;
            color: #93B5C6;
            font-size: 25px;
            font-weight: 700;
            text-align: center;;
        }
        .post{
            width: 300px;
            height: 300px;
            box-sizing: border-box;
            box-shadow: 4px 12px 30px 6px rgb(231, 231, 231);
            margin-right: 20px;
            margin-top: 50px;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            .postUrl{
                .titleImg{
                    border-radius: 5px;
                    background-position: center;
                    background-repeat: no-repeat;
                    filter:brightness(100%);
                    background-size: 100%;
                    width: 100%;
                    height: 80%;
                    background-color: rgb(184, 184, 184);
                    transition: .3s;
                }
                .sideIcon{
                    position: relative;
                    left: 100%;
                    top: -110px;
                    transition: .3s;
                    font-size: 18px;
                    font-weight: 700;
                    li{
                        margin-left: 5px;
                    }
                }
                .sideValue{
                    position: relative;
                    left: 100%;
                    top: -200px;
                    transition: .3s;
                    font-size: 16px;
                    font-weight: 700;
                }
                .bottom{
                    position: relative;
                    bottom: 150px;
                    transition: .3s;
                    width: 90%;
                    margin: auto;
                    .postTitle{
                        font-size: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-bottom: 20px;
                    }
                    p{
                        font-size: 14px;
                    }
                }
            }
        // }
        }
        .postUrl:hover{
            .titleImg{
                background-size: 120%;
                height: 50%;
                transition: .3s;
                filter:brightness(90%);
            }
            .sideIcon{
                left: 180px;
            }
            .sideValue{
                left: 220px;
            }
        }

        .btnBox{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 40%;
            .moreBtn{
                position: fixed;
                bottom: 50px;
                left: 0;
                right: 0;
                margin: auto;
                font-size: 16px;
                font-weight: 700;
                width: 100px;
                height: 40px;
                border-radius: 30px;
                transition: .5s;
                cursor: pointer;
                background-color: #93B5C6;
                color: #fff;
                border: 0;
            }
        }
    }
    @media screen and (max-width: 1000px){
        .containHead{
            // display: block;
            // width: 800px;
            width: 90vw;
            #categoryName{
                font-size: 25px;
                font-display: 700;
            }
        }
        .inner{
            width: 100%;
            .postUrl{
                // display: block;
                .post{
                    .postTitle{
                        font-size: 20px;
                    }
                    p{
                        font-size: 13px;
                        font-weight: 500;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 768px){
        .inner{
            .not_data_text{
                font-size: 20px;
            }
            .post{
                width: 100%;
                // .postUrl:hover{
                //     .side{
                //         left: 280px;
                //     }
                // }
            }
        }
    }
}
</style>