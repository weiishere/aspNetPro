using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;


namespace CrazyCake.Handler
{
    /// <summary>
    /// mainHandler 的摘要说明
    /// </summary>
    public class mainHandler : IHttpHandler
    {
        
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            int gameIndex =int.Parse(context.Request.Params["gameIndex"]);
            //context.Response.Write("Hello World");
            //var gameRecord = new GameRecord
            //{
            //    OpenId = "demoOpenId123456",
            //    InputTime = DateTime.Now,
            //    GameTime = 90,
            //    Score = 20300,
            //    ShareContent = "我分享的游戏",
            //    GameData=""
            //};
            //ModelDataDataContext mdc = new ModelDataDataContext();
            //mdc.GameRecord.InsertOnSubmit(gameRecord);
            //mdc.SubmitChanges();
            string getGameCount = getGameCountMethod(true, gameIndex);
            context.Response.Write(getGameCount);
        }
        private string getGameCountMethod(bool append, int gameIndex)
        {
            int gameCount = 0;
            string filename_count = HttpContext.Current.Server.MapPath("/Recode/GameCount_" + gameIndex + ".txt");
            string filename_log = HttpContext.Current.Server.MapPath("/log/log" + DateTime.Now.ToString("yyyy-M-d") + "_" + gameIndex + ".txt");
            StreamWriter writer = null;
            StreamReader reader = null;
            try
            {
                if (!Directory.Exists(HttpContext.Current.Server.MapPath("//Recode//")))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath("//") + "\\Recode\\");
                    
                }
                else
                {
                    if (!File.Exists(filename_count))
                    {
                        //创建文件
                        FileStream stream = File.Open(filename_count, FileMode.OpenOrCreate, FileAccess.Write);
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.SetLength(0);
                        stream.Close();
                    }
                    //读取游戏次数
                    reader = new StreamReader(filename_count, System.Text.Encoding.UTF8);
                    String line;
                    line = reader.ReadLine();
                    gameCount = string.IsNullOrEmpty(line) ? 0 : int.Parse(line);
                    reader.Close();

                }
                //把txt清空，然后写入次数
                FileStream stream2 = File.Open(filename_count, FileMode.OpenOrCreate, FileAccess.Write);
                stream2.Seek(0, SeekOrigin.Begin);
                stream2.SetLength(0);
                stream2.Close();
                writer = new StreamWriter(filename_count, append);
                gameCount++;
                writer.Write(gameCount);
                //writer.WriteLine(ErrStr);
                writer.Flush();
                writer.Close();
                writer.Dispose();

                if (!Directory.Exists(HttpContext.Current.Server.MapPath("//log//")))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath("//") + "\\log\\");
                    
                }
                else
                {
                    if (!File.Exists(filename_log))
                    {
                        FileStream stream = File.Open(filename_log, FileMode.OpenOrCreate, FileAccess.Write);
                        stream.Close();
                    }
                    //记录日志
                    StreamWriter writer2 = new StreamWriter(filename_log, append);
                    string IpAddress = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"].ToString();
                    writer2.WriteLine(DateTime.Now.ToLongDateString() + DateTime.Now.ToLongTimeString() + "产生一个请求，用户进入游戏(IP：" + IpAddress + ")");
                    writer2.Flush();
                    writer2.Close();
                    writer2.Dispose();
                }
            }
            catch(Exception ex)
            {
                return ex.Message + "--" + ex.StackTrace;
            }
            finally
            {
                if (writer != null) writer.Close();
                if (reader != null) reader.Close();
            }
            return gameCount.ToString();
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