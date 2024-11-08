import './TextOrIcon.css'

export const TextOrIcon = ({ text, icon }: { text: string; icon: string }) => (
  <>
    <span className="toi-text" aria-label={text}>
      {text}
    </span>
    <span className="toi-icon" aria-label={text}>
      {icon}
    </span>
  </>
)
