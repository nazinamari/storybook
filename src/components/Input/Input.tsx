import { useState } from 'react';

export interface InputProps {
  type?: 'text' | 'password' | 'number';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  clearable?: boolean;
  placeholder?: string;
}

export const Input = ({
  type = 'text',
  value,
  defaultValue,
  onChange,
  clearable,
  placeholder,
}: InputProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  // password toggle
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onChange?.('');
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        style={{ paddingRight: type === 'password' || clearable ? 30 : 8 }}
        type={inputType}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
      />

      {type === 'password' && (
        <button
          onClick={() => setShowPassword((s) => !s)}
          style={{
            position: 'absolute',
            right: clearable ? 30 : 8,
            top: 2,
            fontSize: 12,
          }}
        >
          👁
        </button>
      )}

      {clearable && currentValue && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: 5,
            top: 2,
            fontSize: 12,
          }}
        >
          ❌
        </button>
      )}
    </div>
  );
};
