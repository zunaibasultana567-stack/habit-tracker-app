import type { Habit } from '../../types';
import { Modal } from '../ui/Modal';
import { HabitForm } from './HabitForm';
import { useHabitContext } from '../../context/HabitContext';
import { getTodayString } from '../../utils/dateUtils';

interface HabitFormModalProps {
  open: boolean;
  onClose: () => void;
  habitToEdit?: Habit;
}

export function HabitFormModal({ open, onClose, habitToEdit }: HabitFormModalProps) {
  const { dispatch } = useHabitContext();

  function handleSubmit(data: Omit<Habit, 'id' | 'createdAt'>) {
    if (habitToEdit) {
      dispatch({ type: 'EDIT_HABIT', payload: { ...habitToEdit, ...data } });
    } else {
      dispatch({
        type: 'ADD_HABIT',
        payload: {
          ...data,
          id: crypto.randomUUID(),
          createdAt: getTodayString(),
        },
      });
    }
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={habitToEdit ? 'Edit habit' : 'New habit'}
    >
      <HabitForm
        initial={habitToEdit}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
