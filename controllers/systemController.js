const healthCheck = async (req, res) => {
  try {
    return res.status(200).json({
      status: 'Success',
      message: 'Application passed health check',
      isSuccess: true,
      data: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'Failed',
      message: 'Application failed health check',
      isSuccess: false,
      data: null,
    });
  }
};

function onLost(req, res, next) {
  return res.status(404).json({
    status: 'Failed',
    message: 'API not found',
    isSuccess: false,
    data: null,
  });
}

module.exports = { healthCheck, onLost };
