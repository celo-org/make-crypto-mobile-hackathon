import React from 'react';
import '../extra/css/style.css'
import '../extra/css/font-awesome.min.css'
import hackImage from '../extra/images/48.png';

const Footer = () => {
  return (
    <div>
      {/* start footer */}
      <footer id="footer" className="footer mt-5">
        <div className="container pt-3">
          <div className="row">
              <div className="col-sm-8">
                <div className="columnbottom-margin recent-work-wrap">
                  <h4 className="widget-title">CELO <span>Hackathon</span></h4>
                  <div className="latest-pfolio">
                    <div className="col-xs-12 no-space">
                      <div className="portfolio-wrapper">
                        <img src={hackImage} alt="Portfolio Title" />
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="columnbottom-margin contact-info-wrap">
                  <h4 className="widget-title">Contact <span>Details</span></h4>
                  <ul className="contact-info list-unstyled">
                    <li><i className="fa fa-github" /> <a href="https://github.com/Bayurzx/Save_Earth_AI"> Github Link</a></li>
                    <li><i className="fa fa-phone" /> <a href="tel:+234-816-603-9145">+234 816 603 9145</a></li>
                    <li><i className="fa fa-envelope" /> <a href="mailto:bayurzx@gmail.com">bayurzx@gmail.com</a></li>
                  </ul>{/* end contact-info  */}

                  <ul className="list-inline list-social clearfix" style={{display: "inline"}}>
                    <li>
                      <a href="https://google.qwiklabs.com/public_profiles/a6cc8f9e-8a10-40a7-ae66-095d0c1308dd" className="social-icon social-icon-small social-icon-gplus">
                        <i className="fa fa-google" />
                        <i className="fa fa-google" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/AdebayoOmolumo" className="social-icon social-icon-small social-icon-twitter">
                        <i className="fa fa-twitter" />
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="mailto:bayurzx@gmail.com" className="social-icon social-icon-small social-icon-gplus">
                        <i className="fa fa-google-plus" />
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/Bayurzx" className="social-icon social-icon-small social-icon-vimeo">
                        <i className="fa fa-github" />
                        <i className="fa fa-github" />
                      </a>
                    </li>
                    <li>
                      <a href="https://wa.link/mvursl" className="social-icon social-icon-small social-icon-dribbble">
                        <i className="fa fa-whatsapp" />
                        <i className="fa fa-whatsapp" />
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/in/adebayo-omolumo-2b1ba078/" className="social-icon social-icon-small social-icon-linkedin">
                        <i className="fa fa-linkedin" />
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
          </div>
          <hr className="mt-3" />
          <div className="row pl-5 ml-5">
            <div className="col-sm-12">
              <p className="text-xs-center copyright">© 2021 <a href="mailto:bayurzx@gmail.com" className="footer-site-link">Bayurzx</a> All rights reserved. <a href="mailto:bayurzx@gmail.com" className="footer-site-link">Adebayo Omolumo</a></p>
            </div>
          </div>
        </div>
      </footer>

      <a href="#" className="scrollup"><i className="fa fa-arrow-circle-up" /></a>
    </div>
  );
};

export default Footer;
