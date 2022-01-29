import React from 'react'
import s from './Navbar.module.css'
import { useState } from 'react'

const Navbar = () => {
  const [active, setActive] = useState(true)

  const handleClick = () => {
    setActive(!active)
  }

  return (
    <nav className={s.navcontainer}>
      <div className={s.narvbar}>
        <a href="/"><span className={s.title}>NewsNFT</span></a>
      </div>

      <div className={s.toggle}>
        <button className={s.button}>
          <svg
            className={s.toggleicon}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className={s.menu}>
        <div className={`${active ? '' : 'hidden'}`}>
          <div className={s.links}>
            <a href="#responsive-header" className={s.link}>
              $xTOKEN
            </a>
            <a href="#responsive-header" className={s.link}>
              Browse
            </a>
            <a href="#responsive-header" className={s.link}>
              More
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
