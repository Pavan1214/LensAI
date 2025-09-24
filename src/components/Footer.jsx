
import React from 'react'
import "../CssFiles/Footer.css"

const Footer = () => {
  return (
    <div >
      <footer id='contact-about'>
        <div className="f-logo"><h3>LensAI</h3><img src="logo3.png" alt="" /></div>
        <div className="footer-c">
          <div className="about">
            <h4>About</h4>
            <p>LensAI is your creative hub for professional AI image editing prompts. We craft detailed, photography-inspired prompts that help you generate cinematic, clean, and ultra-realistic images with ease. Whether you’re looking for stunning portraits, breathtaking landscapes, or rich urban scenes, LensAI gives you the right words to bring your vision to life. Our prompts are designed to preserve natural facial features while enhancing style, lighting, and atmosphere—so every image looks like it was shot through a professional lens.</p>
          </div>
          <div className="contact">
            <div className="c-heading"><h4>Contacts</h4></div>
            <div className="c-icons">
              <a href=""><i class="fa-brands fa-instagram"></i></a>
              <a href="https://wa.me/9912964095"><i class="fa-brands fa-whatsapp"></i></a>
              <a href="mailto:businessmainid7799@gmail.com"><i class="fa-solid fa-envelope"></i></a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <h6>© 2025 LensAI. All rights reserved.</h6>
        </div>
      </footer>
    </div>
  )
}

export default Footer
