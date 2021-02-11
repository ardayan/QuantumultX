/*
9monsters会员部分功能：去广告，传送功能，被收藏显示。
未实现的功能：分身，框框，推荐用户，属性比率，删除足迹。

^https?:\/\/api\.ninemonsters\.com\/(premium\/getproducts\?|home\/get\?|initial\/get\?) url script-response-body https://raw.githubusercontent.com/ardayan/QuantumultX/master/Scripts/9monsters.js

hostname = api.ninemonsters.com

*/


var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const premium = "/premium/getproducts?";
const home = "/home/get?";
const initial = "/initial/get?";

if (url.indexOf(premium) != -1) {
	obj.premium_limit_at = 1662572750000;
	obj.premium = 0;
	body = JSON.stringify(obj);
}

if (url.indexOf(home) != -1) {
	obj.data.payment = 1;
    obj.data.premium = 1;
    obj.data.payment_limit = 1662572750000;
    obj.data.premium_limit = 1662572750000;
	body = JSON.stringify(obj);
}

if (url.indexOf(initial) != -1) {
	obj.data.payment = 1;
    obj.data.premium = 1;
    obj.data.payment_limit = 1662572750000;
    obj.data.premium_limit = 1662572750000;
	body = JSON.stringify(obj);
}

$done({body});