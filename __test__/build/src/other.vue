<template>
    <div class="other">
        {{txt}}
    </div>
</template>

<script>

import util from 'pool/util/image';
// use123
var Comp = {
    name: 'other',
    props:{
        list:{
            default:[]
        }
    },
    data:()=>{
        return {
            txt:util
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
                width:910px;
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