import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, Dispatch, forwardRef, SetStateAction } from "react"

const Hint = forwardRef<
  HTMLInputElement,
  { setHint: Dispatch<SetStateAction<string>> }
>(({ setHint }, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof ref !== "function") {
      if (ref && ref.current) ref.current.value = e.target.value
      setHint(e.target.value)
    }
  }
  return (
    <section className="hint-section">
      <span>Подсказка</span>
      <div className="hint-section-container">
        <FontAwesomeIcon icon="question" className="hint-icon" />
        <input
          ref={ref}
          type="text"
          onChange={handleChange}
          className="hint-input"
          placeholder="Комментарий по локации"
        />
      </div>
    </section>
  )
})
export default Hint
