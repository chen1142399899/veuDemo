<!-- 展示模板 -->
<template>
 <div class="singer">
 	歌手页面
 </div>
</template>

<script>
    // 导入组件
import {getSinger} from "api/singer"
    import {ERR_OK} from 'api/config'
    import Singer from 'common/js/singer'

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
      _getSingerList(){
        console.log("测试");
        getSinger().then((res)=>{
          console.log("测试1");
          if(ERR_OK===res.code){
              this.singerList=res.data.list
            console.log(this.singerList);
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
            map.hot.items.push({
              id:itme.Fsinger_mid,
              name:item.Fsinger_name,
              avater:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
          }
        })
        const key=item.Findex
        if(!map[key]){
            map[key]={
              title:key,
              item:[]
            }
        }
      }
    }
  }

</script>
<!-- 样式代码 -->
<style>
@import "../../common/less/ty.less";
.singer{
  position: fixed;
  top: 88px;
  width: 100%;
  bottom:0;
}
</style>
