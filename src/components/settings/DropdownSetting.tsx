import { Combobox } from '@/components/ui/combobox'
import type { ComboboxOption } from '@/components/ui/combobox'

type DropdownSettingProps<T extends string> = {
  value: T
  setValue: (value: T) => void
  optionName: string
  options: ComboboxOption[]
  className?: string
  ariaLabel?: string
}

export function DropdownSetting<T extends string>({
  value,
  setValue,
  optionName,
  options,
  className,
  ariaLabel
}: DropdownSettingProps<T>) {
  return (
    <Combobox
      value={value}
      setValue={setValue}
      optionName={optionName}
      options={options}
      className={className}
      ariaLabel={ariaLabel}
    />
  )
}

