import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.doctor = req.doctor._id;
  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
  }


  const existeUsuario = await Doctor.findOne({ nombre, apellido });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
};



const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find()
    .where("doctor")
    .equals(req.doctor);

  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (paciente.doctor._id.toString() !== req.doctor._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (paciente.doctor._id.toString() !== req.doctor._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  // Actualizar Paciente
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.apellido = req.body.apellido || paciente.apellido;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.telefono = req.body.telefono || paciente.telefono;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (paciente.doctor._id.toString() !== req.doctor._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  try {
    await paciente.deleteOne();
    res.json({ msg: "Paciente Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
