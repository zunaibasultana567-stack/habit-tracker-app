import { useState } from 'react';
import type { Habit } from '../../types';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { ColorIconPicker } from './ColorIconPicker';
import { COLOR_OPTIONS, ICON_OPTIONS } from '../../constants';

interface HabitFormProps {
  initial?: Habit;
  onSubmit: (data: Omit<Habit, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function HabitForm({ initial, onSubmit, onCancel }: HabitFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [colorHex, setColorHex] = useState(initial?.colorHex ?? COLOR_OPTIONS[0].hex);
  const [iconName, setIconName] = useState(initial?.iconName ?? ICON_OPTIONS[0]);
  const [nameError, setNameError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError('Habit name is required');
      return;
    }
    if (trimmed.length > 60) {
      setNameError('Name must be 60 characters or less');
      return;
    }
    setNameError('');
    onSubmit({ name: trimmed, description: description.trim() || undefined, frequency: 'daily', colorHex, iconName });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Habit name"
        placeholder="e.g. Morning run"
        value={name}
        onChange={e => { setName(e.target.value); setNameError(''); }}
        error={nameError}
        maxLength={60}
        autoFocus
      />
      <Textarea
        label="Description (optional)"
        placeholder="What's this habit about?"
        value={description}
        onChange={e => setDescription(e.target.value)}
        maxLength={200}
      />
      <ColorIconPicker
        selectedColor={colorHex}
        selectedIcon={iconName}
        onColorChange={setColorHex}
        onIconChange={setIconName}
      />
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Save changes' : 'Add habit'}</Button>
      </div>
    </form>
  );
}
