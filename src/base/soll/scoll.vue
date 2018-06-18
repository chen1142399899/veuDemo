<!-- 展示模板 -->
<template>
  <div ref="wrapper">
    <slot>

    </slot>
  </div>
</template>

<script>
    // 导入组件
import BScroll from 'better-scroll'

    export default {
      props:{
        probeType:{
          type:Number,
          default:1
        },
        click:{
          type:Boolean,
          default:true
        },
        data:{
          type:Array,
          default:null
        },
        listemScoll:{
        	//监听滚动事件
        	type:Boolean,
        	default:false
        }
      },
//      页面载入后执行
      mounted(){

        setTimeout(() => {

          this._initScroll()

    },20)
      },
//      方法
      methods:{
        _initScroll(){

          if(!this.$refs.wrapper){
            return
          }
          this.scroll=new BScroll(this.$refs.wrapper,{
//            有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）
// 派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType
// 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
            probeType:this.probeType,
            click:this.click
          });
          if(!this.listemScoll){
          	//保留当前实例 bscroll里面是scroll实例this
          	let mthis=this;
          	this.scroll.on("scroll",(pos)=>{
          		//监听滚动事件
          		mthis.$emit("scroll",pos);
          	})
          }

        },
//        启用 better-scroll, 默认 开启。
        enable(){
          this.scroll&&this.scroll.enable()
        },
//        用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应
        disable(){
          this.scroll&& this.scroll.disable()
        },
//refresh重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
        refresh(){
          this.scroll&&this.scroll.refresh()
        },
        scrollTo(){
        	//滚动到指定位置
        	this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
        },
        scrollToElement(){
        	this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)
        }
      },
      watch:{
        data(){
          setTimeout(() => {

            this.refresh()
          },20)
        }
      }
    }
</script>
<!-- 样式代码 -->
<style>

</style>
