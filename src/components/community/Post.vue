<template>
    <div class="contain">
        <div class="containHead">
            <div id="categoryName">{{$store.state.Community.categoryName}}</div>
            <select @change="sortPost()" name="sort" id="sort" class="sort">
                <option v-for="option in option.value" class="sortPost" :key="option">{{option}}</option>
            </select>
        </div>
        <div class="inner">
                <div class="post" v-for="data, i in post.title.length" :key="i">
                    <!-- 시간날 때 수정하기 urlChange 1번 만 쓰기 -->
                    <router-link style="text-decoration: none; color: #333" class="postUrl" :to="postUrl">
                        <div :style="{backgroundImage:`url('${post.img[i]}')`}" class="titleImg"
                        @click="urlChange(post.user_id[i], post.board_id[i], post.post_id[i])"/>
                        <ul class="side" @click="urlChange(post.user_id[i], post.board_id[i], post.post_id[i])">
                            <li class="icon" v-for="icon in sideMenu" :key="icon">{{icon}}</li>
                        </ul>
                        <div @click="urlChange(post.user_id[i], post.board_id[i], post.post_id[i])">
                            <div class="bottom">
                                <!-- <p>{{this.post.post_id[i]}}</p> -->
                                <p style="display: none">글 ID: {{post.post_id[i]}}</p>
                                <h3 class="title"><strong>글 제목 : {{post.title[i]}}</strong></h3>
                                <p>닉네임 / 아이디 : {{post.user_id[i]}}</p>
                                <p>날짜: {{post.date[i]}}</p>
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
import dayjs from 'dayjs';
export default {
    // 데이터가 추가적으로 저장이 되면 
    // test 서버 불러오기 => npx json-server ./exerciseData.json --watch --port 8800
    data(){
        return{
            post: {
                img: [],
                title: [],
                user_id: [],
                post_id: [],
                board_id: [],
                date: [],
                postWrite: [],
                count: 9
            },
            sideMenu: ['🤓 : 500', '🖤 : 20', '💬 : 5'],
            searchRes: this.$store.state.Search.searchValue,
            // postCount: 9,
            category: ['all', 'category1', 'category2', 'category3'],
            postUrl: '/login',
            option: {
                value: ['최신순', '오래된순'],
                class: ['up', 'up'],
            }
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
            this.post.title = [];
            this.post.img = [];
            this.post.date = [];
            this.post.board_id = [];
            this.post.user_id = [];
            this.post.post_id = [];
            axios.get('/api/searchtitle', {
                params: {title: result}}, 
                {withCredentials: true})
            .then(res => {
                if(result === ''){
                    this.getPost();
                }else{
                    for(let i = 0; i < res.data.length; i++){
                        this.post.board_id.push(res.data[i].board_id);
                        this.post.post_id.push(res.data[i].post_id);
                        this.post.title.push(res.data[i].title);
                        this.post.user_id.push(res.data[i].nickname);
                        this.post.date.push(res.data[i].creation_datetime);
                        this.post.img.push(`http://localhost:3000/img/postPhoto/${res.data[i].photographic_path}`);
                    }
                }
            }).catch(err => console.log(err));
        },
    },
    mounted(){
        this.postCount = 0;
        this.urlChange();
        this.changePost();
        this.getPost();
    },
    methods: {
        sortPost(){
            // let sortPost = document.querySelectorAll('.sortPost');
            let sort = document.querySelector('.sort');
            console.log(sort.value);
            if(sort.value === '오래된순'){
                axios.get('/api/showPostAsc', {params: {board_id: 1, limit: 0}})
                .then(res => {
                this.post.title = []; this.post.id = []; this.post.img = []; this.post.date = [];
                this.post.board_id = []; this.post_id = [];
                for(let i = 0; i < res.data.length; i++){
                    console.log(res);
                    this.post.post_id.push(res.data[i].post_id); this.post.board_id.push(res.data[i].board_id);
                    this.post.title.push(res.data[i].title); this.post.user_id.push(res.data[i].nickname); this.post.postCount = res.data.length;
                    this.post.date.push(res.data[i].creation_datetime); this.post.img.push(`http://localhost:3000/img/postPhoto/${res.data[i].photographic_path}`);
                }
            }).catch(err => console.log(err));
            }else if(sort.value === '최신순'){
                this.getPost();
            }
        },
        getPost(){
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            this.post.title = []; this.post.id = []; this.post.img = [];
            this.post.date = []; this.post.board_id = []; this.post_id = [];

            // const dayjs = dayjs("");
            if(this.$route.name === 'MyPage'){
                console.log('내가 올린 게시물');
                axios.get('/api/myPagePost', {params: {nickname: userInformation.nickname, limit: 0}})
                .then(res => {
                    for(let i = 0; i < res.data.length; i++){
                        console.log(res);
                        this.post.post_id.push(res.data[i].post_id);
                        this.post.board_id.push(res.data[i].board_id);
                        this.post.title.push(res.data[i].title);
                        this.post.user_id.push(res.data[i].nickname);
                        this.post.date.push(dayjs(res.data[i].creation_datetime).format("YYYY년 MM월 DD일"));
                        this.post.img.push(`http://localhost:3000/img/postPhoto/${res.data[i].photographic_path}`);
                        this.post.postCount = res.data.length;
                    }
                }).catch(err => console.log(err));
            }else{
                console.log('커뮤니티');
                axios.get('/api/showPostDesc',{params: {board_id: 1, limit: 0}})
                .then(res => {
                    console.log(res);
                    this.postCount = res.data.length;
                    for(let i = 0; i < res.data.length; i++){
                        this.post.post_id.push(res.data[i].post_id);
                        this.post.board_id.push(res.data[i].board_id);
                        this.post.title.push(res.data[i].title);
                        this.post.user_id.push(res.data[i].nickname);
                        this.post.date.push(dayjs(res.data[i].creation_datetime).format("YYYY년 MM월 DD일"));
                        this.post.img.push(`http://localhost:3000/img/postPhoto/${res.data[i].photographic_path}`);
                    }
                })
                .catch(err => console.log(err));
            }
        },
        // 카테고리가 변경되면 나타나는 게시물들
        changePost(boardID){
            this.post.title = []; this.post.id = []; this.post.img = [];
            this.post.date = []; this.post.board_id = []; this.post.post_id = []; this.post_id = [];
            axios.get('/api/showAnotherBoard', {params: {board_id: boardID}})
            .then(res => {
            for(let i = 0; i < res.data.length; i++){
                console.log(res.data[i].post_id);
                this.post.post_id.push(res.data[i].post_id);
                this.post.board_id.push(res.data[i].board_id);
                this.post.title.push(res.data[i].title);
                this.post.user_id.push(res.data[i].nickname);
                this.post.date.push(dayjs(res.data[i].creation_datetime).format("YYYY년 MM월 DD일"));
                this.post.img.push(`http://localhost:3000/img/postPhoto/${res.data[i].photographic_path}`);
            }
            console.log(res);
            }).catch(err => {console.log(err)});
        },
        urlChange(userId, boardId, postId){
            if(document.cookie){
                this.postUrl = `/${userId}/${boardId}/${postId}`;
            }
        },
        // 데이터 더 보기 버튼 기능.
        moreData(){
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            console.log('더 보기', this.postCount);
            // ex) 9개 post를 추가적으로 더 가져오기.
            console.log(this.$route.name);
            if(this.$route.name === 'MyPage'){
                console.log('내가 올린 게시물');
                console.log(this.post.count);
                axios.get('/api/myPagePost', {params: {nickname: userInformation.nickname, limit: this.post.count}})
                .then(res => {
                    for(let i = 0; i < 9; i++){
                        this.post.post_id.push(res.data[i].post_id);
                        this.post.board_id.push(res.data[i].board_id);
                        this.post.title.push(res.data[i].title);
                        this.post.user_id.push(res.data[i].nickname);
                        this.post.date.push(dayjs(res.data[i].creation_datetime).format("YYYY년 MM월 DD일"));
                        this.post.img.push(`http://localhost:3000/img/postPhoto/${res.data[i].photographic_path}`);
                    }
                    this.post.count = this.post.count + 9;
                }).catch(err => {
                    this.post.count = this.post.post_id;
                    console.log(err)
                });
            }else{
                console.log(this.post.count);
                axios.get('/api/showPostDesc', {params: {board_id: 1, limit: this.post.count}})
                .then(res => {
                    console.log(res);
                    for(let i = 0; i < 9; i++){
                        this.post.post_id.push(res.data[i].post_id);
                        this.post.board_id.push(res.data[i].board_id);
                        this.post.title.push(res.data[i].title);
                        this.post.user_id.push(res.data[i].nickname);
                        this.post.date.push(dayjs(res.data[i].creation_datetime).format("YYYY년 MM월 DD일"));
                        this.post.img.push(`http://localhost:3000/img/postPhoto/${res.data[i].photographic_path}`);
                    }
                    this.post.count = this.post.count + 9;
                }).catch(err => {
                    this.post.count = this.post.post_id;
                    console.log(err)
                })
            }
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
            border: 0;
            margin-right: 30px;
        }
    }
    #categoryName{
        font-size: 30px;
        font-weight: 700;
        margin-top: -20px;
    }
    .inner{
        position: absolute;
        top: 0;
        width: 70vw;
        height: 100%;
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
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
                    .side{
                        position: relative;
                        left: 280px;
                        top: -19vh;
                        transition: .3s;
                        font-size: 18px;
                        font-weight: 700;
                    }
                    .bottom{
                        position: relative;
                        bottom: 75px;
                        transition: .3s;
                        width: 90%;
                        margin: auto;
                        .title{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
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
                .side{
                    left: 180px;
                }
                .bottom{
                    bottom: 60px;
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
                    .title{
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
            .post{
                width: 100%;
                .postUrl:hover{
                    .side{
                        left: 280px;
                    }
                }
            }
        }
    }
}
</style>