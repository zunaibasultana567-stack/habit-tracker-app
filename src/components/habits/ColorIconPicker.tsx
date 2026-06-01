import { Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import { COLOR_OPTIONS, ICON_OPTIONS } from '../../constants';

interface ColorIconPickerProps {
  selectedColor: string;
  selectedIcon: string;
  onColorChange: (hex: string) => void;
  onIconChange: (name: string) => void;
}

export function ColorIconPicker({
  selectedColor,
  selectedIcon,
  onColorChange,
  onIconChange,
}: ColorIconPickerProps) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</p>
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map(({ hex, label }) => (
            <button
              key={hex}
              type="button"
              aria-label={label}
              onClick={() => onColorChange(hex)}
              className="w-7 h-7 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
              style={{ backgroundColor: hex }}
            >
              {selectedColor === hex && <Check size={14} className="text-white" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon</p>
        <div className="flex flex-wrap gap-2">
          {ICON_OPTIONS.map(name => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (Icons as any)[name] as React.FC<{ size?: number; className?: string }>;
            if (!Icon) return null;
            return (
              <button
                key={name}
                type="button"
                aria-label={name}
                onClick={() => onIconChange(name)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  selectedIcon === name
                    ? 'text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                style={selectedIcon === name ? { backgroundColor: selectedColor } : {}}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
