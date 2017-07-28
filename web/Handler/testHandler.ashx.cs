using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrazyCake.Handler
{
    /// <summary>
    /// testHandler 的摘要说明
    /// </summary>
    public class testHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/html";
            context.Response.Write("{code:\"A00000\",data:[{title:\"title1\",value:\"value1\"},{title:\"title2\",value:\"value2\"},{title:\"title3\",value:\"value3\"}]}");
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