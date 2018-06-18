<!-- 展示模板 -->
<template>
 <div class="singer">
 	<listview @select='singerItem' :data='singerList'></listview>
 	<audio src='http://ws.stream.qqmusic.qq.com/000QCwge3B6Ad1.m4a?fromtag=46'></audio>
 	<router-view></router-view>
 </div>
</template>

<script>
    // 导入组件
import {getSinger} from "api/singer"
    import {ERR_OK} from 'api/config'
    import Singer from 'common/js/singer'
    import listview from 'base/listView/list-view'
    import {mapMutations} from 'vuex'
    
    const HOT_SINGER_LEN=10;
    const HOT_NAME='热门';

  export default {
    data(){
      return{
        singerList:[]
      }
  },
  created(){
      this._getSingerList()
  },
    methods:{
    	singerItem(singer){
			this.$router.push({
				path:`/singer/${singer.id}`
			});
			this.setSinger(singer);
		},
      _getSingerList(){

        getSinger().then((res)=>{

          if(ERR_OK===res.code){
              this.singerList=this._moreListSinger(res.data.list);
              
           
            
          }
        })

      },
      _moreListSinger(list){
        let map={
          hot:{
            title:HOT_NAME,
            items:[]
          }
        }
        list.forEach((item,index)=>{
        	
          if(index<HOT_SINGER_LEN){
            map.hot.items.push(new Singer({
              id:item.Fsinger_mid,
              name:item.Fsinger_name
//          avater:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
            }));
             
          }
         const key=item.Findex;
	        if(!map[key]){
	            map[key]={
	              title:key,
	              items:[]
	            }
	        }
	      
			map[key].items.push(new Singer({
					id:item.Fsinger_mid,
	              name:item.Fsinger_name
			}));

       });
         //处理map 得到有序列表
			 let hot=[];
			 let ret=[];
			 for(let key in map){	 	
			 	let val=map[key];
			 	if(val.title.match(/[a-zA-Z]/)){
			 		ret.push(val);
			 		
		 	 	}else if(val.title===HOT_NAME){
			 		hot.push(val);
			 	}
			 }
//		 console.log(hots.chenbo+'测试');
			 //数组排序 参数a b 
			 //charCodeAt 返回Unicode编码
			
			 ret.sort((a,b)=>{
			 	return a.title.charCodeAt(0)-b.title.charCodeAt(0)
			 });
       return hot.concat(ret);
    },
		...mapMutations({
			setSinger:'SET_SINGER'
		})
    },
 components:{
 	listview
 }
  }

</script>
<!-- 样式代码 -->
<style scoped lang="less">
@import "../../common/less/ty.less";
.singer{
  position: fixed;
  top: 88px;
  width: 100%;
  bottom:0;
}
</style>
