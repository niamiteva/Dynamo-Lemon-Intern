using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Reflection.Emit;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace DocumentApi
{
    public class LemonClient
    {
        public readonly string ApiKey;
        public readonly HttpClient Client;
        public readonly string ApiUrl;

        public LemonClient(string apiKey= "7tXCb9hACVF0-3zx5Ai9iVraUZcIA4S9CkpyCfc_48sh-5ac43OU3la4V4VEAid6H2FkMarrJMHQtLFzikva3g", string url = "https://apiuat.dynamosoftware.com/api/v2.0/entity/Document/")
        {
            ApiKey = apiKey;
            ApiUrl = url;
            Client = new HttpClient();
 
        }

        public ItemResonse GetEntityItem(params string[] properties )
        {
            Client.BaseAddress = new Uri(ApiUrl);
            Client.DefaultRequestHeaders.Accept.Clear();
            Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", ApiKey);
            Client.DefaultRequestHeaders.Add("x-columns", String.Join(";", properties));
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = Client.GetAsync(ApiUrl).Result;

           ItemResonse msg = JsonConvert.DeserializeObject<ItemResonse>(response.Content.ReadAsStringAsync().Result);
            //var msg = JsonConvert.DeserializeObject(response.Content.ReadAsStringAsync().Result);
            //msg.ToString();
            return msg;
        }

        // get by id 

    }
}
