import { Button } from '@/components/ui/button'
import './App.css'
import { ArrowDown, ArrowUp, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from '@/components/LanguageToggle'
import { ModeToggle } from '@/components/ModeToggle'

const defaultState = {
  rounds: 0,
  row: 0,
  rowsPerRound: 8
}

function App() {
  const { t } = useTranslation()
  const [state, setState] = useLocalStorage('strikketeller-state', defaultState)

  const { rounds, row, rowsPerRound } = state

  const handleIncrement = () => {
    setState((prev) => {
      const newRow = prev.row + 1
      const shouldIncrementRound = newRow % prev.rowsPerRound === 0

      return {
        ...prev,
        row: newRow,
        rounds: shouldIncrementRound ? prev.rounds + 1 : prev.rounds
      }
    })
  }

  const handleDecrement = () => {
    setState((prev) => {
      const newRow = prev.row - 1
      const shouldDecrementRound = newRow % prev.rowsPerRound === 0

      return {
        ...prev,
        row: newRow,
        rounds: shouldDecrementRound ? prev.rounds - 1 : prev.rounds
      }
    })
  }

  const handleReset = () => {
    setState(defaultState)
  }

  const resetCount = () => {
    setState((prev) => ({ ...prev, rounds: 0, row: 0 }))
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 items-start justify-center">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold">{t('round')}: {rounds + 1}</h1>
          <h2 className="text-lg font-bold">{t('repetition')}: {(row % rowsPerRound) + 1}</h2>
          <h2 className="text-lg font-bold">{t('rows')}: {row + 1}</h2>
          <Label htmlFor="repetitions-per-round" className="text-sm font-medium">{t('repetitionsPerRound')}</Label>
          <Input type="number" id="repetitions-per-round" placeholder={t('repetitionsPerRoundPlaceholder')} value={rowsPerRound} onChange={(e) => setState((prev) => ({ ...prev, rowsPerRound: Number(e.target.value) }))} />
        </div>

        <div className="col-span-2 flex flex-col items-center justify-center gap-4">
          {/* Large button to increase the count */}
          <Button variant="default" className="rounded-full aspect-square w-full h-full"
            onClick={handleIncrement}>
            <ArrowUp className="size-[5rem]" />
          </Button>

          {/*  Small button to decrease the count */}
          <Button variant="outline" className="rounded-full aspect-square w-1/3 h-1/3"
            onClick={handleDecrement}>
            <ArrowDown className="size-[2.5rem]" />
          </Button>
        </div>

        <Accordion type="multiple" collapsible className="col-span-4 mt-4">
          
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
              <div className="flex flex-col gap-2 mb-2">
                <div className="flex flex-row gap-2 justify-between items-center">
                  {t('language')}: <LanguageToggle />
                </div>
                <div className="flex flex-row gap-2 justify-between items-center">
                  {t('mode')}: <ModeToggle />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>

    </>
  )
}

export default App
