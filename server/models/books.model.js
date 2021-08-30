const db = require("../config/dbconfig");
const { NotFoundError } = require("../helpers/utility");

// constructor
const Book = function (book) {
  this.id = book.id;
  this.title = book.title;
  this.author = book.author;
  this.category = book.category;
  this.category_id = book.category_id;
  this.cover = book.cover;
  this.description = book.description;
  this.isbn = book.isbn;
  this.pages = book.pages;
  this.website = book.website;
};

Book.create = async (newBook) => {
  try {
    let insert = await db.insert({
      operation: "insert",
      schema: "bookstall",
      table: "books",
      records: [newBook],
    });
    if (insert.statusCode === 200) {
      console.log(insert);
      newBook.id = insert.data.inserted_hashes[0];
      return newBook;
    } else {
      throw new Error(insert);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

Book.bulkCreate = async (books) => {
  try {
    let insert = await db.insert({
      operation: "insert",
      schema: "bookstall",
      table: "books",
      records: books,
    });
    if (insert.statusCode === 200) {
      return books;
    } else {
      throw new Error(insert);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

Book.findBy = async (
  field,
  data,
  sortBy = "__createdtime__",
  sortOrder = "desc",
  limit = 100
) => {
  let query = `SELECT * FROM bookstall.books WHERE ${field} = '${data}'`;
  query += ` order by ${sortBy} ${sortOrder}`;
  query += ` limit ${limit}`;

  console.log(query);

  try {
    const { data } = await db.query(query);
    console.log(data.length);
    if (data.length) {
      return data;
    } else {
      throw new NotFoundError("User does not exist");
    }
  } catch (err) {
    throw err;
  }
};

Book.find = async (
  title,
  categories,
  author,
  sortBy = "b.__createdtime__",
  sortOrder = "desc",
  limit = 100
) => {
  try {
    //let selectQuery = "select * from bookstall.books as b";
    let selectQuery = `select b.id, b.cover, b.title, b.author, c.name category, c.id category_id, avg(r.rating) rating, b.__createdtime__ createdtime 
      from bookstall.books b join bookstall.categories c on b.category_id=c.id 
      left outer join bookstall.ratings r on b.id=r.book_id`;

    if (title) {
      selectQuery += ` where b.title like '%${title}%'`;
    } else if (categories) {
      selectQuery += ` where b.category_id in (${categories
        .split(",")
        .map((c) => `'${c}'`)
        .join(",")})`;
    } else if (author) {
      selectQuery += ` where b.author='${author}'`;
    }

    selectQuery += ` group by b.id, c.name, b.cover, b.title, b.author, c.id, b.__createdtime__`;
    selectQuery += ` order by ${sortBy} ${sortOrder}`;
    selectQuery += ` limit ${limit}`;

    console.log(selectQuery);

    const { data } = await db.query(selectQuery);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

Book.getBookCountByCategory = async () => {
  try {
    const query = `select c.name, count(c.id) book_count, c.id from bookstall.categories c 
    join bookstall.books b on c.id = b.category_id group by c.name, c.id
    order by book_count desc`;
    const { data } = await db.query(query);
    return data;
  } catch (err) {
    throw err;
  }
};

Book.getBookCountByAuthor = async () => {
  try {
    const query = `select author, count(author) book_count from bookstall.books 
      group by author order by book_count desc`;
    const { data } = await db.query(query);
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = Book;
