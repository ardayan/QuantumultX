
/*
url需要转义，^开始，https后可以加问号，意义不明。
|可以加多个路径（小括号和|号前不用转义符号）
最后url script-response-body 脚本路径

^https?:\/\/api\.ninemonsters\.com\/(premium\/getproducts\?|home\/get\?|initial\/get\?) url script-response-body arda/9monsters.js
*/

// 开头
var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);
//
var obj = JSON.parse($response.body);


// 结尾
body = JSON.stringify(obj);
$done({body});
//
$done({body: JSON.stringify(obj)});


// 全部替换
obj= {
  "active_expires_at" : "2029-01-01T00:00:00Z",
  "is_subscription_active" : true,
  "active_subscription_type" : "premium",
  "is_blocked" : false
};


// 某个字段
obj["pucharses"]= "10";
//
obj.membership = true;


//某个字段里的某个
obj.user.is_on_free_trial= false;
//
obj.data["isNewUser"] = "2";


//多个路径，先const声明常量，方便后面写
const home = "/home/get?";
// 接下来（参考9monsters.js）也可以不const，把/home/get?放括号里面
if (url.indexOf(home) != -1) {
	obj.data.payment = 1;
	body = JSON.stringify(obj);
}