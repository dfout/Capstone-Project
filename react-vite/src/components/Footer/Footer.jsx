import './Footer.css'
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {

    return (
        <div className="footer" id='form-footer'>
            <div className='ms-container'>

            <img id='ms'src='https://musee4.s3.us-east-2.amazonaws.com/site-block.png'/>
            </div>
    
            <div className="group-links">
                <FaGithub />
                <a  href="https://github.com/dfout">dfout</a>
            </div>
            <div className="group-links">
                <CiLinkedin />
                <a  href="https://www.linkedin.com/in/drew-fout/">Drew Fout</a>
            </div>
      

        </div>
    )
}

export default Footer;