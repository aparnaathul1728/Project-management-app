const Project = require('../models/project');
const User = require('../models/user');

exports.createProject = async (req, res) => {
  try {
    const { name, department, startDate, endDate, status } = req.body;
    const project = await Project.create({ name, department, startDate, endDate, status });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, { include: User });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const filters = req.query;
    const projects = await Project.findAll({ where: filters, include: User });
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, department, startDate, endDate, status } = req.body;
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    project.name = name || project.name;
    project.department = department || project.department;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;
    project.status = status || project.status;
    
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    await project.destroy();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
