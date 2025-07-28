##API documentation

GET /api/books
Fetches a paginated and sortable list of books.

##Query parameters

${page} - Fetches which page of results to return
          Default is 1

${pageSize} - Limits how many books appear per page
              Default is 3

${sortBy} - Sorts books based on this field like title,author,publication year, genre
            Default is title

${sortOrder} - Ascending or descending order
               Default is ascending



http://localhost:5000/api/books?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}

##Example

1.Get page 1 with 5 books sorted by title in ascending order:

GET /api/books?page=1&page_size=5&sort_by=title&sort_order=asc

2.Get page 3 with 10 books sorted by publication year in descending order:

GET /api/books?page=3&page_size=10&sort_by=publicationYear&sort_order=desc

3.Get first page, 5 books per page, sorted by title ascending

GET /api/books?page=1&page_size=5&sort_by=title&sort_order=asc