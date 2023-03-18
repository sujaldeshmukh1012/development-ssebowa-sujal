import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Button from "../button";
import Parallax from "parallax-js"; 
import Logo from "../logo";
import SearchBarHome from "../searchbarhome/SearchBarHome";
// import Bookmarks from "../Bookmarks/Bookmarks";
import { Link } from "react-router-dom";
import styles from "./intro.module.css"
import logo from "../../assets/images/download.png"
import { faMagnifyingGlass,faMicrophone,faCode,faAlignLeft,faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import BottomSection from "../BottomSection/BottomSection";


const Intro = ({ data }) => {
    return (
        <div className={styles.IntroMain} >
            <IntroLogo/>
            <MainSearchBar/>
            <SlidingOptions/>
            <BottomSection/>
        </div>
    );
};

Intro.propTypes = {
    data: PropTypes.object,
};

export default Intro;

const IntroLogo = () =>{
    return(
        <img className={styles.IntroLogo} src={logo} alt="Ssebowa logo" />
    )
}
const MainSearchBar = () =>{
    return(
        <form className={styles.MainSearchBar}  >
            <button className={styles.MainBtn}  style={{marginLeft:"1em"}}  >
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pt-1 pl-1"
                size="md"
            />
            </button>
            <input className={styles.MainInput}  type="search" placeholder="Search to plant trees, feed and give sanitary pads" />
            <button className={styles.MainBtn}  style={{marginRight:"1em"}}  >
            <FontAwesomeIcon
                icon={faMicrophone}
                className="pt-1 pl-1"
                size="md"
            />
            </button>
        </form>
    )
}

const SlidingOptions = () =>{
    return(
        <div className={styles.SlidingOptions} >
            <Options icon={faCode} title={'Generate Code'} subtitle={"use it now"} />
            <Options icon={faKeyboard} title={'Generate essay'} subtitle={"use it now"} />
            <Options icon={faAlignLeft} title={'Generate poem'} subtitle={"use it now"} />
        </div>
    )
}

const Options = ({title,icon}) =>{
return( 
    <button className={styles.Options} >
 <FontAwesomeIcon
                icon={icon}
                className={styles.OptionIcon}
            />
            <h6 className={styles.OptionTitle}>
           {title}</h6>
    </button>
)
}