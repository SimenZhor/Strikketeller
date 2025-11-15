import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowUp, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useTranslation } from 'react-i18next'
import { SettingsItems } from './components/SettingsItem'

const defaultState = {
  repetitions: 0,
  rowsTot: 0,
  rowsPerRepetition: 8
}

function App() {
  const { t } = useTranslation()
  const [state, setState] = useLocalStorage('strikketeller-state', defaultState)

  const { repetitions, rowsTot, rowsPerRepetition } = state

  const handleIncrement = () => {
    setState((prev) => {
      const newRow = prev.rowsTot + 1
      const shouldIncrementRepetition = newRow % prev.rowsPerRepetition === 0

      return {
        ...prev,
        rowsTot: newRow,
        repetitions: shouldIncrementRepetition ? prev.repetitions + 1 : prev.repetitions
      }
    })
  }

  const handleDecrement = () => {
    setState((prev) => {
      const shouldDecrementRepetition = prev.rowsTot % prev.rowsPerRepetition === 0

      return {
        ...prev,
        rowsTot: prev.rowsTot - 1,
        repetitions: shouldDecrementRepetition ? prev.repetitions - 1 : prev.repetitions
      }
    })
  }

  const handleReset = () => {
    setState(defaultState)
  }

  const resetCount = () => {
    setState((prev) => ({ ...prev, repetitions: 0, rowsTot: 0 }))
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 items-start justify-start">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold">{t('repetition')}: {repetitions + 1}</h1>
          <h2 className="text-md font-bold">{t('row')}: {(rowsTot % rowsPerRepetition) + 1}/{rowsPerRepetition}</h2>
          <h2 className="text-md font-bold">{t('rows')}: {rowsTot + 1}</h2>
          <Label htmlFor="rows-per-repetition" className="text-sm font-medium">{t('rowsPerRepetition')}</Label>
          <Input type="number" inputMode="numeric" id="rows-per-repetition" placeholder={t('rowsPerRepetitionPlaceholder')} value={rowsPerRepetition} onChange={(e) => setState((prev) => ({ ...prev, rowsPerRepetition: Number(e.target.value) }))} min={1} max={10000} step={1} />
        </div>

        <div className="col-span-2 flex flex-col items-center justify-center gap-4">
          {/* Large button to increase the count */}
          <Button variant="default" className="rounded-full aspect-square w-full h-full transition-transform duration-100 ease-in-out active:scale-95"
            onClick={handleIncrement}>
            <ArrowUp className="size-[5rem]" />
          </Button>

          {/*  Small button to decrease the count */}
          <Button variant="outline" className="rounded-full aspect-square w-1/3 h-1/3 transition-transform duration-100 ease-in-out active:scale-95"
            onClick={handleDecrement}>
            <ArrowDown className="size-[2.5rem]" />
          </Button>
        </div>

        <Accordion type="single" collapsible className="col-span-4 mt-4">
          
          <AccordionItem value="reset">
            <AccordionTrigger>
              {t('reset')}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 mb-2">

              {/* Reset buttons */}
              <Button variant="outline" className="w-full"
                onClick={resetCount}>
                {t('resetCounter')} <RotateCcw />
              </Button>
              <Button variant="outline" className="w-full"
                onClick={handleReset}>
                {t('resetAll')} <RotateCcw />
              </Button>
                  </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="settings">
            <AccordionTrigger>
              {t('settings')}
            </AccordionTrigger>
            <AccordionContent>
              <SettingsItems />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>

    </>
  )
}

export default App
