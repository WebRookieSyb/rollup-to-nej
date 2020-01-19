<template>
    <div class="footer-setting">
        <div>{{txt}}</div>
        <other />
        <div v-if="list.length" class="footer-setting-wrap">
            <div v-if="leftUrl" class="footer-setting-left">
                <a :href="leftLink" target="_blank;">
                    <img :src="leftUrl|changeUrlProtocol" alt="广告位">
                </a>
            </div>
            <div v-if="rightUrl" class="footer-setting-right">
                <a :href="rightLink" target="_blank;">
                    <img :src="rightUrl|changeUrlProtocol" alt="广告位">
                </a>
            </div>
        </div>
        <el-button type="text">文字按钮1</el-button>
    </div>
</template>

<script>
// import util from 'pool/util/image';
import other from '../another/someone/other.vue';
import testUtil from '@nej/another/util';
// use123
var Comp = {
    name: 'footer-setting11',
    components:{
        other
    },
    props:{
        list:{
            default:[]
        }
    },
    data:()=>{
        console.log(testUtil)
        return {
            txt:'你好，我是test'
        }
    },
    computed:{
        leftUrl() {
            let list = this.list;
            if(list.length && list.length>0){
                return list[0].picUrl;
            }
        },
        leftLink(){
            let list = this.list;
            if(list.length && list.length>0){
                return list[0].linkUrl;
            }
        },
        rightUrl(){
            let list = this.list;
            if(list.length && list.length>1){
                return list[1].picUrl;
            }
        },
        rightLink(){
            let list = this.list;
            if(list.length && list.length>1){
                return list[1].linkUrl;
            }
        }
    },
    filters:{
        changeUrlProtocol:function(url,protocol){
            let _url
            if(!url) {
                return '';
            }
            _url = url.replace(/^(http:|https:)/,protocol ? (protocol+':') : '');
            return _url;
        }
    }
}

export default Comp;
</script>


<style lang="less">
    .footer-setting{
        a,img{
            display:block;
        }
        &-wrap {
            margin:15px auto 60px;
            width:1205px;
            overflow:hidden;
        }
        &-left {
            float:left;
            img {
                width:960px;
                height:130px;
            }
        }
        &-right {
            float:right;
            img {
                width:225px;
                height:130px;
            }
        }
    }
</style>