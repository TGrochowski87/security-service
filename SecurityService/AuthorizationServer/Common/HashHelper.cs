﻿using System.Text;
using XSystem.Security.Cryptography;

namespace AuthorizationServer.Common
{
    public static class HashHelper
    {
        public static string HashString(string randomString)
        {
            var crypt = new SHA256Managed();
            string hash = String.Empty;
            byte[] crypto = crypt.ComputeHash(Encoding.ASCII.GetBytes(randomString));

            foreach (byte theByte in crypto)
            {
                hash += theByte.ToString("x2");
            }

            return hash;
        }
    }
}
