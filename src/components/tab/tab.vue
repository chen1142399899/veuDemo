<!-- 展示模板 -->
<template>
	<div class="clear tab-div">
		<router-link tag="div" class="tab-item" to="/recommend">
			<span class="tab-span">推荐</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/singer">
			<span class="tab-span">歌手</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/rank">
			<span class="tab-span">排行</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/search" >
			<span class="tab-span">搜索</span>
		</router-link>
	</div>
</template>

<script>
    // 导入组件


    export default {
       
    }
</script>
<!-- 样式代码 -->
<style scoped lang="less"> 
   
   @import "../../common/less/tab.less";
   @import "../../common/less/ty.less";
   
</style>
