const mongoose = require('mongoose');

const JournalSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  pdf: {
    type: String,
    required: true
  },
  user_id: {
    type: String
  },
  file_id: {
    type: String
  },
  isPremium: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

const Journal = mongoose.model('Journal', JournalSchema);

export default Journal;