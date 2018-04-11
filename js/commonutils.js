/**  Data  **/
Data.prototype.formatter = function (fmt) {
    var o = {
        "M+": this.getMonth(),
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth()+3)/3),
        "S": this.getMilliseconds()
    };
    if(/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+o[k]).substr((""+o[k]).length)));
    return fmt;
};
/**  Date  **/

;(function (window, document, $, undefined) {
    window.Utils = {
        // 节流函数，应用于scroll,resize等事件中
        throttle: function (method, context) {
            clearTimeout(method.tid);
            method.tid = setTimeout(function () {
                method.call(context);
            }, 100);
        }
    }
})(window, document, jQuery);