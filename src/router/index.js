import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/rank'
import Recommend from '@/components/recommend/recommend'
import Search from '@/components/search/search'
import Singer from '@/components/singer/singer'
import singerData from '@/components/singer-data/singer-data'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	//默认显示的页面
      path: '/',
      redirect: '/recommend'
    },
    
    {
    	path:'/recommend',
    	component:Recommend
    },
    
     {
    	path:'/singer',
    	component:Singer,
    	children:[
    		{
	    		path:':id',
	    		component:singerData
    		}
    	]
    },
    {
    	path:'/rank',
    	component:Rank
    },
    {
    	path:'/search',
    	component:Search
    },
  ]
})
