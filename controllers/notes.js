const Note = require("../models/note");
const PermissionsError = require("../errors/permissions-err");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");

module.exports.getNotes = (req, res, next) => {
  Note.find({ owner: req.user._id })
    .orFail(() => {
      return next(new NotFoundError('There were no notes found for the requested user'))
    })
    .then((notes) => res.send(notes))
    .catch(next);
};

module.exports.createNote = (req, res, next) => {
  Note.create({ owner: req.user._id })
    .then((note) => {
      if (!note) {
        return next(new BadRequestError('There was an error creating the new note'))
      }
      return res.send(note)
    })
    .catch(next);
};

module.exports.getNote = (req, res, next) => {
  const { _id } = req.params;
  Note.findById({ _id })
    .orFail(() => {
      return next(new NotFoundError('The requested note was not found'))
    })
    .then((note) => {
      if (note.owner.equals(req.user._id)) {
        return res.send(note)
      }
      return next(new PermissionsError('You require ownership permissions to access this note'))
    })
    .catch(next);
};

module.exports.patchNote = (req, res, next) => {
  const { title, body } = req.body;
  const { _id } = req.params;
  Note.findOne(
    { _id }
  )
    .then((note) => {
      if (note.owner.equals(req.user._id)) {
        Note.findOneAndUpdate(
          { _id },
          { title, body },
          { new: true, runValidators: true }
        ).then(updatedNote => {return res.send(updatedNote)})
      } else {
        return next(new PermissionsError('You require ownership permissions to edit this note'))
      }
    })
    .catch(next);
};

module.exports.addNoteTag = (req, res, next) => {
  const { tag } = req.body;
  const { _id } = req.params;
  Note.findByIdAndUpdate(
    { _id },
    { $push: { tags: tag } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((note) => res.send(note))
    .catch(next);
};

module.exports.deleteNoteTag = (req, res, next) => {
  const { _id, tag } = req.params;
  Note.findByIdAndUpdate(
    { _id },
    { $pull: { tags: { _id: tag } } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((note) => res.send(note))
    .catch(next);
};

module.exports.deleteNote = (req, res, next) => {
  const { _id } = req.params;
  Note.findById({ _id })
    .orFail()
    .then((note) => {
      if (note.owner.equals(req.user._id)) {
        return note.remove(() => res.send(note));
      }
      return next(new PermissionsError("Insufficient permissions to delete the requested note"));
    })
    .catch(next);
};
