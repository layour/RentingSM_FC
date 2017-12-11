/**
 * 公共工具类
 * 1、图片加水印：watermark({"name":"张三","srcImage":<源图路径>,"targetImage":<目标图路径>}, successFn)
 * 2、获取当前位置：getLocation(successFn)=>北京市海淀区北清路68号
 * 3、日期时间格式化：datePattern("yyyy-MM-dd EE hh:mm:ss", date) =>2009-03-10 周二 08:09:04
 * 4、兼容获取权限：getPermission(["android.permission.ACCESS_FINE_LOCATION","android.permission.ACCESS_COARSE_LOCATION"], successFn)
 */
 
var CommonUtil = {
	//图片加水印
	watermark : function(params, successFn) {
		//调用定位
		var self=this;
		this.getLocation(function(args) {
		   var textgroup = [{
				text : params.name,
				style : {"left" : "20", "top" : "0", "right" : "0", "bottom" : "80", "font-size" : "20"}
			},{
				text : (new Date()).format("yyyy-MM-dd hh:mm:ss"),
				style : {"left" : "20", "top" : "0", "right" : "0", "bottom" : "50", "font-size" : "20"}
			},{
				text : args.address,
				style : {"left" : "20", "top" : "0", "right" : "0", "bottom" : "20", "font-size" : "20"}
			}];
			var data = {
				"src" : params.srcImage, //源图片路径
				"target" : params.targetImage, //目标图片路径
				"textGroup" : textgroup,
				"callback":"successCallback(sender,args)"
			}; 
			 summer.callService("UMGraphics.watermark", data, false);
			 
			  successFn(_sender, _args);
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