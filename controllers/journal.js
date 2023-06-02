// journalController
const Journal = require('../models/journal.js');
const User = require('../models/user.js');
const { v2: cloudinary } = require('cloudinary');
const cloudinaryConfig = require('../middleware/cloudinary.config.js');


cloudinary.config(cloudinaryConfig)

export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find();
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getJournalsForOwner = async (req, res) => {
  const user_id = req.user._id
  try {
    const journals = await Journal.find({ user_id });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    res.json(journal);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getStandardJournals = async (req, res) => {
  try {
    const isPremium = false
    const journals = await Journal.find({ isPremium })
    res.json(journals)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createJournal = async (req, res) => {
  const user_id = req.user._id
  // console.log(req.file)
  const pdfUploaded = new Journal({
    title: req.body.title,
    author: req.body.author,
    pdf: req.file.path,
    user_id,
    file_id: req.file.filename,
    isPremium: req.body.isPremium
  })

  try {
    await pdfUploaded.save()
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({
      message: `pdf upload failed, check to see the ${error}`,
      status: error,
      success: false
    })
  }
};


export const deleteJournal = async (req, res) => {
  try {
    const journalId = req.params.id;

    const journal = await Journal.findById(journalId);

    const fileId = journal.file_id

    // hapus file dari cloudinary
    await cloudinary.uploader.destroy(fileId);

    const deletedJournal = await Journal.deleteOne({ _id: journalId });
    res.status(200).json(deletedJournal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}