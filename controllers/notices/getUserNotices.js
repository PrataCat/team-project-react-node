const { catchAsyncWrapper } = require("../../helpers");
const Notice = require("../../models/notice");

const getUserNotices = catchAsyncWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, perPage = 9 } = req.query;

  const skip = (page - 1) * perPage;

  const notices = await Notice.find({ owner }).skip(skip).limit(perPage);

  const totalNotices = notices.length;

  const totalPages = Math.ceil(totalNotices / perPage);

  const result = { totalPages, notices: notices.reverse() };

  res.status(200).json(result);
});

module.exports = getUserNotices;
