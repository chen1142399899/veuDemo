import jsonp from '../common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'

export function getRecommend(){
	const url="https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
	//Object.assign()属性，可以用于对象复制。
	const data=Object.assign({},commonParams,{
		platform:'h5',
		uin : 0,
		needNewCode: 1


	})
	return jsonp(url,data,options)
}

//获取歌单数据
export function getDisList() {
  const url='/api/getDisList'
  //方法用于对象的合并，将源对象（ source ）的所有可枚举属性，复制到目标对象（ target ）
  //Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
  const data=Object.assign({},commonParams,{
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  //get请求params
  return axios.get(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((err)=>{
    console.log(err);
  })
}
