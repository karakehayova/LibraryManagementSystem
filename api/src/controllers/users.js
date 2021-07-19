const db = require('../models');

export const getUsers = async (req, res) => {
  try {
    const users = await db.users.findAll();
    return res.send(users);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await db.users.findByPk(Number(userId), {
      include: [{
        model: db.user_books,
        as: 'user_books',
        include: {
          model: db.books,
          as: 'books',
        },
      },
      {
        model: db.user_subscriptions,
        as: 'subscriptions',
      }
    ],
    });

    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }

    return res.send(user);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;

  // we don't want to update passwords here
  delete req.body.id;
  delete req.body.password;
  delete req.body.salt;

  try {
    const [, affectedRows] = await db.users.update(
      req.body,
      {
        where: {
          id: Number(userId),
        },
        returning: true,
      },
    );

    if (affectedRows === 0) {
      return res.status(404).send({ message: 'user not found' });
    }
    return res.send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const affectedRows = await db.users.destroy({
      where: {
        id: Number(userId),
      },
      returning: true,
    });

    if (affectedRows === 0) {
      return res.status(404).send({ message: 'user not found' });
    }
    return res.send({});
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.errors ?? { message: 'unexpected error' });
  }
};
