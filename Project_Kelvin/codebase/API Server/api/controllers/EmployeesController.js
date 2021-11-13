module.exports = {

  getEmployees: async (req, res) => {
    //const employees = await Employees.find({});
    return res.json({data: req.query.id, string: "dnsbagkfjfaks"});
  }

};

