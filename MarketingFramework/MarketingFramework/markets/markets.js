/*
 *  营销活动分类
 */

define(['marketMod'], function (marketMod) {
    //定义命名空间函数
    var markets = {};

    markets = {
        //领奖 领券活动
        getPrize: function (_callback) {
            marketMod.sms.index({
                callback: function (data) {
                    _callback.call(this, data);

                    //this.id.html(data.amount. )
                }

            });
            marketMod.getPrize.index({
                callback: function (data) {
                    _callback.call(this, data);
                }
            });

        },
        qrcode: function (_callback) {
            marketMod.qrcode.index({
                callback: function (data) {
                    _callback.call(this, data);
                }
            });
        },
        lottery: function () {
            marketMod.lottery.show({
                callback: function (data) {
                    _callback.call(this, data);
                }
            });
        }
    }

    return markets;
});
