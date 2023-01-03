const Note = require('../models/note');
const { ERROR_CODES } = require('../utils/errors');

const returnDefaultError = (res) => res.status(ERROR_CODES.DefaultError).send({ message: 'An error has occurred on the server.' });

module.exports.getNotes = (req, res) => {
  Note.find({ owner: req.user._id })
    .then(notes => res.send(notes))
    .catch(() => returnDefaultError(res));
}

module.exports.patchNote = (req, res) => {
  const { title, body } = req.body;
  Note.findOneAndUpdate({ title }, {
    title, body
  }, {new: true, runValidators: true })
    .orFail()
    .then(note => res.send(note))
    .catch(() => returnDefaultError(res));
}

module.exports.deleteNote = (req, res) => {
  const { title } = req.body;
  Note.findOne({ title })
    .orFail()
    .then(note => {
      if (note.owner === req.user._id) {
        return note.remove(() => res.send(note))
      }
      return res.status(ERROR_CODES.PermissionsError).send({ message: 'Insufficient permissions to delete the requested note'})
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') return res.status(ERROR_CODES.BadRequest).send({ message: 'There was an error with the delete request' });
      if (err.name === 'DocumentNotFoundError') return res.status(ERROR_CODES.NotFound).send({ message: 'Item not found' });
      return returnDefaultError(res);
    });
}