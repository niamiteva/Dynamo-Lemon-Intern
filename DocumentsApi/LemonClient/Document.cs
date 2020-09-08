using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace DocumentApi
{
    class Document
    {
        public string Title { get; set; }
        public string Extension { get; set; }
        public DateTimeOffset DocumentDate { get; set; }

        public Document(string title, string ext, DateTimeOffset docDate)
        {
            Title = title;
            Extension = ext;
            DocumentDate = docDate;
        }

        
    }

    public class ItemResonse
    {
        [JsonProperty("data")]
        public IDictionary<string, object> Data { get; set; }

    }

}
