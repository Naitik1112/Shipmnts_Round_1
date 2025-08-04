
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });
};

exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    sameSite: 'Lax', // Change 'None' to 'Lax'
    secure: false // False for HTTP (localhost)
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true; // Secure in production (HTTPS)
  } else {
    cookieOptions.secure = false; // Allow in localhost (HTTP)
  }

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token
  });
};

// createSendToken(newUser, 201, res);


exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in, Please login to get access', 400)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The User belonging to this token no longer exists', 401)
    );
  }

  req.user = currentUser;
  next();
});