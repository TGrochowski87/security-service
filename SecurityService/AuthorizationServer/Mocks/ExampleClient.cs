using AuthorizationServer.Common;
using AuthorizationServer.Models;

namespace AuthorizationServer
{
    public class ExampleClient
    {
        public static readonly List<Client> Clients = new List<Client>
        {
            new Client("4a94380e-5c20-40ac-af63-00aea75aa1c2","af1287b7-659a-4458-b34a-8f8c754327b3","Testowa aplikacja 1", new List<ScopeEnum>(){ScopeEnum.Friends}),
            new Client("66a538e1456f4bc39be4876b3c2483ca","fbc8b5cb-31e7-4586-a4a9-59312a354607","Testowa aplikacja 2",new List<ScopeEnum>(){ScopeEnum.Photos}),
            new Client("39a3e57f-e2f0-472d-abc9-f163801ea58d","4b1f7592-5988-4b82-ac39-ca64a9aba82a","Testowa aplikacja 3", new List<ScopeEnum>(){ScopeEnum.Timeline}),
            new Client("e88c9d3e-d8c4-4d1c-a00d-795690a85632","ae4055d0-e98b-44cd-b89d-d1603d15a25e","Testowa aplikacja 4", new List<ScopeEnum>(){ScopeEnum.Friends, ScopeEnum.Photos, ScopeEnum.Timeline})
        };
    }
}
