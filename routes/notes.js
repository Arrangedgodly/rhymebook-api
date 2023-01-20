const router = require("express").Router();
const {
  getNotes,
  createNote,
  getNote,
  deleteNote,
  patchNote,
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
      title: Joi.string(),
      body: Joi.string(),
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
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  auth,
  deleteNote
);

module.exports = router;
