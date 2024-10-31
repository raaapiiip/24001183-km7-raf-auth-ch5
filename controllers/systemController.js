const healthCheck = async (req, res) => {
  try {
    res.status(200).json({
      status: 'Success',
      message: 'Application passed healthcheck',
      isSuccess: true,
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Application failed pass healthcheck',
      isSuccess: false,
      data: null,
    });
  }
};

function onLost(req, res, next) {
  res.status(404).json({
    status: 'Failed',
    message: 'API is not found',
    isSuccess: false,
    data: null,
  });
}

module.exports = { healthCheck, onLost };
