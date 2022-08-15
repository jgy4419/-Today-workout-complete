<template>
    <div class="contain">
        <div class="inner">
            <div class="writeHeader">
                <input v-model="postDetail.title" type="text" class="title" placeholder="제목을 입력하세요">
                <hr/>
                <div class="category">
                    <label class="categoryText" for="">카테고리를 선택하세요</label>
                    <select name="categoryChoice" class="categoryChoice" @change="categoryChange($event)">
                        <option class="categoryOptions" v-for="category in $store.state.Community.writeCategorys" :key="category"
                            :value="category">{{category}}</option>
                    </select>
                </div>
            </div>
            <img class="writeImage" @click="deleteImg()"
            style="display:none" src='https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTc5/MDAxNTIwMDQxNzQwODYx.qQDg_PbRHclce0n3s-2DRePFQggeU6_0bEnxV8OY1yQg.4EZpKfKEOyW_PXOVvy7wloTrIUzb71HP8N2y-YFsBJcg.PNG.osy2201/1_%2835%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800' alt="프로필">
            <!-- <label class="photographic_path" for="photographic_path">대표 이미지를 선택해주세요.</label><input class="hidden" id="photographic_path" type="file"/>
            <button class="photographic_path" @click="deleteImg()">배경사진 초기화</button> -->
            <label class="sensor_btn" v-if="postDetail.postCount === 2" for="sensor_btn">센서 데이터 추가</label>
            <button @click="watchChart()" class="hidden" id="sensor_btn"/>
            <hr class="line">
            <div class="editor-page">
                <div :v-model="postDetail.writing" id="summernote">오늘 운동한 내용을 말해주세요~!</div>
            </div>
            <DragFile @getImgData="getImgData($event)"/>
            <div class="btnBox">
                <button @click="i === 0 ? backBtn() : postUpload()" :class="btn.class[i]" v-for="btns, i in btn.btnName" :key="i">
                    <i :class="btn.iClass[i]" ></i>
                    {{btns}}
                </button>
            </div>
        </div>
        <div v-if="sensorWatch === true" @click="watchChart()" class="watchChart">
            <div class="inner">
                <Chart :readOrWrite = 1 />
            </div>
        </div>
        <span v-if="closeState === true" @click="closeChart()" class="close">X</span>
    </div>
</template>

<script>
import axios from 'axios';
import DOMPurify from 'dompurify';
import Chart from '../Chart.vue';
import DragFile from './DragFile.vue';
export default {
    watch: {
        fileData: function(){
            this.getImgData();
        }
    },
    components:{
        Chart,
        DragFile,
    },
    data(){
        return{
            // testMultiEvent: [this.test1(), this.test2()],
            btn: {
                class: ['btn back', 'btn submit'],
                iClass: ['fa fa-arrow-left', 'button'],
                btnName: ['', '올리기'],
                btnType: ['button', 'button'],
            },
            changeImg: '',
            postDetail: {
                title: '',
                writing: '',
                postCount: 1,
            },
            sensorWatch: false,
            closeState: false,
            // write페이지면 1 MyPage에서 보면 0
            writeOrRead: 0,
            getImgFileData: [],
            deleteImgState: 0, // 이미지 삭제 버튼 누르면 1로 변경시켜주기.
        }
    },
    mounted() {
        let writeState = this.$route.params.edit;
        // 만약 url에서 edit 설정 부분이 1이면 
        if(writeState == 1){
            let writing = document.getElementById('summernote');
            let title = document.querySelector('.title');
            this.btn.btnName[1] = '수정하기';
            // url의 id, post, board 부분의 동일한 값을 DB에서 가져와서 넣어줌.
            axios.get('/api/getPostAll', {params: {
                limit: 0,
                board_id: this.$route.params.board,
            }}).then(res => {
                for(let i = 0; i < res.data.length; i++){
                    if(this.$route.params.post == res.data[i].post_id){
                        console.log(res.data[i]);
                        writing.innerHTML = res.data[i].comment;
                        title.value = res.data[i].title;
                        console.log(writing);
                    }
                }
            }).catch(err => console.log(err));
        }
        // setTimeout 안쓰고 구현 해보기.
        setTimeout(() => {
            $(document).ready(function summernoteSandbox() {
                var $editor = $('#summernote');
                
                $editor.summernote({
                    disableResizeEditor: false,
                    codeviewFilter: true,
                    codeviewIframeFilter: true,
                    height: 200,
                    maximumImageFileSize: 1048576,
                    callbacks:{
                            onImageUploadError: function uploadImageError(msg){
                            alert(msg);
                        }
                    },
                    toolbar: [
                        ['operation', ['undo', 'redo']],
                        ['fontsize', ['fontsize']],
                        ['style', ['bold', 'italic', 'underline']],
                        ['color', ['color']],       
                        ['font', ['strikethrough', 'superscript', 'subscript', 'clear']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['insert', ['link','picture', 'hr']],
                        ['view', ['codeview']],
                    ],
                });
            });
        }, 300)
    },
    methods: {
        postUpload(){
            let writeState = this.$route.params.edit;
            // 라우트 변수들
            let route = {
                nickname: this.$route.params.id,
                post_id: this.$route.params.post,
                board_id: this.$route.params.board
            };
            let dragBackImg = this.getImgFileData;
            let userInformation = JSON.parse(localStorage.getItem("userInformation"));
            let board = 1; // 기본 카테고리 번호 (전체 게시물)
            let categoryChoice = document.querySelector('.categoryChoice');

            if(categoryChoice.value === '자유게시판') board = 2;
            else if(categoryChoice.value === '운동게시판') board = 3;
            else board = 1;

            var enteredText, decoded, sanitized = null;
            let nickName = userInformation.nickname;
            // 글 제목
            let title = document.querySelector('.title');
            function decode(text) {
                // https://codepen.io/csmccoy/pen/yLNBpyW?editors=1010
                return $("<textarea/>").html(text).text();
            }
            
            function encode(text) {
                var textArea = document.createElement('textarea');
                textArea.innerText = text;
                return textArea.innerHTML;
            }
            
            function resetVars(){
                enteredText = null;
                decoded = null;
                sanitized = null;
            }
            function getSanitizedText(){
                resetVars();
                enteredText = $('#summernote').summernote('code');
                decoded = decode(enteredText);
                sanitized = DOMPurify.sanitize(decoded);
                return encode(sanitized);
            }
            let frm = new FormData();
            var userEntry = getSanitizedText();
            let comment = '';
            comment = decode(userEntry);
            frm.append('title', title.value);
            // frm.append('photographic_path', photographic_path.files[0]);
            frm.append('photographic_path', dragBackImg);
            frm.append('availabilty_comments', 1);
            frm.append('board_id', board);
            if(writeState == 1){ // writeState가 1일 때 수정
                // frm.append('nickname', route.nickname);
                frm.append('post_id', parseInt(route.post_id));
                frm.append('comment', comment);
                // frm.append('board_id', this.$route.params.board);
                axios.patch('/api/updatePost', frm, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(() => {
                    location.href = '/community';
                }).catch(err => {
                    console.log(err);
                })
            }else if(writeState == 0){
                console.log('0번째 글');
                frm.append('nickname', nickName);
                frm.append('content', comment);
                axios.post('/api/createPost', frm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }).then(() => {
                    location.href = '/community';
                })
                .catch(err => console.log(err))
            }
        },
        backBtn(){
            document.querySelector('.back').addEventListener('click', function(){
                history.go(-1);
                location.href = '/community';
            });
        },
        getImgData(fileData){
            this.uploadImg(fileData[this.deleteImgState]);
            this.getImgFileData = fileData[this.deleteImgState];
            console.log(fileData[this.deleteImgState]);
            console.log(this.getImgFileData);
            this.deleteImgState = 0;
        },
        deleteImg(){
            this.getImgFileData = [];
            this.deleteImgState += 1;
            const changeImage = document.querySelector('.writeImage');
            changeImage.src = '';
            changeImage.style.display = "none";
        },
        categoryChange(val){
            console.log(val.target.value);
            if(val.target.value === '운동게시판'){
                this.postDetail.postCount = 2;
            }else{
                this.postDetail.postCount = 1;
            }
        },
        thickness(){
            let content = document.getElementById('content');
            // content.classList.toggle('thickness');
            let addSpan = document.createElement('span');
            addSpan.setAttribute('class', 'size');
            addSpan.innerHTML('안녕');
            content.appendChild(addSpan);
        },
        uploadImg(input){
            this.getImgFileData.push(input);
            // if(input.files && input.files[0]){
                const reader = new FileReader();
                reader.onload = e => {
                    const changeImage = document.querySelector('.writeImage');
                    changeImage.style.display = "block";
                    changeImage.src = e.target.result;
                }
                reader.readAsDataURL(input);
        },
        // 차트를 불러울 수 있는 함수.
        watchChart(){
            // 차트 불러오는 modal 띄워주기.
            this.sensorWatch = true;
            this.closeState = true;
        },
        closeChart(){
            this.sensorWatch = false;
            this.closeState = false;
        }
    }
}
</script>

<style lang="scss" scoped>
input, textarea{
    outline-style: none;
}
.contain{
    .inner{
        width: 70%;
        margin: 2% auto;
        .writeHeader{
            display: flex;
        }
        .writeImage{
            width: 300px;
            aspect-ratio: 16 / 9;
            cursor: pointer;
        }
        .title, #content{
            width: 70%;
            box-sizing: border-box;
            padding: 10px;
            border: 0;
        }
        .title{
            height: 50px;
            font-size: 20px;
            font-weight: 700;
            border: 0;
        }
        .photographic_path, .sensor_btn{
            font-size: 14px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(234, 233, 233);
            border: 0;
            font-weight: 700;
            border-radius: 10px;
            height: 40px;
            width: 200px;
            cursor: pointer;
        }
        .category{
            position: relative;
            top: 10px;
            width: 350px;
            display: flex;
            justify-content: space-between;
            .categoryText{
                margin-top: 12px;
                font-size: 14px;
                width: 130px;
            }
            .categoryChoice{
                width: 200px;
                height: 50px;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 700;
            }
        }
        .toolBox{
            margin-top: 30px;
            display: flex;
            .textTool{
                text-align: center;
                width: 30px;
                height: 20px;
                padding-top: 5px;
                background-color: transparent;
                font-size: 13px;
                color: rgb(80, 80, 80);
                border: 2px solid rgb(206, 206, 206);
                border-radius: 5px;
                margin-left: 10px;
                font-weight: 700;
                cursor: pointer;
            }
        }
        #content{
            margin-top: 2%;
            font-size: 15px;
        }
        #content.thickness{
            content: "aa";
            font-size: 30px !important; 
            color: green;
        }
        .line{
            width: 20%;
            margin-left: 0%;
            border: 3px solid rgb(193, 193, 193);
        }
        .editor-page{
            #summernote{
                height: 500px;
            }
        }
        .btnBox{
            position: fixed;
            box-shadow: 0px 2px 2px 1px rgb(222, 222, 222) inset;
            padding: 10px;
            box-sizing: border-box;
            width: 70%;
            height: 8%;
            bottom: 0;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .btn{
                background-color: #C9CCD5;
                font-weight: 700;
                cursor: pointer;
                color: #fff;
                width: 120px;
                height: 40px;
                font-size: 18px;
                border: 0;
                border-radius: 5px;
                transition: .3s;
            }
            .btn:hover{
                background-color: #fff;
                color: #333;
                border: 0;
            }
        }
    }
    .watchChart{
        // display: none;
        position: absolute;
        z-index: 100;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        overflow-y: scroll;
        .inner{
            background-color: #fff;
            border-radius: 20px;
            padding: 30px;
            box-sizing: content-box;
        }
    }
    .close{
        position: absolute;
        z-index: 100;
        // color: #fff;
        top: 6%;
        right: 15%;
    }
}
@media screen and (max-width: 900px){
    .contain{
        .inner{
            .writeHeader{
                padding-top: 10px;
                display: block;
                .category{
                    margin-bottom: 30px;
                    .categoryText{
                        display: none;
                    }
                    .categoryChoice{
                        width: 100%;
                        font-size: 12px;
                    }
                }
                .title{
                    font-size: 18px;
                }
            }
            .editor-page{
                font-size: 12px;
            }
        }
    }
}
</style>