import { Button } from '@/components/ui/button'
import './App.css'
import { ArrowDown, ArrowUp, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const defaultState = {
  rounds: 0,
  row: 0,
  rowsPerRound: 8
}

function App() {
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
          <h1 className="text-2xl font-bold">Runde: {rounds + 1}</h1>
          <h2 className="text-lg font-bold">Repetisjon: {(row % rowsPerRound) + 1}</h2>
          <h2 className="text-lg font-bold">Rader: {row + 1}</h2>
          <Label htmlFor="repetitions-per-round" className="text-sm font-medium">Antall repetisjoner per runde</Label>
          <Input type="number" id="repetitions-per-round" placeholder="Repetisjoner per runde" value={rowsPerRound} onChange={(e) => setState((prev) => ({ ...prev, rowsPerRound: Number(e.target.value) }))} />
        </div>

        <div className="col-span-2 flex flex-col items-center justify-center gap-4">
          {/* Large button to increase the count */}
          <Button variant="outline" className="rounded-full aspect-square w-full h-full"
            onClick={handleIncrement}>
            <ArrowUp className="size-[5rem]" />
          </Button>

          {/*  Small button to decrease the count */}
          <Button variant="outline" className="rounded-full aspect-square w-1/3 h-1/3"
            onClick={handleDecrement}>
            <ArrowDown className="size-[2.5rem]" />
          </Button>
        </div>

        <Accordion type="single" collapsible className="col-span-4">
          <AccordionItem value="reset">
            <AccordionTrigger>
              Nullstill
            </AccordionTrigger>
            <AccordionContent>

              {/* Reset button */}
              <Button variant="outline" className="w-1/2"
                onClick={resetCount}>
                Nullstill teller <RotateCcw />
              </Button>
              <Button variant="outline" className="w-1/2"
                onClick={handleReset}>
                Nullstill alt <RotateCcw />
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>

    </>
  )
}

export default App
