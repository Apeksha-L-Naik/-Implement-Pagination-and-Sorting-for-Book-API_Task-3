const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const {
      page = 1,
      page_size = 10,
      sort_by = 'title',
      sort_order = 'asc',
    } = req.query;

    const pageNum = parseInt(page);
    const pageSize = parseInt(page_size);

    if (isNaN(pageNum) || pageNum <= 0) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    if (isNaN(pageSize) || pageSize <= 0 || pageSize > 100) {
      return res.status(400).json({ error: 'Invalid page size' });
    }

    const validSortFields = ['title', 'author', 'publicationYear', 'genre'];
    if (!validSortFields.includes(sort_by)) {
      return res.status(400).json({ error: 'Invalid sort_by field' });
    }

    const sortOrder = sort_order === 'desc' ? -1 : 1;

    const books = await Book.find()
      .sort({ [sort_by]: sortOrder })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);

    const totalBooks = await Book.countDocuments();

    res.json({
      currentPage: pageNum,
      pageSize,
      totalBooks,
      totalPages: Math.ceil(totalBooks / pageSize),
      books,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
