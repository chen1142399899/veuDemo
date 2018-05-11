<template>
  <div class="m-header posrelative">
 	<div class="icon">
 		
 	</div>
 	<h1 class="text">LuLu Music</h1>
 	<div class="ider">
 		<i class="fa fa-user-o"></i>
 	</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"> 
@import "../../common/less/m-header.less";
@import "../../common/less/ty.less";
.icon{
	 width: 30px;
        height: 32px;
	background-image:url("../../common/imags/logo@2x.png");
	background-size: 30px;
}
</style>
