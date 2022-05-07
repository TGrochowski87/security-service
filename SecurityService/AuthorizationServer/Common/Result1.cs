namespace AuthorizationServer.Common
{
    public class Result<T> : Result
    {
        public T Value { get; private set; }

        protected internal Result(T value, bool success, string error)
          : base(success, error)
        {
            Value = value;
        }

        public static implicit operator Result<T>(T value) => Result.Success(value);
    }
}
