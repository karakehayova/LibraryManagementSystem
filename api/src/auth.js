import jwt from 'jsonwebtoken';

export const adminRoute = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'unauthorized' });
  }
  // removing 'Bearer ' from the token and verifying it.
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'unauthorized' });
    // return next(); //if no token, continue
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.admin === 0) {
      return res.status(401).send({ message: 'unauthorized' });
    }

    req.user = user; // set the user to req so other routes can use it
    return next();
  } catch (e) {
    return res.status(401).send({ message: 'unauthorized' });
  }
};

export const userRoute = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'unauthorized' });
  }
  // removing 'Bearer ' from the token and verifying it.
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'unauthorized' });
    // return next(); //if no token, continue
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user; // set the user to req so other routes can use it
    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).send({ message: 'unauthorized' });
  }
};
