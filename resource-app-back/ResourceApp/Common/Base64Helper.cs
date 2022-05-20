using System.Text;

namespace ResourceApp.Common
{
    public class Base64Helper
    {
        public static string Encode(string randomString)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(randomString);
            return Convert.ToBase64String(plainTextBytes);
        }

        public static string Decode(string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}
