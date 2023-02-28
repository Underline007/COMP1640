import User from '../models/User'
import { generateJWToken, verifyJWTToken } from '../helpers/token.helper'
import { bcryptHash, bcryptCompare } from '../helpers/bcrypt.helper'
import ApiErrorResponse from '../utils/ApiErrorResponse'
import { senVerification } from '../utils/mailer'

// @route POST /api/v1/auth/create -- create user account
export const createAccount = async (req: any, res: any, next: any) => {
  try {
    const { username, firstName, lastName, password, role, phone, birthday } = req.body

    const isUserExists = await User.findOne({ username: username.toLowerCase() })
    if (isUserExists) {
      next(new ApiErrorResponse('Username is taken', 400))
    }

    const passwordHash = await bcryptHash(password)
    const name = firstName + ' ' + lastName
    const newAccount = await new User({
      username,
      name,
      password: passwordHash,
      role,
      phone,
      birthday,
    }).save()

    res.status(200).json({ success: true, savedUser: newAccount })
  } catch (err) {
    next(new ApiErrorResponse(err))
  }
}

// @route POST /api/v1/auth/login
export const login = async (req: any, res: any, next: any) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username: username.toString() }).select('+password')
    if (!user) {
      return next(new ApiErrorResponse('Invalid username or password', 401))
    }
    const checkPassword = await bcryptCompare(password, user!.password)
    // const checkPassword = password === user.password
    if (!checkPassword) {
      return next(new ApiErrorResponse('Invalid username or password', 400))
    } else if (!user.isActivate) {
      await sendTokenResponse(user, 200, 'Account is not activated', res, next)
    } else await sendTokenResponse(user, 200, 'Login successfully', res, next)
  } catch (err) {
    next(new ApiErrorResponse(err))
  }
}

const sendTokenResponse = async (userData: any, statusCode: any, message: any, res: any, next: any) => {
  const payload = {
    user: {
      id: userData._id,
      username: userData.username,
      role: userData.role,
      isActive: userData.isActive,
    },
  }

  const cookieOptions = {
    expires: new Date(Date.now() + 169696),
    httpOnly: true,
  }

  const refreshToken = generateJWToken(payload, process.env.JWT_REFRESH_SECRET, '15d')
  const accessToken = generateJWToken(payload, process.env.JWT_ACCESS_SECRET, '30000s')

  setRefreshToken(refreshToken, userData, next)

  res
    .status(statusCode)
    .cookie('token', refreshToken, cookieOptions)
    .json({
      success: true,
      userMetaData: {
        username: userData.username,
        role: userData.role,
        name: userData.name,
        isActivate: userData.isActivate,
        birthday: userData.birthday || '',
        email: userData.email || 'None',
        image: userData.image || '',
        phone: userData.phone || '',
        description: userData.description || '',
        interests: userData.interests || [],
        isBanned: userData.isBanned || false,
      },
      message,
      accessToken: accessToken,
    })
}

const setRefreshToken = async (token: string, userData: any, next: any) => {
  try {
    await new User(userData).save()
  } catch (err) {
    next(new ApiErrorResponse(err))
  }
}

// @route POST /api/v1/auth/refreshToken -- call for refresh the access token
export const refreshToken = async (req: any, res: any, next: any) => {
  try {
    const refreshToken = await User.findOne({ _id: req.payload.user.id }).select('token')
    if (refreshToken) {
      const accessOption = {
        expriresIn: 300,
      }
      const decodedJWTToken = await verifyJWTToken(refreshToken, process.env.JWT_REFRESH_SECRET)
      if (decodedJWTToken) {
        const newAccessToken = await generateJWToken(decodedJWTToken, process.env.JWT_ACCESS_SECRET, accessOption)
        res.status(200).json({
          newAccessToken: newAccessToken,
        })
      }
    } else {
      return next(new ApiErrorResponse('The user is not authenticated.', 401))
    }
  } catch (error) {
    next(new ApiErrorResponse(error))
  }
}

// @route POST /api/v1/auth/sendVerificationEmail
export const sendVerificationEmail = async (req: any, res: any, next: any) => {
  try {
    const { id, isActivate, username } = req.payload.user
    const { email } = req.body
    if (isActivate) {
      return next(new ApiErrorResponse(`User ${id} is already activated`, 400))
    }

    const verificationToken = generateJWToken(
      {
        id: id,
      },
      process.env.JWT_FREQUENCY_SECRET,
      '30m'
    )
    const verificationUrl = `${process.env.BASE_URL}/verification/${verificationToken}`
    const isSent = await senVerification(email, username, verificationUrl)
    if (isSent == true) {
      res.status(200).json({
        success: isSent,
        message: `send email successfully`,
      })
    }
  } catch (error) {
    next(new ApiErrorResponse(error))
  }
}

// @route POST /api/v1/auth/activateAccount -- active the account via a url sent in the verification email
export const activateAccount = async (req: any, res: any, next: any) => {
  try {
    const validUser = req.payload.user.id
    const { token } = req.body
    const user = await verifyJWTToken(token, process.env.TOKEN_SECRET)
    const check = await User.findById(user)

    if (validUser !== user) {
      return next(new ApiErrorResponse("You don't have the authorization to complete this operation.", 403))
    }
    if (check.isActivate == true) {
      return next(new ApiErrorResponse('This email is already activated.', 400))
    } else {
      await User.findByIdAndUpdate(user, { isActivate: true })
      return res.status(200).json({
        success: true,
        message: 'Account has beeen activated successfully.',
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


