const router = require("express").Router();
const {
  getNotes,
  createNote,
  getNote,
  deleteNote,
  patchNote,
  addNoteTag,
  deleteNoteTag,
  postNotePin,
  deleteNotePin,
} = require("../controllers/notes");
const auth = require("../middlewares/auth");
const { celebrate, Joi, Segments } = require("celebrate");

router.get(
  "/",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
  }),
  auth,
  getNotes
);
router.post(
  "/",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
  }),
  auth,
  createNote
);
router.get(
  "/:_id",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  auth,
  getNote
);
router.patch(
  "/:_id",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().empty(""),
      body: Joi.string(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  auth,
  patchNote
);
router.delete(
  "/:_id",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  auth,
  deleteNote
);
router.post(
  "/:_id/tags",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      tag: Joi.object().keys({
        name: Joi.string().required(),
        color: Joi.string().required(),
      }),
    }),
  }),
  auth,
  addNoteTag
);
router.delete(
  "/:_id/tags/:tag",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required(),
      tag: Joi.string().required(),
    }),
  }),
  auth,
  deleteNoteTag
);
router.post(
  "/:_id/pin",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  auth,
  postNotePin
);
router.delete(
  "/:_id/pin",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  auth,
  deleteNotePin
);

module.exports = router;
