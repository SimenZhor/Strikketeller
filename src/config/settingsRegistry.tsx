import type { Settings } from '@/contexts/SettingsContext'
import { ToggleSetting } from '@/components/settings/ToggleSetting'
import { DropdownSetting } from '@/components/settings/DropdownSetting'
import { Sun, Moon, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export type AbstractSettingConfig = {
  type: string
  key: keyof Settings
  labelKey?: string // Optional, defaults to key if not provided
  order?: number
}

type ToggleSettingConfig = AbstractSettingConfig & {
  type: 'toggle'
  options: Record<string, { icon?: LucideIcon; label?: string }>
}

type DropdownSettingConfig = AbstractSettingConfig & {
  type: 'dropdown'
  options: Array<{ value: string; label: string }>
}

type CustomSettingConfig = AbstractSettingConfig & {
  type: 'custom'
  renderControl: (value: any, onChange: (value: any) => void) => ReactNode
}

export type SettingConfig = ToggleSettingConfig | DropdownSettingConfig | CustomSettingConfig

export const settingsRegistry: SettingConfig[] = [
  {
    type: 'toggle',
    key: 'mode',
    options: {
      light: { icon: Sun },
      dark: { icon: Moon }
    },
    order: 1
  },
  {
    type: 'dropdown',
    key: 'language',
    options: [
      { value: 'nb-NO', label: 'Norsk' },
      { value: 'en-US', label: 'English' }
    ],
    order: 2
  },
  {
    type: 'dropdown',
    key: 'theme',
    options: [
      { value: 'default', label: 'Default' },
      { value: 'sunset', label: 'Sunset' },
      { value: 'blue', label: 'Blue' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' }
    ],
    order: 3
  }
]

// Helper function to get label key, defaulting to the setting key
export function getLabel(config: AbstractSettingConfig): string {
  return config.labelKey ?? config.key
}

// Helper function to sort settings by order
export function sortSettingsByOrder<T extends AbstractSettingConfig>(settings: T[]): T[] {
  return [...settings].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}

// Helper function to create onChange handler for a setting
export function createSettingChangeHandler<K extends keyof Settings>(
  key: K,
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
): (value: Settings[K]) => void {
  return (value: Settings[K]) => setSetting(key, value)
}

// Helper function to render a setting control based on its config
export function renderSettingControl(
  config: SettingConfig,
  value: any,
  onChange: (value: any) => void
): ReactNode {
  switch (config.type) {
    case 'toggle':
      return (
        <ToggleSetting
          value={value}
          onChange={onChange}
          options={config.options}
        />
      )
    case 'dropdown':
      return (
        <DropdownSetting
          value={value}
          setValue={onChange}
          optionName={getLabel(config)}
          options={config.options}
        />
      )
    case 'custom':
      return config.renderControl(value, onChange)
  }
}

