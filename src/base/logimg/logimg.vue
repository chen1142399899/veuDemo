<!-- 展示模板 -->
<template>
<div>
  <img src="./loading.gif" width="24" height="24" alt="">
  <p class="loin">{{title}}</p>
</div>
</template>

<script>
    // 导入组件


    export default {
      props:{
        title:{
          type:String,
          default:'正在载入'
        }
      }
    }
</script>
<!-- 样式代码 -->
<style scoped lang="less">
  @import "../../common/less/ty.less";
   .loin{
     font-size: 12px;
     line-height:24px;
   }
</style>
