# 开发规范

- 尽量使用一致框架
- 每个模块私有的资源（图片文件、SVG文件）、CSS、JS放到模块目录下，公共的资源、CSS、JS放到最外层
- 目录、文件名采用小驼峰命名
- 名称、变量尽量有意义

- 代码提交备注新增、修改内容

# 打包流程

# 发布流程

- 证书
- 签名（doc/renting.keystore）；别名：renting.keystore，密码：123456
- 打包账号（RentingSM/SM123456）
#OCR加密函数
function compile(code)  
{    
   var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
   for(var i=1;i<code.length;i++){  
   c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
   }  
   return escape(c);  
}  


