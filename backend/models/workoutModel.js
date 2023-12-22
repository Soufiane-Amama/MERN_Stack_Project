const mongoose = require('mongoose')

const Schema = mongoose.Schema

// نموذج لمخطط المستند الذي سيتم تخزينه في DB
const workoutSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    load: {
      type: Number,
      required: true
    },
    user_id: {
      type: String,
      required: true
    }
  }, { timestamps: true }) // خاصية timestamps عملها اضافة تلقائيا تاريخ الانشاء لكل مستند ومتى تم تحديث كل مستند.
  
  module.exports = mongoose.model('Workout', workoutSchema) // قمنا بتصدير النموذج الى المنغوس واعطيناه اسم Workout ليتم عمل مجموعة في DB بهذا الاسم.