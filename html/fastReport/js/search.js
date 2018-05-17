
/*********************************** Summer Lifecycle Handler Define ***********************************/
summerready = function(){
	$('#header').css('padding-top','40px')
	bindEvents();
}


function total(){
	var _data=[];
	var length=$(this).val().length;
	if(length<1 && summer.getStorage('searcharr')){
		var listText=doT.template($('#listTemp').text());
		$('#main').html(listText(summer.getStorage('searcharr')));
		$('#main').append('<div class="clearhis" onclick="clearhis()">清除历史记录</div>')
	}else if(length<1&& !summer.getStorage('searcharr')){
		$("#main").html('<div class="empty"></div>');
	}else{
		for(var k=0;k<_array.length;k++){
			if(_array[k].name.indexOf($(this).val())>=0){
				_data.push(_array[k]);
			}
		}
		var listText=doT.template($('#listTemp').text());
		$('#main').html(listText(_data));
	}
}

/*********************************** DOM Event Handler Define ***********************************/
function bindEvents(){
	$('.search').on('input propertychange focus',total);
}

function closeWin(){
	summer.closeWin();
}

function clearhis(){
	summer.setStorage('searcharr','');
	$("#main").html('<div class="empty"></div>');
}

function setLocal(obj){
	var searcharr=[];
	var _searchData={
		"name":$(obj).find("dt").text(),
		"groupname":$(obj).find("dd").text(),
		"id":$(obj).attr("data-id"),
		"userid":$(obj).attr("data-userid")	,
		"tenantid":$(obj).attr("data-tenantid")

	}
	if(summer.getStorage('searcharr')){
		searcharr=summer.getStorage('searcharr');
		for(var l=0;l<searcharr.length;l++){
			if (searcharr[l].id==_searchData.id){
				searcharr.remove(l);
			}
		}
		if(searcharr.length>=6){
			searcharr.shift();
		}
	}
	searcharr.push(_searchData);
	summer.setStorage('searcharr',searcharr);
	summer.openWin({
	    id : "employee",
	    url : "html/app_contacts/employee.html",
	    statusBarStyle:"light",
	    pageParam:{
	    	id:$(obj).attr("data-userid"),
			tenantid:$(obj).attr("data-tenantid")
	    }
	});
}
