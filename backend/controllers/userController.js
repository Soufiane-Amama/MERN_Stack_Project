const User = require('../models/userModel')
// نستخدم  JSON Web Tokens لانشاء رمز مميز للمستخدمين وبناء عليه يتم المصادقة عليهم من قبل الخادم للوصول الى موارد في قاعدة البيانات - سيكزون مثل مفتاح امان اضافي.
const jwt = require('jsonwebtoken')


const createToken = (_id) => { // الوظيفة التي ستقوم بانشاء رمز مميز لكل مسنخدم يقوم بالتسجيل و تسجيل الدخول للمصادقة عليه 
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' }) // انشاء رمز سري مميز - الوسيطة الثالثة قمنا بتحديد الخيار ثلاثة d وهي نهاية صلاحية الرمز ستكون لمدة ثلاثة ايام ويمكنك تغيير الرقم بحيث اذا مرت 3 ايام وهو مسجل بالموقع ولم يزره يتم الخروج منه تلقائيا ولن يتم المصادقة على الرمز بسبب انتهاء صلاحيته
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password) // استخدمنا الدالة ثابتة الموجودة في ملف userModel.js

        // create a token
        const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) { // هنا سنكتشف اي خطا من دالة ثابتة تم ارساله من throw ونرسله كرد
    res.status(400).json({error: error.message})
  }
}


module.exports = { signupUser, loginUser }