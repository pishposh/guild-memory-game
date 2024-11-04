import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* a 4x4 grid of rectangular divs that each take 25% of the screen */}
      <table>
        <tr>
          <td>X</td>
          <td>X</td>
          <td>X</td>
          <td>X</td>
        </tr>
        <tr>
          <td>X</td>
          <td>X</td>
          <td>X</td>
          <td>X</td>
        </tr>
        <tr>
          <td>X</td>
          <td>X</td>
          <td>X</td>
          <td>X</td>
        </tr>
        <tr>
          <td>X</td>
          <td>X</td>
          <td>X</td>
          <td>X</td>
        </tr>
      </table>
    </>
  )
}

export default App
