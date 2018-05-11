import orgJSOP from 'jsonp'
//// 格式：
//  jsonp(url, opts, (err,data)=>{to-do})
//  // 参数说明：
//  // 数据地址：
//  url (String) url to fetch
//  // 配置选项对象
//  opts (Object), optional     encodeURLComponent(value)
//      // 重要：和后端约定的函数名
//      param (String) name of the query string parameter to specify the callback (defaults to callback)
//      // 熟悉：超时时间
//      timeout (Number) how long after a timeout error is emitted. 0 to disable (defaults to 60000)
//      prefix (String) prefix for the global callback functions that handle jsonp responses (defaults to __jp)
//      name (String) name of the global callback functions that handle jsonp responses (defaults to prefix + incremented counter)
//  // 回调函数
//(err,data)=>{to-do}

export default function jsonp(url,data,option){
	url+=(url.indexOf('?')<0?'?':'&')+param(data)
	// 有问号就会有查询字符串，直接在后面加&和转化后的字符串
    // 没有问号直接在后面加?和转化后的字符串
    //resolve成功  reject失败
return new Promise((resolve,reject)=>{
	orgJSOP(url,option,(err,data)=>{
		if(!err){
			resolve(data)
		}
	})
})
	
	
	
	
}
function param(data){
	let url=''
	for(var k in data){
		let value=data[k]!==undefined?data[k]:''
		//函数可把字符串作为 URI 组件进行编码encodeURIComponent
		url+=`&${k}=${encodeURIComponent(value)}`
	}
	return url?url.substring(1):''
}






























