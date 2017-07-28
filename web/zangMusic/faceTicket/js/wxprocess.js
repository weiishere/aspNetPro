window['wxprocess'] = function(){
	var _mApp = mApp();
	var mAppConfig = _mApp.config();
	//切换环境
	var _host = 'productHost',  
	_entranceId = '',
	_wxparam = {},
	baseUrl = "",
	//服务器后端地址
	localUrl = "",//前端配置的地址
	appUrl = "", 
	pageModel = 'normal';    //sponsor  voter

	var baseLogo = 'img/user.png',
		baseName = '活动参与者';

	window.Config = {
	    entranceId: "2016011616000000001"
	};

	var isAllowShare = false;
	var temp = ['qrCode', 'wxOpenId', 'auth', 'code', 'refresh_token', 'entranceId'];
	temp.forEach(function (item) {
		Config[item] = getParameterByName(item);
	});

	switch (_host) {
		//本地
	case 'locaHost':
	    	baseUrl = "http://172.24.5.10:8333";
		localUrl = "http://10.13.82.49:3000/";
		appUrl = "http://172.24.4.61:8101/";
		_wxparam.server = 'http://pux.wangyin.com/wechat/users';
		_wxparam.param = '&appId=wx344c2d5033f18fb2&appSecret=3a1e8d5b31474dc4065c0c14b72a8c59';
		break;
		//其他人本地
	case 'locaOtherHost':
		baseUrl = 'http://10.9.45.8:3000/item/Sweepstake';
		localUrl = "http://pux.wangyin.com/kwx/tickets/";
		appUrl = "http://172.24.4.61:8101/";
		_wxparam.server = 'http://pux.wangyin.com/wechat/users';
		_wxparam.param = '&appId=wx344c2d5033f18fb2&appSecret=3a1e8d5b31474dc4065c0c14b72a8c59';
		break;
		//闭环
	case 'beatHost':
		baseUrl = 'http://172.24.5.10:8333';
		localUrl = "http://172.25.47.49/activity/item";
		appUrl = "http://172.24.4.61:8101/";
		_wxparam.server = 'http://pux.wangyin.com/wechat/users';
		// _wxparam.param = '&appId=wx344c2d5033f18fb2&appSecret=3a1e8d5b31474dc4065c0c14b72a8c59';
		_wxparam.param = '&appId=wxb3ff51f16202bcd0&appSecret=34fdb7673bb2935e24f6597067240c7d';
		//_wxparam.param = '&appId=wx9db0a88cecd76494&appSecret=4441e4141b5c5dd93a9bc7cc6868ab7e';
		break;
		//生产
	case 'productHost':
		baseUrl = 'http://m.jdpay.com';
		localUrl = "http://static.jdpay.com/activity/item/";
		// localUrl = "http://pux.wangyin.com/kwx/tickets/demo.html";
		appUrl = "http://m.jdpay.com/";
		_wxparam.server = 'https://m.jdpay.com/open/ticketSignature';
		_wxparam.param = '';
		break;
	}

	//业务逻辑服务地址
	// var processUrl = 'http://172.24.5.10:8011';   //闭环
	var processUrl = 'http://rmk.jdpay.com';
	// mock
	//	processUrl = 'http://10.13.82.49:3002';

	var port1 ='/uploadPicture/upPic',
		port2 = '/sendMarketGift/sendGift',
		port3 = '/queryCustIsVote/getCustIsVote',
		port4 = '/vote/vote',
		port5 = '/queryVoterInfo/getVoterInfo',
		port6 = '/queryCompensatedRank/getCompensatedRank',
		port7 = '/queryCustMarketInfo/getCustMarketInfo';

	// 请求服务端数据
	window.requestParam={
		requestSerial: Math.random(),    //请求流水号
		marketCode: Config.entranceId,  //活动编号
		thirdAccType: 'WEIXIN',  //第三方账户类型(就是发起者的)
		accountCode: Config.wxOpenId,  //发起者账号
		accCode: Config.wxOpenId,  //发起者账号
		nickname:'',  //用户昵称
		headPic: '',   //用户头像图片标识
		beautyValue: '',  //颜值
		picLocation: '',   //图片位置标识
		picInfoType: 'WXFLAG',   //图片信息类型
		mobile:'',    //手机号
		checkCode: '',  //短信验证码
		sponsorAccType:'WEIXIN',  //发起者账号类型
		sponsorAccCode: Config.wxOpenId,  //发起者账号
		voterAccType: 'WEIXIN',		//投票者账号类型
		voterAccCode: '',		//投票中账号
		voteId:'',		//投票标识
		picId:''
	};

	window.wxParam = {
		appid: '',
		timestamp: '',
		noncestr: '',
		signature: '',
		link: baseUrl + "/marketing/entrance?entranceId=" + Config.entranceId,
		title: '刷脸赚车票，美美哒过年',
		desc: '除了老公、老妈和老板谁还能给你报销路费？！',
		imgUrl: 'http://img13.360buyimg.com/cms/jfs/t790/61/1403238732/5911/2dcd4cf2/559f6b56Na06dce77.png',
	};

	var wxshare = function(fn) {
		//微信分享插件   
		wxsdk({
			debug: false,
			type: 'jsonp',
			//可选
			jsonp: { //jsonp 可配置数据
				name: 'callbackFn',
				isEncode: true,
				server: _wxparam.server,
				param: _wxparam.param,
				fn: function(data) { //默认this指向当前对象 ，后面也是
					var r = data.resultData;
					this.params.appid = r.appId;
					this.params.noncestr = r.nonceStr;
					this.params.signature = r.signature;
					this.params.timestamp = r.timestamp;
				}
			},
			shareData: {
				title: wxParam.title,
				desc: wxParam.desc,
				link: wxParam.link,
				imgUrl: wxParam.imgUrl,
				trigger: function(res) {
					//如果触发的收藏 就不执行回调
					if (res.shareTo == 'favorite' || res.scene == 'favorite') {
						this.isTrigger = false;
					} else {
						this.isTrigger = true;
					}
				},
				success: function() {
					if (mAppConfig.inAndroid) {
						window.scrollTo(1, 1);
					}
					if (!isAllowShare) {
						return false;
					}
					if (this.isTrigger) {
						if (fn) fn();
					}
				},
				cancel: function() {
					if (mAppConfig.inAndroid) {
						window.scrollTo(1, 1);
					}
				}
			}
		});
	};

	wxshare();

	//对话
	var dialoguePage = new Page('dialoguePage', {
		isFooterBar: false
	},
	function() {
		var $self = $("#" + this.domId);
		var $btn = $self.find('#J_dialogueNext');
				
		$btn.on('click',
		function() {			
			introducePage.show();
		})

	});

	// 上传页
	var introducePage = new Page('introducePage', {isFooterBar: false},function() {
		var $self = $("#" + this.domId);
	});

	//钱包介绍页
	var appIntroducePage = new Page('appIntroducePage', {
		isFooterBar: false
	},
	function() {
		var $self = $("#" + this.domId);
	});
	//手机号页
	var phonePage = new Page('phonePage', {isFooterBar: false},function() {});
	//领奖页
	var prizePage = new Page('prizePage', {isFooterBar: true},
	function() {
		$("#txt_PhoneNumber").phoneValidate($("#btu_getsms"), {
			ajaxUrl: baseUrl + "/marketing/sms/sendWithName",
			//获取code的url，默认post
			requestText: 'requestText秒后重试',
			callBack: function(data) {
				if (data.code != "A00000") {
					openAlert("出错了", data.msg);
				} else {
					requestParam.mobile = $('#txt_PhoneNumber').val();
					Trip("短信验证码已经成功发送，请注意查收！");
					//openAlert("发送成功", "短信验证码已经成功发送，请注意查收！");
				}
			},
			error: function(data) {
				alert(JSON.stringify(data));
			}
		});

		$('#btu_postVali').on('click', function(){
			if (!/^[0-9]+.?[0-9]*$/.test($("#text_verifyCode").val())) {
	                Trip("请输入正确的验证码！");
	                return;
	            }
			requestParam.checkCode = $('#text_verifyCode').val();
			var phoneData = _extend(requestParam, {});
			requestForJsonP(
				processUrl+port2, 
				{param: json2str(phoneData) }, 
				function (data) {
					prizePage.show(function(){
						showBackFn(data)
					})
				}
			)
			
		})

	});
	//上传失败页
	var failPage = new Page('failPage', {
		isFooterBar: false
	},
	function() {
		var $self = $("#" + this.domId);

	});
	//点赞
	var supportPage = new Page('supportPage', {
		isFooterBar: false
	},
	function() {
		var $self = $("#" + this.domId);

	});
	//投票结果
	var resultPage = new Page('resultPage', {
		isFooterBar: true
	},
	function() {
		var $self = $("#" + this.domId);

	});
	//投票人列表
	var listPage = new Page('listPage', {
		isFooterBar: false
	},
	function() {
		var $self = $("#" + this.domId);

	});

	function json2str(json){
		var str = '';
		for(var n in json){
			str += ('&'+n+'='+json[n])
		}

		return str.substring(1);
	}
	function _extend(old, change) {
		for (var el in change){
			old[el] = (el == 'style')? (old[el] + change[el]): change[el]
		}
		return old;
	}


	var initPage = 'normal';  //判断初始进入那个页面
	var returnData = getParameterByName('marketingParam');
	if(returnData != 'null' && returnData != ''){
	    returnData = JSON.parse(base64Coder.base64decode(returnData));

		if(returnData['sponsorAccType'] && returnData['sponsorAccCode']  ){  //从分享进入
			// 修改分享信息
			changeWxParam(returnData['sponsorAccType'], returnData['sponsorAccCode']);   //修改分享信息

			if(Config.wxOpenId == returnData['sponsorAccCode']){  //发起者
				initPage = 'sponsor';
			}else{ //投票者
				initPage  = 'voter';
			}
		}
	}

	if((navigator.userAgent.indexOf('WalletClient')  != -1)){
		initPage = 'jdapp'   //钱包内
	}
	// 初始化 进入页面
	switch(initPage){
	    case 'normal':
			dialoguePage.show(function(){
				$('title').html('亲疙瘩');	
			});
			break;
		case 'sponsor':
			resultPage.show(function(){
				var   sponsorData =_extend(requestParam,{});  
				requestForJsonP(     //拿到所有信息 走接口7  发起者
					processUrl+port7, 
					{param: json2str(sponsorData) }, 
					function (data) {
						$('.J_userLogo').attr('src', (data.accountHeadPic || baseLogo));
						$('.J_userName').html(data.accountNickName || baseName);
						$('.J_faceImg').css('background-image', 'url('+data.picUrl+')');
						$('.J_voterNum').html(data.voteNum);

						var voterHtml = '', userHtml='';
						if(data.voterList.length) $('.result-list > p').show();
						for(var i = 0; i < data.voterList.length; i++){
							(function(item, index){
								voterHtml += '<li><span><img src="'+(item.accHeadPic || baseLogo)+'" alt=""></span></li>';
							})(data.voterList[i], i);
						}

						if(data.voter.length < 30){
							$('.J_resultText').html('您的支持人数在30人以下，还未获得全额报销火车票/机票的机会，快去让朋友支持你吧！')
						}else{
							$('.J_resultText').html('你的颜值目前正在被我们的程序员舔屏！我们会尽全力从海量颜值中寻找到您，请保持手机畅通，如您中奖，7个工作日内我们会与您联系！')
						}

						$('.J_voterList').html(voterHtml);
					}
				)
			});
			break;
		case 'voter':
			supportPage.show(function(){
			    	var sponsorData = _extend(requestParam, { thirdAccType: returnData['sponsorAccType'], accountCode: returnData['sponsorAccCode'] });   //接口7 拿到所有信息 投票者
				var bVote = false;
				requestForJsonP(
					processUrl+port7, 
					{param: json2str(sponsorData) }, 
					function (data) {
						$('.J_userLogo').attr('src', data.accountHeadPic || baseLogo);
						$('.J_userName').html(data.accountNickName || baseName);
						$('.J_faceImg').css('background-image', 'url('+data.picUrl+')');
						var expendHtml = data.expendType == 'CASH' ? '我刷脸赚得了'+(data.expendValue-0)+'元现金红包， 快来支持我全额报销路费！': '我刷脸赚得了'+(data.expendValue-0)+'元话费优惠券， 快来支持我全额报销路费！'
						$('.J_expendText').html(expendHtml);

						$('.J_supportPlay').on('click', function(){
							location.href=baseUrl + "/marketing/entrance?entranceId=" + Config.entranceId;
						})

						$('.J_supportBtn').on('click',function(){
							if(bVote){
								openAlert('','<br />你已经支持过了！', [{name: '知道了'}]);
								return;
							}
							//接口3-接口4
						   	var supportData = _extend(requestParam, { sponsorAccType: returnData['sponsorAccType'], sponsorAccCode: returnData['sponsorAccCode'] });   //判断投票权限
							requestForJsonP(
								processUrl+port3, 
								{param: json2str(supportData) }, 
								function (data) {
									if(data.voted){  //投过了
										openAlert('','<br />你已经支持过了！', [{name: '知道了'}])
										bVote = true;
									}else{
										var   toSponsorData =_extend(requestParam,{voteAnswer: 'VOTE', 'voterAccCode': Config.wxOpenId});   //去投票
										requestForJsonP(
											processUrl+port4, 
											{param: json2str(toSponsorData)}, 
											function (data) {
												openAlert('','<br />支持成功！', [{name: '我也要报销', fn: function(){
													this.openAlert();
													location.href=baseUrl + "/marketing/entrance?entranceId=" + Config.entranceId;
												}}])
											}
										)
									}
								}
							)
						})
					}
				)
			});
			break;
		case 'jdapp':
			appIntroducePage.show();
			break;
		default: 
			dialoguePage.show(function(){
				$('title').html('亲疙瘩');	
			});
			break;
	}

	urlRoleCommon.pageChangeEven = function () {
	        if(this.domId == 'dialoguePage'){
	        	$('title').html('亲疙瘩');	
	        }else{
	        	$('title').html('刷脸赚车票');	
	        }
	};
	supportPage.show();  //到时候要注释掉

	//静态交互

	$(function() {
		// changeListWidth();

		$('.dialogue-con li').each(function(index, item) {
			var me = $(this);
			setTimeout(function() {
				me.addClass('on');
			},
			2000 * (index + 1))
		})

		function rnd(n1, n2) {
			return Math.floor(Math.random() * (n2 - n1) + n1) + 1;
		}

		//改颜值， 文案  (是否要存 唯一值)
		function changeFace(num) {
			var num = num || rnd(80, 97);
			requestParam.beautyValue = num;

			$('.J_faceNum').each(function() {
				$(this).html(num)
			}); 
			$('.J_faceText').each(function() {
				var str = '你的颜值简直天生丽质风华绝代！<br/>美美哒过年吧！';
				if (num >= 90) {
					str = '你的颜值已经逆天！美美哒过年吧！';
				} else if (num >= 85 && num <= 89) {
					str = '你的颜值已经爆表！美美哒过年吧！'
				}
				$(this).html(str);
			})
		}

		changeFace();
	});


	$('#J_camera').on('click', function() {
	    chooseImage()
	}); 

	//全部报销用户
	(function(){
		var compensateData =_extend(requestParam,{compensateType: 'COMPENSATED'})
		requestForJsonP(  
			processUrl+port6, 
			{param: json2str(compensateData) }, 
			function (data) {
				var compensateHtml = '';

				//if(data.dataList.length){
				//	for(var i = 0; i < data.dataList.length; i++){
				//		//代码逻辑  有的时候替换
				//	}
				//}

				var _data = data.dataList;
				var table = document.querySelector("#tableList");
				var tr = table.getElementsByTagName("tr")[0];
				var tdLength = tr.getElementsByTagName("td").length;
				for (var i = 0; i < _data.length; i++) {
				    if (i < tdLength) {
				        tr.getElementsByTagName("div")[i].innerHTML = "<img src='./img/people.jpg' alt=''><p> 已报销580元</p>";
				    } else {
				        var _td = document.createElement("td");
				        _td.innerHTML = "<div><img src='./img/people.jpg' alt=''><p> 已报销580元</p></div>";
				        tr.appendChild(_td);
				    }
				}
			}
		)
				
	})();

	//打开相机 step1
	function chooseImage() {
		var localIds, isMobile = false;
		wx.chooseImage({
			count: 1,
			// 默认9
			sizeType: ['original', 'compressed'],
			// 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'],
			// 可以指定来源是相册还是相机，默认二者都有
			success: function(res) {
				localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

				uploadImage(localIds);
			}
		});
	}

	// 上传图片 step2
	function uploadImage(localIds) {
		wx.uploadImage({
			localId: localIds[0].toString(),
			// 需要上传的图片的本地ID，由chooseImage接口获得
			isShowProgressTips: 1,
			// 默认为1，显示进度提示
			success: function(res) {
				var serverId = res.serverId; // 返回图片的服务器端ID
				requestParam.picLocation = serverId;

				$('.J_faceImg').css('background-image', 'url('+localIds+')');

				uploadRequest();
			}
		});
	}

	//上传图片 step2-01
	function uploadRequest(){
		var uploadData =_extend(requestParam,{})
		requestForJsonP(  
			processUrl+port1, 
			{param: json2str(uploadData) }, 
			function (data) {
				requestParam.voteId = data.voteId;
				requestParam.picId = data.picId;

				if(data.mobileIndentify){
					phonePage.show()
				}else{
					prizePage.show(function(){
						showBackFn(data)
					})
				}
			},
			true
		)
	}

	//输入手机号 step3
	function showBackFn(data){
		if(data.retCode  === 'RM000000'){
			prizePage.show();
			if(data.expendType == 'CASH'){  //现金红包
				$('.J_prizeInfo p').html('<span>'+(data.expendVal-0)+'</span>元现金红包')
				$('.J_prizeInfo em').html(data.expendVal-0);
				$('.J_prizeInfo i').html('现金红包');
			}else{
				$('.J_prizeInfo p').html('<span>'+(data.expendVal-0)+'</span>元话费优惠券')
				$('.J_prizeInfo em').html(data.expendVal-0);
				$('.J_prizeInfo i').html('话费劵');
			}

			changeWxParam(requestParam.thirdAccType, requestParam.accountCode, true)

		}else{
			Trip(data.retMessage);
		}
	}
	function changeWxParam(str1, str2, needShare){
		var jsonData = '{"sponsorAccType": "'+str1+'", "sponsorAccCode": "'+str2+'"}';
		window.wxParam = {
			appid: '',
			timestamp: '',
			noncestr: '',
			signature: '',
			link: baseUrl + "/marketing/entrance?entranceId=" + Config.entranceId+'&marketingParam='+base64Coder.base64encode(jsonData),
			title: '刷脸赚车票，美美哒过年',
			desc: '小伙伴们快来帮我全额报销火车票！！！',
			imgUrl: 'http://img13.360buyimg.com/cms/jfs/t790/61/1403238732/5911/2dcd4cf2/559f6b56Na06dce77.png',
		};
		if(needShare){
			wxshare(function(){
				openAlert('分享成功！','快去京东钱包查看您获得的报销款吧', [{name: '去京东钱包看看', fn: function(){
					this.closeAlert();
					_mApp.start();
				}}]);
			})
		}else{
			wxshare( );
		}
	}


	//jdapp设置标题
	(function(){

		if(navigator.userAgent.indexOf('WalletClient') == -1) return; 

		var isIos = navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
		if (isIos) {
	            openIframe('native://setTitleName?titleName=刷脸赚车票' );
		} else {
	            android.setTitleName('刷脸赚车票');
		}

		function openIframe(url){
			var appOpenBtn = document.createElement('a');
			      appOpenBtn.href = url;
			appOpenBtn.style.display = 'none';

			document.body.appendChild(appOpenBtn);
			appOpenBtn.click();
			setTimeout(function () {
			    document.body.removeChild(appOpenBtn);
			}, 2000);
		};
	})();

	
	
}


