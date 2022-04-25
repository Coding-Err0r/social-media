import React from 'react'
import {UserButton} from '@clerk/nextjs'
import ModeToggle from '../utils/modeToogle'
const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Social Media</a>
        </div>
        <div className="flex-none">
            <div className="dropdown dropdown-end">
            <label  className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <ModeToggle/>
                </div>
            </label>

            </div>
            <div className="dropdown dropdown-end">
            <label  className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <UserButton />
                </div>
            </label>

            </div>
        </div>
    </div>
  )
}

export default Navbar