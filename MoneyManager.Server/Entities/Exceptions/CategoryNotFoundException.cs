namespace MoneyManager.Server.Entities.Exceptions
{
    public class CategoryNotFoundException : NotFoundException
    {
        public CategoryNotFoundException(Guid id) 
            : base($"The category with id: {id} doesn't exist in the database.")
        {
        }

        public CategoryNotFoundException(int type) 
            : base($"The category with type: {type} doesn't exist in the database.")
        {
        }
    }
}
