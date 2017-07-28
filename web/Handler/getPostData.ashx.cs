using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace CrazyCake.Handler
{
    /// <summary>
    /// getPostData 的摘要说明
    /// </summary>
    public class getPostData : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/html";
            //context.Response.Write("Hello World");
            //string postData= System.Web.HttpContext.Current.Request.Form["data"];
            //context.Response.Write("<div style='word-break:break-word'>postData" + postData+"</div>");
            //context.Response.Write("<script>window.parent.uplodingError()</script>");
            string _base64 = System.Web.HttpContext.Current.Request.Form["data"];// "data:image/jpeg;base64,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";
            byte[] bt = Convert.FromBase64String(_base64.Substring(_base64.IndexOf("base64,") + 7));
            System.IO.MemoryStream stream = new System.IO.MemoryStream(bt);
            Bitmap bitmap = new Bitmap(stream);
            MemoryStream ms1 = new MemoryStream();
            bitmap.Save(ms1, System.Drawing.Imaging.ImageFormat.Jpeg);
            context.Response.ContentType = "image/jpeg";
            context.Response.BinaryWrite(ms1.ToArray());
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