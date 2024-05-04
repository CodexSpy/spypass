import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-700 text-white'>
      <div className='flex justify-between items-center px-4 h-16 py-5 mycontainer'>
        <div className='logo font-bold text-2xl'>
          <span className='text-red-400'>| </span>
          Spy
          <span className='text-red-400'>PASS |</span>
          </div>
        <ul>
            <li className='flex gap-10 justify-center items-center'>
                <a href="https://github.com/CodexSpy" className='hover:font-bold'><img className='inline ' width={30} src="./icons/github.svg" alt="github"/> Github</a>
            <a href="https://www.linkedin.com/in/moin-khan-0335b4245/" className='hover:font-bold'><img className='inline' width={30} src="./icons/linkedin.svg" alt="linkedin" />LinkedIn</a>
            </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
