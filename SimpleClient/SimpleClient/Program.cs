﻿using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace SimpleClient
{
    public class Product
    {
        public string Title { get; set; }
        public string Extension { get; set; }
        public DateTimeOffset DocumentDate { get; set; }
    }

    class Program
    {
        static HttpClient client = new HttpClient();

        static void ShowProduct(Product product)
        {
            Console.WriteLine($"Name: {product.Title}\tPrice: " +
                $"{product.Extension}\tCategory: {product.DocumentDate}");
        }

        static async Task<Uri> CreateProductAsync(Product product)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync(
                "https://apiuat.dynamosoftware.com/api/v2.0/entity/Document", product);
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return response.Headers.Location;
        }

        static async Task<Product> GetProductAsync(string path)
        {
            Product product = null;
            HttpResponseMessage response = await client.GetAsync(path);
            if (response.IsSuccessStatusCode)
            {
                product = await response.Content.ReadAsStringAsync<Product>();
            }
            return product;
        }

        //static async Task<Product> UpdateProductAsync(Product product)
        //{
        //    HttpResponseMessage response = await client.PutAsJsonAsync(
        //        $"api/products/{product.Id}", product);
        //    response.EnsureSuccessStatusCode();

        //    // Deserialize the updated product from the response body.
        //    product = await response.Content.ReadAsAsync<Product>();
        //    return product;
        //}

        //static async Task<HttpStatusCode> DeleteProductAsync(string id)
        //{
        //    HttpResponseMessage response = await client.DeleteAsync(
        //        $"api/products/{id}");
        //    return response.StatusCode;
        //}

        static void Main()
        {
            RunAsync().GetAwaiter().GetResult();
        }

        static async Task RunAsync()
        {
            // Update port # in the following line.
            client.BaseAddress = new Uri("https://apiuat.dynamosoftware.com/api/v2.0/entity/Document/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "7tXCb9hACVF0-3zx5Ai9iVraUZcIA4S9CkpyCfc_48sh-5ac43OU3la4V4VEAid6H2FkMarrJMHQtLFzikva3g");
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            try
            {
                // Create a new product
                Product product = new Product
                {
                    Title = "test",
                    Extension = ".doc",
                    DocumentDate = DateTime.Now
                };

                var url = await CreateProductAsync(product);
                Console.WriteLine($"Created at {url}");

                // Get the product
                product = await GetProductAsync(url.PathAndQuery);
                ShowProduct(product);

                //// Update the product
                //Console.WriteLine("Updating price...");
                //product.Price = 80;
                //await UpdateProductAsync(product);

                //// Get the updated product
                //product = await GetProductAsync(url.PathAndQuery);
                //ShowProduct(product);

                //// Delete the product
                //var statusCode = await DeleteProductAsync(product.Id);
                //Console.WriteLine($"Deleted (HTTP Status = {(int)statusCode})");

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            Console.ReadLine();
        }
    }
}
