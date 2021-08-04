const router = require("express").Router();
const users = require("../../models/users");
const notesCollection = require("../../models/notes");

/*get all profiles */
router.route("/profile/get").get(async (req, res) => {
  const result = await users.find({});

  res.json({ messege: "all users founded", data: result });
});

router.route("/profile/get/:id").get(async (req, res) => {
  const { id } = req.params;

  const result = await users.findOne({ _id: id });

  res.json({ messege: "user founded", data: result });
});

/**create a profile */
router.route("/profile/post").post(async (req, res) => {
  let { name, email, phoneNumber, time, date, birthPlace, chartType, relation, favorite } =
    req.body;
  favorite = favorite || false;
  chartType = chartType || "Netal";
  const user = await users.create({
    name,
    email,
    phoneNumber,
    time,
    date,
    birthPlace,
    chartType,
    relation,
    favorite,
  });
  user.save();
  res.json({ messege: "user saved sucessfully", data: user });
});

/**update profile */
router.route("/profile/update/:id").post(async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  if (id == "undefined") return res.json({ messege: "no users found", data: [] });
  const user1 = await users.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true });
  // user.save();
  res.json({ messege: "user updated sucessfully", data: user1 });
});
/**delete profile */
router.route("/profile/delete/:id").post(async (req, res) => {
  const { id } = req.params;

  const user = await users.findByIdAndDelete(id);

  res.json({ messege: "user deleted sucessfully", data: user });
});

/**filtering users by using tags*/
router.route("/profile/filter").post(async (req, res) => {
  const user = await users.find({ ...req.body });
  res.json({ messege: "users found", data: user });
});

/*create notes by particular user by passing id */
router.route("/profile/notes/:id").post(async (req, res) => {
  const { id } = req.params;
  const note = await notesCollection.create({ id, ...req.body });
  note.save();
  res.json({ messege: "notes saved", data: note });
});

/*Get all notes by passing id */
router.route("/profile/allnotes/:id").post(async (req, res) => {
  const { id } = req.params;
  const note = await notesCollection.find({ id: id, order: [["createdAt", "DESC"]] });
  const note1 = note.map((i) => i);
  res.json({ messege: "All notes", data: note1 });
});

/*Update notes */
router.route("/profile/notes/edit/:id").post(async (req, res) => {
  const { id } = req.params;
  const note = await notesCollection.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true });
  res.json({ messege: "notes updated", data: note });
});

/* Delete Notes */
router.route("/profile/notes/delete/:id").post(async (req, res) => {
  const { id } = req.params;
  const note = await notesCollection.findByIdAndDelete({ _id: id });
  res.json({ messege: "notes deleted", data: note });
});

router.route("/profile/search").get(async (req, res) => {
  console.log("called");
  let data = await users.find({}).lean();
  let names = data.map((i) => i.name);
  res.json({ messege: `fouded users is ${data.length}`, data: names });
});

module.exports = router;
