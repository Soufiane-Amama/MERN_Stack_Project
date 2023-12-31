const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// لتحقق من بيانات التسجيل استخدمنا حزمة validator بدلا من القيام بالكثير من regex للتحقق من البريد وكلمة المرور
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})


// static signup method
userSchema.statics.signup = async function(email, password) { // لم استخدم الوظيفة السهمية بسبب ان this لا تشتغل فيها 

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) { // للتحقق اذا كان البريد صالح
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) { // للتحقق اذا كانت كلمة المرور قوية - تحتوي على ارقام وحروف صغيرة وكبيرة ورموز
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email }) // التحقق من وجود الايميل في قاعدة البيانات 
  // كان بامكاننا عمل  User.findOne({ email }) لكن في الوقت الذي اكتب فيه هذا الكود لم يتم عمل مجموعة باسم User في قاعدة البيانات لحفظ المستخدمين لذلك استخدمنا this وايضا لانها تشير الى هذا النموذج المتواجدين فيه حاليا والذي يتم تصديره.

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10) // ما يسمى ملح وهي طبقة امان زيادة يتم تخزين فيها مجموعة من الارقام والاحرف العشوائية .لنستعملها بجانب كلمة المرور لتجزئتهم معا لتجنب تشابه كلمات المرور
  const passwordHash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: passwordHash })

  return user
}


// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email }) // find user
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password) // تجزئة كلمة المرور ومقارنتها - الجواب سيكون true او false
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}


module.exports = mongoose.model('User', userSchema)