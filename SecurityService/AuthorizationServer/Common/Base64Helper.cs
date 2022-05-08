using System.Text;

namespace AuthorizationServer.Common
{
    public static class Base64Helper
    {
        public static string Encode(string randomString)
        {
            //var crypt = new SHA256Managed();
            //string hash = String.Empty;
            //byte[] crypto = crypt.ComputeHash(Encoding.ASCII.GetBytes(randomString));

            //foreach (byte theByte in crypto)
            //{
            //    hash += theByte.ToString("x2");
            //}

            //return hash;

            var plainTextBytes = Encoding.UTF8.GetBytes(randomString);
            return Convert.ToBase64String(plainTextBytes);
        }

        public static string Decode(string base64EncodedData)
        {
            //string result = String.Empty;
            //UTF8Encoding encoder = new UTF8Encoding();
            //SHA256Managed sha256hasher = new SHA256Managed();
            //byte[] hashedDataBytes = sha256hasher.ComputeHash(encoder.GetBytes(randomString));

            //foreach (byte theByte in hashedDataBytes)
            //{
            //    result += theByte.ToString("x2");
            //}


            //return result;

            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}
