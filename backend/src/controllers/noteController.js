import prisma from '../lib/prisma.js';

export const getAllNotes = async (req, res) => {
  const userId = req.user.id;
  const notes = await prisma.note.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });
  res.json(notes);
};

export const getNoteById = async (req, res) => {
  const note = await prisma.note.findUnique({
    where: { id: req.params.id },
  });
  res.json(note);
};

export const createNote = async (req, res) => {
  const userId = req.user.id;
  const note = await prisma.note.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      userId,
    },
  });
  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const note = await prisma.note.update({
    where: { id: req.params.id },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.json(note);
};

export const deleteNote = async (req, res) => {
  await prisma.note.delete({
    where: { id: req.params.id },
  });
  res.status(204).send();
};
