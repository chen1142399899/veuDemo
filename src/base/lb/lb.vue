<!-- 展示模板 -->
<template>
	<div ref="slider">
		<div ref="sliderGroup" class="slider-group">
			<slot>

			</slot>
		</div>
		<div class="dots">
        <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex ===index}"></span>
		</div>
	</div>
</template>

<script>
    // 导入组件
//import axios from 'axios'
//axios.get('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg').then(
//	function(respone){
//		console.log("sb"+respone)
//	}
//).catch(function(err){
//	console.log("错误"+err)
//})
//使用轮播
import BScroll from 'better-scroll'
import {addClass} from "common/js/demo"
export default{

	props:{
		//循环轮播
		loop:{
			type:Boolean,
			default:true

		},
		//自动轮播
		autoPlay:{
			type:Boolean,
			default:true
		},
		//自动轮播间隔
		interval:{
			type:Number,
			default:4000
		}
	},
  data(){
    return{
      dots:[] ,
      currentPageIndex: 0
    }
  },
	//页面加载完成后执行
	mounted(){
		setTimeout(()=>{

			this._setSliderWidth();
      this._initSlider();
      this._initDots();
      if(this.autoPlay){
			  this._play();
      }
		},20);

  window.addEventListener('resize',()=>{
    if (!this.slider) {
      return
    }
    this._setSliderWidth(true)
    this.slider.refresh()
  })
	},
	methods:{
		_setSliderWidth(isResize){
			this.children=this.$refs.sliderGroup.children

      let widht1=0
			let sliderWidht=this.$refs.slider.clientWidth

			for(let i=0;i<this.children.length;i++){


				let child=this.children[i]

				addClass(child,'Slider-itme')

				child.style.width=sliderWidht+'px'
        widht1 +=sliderWidht
			}
			if(this.loop && !isResize){
				widht1+=2*sliderWidht
			}
			this.$refs.sliderGroup.style.width=widht1+'px'

    },

		_initSlider(){
			this.slider=new BScroll(this.$refs.slider,{
				//轮播的DOMEthis.$refs.slider
				//横向滚动scrollx 纵向滚动scrolly
				//momentum 惯性
				//snapLoop循环轮播 snapThreshold自动轮播
				//
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
//        snap: {
//          loop: this.loop, // 循环
//          threshold: 0.3,
//          speed: 400 // 轮播间隔
//        }
			})
//      添加滚动结束事件
      this.slider.on('scrollEnd',()=>{
//       返回值：{Object} { x: posX, y: posY,pageX: x, pageY: y} 其中，x 和 y     表示偏移的坐标值，pageX 和 pageY 表示横轴方向和纵轴方向的页面数。
//        作用：获取当前页面的信息
        let pageIndex=this.slider.getCurrentPage().pageX

//        if(this.Loop){
//          pageIndex -=1
//        }
        this.currentPageIndex=pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
	},
    _initDots(){

      this.dots=new Array(this.children.length-2)

    },
	_play(){

    let pageIndex=this.currentPageIndex +1
    if(this.Loop){
		    pageIndex += 1
    }

    this.timer=setTimeout(()=>{
      //参数
//      {Number} x 横轴的页数
//      {Number} y 纵轴的页数
//      {Number} time 动画执行的时间
//      {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
//      返回值：无
//      作用：当我们做 slide 组件的时候，slide 通常会分成多个页面。调用此方法可以滚动到定的页面。
      this.slider.goToPage(pageIndex,0,400)

    },this.interval)
  }

},
  destroyed(){
//在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，注意是解绑不是销毁,所有的子
    clearTimeout(this.timer)
  }
	}



</script>
<!-- 样式代码 -->
<style>
  *{
    padding: 0;
    margin: 0;
  }
  .slider{
    min-height: 1px;
    /*position: relative;*/
     /*width: 100%;*/
      /*overflow: hidden;*/
  }
  .slider-group{

    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }
  .Slider-itme{
  	float: left;
  	box-sizing: border-box;
  	overflow: hidden;
  	text-align: center;
  }
  .Slider-itme a,.Slider-itme img{
  	display: block;
  	width: 100%;
  	text-decoration: none;
  	overflow: hidden;
  }
  .dots{
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
  }
  .dots>.dot{
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background:rgba(255,255,255,0.5);
  }
  .dots>.active{
    width: 20px;
    border-radius: 5px;
    background: rgba(255,255,255,0.5)
  }
</style>
