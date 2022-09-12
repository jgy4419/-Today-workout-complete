<template>
    <div class="drag_container" v-bind="getRootProps()">
        <!-- imgData 값이 변경되면.. 데이터 전달 -->
        <input v-bind="getInputProps()" @click="$emit('getImgData', imgData)"/>
        <div class="drag_inner" v-if="isDragActive">
            <p>드래그 되었습니다!</p>
        </div>
        <div class="drag_inner" v-else style="opacity: .5s">
            <p>배경이미지로 지정할 파일을 드래그나 하거나 클릭해주세요!</p>
            {{imgData}}
        </div>
    </div>
</template>

<script>
import { useDropzone } from 'vue3-dropzone';
import { ref, watch } from 'vue';

export default {
    name: 'UseDropzone',
    emits: ["getImgData"],
    setup(_, {emit}){
        let imgData = ref([]);
        function onDrop(accepFiles, rejectReasons){
            console.log(rejectReasons);
            imgData.value.push(...accepFiles);
        }
        watch(imgData.value, () => {
            emit("getImgData", imgData.value);
        })
        const getImgData = () => {
            emit("getImgData", imgData.value);
        }
        // console.log(imgData._value); // 이 파일을 emit? 로 넘겨주기.
        const {getRootProps, getInputProps, ...rest} = useDropzone({onDrop});

        return{
            getRootProps,
            getInputProps,
            getImgData,
            ...rest
        }
    }
}
</script>

<style lang="scss" scoped>
.drag_container{
    position: relative;
    margin: auto;
    width: 70vw;
    height: 150px;
    .drag_inner {
        position: absolute;
        cursor: pointer;
        background-color: rgb(248, 246, 246);
        border: 5px dashed rgb(131, 131, 188);
        border-radius: 20px;
        width: 100%;
        height: 100%;
        p{
            color: #333;
            font-weight: 600;
            font-size: 18px;
            text-align: center;
            margin-top: 55px;
        }
    }
}
@media screen and (max-width: 900px){
    .drag_container{
        width: 80vw;
        height: 100px;
        .drag_inner{
            border: 2px dashed rgb(131, 131, 188);
            p{
                margin-top: 20px;
                padding: 20px;
                font-size: 12px;
            }
        }       
    }
}
</style>