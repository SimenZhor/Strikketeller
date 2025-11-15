import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

type ToggleOptionConfig = {
  icon?: LucideIcon
  label?: string
}

type ToggleSettingProps<T extends string> = {
  value: T
  onChange: (value: T) => void
  options: Record<T, ToggleOptionConfig>
  className?: string
  ariaLabel?: string
}

export function ToggleSetting<T extends string>({
  value,
  onChange,
  options,
  className,
  ariaLabel
}: ToggleSettingProps<T>) {
  const currentOption = options[value]
  const Icon = currentOption?.icon

  // Get the next value (toggle between available options)
  const toggleValue = () => {
    const optionKeys = Object.keys(options) as T[]
    const currentIndex = optionKeys.indexOf(value)
    const nextIndex = (currentIndex + 1) % optionKeys.length
    onChange(optionKeys[nextIndex])
  }

  return (
    <Button
      variant="outline"
      onClick={toggleValue}
      className={cn("text-sm", className)}
      aria-label={ariaLabel}
    >
      {Icon && <Icon className="size-4" />}
      {currentOption?.label && <span className="ml-2">{currentOption.label}</span>}
    </Button>
  )
}

