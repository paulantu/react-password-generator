import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [useNumber, setuseNumber] = useState(false);
  const [useChar, setuseChar] = useState(false);
  const [password, setPassword] = useState("");


// useRef Hook

  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(useNumber) strings += "0123456789";
    if (useChar) strings += "`~!@#$%^&*()_-+=}{][|><";

    for (let i = 1; i <= length; i++) {
      const passwordCharecter = Math.floor(Math.random() * strings.length + 1);
      generatedPassword += strings.charAt(passwordCharecter);
    }

    setPassword(generatedPassword);
    
  }, [length, useNumber, useChar, setPassword])






  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select(password)
    passwordRef.current?.setSelectionRange(length)
    window.navigator.clipboard.writeText(password)
  }, [password])



useEffect(() => {
  passwordGenerator()
}, [length, useNumber, useChar, passwordGenerator])




  return (
    <div
    className='w-full h-screen bg-slate-800'
    >
      <div
      className='fixed flex flex-wrap justify-center inset-x-0'
      >
        <div
        className='bg-slate-500 w-1/4 px-8 py-4 my-4 rounded-xl'
        >
          <div className="flex flex-wrap">
            <h1
            className="font-mono text-3xl text-center text-amber-600"
            >
            Password Generator
            </h1>
          </div>

          <div className="flex flex-wrap justify-center">
            <input
                type='text'
                value={password}
                className='outline-none w-full px-2 py-2 mt-5 mb-2 rounded'
                placeholder='password'
                readOnly
                ref={passwordRef}
                
              />
              <button
              className='border-0 bg-indigo-700 text-amber-600 text-lg px-6 py-2 rounded-lg stretch-0'
              onClick={copyPasswordToClipBoard}
              >Copy</button>
          </div>

          <div className="flex justify-between flex-wrap mt-4">
          <div>
          <input 
            type='range'
            value={length}
            name='length'
            id='length'
            min={6}
            max={30}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor='length'>&nbsp;Length({length})</label>
          </div>

          <div>
          <input 
            type='checkbox'
            defaultChecked={useNumber}
            name='number'
            id='number'
            onChange={() => {setuseNumber((previous) => !previous)}}
            />
            <label htmlFor='number'>&nbsp;Number</label>
          </div>

          <div>
            <input 
              type='checkbox'
              defaultChecked={useChar}
              name='char'
              id='char'
              onChange={() => {setuseChar((previous) => !previous)} }
              />
              <label htmlFor='char'>&nbsp;Character</label>
          </div>
            

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
