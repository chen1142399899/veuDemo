<!-- 展示模板 -->
<template>
 	<scoll v-bind:data='data' 
 		class="list-view ts" 
 		ref="listView" 
 		:listen-scroll="true"
 		:probeType="probeType"
 		@scroll="scroll"
 		> 
 		<ul class="sb">
 			<li v-for="group in data" class="list-group" ref="listGroup" >
 				<h2 class="list-grounp-title">{{group.title}}</h2>
 				<!--<p v-for="item in group.items">{{item.name}}</p>-->
 				<ul>
 					<li v-for="item in group.items" @click="selectItem(item)"> 
 						<img class="avater" v-lazy="item.avatar" alt="" />
 						<span class="nameSp">{{item.name}}</span>
 					</li>
 				</ul>
 			</li>
 		</ul>
 		<div class="list-shotcat" @touchstart="onshortStart" @touchmove.stop.prevent="onstoptoumove" >
 			<ul>
 				<li v-for="(item,index) in shortcutlist" :data-index="index" :class="{'itemLi':currentIndex===index}">{{item}}</li>
 			</ul>
 		</div>
 		<div class="fixd-title" v-show="fexdTitl">
 			<h2 class="fixd-title1">{{fexdTitl}}</h2>
 		</div>
 	</scoll>
</template>

<script>
    // 导入组件
	import Scoll from 'base/soll/scoll'
	import {getData} from 'common/js/demo'
	
	const spnH=18;
	
  export default {
  	created(){
  		this.touch={};
  		this.listScroll=true;
  		this.listHight=[];
  		this.probeType=3;
  	},
   	props:{
   		data:{
   			type:Array,
   			default:[]
   		}
   	},
   	data(){
   		return{
   			scrollY:-1,
   			currentIndex:0,
   			deff:-1
   		}
   	},
   	computed:{
   		shortcutlist(){
   			return this.data.map((group)=>{
   				return group.title.substr(0,1);
   			})
   		},
   		fexdTitl(){
   			if(this.scrollY>0){
   				return ''
   			}
   			return this.data[this.currentIndex]?this.data[this.currentIndex].title:'';
   		}
   	},
   	methods:{
   		onshortStart(e){
   			
   			let onshorIndex=getData(e.target,"index");
   			let fristTouch=e.touches[0];
   			//触摸目标在页面中的y坐标
   			
 			
   			this.touch.y1=fristTouch.pageY;
   			this.touch.firstIndex=onshorIndex;
   			this._scollTo(onshorIndex);
   			
   		},
   		onstoptoumove(e){
   			let fisrtTouch=e.touches[0];
   			this.touch.y2=fisrtTouch.pageY;
   			//二进制运算符
   			let dataTo=(this.touch.y2-this.touch.y1)/spnH|0;
   			let firstIndex=parseInt(this.touch.firstIndex)+dataTo;
   			this._scollTo(firstIndex);
   		},
   		
   		_scollTo(index){
   			if(index==null&& index!==0){
   				return
   			}
	   		if (index < 0) {
			         index = 0
			       } else if (index > this.listHight.length - 2) {
			         index = this.listHight.length - 2
			       }
   			this.scrollY=-this.listHight[index];
   			this.$refs.listView.scrollToElement(this.$refs.listGroup[index],0);
   			
   			
   		},
   		selectItem(item){
   			//派发点击事件 
   			this.$emit('select',item);
   		}
   		,
   		scroll(pos){
   			this.scrollY=pos.y;
// 			 console.log(this.scrollY+"Y坐标");
   			
   		},
   		getscrollHight(){
   			this.listHight=[];
   			const list=this.$refs.listGroup;
   			let hight=0;
   			this.listHight.push(hight);
   			for(let i=0;i<list.length;i++){
   				let itme=list[i];
   				//获取元素可视内部高度
   				hight+=itme.clientHeight;
// 				 hight=itme.offsetHeight;
   				this.listHight.push(hight);
   			}
   			
   		}
   		
   	},
   	watch:{
   		//监听data变化
   		data(){
   			setTimeout(()=>{
   				this.getscrollHight();
   			},20)
   		},
   		scrollY(newY){
   			const listHight0=this.listHight;
   			
   			 // 当滚动到顶部，newY>0
	        if (newY > 0) {
	          this.currentIndex = 0
	          return
	        }
   			for(let i=0;i<listHight0.length-1;i++){
   				let listHight1=listHight0[i];
   				let listHight2=listHight0[i+1];
   				
   				//Y坐标向下是负数
   				if((-newY)>=listHight1 &&(-newY)<listHight2){
   					this.currentIndex=i;
// 					this.deff=listHight2+newY; 
   					
   					return
   				}
// 				this.currentIndex=0;
   			}
   			// 当滚动到底部，且-newY大于最后一个元素的上限
         // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHight0.length - 2;
//      console.log(this.currentIndex);
   		}
   	},
   	components:{
   		Scoll
   	}

  }

</script>
<!-- 样式代码 -->
<style  lang="less"  >
@import "../../common/less/ty.less";

	.list-view{
	  	width: 100%;
	  	height: 100%;
	  	overflow: hidden;
	  	position: relative;
	  	background-color: #222;
	  	.list-group{
	  	 padding-bottom: 30px;

	  	.list-grounp-title{
	  		height:30px;
	  		line-height:30px;
        color:rgba(255,255,255,0.5);
        font-size:12px;
        padding-left:20px;
        background:#333;
	  			}
        li{
          display:flex;
          align-items:center;
          padding: 20px 0px 20px 30px;
          img{
            width:50px;
            height:50px;
            border-radius:50px;
            margin-right:10px;
          }
          .nameSp{
            line-height:30px;
            font-size:14px;
            color:rgba(255,255,255,0.5);
          }
        }
	  		}
	  		.list-shotcat{
	  			position: absolute;
	  			right: 0;
	  			top: 50%;
	  			z-index: 30;
	  			transform: translateY(-50%);
	  			background:rgba(0,0,0,0.3);
	  			border-radius: 10px;
	  			padding:15px 0;
	  			li{
	  				font-size: 12px;
	  				padding: 1px 3px;
	  				text-align: center;
	  				color: rgba(255,255,255,0.5);
	  				
	  			}
	  			.itemLi{
	  					color: red;
	  				}
	  		}
	  		.fixd-title{
	  			position: absolute;
	  			top: -1px;
	  			width: 100%;
	  			background: #333;
	  			height: 30px;
	  			/*z-index: 999;*/
	  			h2{
	  				background: #333;
	  				font-size: 12px;
	  				line-height: 30px;
	  				padding-left: 20px;
	  			}
	  		}
	  		
	  	}
</style>
