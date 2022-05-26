using ResourceApp.Models;

namespace ResourceApp.Mocks
{
    public class ExampleUserTimeline
    {
        public static readonly List<UserTimeline> UserTimeline = new List<UserTimeline>
        {
            new UserTimeline("36ae70c2-d3dd-4aab-9c3f-2af94bd096ba", new List<string>(){"Witaj"}),
            new UserTimeline("88dd7ec9-1cff-4994-873b-99f6feaa3b91", new List<string>(){"Zapraszamy"}),
            new UserTimeline("71ff24ef-7472-47ba-af39-89980409e3a3", new List<string>(){"Polecam"}),
            new UserTimeline("2ada51c5-14c5-4dca-8f99-15a174853fe1", new List<string>(){"Co tam"})
        };
    }
}
