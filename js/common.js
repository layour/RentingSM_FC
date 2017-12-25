/**
 * 公共工具类
 * 1、图片加水印：watermark({"name":"张三","srcImage":<源图路径>,"targetImage":<目标图路径>}, successFn)
 * 2、获取当前位置：getLocation(successFn)=>北京市海淀区北清路68号
 * 3、日期时间格式化：datePattern("yyyy-MM-dd EE hh:mm:ss", date) =>2009-03-10 周二 08:09:04
 * 4、兼容获取权限：getPermission(["android.permission.ACCESS_FINE_LOCATION","android.permission.ACCESS_COARSE_LOCATION"], successFn)
 */
// 福昌测试地址
window.G_COMMON_URL = "http://122.49.7.88:8080/";
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
			var textgroup = [{
				text : params.name,
				style : {
					"left" : "20",
					"top" : "0",
					"right" : "0",
					"bottom" : "80",
					"font-size" : "20"
				}
			}, {
				text : (new Date()).format("yyyy-MM-dd hh:mm:ss"),
				style : {
					"left" : "20",
					"top" : "0",
					"right" : "0",
					"bottom" : "50",
					"font-size" : "20"
				}
			}, {
				text : args.address,
				style : {
					"left" : "20",
					"top" : "0",
					"right" : "0",
					"bottom" : "20",
					"font-size" : "20"
				}
			}];
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
		timeout : 5000
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
		successCallback(response);
	}, function(response) {
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
