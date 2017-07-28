using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrazyCake.Handler
{
    /// <summary>
    /// jsonPdata 的摘要说明
    /// </summary>
    public class jsonPdata : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/javascript";
            string callbackHeader= System.Web.HttpContext.Current.Request.QueryString["callback"];
            string data = "{name:\"数据\"}";
            context.Response.Write(callbackHeader + "(" + data + ")");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}