import { Router } from 'express';
import { getHabitsByUser, createHabit, deleteHabit, createHabitLog, deleteHabitLog } from '../models/habitsModel.js';

const router = Router();

router.get('/habits/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const habits = await getHabitsByUser(id);
  res.send(habits);
});

router.post('/habit', async (req, res) => {
  try {
    const { id } = req.user;
    const input = req.body;
    if (input.description === '') {
      input.description = null;
    }
    const newHabit = await createHabit(input, id);
    const responseObj = {
      message: 'Success: new habit inserted into database',
      newHabit
    }
    res.status(201).send(responseObj);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.delete('/habit/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedHabit = await deleteHabit(id);
    const responseObj = {
      message: 'Success: habit deleted from database',
      deletedHabit
    }
    res.status(200).send(responseObj);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.post('/habit/log', async (req, res) => {
  try {
    const { habit_id } = req.body;
    const user_id = req.user.id;
    const newHabitLog = await createHabitLog(habit_id, user_id);
    const responseObj = {
      message: 'Success: new habit log inserted into database',
      newHabitLog
    }
    res.status(201).send(responseObj);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.delete('/habit/log/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedHabitLog = await deleteHabitLog(id);
    const responseObj = {
      message: 'Success: habit log deleted from database',
      deletedHabitLog
    }
    res.status(200).send(responseObj);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

export default router;