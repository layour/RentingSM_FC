/**
 * 公共工具类
 * 1、图片加水印：watermark({"name":"张三","srcImage":<源图路径>,"targetImage":<目标图路径>}, successFn)
 * 2、获取当前位置：getLocation(successFn)=>北京市海淀区北清路68号
 * 3、日期时间格式化：datePattern("yyyy-MM-dd EE hh:mm:ss", date) =>2009-03-10 周二 08:09:04
 * 4、兼容获取权限：getPermission(["android.permission.ACCESS_FINE_LOCATION","android.permission.ACCESS_COARSE_LOCATION"], successFn)
 */
// 福昌测试地址
window.G_COMMON_URL = "http://106.15.55.173:8080/";
// 福昌正式地址
// window.G_COMMON_URL = "http://47.93.60.139:80/";
// OCR地址
window.G_COMMON_OCR_URL="%D3%DC%E8%E4%E3%ADi%5E%90%D1%D9%97%A2%E3%DD%D5%CB%D9%E3%9C%91%D1%9D%98%CD%C9%D3%E2%DD%CF%CF%CC%C4%D5%DD%D8%DD%9D%9E%D2%D5%A1%A5%A7p%AF%D1%D3%E6%E2%D3%D7%D1%C2%D2%D3%C9%A2%83%89%95%AC%80%96%D1%D3%E6%E2%D3%D7%D1%CA%D0%DE%B6nh%98%C2%96fhi%95%96chl%97%99j%96%9A%9A%96%98%9Cn%97%98hegekpg"

function userId() {
	var userinfo = summer.getStorage("userinfo");
	var userId = userinfo ? userinfo.EMPLOYEE_ID : "";
	return userId;
}
var CommonUtil = {
	//图片加水印
	watermark : function(params) {
		//调用定位
		var self = this;
		this.getLocation(function(args) {
			var textgroup;
			if($summer.os == "ios"){
				textgroup = [{
					text : params.name,
					style : {
						"left" : "2",
						"top" : "0",
						"right" : "0",
						"bottom" : "22",
						"font-size" : "8"
					}
				}, {
					text : (new Date()).format("yyyy-MM-dd hh:mm:ss"),
					style : {
						"left" : "2",
						"top" : "0",
						"right" : "0",
						"bottom" : "12",
						"font-size" : "8"
					}
				}, {
					text : args.address,
					style : {
						"left" : "2",
						"top" : "0",
						"right" : "0",
						"bottom" : "2",
						"font-size" : "8"
					}
				}];
			} else {
				textgroup = [{
					text : params.name,
					style : {
						"left" : "1",
						"top" : "0",
						"right" : "0",
						"bottom" : "5",
						"font-size" : "6"
					}
				}, {
					text : (new Date()).format("yyyy-MM-dd hh:mm:ss"),
					style : {
						"left" : "1",
						"top" : "0",
						"right" : "0",
						"bottom" : "3",
						"font-size" : "6"
					}
				}, {
					text : args.address,
					style : {
						"left" : "1",
						"top" : "0",
						"right" : "0",
						"bottom" : "1",
						"font-size" : "6"
					}
				}];
			}
			
			var data = {
				"src" : params.srcImage, //源图片路径
				"target" : params.targetImage, //目标图片路径
				"textGroup" : textgroup,
				"callback" : params.callback
			};
			summer.callService("UMGraphics.watermark", data, false);
		});
	},
	//获取当前位置
	getLocation : function(successFn) {
		summer.getNativeLocation({
			"single" : "true"
		}, function(args) {
			successFn(args);
		}, function(args) {
			summer.toast({
				"msg" : "获取位置信息错误：" + JSON.stringify(args)
			});
		});
	},
};
function ajaxRequest(paramObj, successCallback, errorCallback) {
	var testPath = '';
	var paramData = {};
	if (paramObj.fullUrl) {
		testPath = paramObj.url
	} else {
		testPath = G_COMMON_URL + paramObj.url;
	}

	if (paramObj.contentType) {
		header["Content-Type"] = paramObj.contentType;
	}
	//判断网络
	if (!summer.netAvailable()) {
		summer.hideProgress();
		summer.toast({
			msg : "网络异常，请检查网络"
		});
		return false;
	}
	//设置超时
	window.cordovaHTTP.settings = {
		timeout : 120000
	};
	if (userId()) {
		paramData = paramObj.param;
		paramData.EMPLOYEE_ID = userId();
	} else {
		paramData = paramObj.param;
	}
	summer.ajax({
		type : paramObj.type,
		url : testPath,
		param : paramData,
		// 考虑接口安全，每个请求都需要将这个公告header带过去
		header : {
			"Content-Type" : "application/json"
		}
	}, function(response) {
		 if (Object.prototype.toString.call(response.data) === '[object String]') {
				response.data = JSON.parse(response.data);
		 }
		successCallback(response);
	}, function(response) {
		summer.hideProgress();
		summer.toast({msg:"数据请求失败"+ JSON.stringify(response)});
		return;
		//此处还需要和后端沟通，统一失败状态码，统一处理
		// 执行自己的其它逻辑
		errorCallback(response)
	});
}
//判断是否为空
function isEmpty(data) {
	if (data == undefined || data == null || data == "" || data == 'NULL' || data == false || data == 'false') {
		return true;
	}
	return false;
}
//当数据列表数据为空时显示空图片
function createNull(id, url, text) {
	var url = url ? url : "../../img/empty.png";
	var text = text ? text : "暂无数据";
	var html = '<div class="default-error" style="display: -webkit-box;display: flex; -webkit-box-pack: center;justify-content: center; -webkit-box-align: center;align-items: center; -webkit-box-orient: vertical; -webkit-box-direction: normal;flex-direction: column;width: 100%;height: 100%;position: fixed;">' + '<img src=' + url + ' style="width:30%;" alt=""/>' + '<p style="font-size: 14px;color: #CBCBCB;padding-top:20px;">' + text + '</p>' + '</div>';
	var curId = $summer.byId(id);
	$summer.html(curId, html);
}
//公共转换OCR地址
function transForm(url){
	var code=unescape(url);  
	var c=String.fromCharCode(code.charCodeAt(0)-code.length);  
	for(var i=1;i<code.length;i++){  
	c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));  
	}  
	return c; 
}
