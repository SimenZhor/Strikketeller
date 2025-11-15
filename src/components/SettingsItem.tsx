import { useTranslation } from 'react-i18next'
import { renderSettingControl, settingsRegistry, getLabel, sortSettingsByOrder, createSettingChangeHandler } from "@/config/settingsRegistry"
import { useSettings } from '@/contexts/SettingsContext'

export function SettingsItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 mb-2">
      {children}
    </div>
  )
}

export function SettingsItems() {
  const { t } = useTranslation()
  const { settings, setSetting } = useSettings()
  
  return (
    <div className="flex flex-col gap-2 mb-2">
      {sortSettingsByOrder(settingsRegistry).map((config) => {
        const value = settings[config.key]
        const onChange = createSettingChangeHandler(config.key, setSetting)

        return (
          <div key={config.key} className="flex flex-row gap-2 justify-between items-center">
            {t(getLabel(config))}: {renderSettingControl(config, value, onChange)}
          </div>
        )
      })}
    </div>
  )
}