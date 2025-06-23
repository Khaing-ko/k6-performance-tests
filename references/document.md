# Setup and Install
reference link -> https://grafana.com/docs/k6/latest/ (Installation ထွေထွေထူးထူး မရှိပါ Document မှာကြည့်ပြီး Install လုပ်နိုင်ပါတယ်)

# Some Run Test cmd

script run cmd -> k6 run <fileName>.js 
e.g. k6 run scprit-name.js
cmd Promp တွင် File Path ရှိတဲ့နေရာ အထိ ရောက်အောင်သွားပြီးတော့မှ Run ပါ.

script run with html report ->  $env:K6_WEB_DASHBOARD = "true"
                              	>> $env:K6_WEB_DASHBOARD_EXPORT = "results/ result-file-name.html"
                                >> k6 run test-scenarios/<filename>.js
                              
cmd Promp တွင် File Path ရှိတဲ့နေရာ အထိ ရောက်အောင်သွားပြီးတော့မှ Run ပါ.
e.g 		$env:K6_WEB_DASHBOARD = "true"
            >> $env:K6_WEB_DASHBOARD_EXPORT = " results/result-file-name.html"
            >> k6 run test-scenarios/FilterAndTreeView.js

မှတ်ချက်။	။ Project ထဲမှာပါတဲ့ bat File နဲ့ တစ်ခါတည်း Run လို့ရပါတယ်.

#Folder Structure
![alt text](/images/image.png)

#Script Flow Information Explanation
![alt text](/images/image-1.png)

1.ပထမ Stage စက္ကန့် (30) အတွင်း user တွေကို 10 ယောက် ပြည့်အောင်အထိ တစ်ဖြည့်ဖြည်း တက်လာပါမယ်. User (10) ယောက် က တစ်ပြိုင်တည်း ချက်ချင်း 0 စက္ကန့် စခေါ်တာ မဟုတ်ပါ.

2.ဒုတိယ Stage အဲ တက်လာတဲ့ User 10 ယောက်လုံး ကို 1 မိနစ်ကြာသည်အထိ တစ်ပြိုင်တည်း EndPoint တွေကို ခေါ် စေမယ်.

3.တတိယ Stage နောက်ဆုံး စက္ကန့် (30) မှာ အဲ 10 ယောက် တစ်ဖြည်းဖြည်း 0 ဖြစ်သည်အထိ ပြန်လျော့လာပါမယ်. အဲတော့ စုစုပေါင်းအလုပ်လုပ်ရန် ကြာချိန် 2 မိနစ်ဖြစ်ပါမယ်.

![alt text](/images/image-2.png)

1.ဒါကတော့ Report အတွက် Standard Rate ကို ပြောချင်တာပါ Respond အားလုံး ရဲ့ 95 ရာခိုင်းနှုန်းက  500 ms အတွင်း ပြန်ပေးနိုင်ရင် ကောင်းတယ်လို့ ယူဆပါမယ်. 

2.Respond ပြန် မရတဲ့ အရေအတွက်က 10 ရာခိုင်းနှုန်း အောက်ဖြစ်ရပါမယ်

#Note. International Standart Rate က 500 ms ပါ.

![alt text](/images/image-3.png)

1.User 1 ယောက်က EndPoint တစ်ခု ခေါ်ပြီးသွားရင် ခဏ တန့်ထားချင်တဲ့ အခါသုံးလို့ရပါတယ်.
e.g - 	Math.random() 0s -> 1s,
	sleep(1);

#Test Report Information Explanation    
![alt text](/images/image-4.png)

http_req_duration 	->	Request တစ်ခုလွှတ်ပြီး response ပြန်ရလာတဲ့အထိ ကြာချိန်။
                        (connect time+send time +waiting time + receive time)

http_req_waiting 	->	Server ကနေ actual response body (first byte) ပြန်လာတဲ့ကြာချိန်။

http_req_connecting 	->	Client က server နဲ့ connection ဖွင့်ဖို့ကြာချိန်။

http_req_tls_handshaking ->	HTTPS connection (SSL/TLS) ဖွင့်ချင်တဲ့အခါ security handshake 
                         ကြာချိန်။
                         e.g-> HTTPS website တစ်ခုကို ဝင်မယ်ဆိုရင်, Client နဲ့ Server တို့ ကြား secure ဖစ်ဖို့အတွက်  ဘယ် encryption method သုံးမလဲ,Certificate မှန်လား ,Public key / Private key မျှဝေဖို့  အလို အချက်တေ စစ်ရန်ကြာချိန် ကို tls hand shaking လို့ခေါ်ပါတယ် 

http_req_sending	 ->	Request data (header, body) ကို server ကို ပေးပို့နေတဲ့အချိန်။

http_req_receiving 	->	Response ကို client ရလာပြီးသားဖြစ်တဲ့အချိန်။ (completely download time)

http_req_blocked 	->	Connection မဖွင့်ခင်၊ DNS resolve သို့မဟုတ် browser limit ကြောင့် 
                        စောင့်နေတဲ့အချိန်။
                        Request တစ်ခုစရန် စောင့်နေရတဲ့အချိန်

iteration_duration 	-> 	default function တစ်ခုပတ်ပြီးပြည့်တဲ့အချိန်။ sleep time လည်းပါ
