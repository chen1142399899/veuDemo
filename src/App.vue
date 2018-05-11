<template>
  <div id="app">
  <m-header></m-header>
  <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
	import MHeader from 'components/m-header/m-header'
	import Tab from 'components/tab/tab'
export default {
 components:{
 	MHeader,
 	Tab
 }
}
</script>

<style>
/*全局样式只支持assets目录*/
@import "./assets/less/love.less";

</style>
