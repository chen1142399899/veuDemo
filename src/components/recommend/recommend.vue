<!-- 展示模板 -->
<template>
 <div class="recommend">
 	<scoll class="sb" v-bind:data="disList" ref="scroll">
    <div>
      <div v-if="recommends.length" class="slider-wrappe" style="width: 100%;overflow: hidden" ref="sliderWrapper">
        <lb class="s">
          <div v-for="item in recommends">
            <!--v-bind: 绑定属性 简写 :-->
            <a :href="item.linkUrl">
              <img class="needsclick" v-on:load="loadImg" v-bind:src="item.picUrl" alt="" />
            </a>
          </div>
        </lb>
      </div>
      <div>
        <h3>热门歌单推荐</h3>
        <ul>
          <li v-for="item in disList" class="item">
            <div>
              <!--懒加载-->
              <img width="60" height="60" v-lazy="item.imgurl" alt="">
            </div>
            <div>
              <h2 class="dis-h2" v-html="item.creator.name"></h2>
              <p class="dis-p" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading-container" v-show="!disList.length">
      <LogImg></LogImg>
    </div>
 	</scoll>

 </div>
</template>

<script>
	import {getRecommend,getDisList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import Lb from 'base/lb/lb'
  import Scoll from 'base/soll/scoll'
  import LogImg from'base/logimg/logimg'



   export default{
   	data(){
   		return {
   			recommends:[],
        disList:[]

   		}
   	},
   	created(){
   		this._getRecommend()
//      setTimeout(
//        ()=>{
          this._getDisList()
//        },2000)

   	},

   	methods:{
   		_getRecommend(){

        getRecommend().then((res)=>{

          if(res.code ==ERR_OK){
   					this.recommends =res.data.slider;
// 					console.log(res.data.slider)
   				}
   			})
   		},
      _getDisList(){

        getDisList().then((res)=>{

          if(res.code ==ERR_OK){
           this.disList =res.data.list;

          }
        })
      },
      loadImg(){
        if(!this.checkaded){
          this.checkaded=true;
          this.$refs.scroll.refresh()
        }

      }
   	},
   	components:{
	    Lb,
      Scoll,
      LogImg
}

   }
</script>
<!-- 样式代码 -->
<style scoped lang="less">
  @import "../../common/less/ty.less";
  .recommend{
    width: 100%;
    position: fixed;
    top: 88px;
    bottom:0;
  }
  .sb{
    overflow: hidden;
  }
  .slider-wrappe{
    position: relative;
    width: 100%;
    overflow: hidden;
  }
   h3{
   	color: #ffcd32;
   	text-align: center;
   	font-size: 14px;
   	line-height: 65px;
   	font-weight: normal;
   }
  .item{
    display: flex;
    padding: 0px 20px 20px 20px;
    align-content: center;
  }
  .item>h2{
      font-size: 100%;
    }
  .item>span{
    color: rgba(255,255,255,0.3);
  }
  .item>div:first-child{
    padding-right: 20px;
  }
  .item>div:last-child{
    font-size: 14px;
  }
  .dis-h2,.dis-p{
    font-size: 12px;
  }
  .dis-p{
   line-height: 24px;
    margin-top: 10px;
  }
  .sb{
    height: 100%;
    overflow: hidden;
  }
  .loading-container{
    width: 100%;
    display: flex;
    justify-content: center;
   text-align: center;
  }
  .loading-container p{
    font-size: 10px;
  }
</style>
