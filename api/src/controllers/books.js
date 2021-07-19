import { Op } from 'sequelize';
import Joi from 'joi';

const db = require('../models');

export const saveBook = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      author: Joi.string().required(),
      subject: Joi.string().required(),
      genre: Joi.string().required(),
      publisher: Joi.string().required(),
      url: Joi.string().required(),
      edition: Joi.number().integer().required(),
      shelf_id: Joi.number().integer().required(),
      row: Joi.number().integer().required(),
      column: Joi.number().integer().required(),
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).send(validation.error)
    }

    await db.books.create({
      ...req.body,
      ...{
        borrowed: false,
      },
    });
    return res.status(201).send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const getBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await db.books.findByPk(Number(bookId), {
      include: {
        model: db.books_likes_dislikes,
        as: 'books_likes_dislikes',
      },
    });

    if (!book) {
      return res.status(404).send({ message: 'book not found' });
    }

    return res.send(book);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await db.books.findAll({});

    return res.send(books);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const updateBook = async (req, res) => {
  const { bookId } = req.params;

  delete req.body.id;

  try {
    const [, affectedRows] = await db.books.update(
      req.body,
      {
        where: { id: Number(bookId) },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      return res.status(404).send({ message: 'book not found' });
    }
    return res.send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const affectedRows = await db.books.destroy({
      where: { id: Number(bookId) },
      returning: true,
    });

    if (affectedRows === 0) {
      return res.status(404).send({ message: 'book not found' });
    }
    return res.send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const borrowBook = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.params;

  try {
    const alreadyBorrowed = await db.books.findOne({
      where: {
        borrowed: { [Op.is]: true },
        id: Number(bookId),
      },
    });

    if (alreadyBorrowed) {
      return res.status(400).send({ message: 'book is already borrowed' });
    }

    await db.user_books.create({
      user_id: userId,
      book_id: bookId,
      borrow_date: new Date(),
    });

    await db.books.update(
      { borrowed: true },
      {
        where: {
          id: Number(bookId),
        },
      },
    );

    return res.send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const returnBook = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.params;

  try {
    const alreadyBorrowed = await db.books.findOne({
      where: {
        borrowed: { [Op.is]: true },
        id: Number(bookId),
      },
    });

    if (!alreadyBorrowed) {
      return res.status(400).send({ message: 'book is not borrowed' });
    }

    await db.books.update(
      { return_date: new Date() },
      {
        where: {
          user_id: Number(userId),
          book_id: Number(bookId),
        },
      },
    );

    await db.books.update(
      { borrowed: false },
      {
        where: {
          id: Number(bookId),
        },
      },
    );
    return res.send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const likeBook = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.params;
  try {
    await db.books_likes_dislikes.upsert({
      book_id: bookId,
      user_id: userId,
      action: 'like',
    });

    return res.send({});
  } catch (e) {
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const dislikeBook = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.params;

  try {
    await db.books_likes_dislikes.upsert({
      book_id: bookId,
      user_id: userId,
      action: 'dislike',
    });

    return res.send({});
  } catch (e) {
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const resetBookRating = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.params;

  try {
    await db.books_likes_dislikes.destroy({
      where: {
        book_id: bookId,
        user_id: userId,
      },
      returning: true,
    });
  
    return res.send({});
  } catch (e) {
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
  
};