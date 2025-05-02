import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">{new Date().getFullYear()} &copy; Copyright.</div>
              <div className="col-sm-6 text-sm-right">
                Support Email:{" "}
                <a href="#" className="text-muted">
                  support@velsof.com
                </a>
              </div>
            </div>
          </div>
        </footer>
  )
}

export default Footer