/**
 * 公共工具类
 * 1、图片加水印：watermark(params, successFn)
 * 2、获取当前位置：getLocation(successFn)
 * 3、日期时间格式化：datePattern(fmt, date)
 */
function CommonUtil() {

}

CommonUtil.prototype = {
	//图片加水印
	watermark : function(params, successFn) {
		//调用定位
		getLocation(function(args) {
			var textgroup = [{
				text : params.name,
				style : {"left" : "20", "top" : "0", "right" : "0", "bottom" : "80", "font-size" : "12"}
			},{
				text : datePattern("yyyy-MM-dd EE hh:mm:ss", new Date()),
				style : {"left" : "20", "top" : "0", "right" : "0", "bottom" : "50", "font-size" : "12"}
			},{
				text : args.address,
				style : {"left" : "20", "top" : "0", "right" : "0", "bottom" : "20", "font-size" : "12"}
			}];
			var data = {
				"src" : params.srcImage, //源图片路径
				"target" : params.targetImage, //目标图片路径
				"textGroup" : textgroup
			};
			var result = summer.callService("UMGraphics.watermark", data, false);
			successFn(result.target);
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
	//日期时间格式化
	datePattern : function(fmt, date) {
		var o = {         
		    "M+" : date.getMonth()+1, //月份         
		    "d+" : date.getDate(), //日         
		    "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时         
		    "H+" : date.getHours(), //小时         
		    "m+" : date.getMinutes(), //分         
		    "s+" : date.getSeconds(), //秒         
		    "q+" : Math.floor((date.getMonth()+3)/3), //季度         
		    "S" : date.getMilliseconds() //毫秒         
	    };         
	    var week = {         
		    "0" : "/u65e5",         
		    "1" : "/u4e00",         
		    "2" : "/u4e8c",         
		    "3" : "/u4e09",         
		    "4" : "/u56db",         
		    "5" : "/u4e94",         
		    "6" : "/u516d"        
	    };         
	    if(/(y+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));         
	    }         
	    if(/(E+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[date.getDay()+""]);         
	    }         
	    for(var k in o){         
	        if(new RegExp("("+ k +")").test(fmt)){         
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
	        }         
	    }         
	    return fmt; 
	}
}; 