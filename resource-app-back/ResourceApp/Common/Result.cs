namespace ResourceApp.Common
{
    public class Result
    {
        public bool IsSuccess { get; }
        public string Error { get; private set; }
        public bool IsFailure => !IsSuccess;

        protected Result(bool success, string error)
        {
            if (success && !String.IsNullOrEmpty(error))
            {
                throw new InvalidOperationException();
            }
            if (!success && String.IsNullOrEmpty(error))
            {
                throw new InvalidOperationException();
            }

            IsSuccess = success;
            Error = error;
        }

        public static Result Fail(string message)
        {
            return new Result(false, message);
        }
        public static Result<T> Fail<T>(string message)
        {
            return new Result<T>(default(T), false, message);
        }
        public static Result Success()
        {
            return new Result(true, string.Empty);
        }
        public static Result<T> Success<T>(T value)
        {
            return new Result<T>(value, true, string.Empty);
        }

        public Result<T> Cast<T>()
          => new Result<T>(default(T), IsSuccess, Error);
    }
}

