<!-- 展示模板 -->
<template>
 	<transition name='slide'>
 		 <div class="singer-data">
 		 </div>
 	</transition>
</template>

<script>
    // 导入组件
	import {mapGetters } from 'vuex'
	import {getSingerData} from 'api/singer'
	 import {ERR_OK} from 'api/config'
	import {cleaterSong} from 'common/js/songer'
	 
	export default{
		data(){
			return{
				song:[]
			}
		},
		computed:{
			...mapGetters([
				'singer'
			])
		},
		created(){
			this.getDatail();
		},
		methods:{
			getDatail(){
				if(!this.singer.id){
					this.$router.push('/singer');
					return
				}
				getSingerData(this.singer.id).then((res)=>{
					if(ERR_OK==res.code){
						console.log(res.data);
					}
				})
			},
			nomoleSonger(list){
				let rest=[];
				list.forEach((rest)=>{
					 
				})
			}
		}
	}
    
</script>
<!-- 样式代码 -->
<style>
    .singer-data{
    	width: 100%;
    	height: 100%;
    	background: #222;
    	position: fixed;
    	top: 0;
    	left: 0;
    	z-index: 66;
    }
    /*从右往左进入*/
    /*定义进入过渡生效时的状态 定义离开过渡生效时的状态*/
    .slide-enter-active,.slide-leave-active{
    	transition:all 0.3s;
    }
     /*定义进入过渡的开始状态 定义离开过渡的结束状态*/
    .slide-enter,.slide-leave-to{
    	transform: translate3d(100%, 0, 0);
    }
</style>
