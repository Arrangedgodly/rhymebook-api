const router = require("express").Router();
const {
  getCurrentUser,
  patchCurrentUser,
  patchPreferences,
  patchInfo,
} = require("../controllers/users");
const auth = require("../middlewares/auth");
const { celebrate, Joi, Segments } = require("celebrate");

router.get(
  "/me",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
  }),
  auth,
  getCurrentUser
);
router.patch(
  "/me",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      avatar: Joi.string().required(),
    }),
  }),
  auth,
  patchCurrentUser
);
router.patch(
  "/me/pref",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    [Segments.BODY]: Joi.object().keys({
      preferences: Joi.object().keys({
        rhy: Joi.boolean(),
        sdl: Joi.boolean(),
        adj: Joi.boolean(),
        noun: Joi.boolean(),
        rlwd: Joi.boolean(),
        syn: Joi.boolean(),
        ant: Joi.boolean(),
        fqfl: Joi.boolean(),
        engine: Joi.string().valid("topic", "ml").required(),
        max: Joi.number().min(5).max(45),
      }),
    }),
  }),
  auth,
  patchPreferences
);
router.patch(
  "/me/info",
  celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .options({ allowUnknown: true }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      avatar: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  }),
  auth,
  patchInfo
);

module.exports = router;
