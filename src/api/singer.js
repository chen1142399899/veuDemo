import jsonp from "../common/js/jsonp"
import {commonParams,options} from './config'

export function getSinger() {
  const url='https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data=Object.assign({},commonParams,{
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url,data,options)
}
//随机数
//export function number(num) {
//var random = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,num-1));
//return random
//}
//获取当前时间
//export function getNowFormatDate() {
//var date = new Date();
//var seperator1 = "-";
//var seperator2 = ":";
//var month = date.getMonth() + 1;
//var strDate = date.getDate();
//if (month >= 1 && month <= 9) {
//  month = "0" + month;
//}
//if (strDate >= 0 && strDate <= 9) {
//  strDate = "0" + strDate;
//}
//var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
//  + " " + date.getHours() + seperator2 + date.getMinutes()
//  + seperator2 + date.getSeconds();
//return currentdate;
//}
//根据歌手ID返回歌曲信息
export function getSingerData(singId){
	const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
	const data=Object.assign({},commonParams,{
		hostUin:0,
		needNewCode:0,
		platform:'yqq',
		order:'listen',
		begin:0,
		num:100,
		songstaus:1,
		g_tk:5381,
		singermid:singId
	});
	return jsonp(url,data,options)
}

