using System;
using System.Net.Http;
using DocumentApi;

namespace Program
{
    class Program
    {
        static void Main(string[] args)
        {
            LemonClient client = new LemonClient();
            var itemParams = new string[] { "Filename", "Documentdate" };
            ItemResonse res =  client.GetEntityItem(itemParams);
            Console.WriteLine(res.Data);
        }
    }
}
