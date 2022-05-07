using System.Text.Json.Serialization;

namespace AuthorizationServer.Common
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ScopeEnum
    {
        Photos 
    }
}
