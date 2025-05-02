import React from 'react'

const Header = ({user, handleLogout}) => {
  return (
    <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex logo-box">
            <div className="navbar-brand-box">
              <a href="index.html" className="logo">
                <span className="logo-sm">
                  <img
                    src="/assets/images/velocity_logo.png"
                    alt="logo"
                    height="40"
                  />
                </span>
                <span className="logo-lg">
                  <img src="/assets/images/velocity_logo.png" alt="logo" />
                </span>
              </a>
            </div>
          </div>
          <div className="d-flex pr-2">
            <div className="dropdown d-inline-block">
              <span className="d-none d-xl-inline-block ml-1">
                Welcome {user.name || "Henry"}
              </span>
              &nbsp;&nbsp;
              <a onClick={handleLogout} href="#">
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header