import { useState, useCallback, useEffect, useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAlowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='rounded-lg py-4 text-orange-200 my-8 ml-96 mr-96 px-5 mt-72  bg-gray-400'>
        <h1 className='text-white my-3 text-center text-5xl mb-5'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='text-gray-700 outline-none w-full py-1 px-3'
            placeholder='password' readOnly ref={passwordRef} />
          <button onClick={copyPasswordToClipboard} className='border rounded-lg m-1 p-1 bg-blue-400 text-black'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input onChange={(e) => { setLength(e.target.value) }} className='cursor-pointer' type="range" min={8} max={50} value={length} />
            <label >Length : {length}</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }} />
            <label > Numbers allowed</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed}
              id="numberInput"
              onChange={() => {
                setCharAlowed((prev) => !prev)
              }} />
            <label > Characters allowed</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
