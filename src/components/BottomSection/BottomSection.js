import React from 'react'
import styles from "./BottomSection.module.css"
import { faPlus,faBookmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import Bookmarks from '../Bookmarks/Bookmarks';

function BottomSection() {

    return (
    <div className={styles.BottomSection} >
        <div className={styles.BottomSectionBtnDiv}>
            <button className={styles.BottomSectionBtnAddToChrome} >
           <span>Add to Chrome  <FontAwesomeIcon
                icon={faPlus}
                className="pt-1 pl-1"
                // size="lg"
                style={{color:"#4ab421",fontSize:"15px"}}
            /> </span>
            </button>
            <button className={styles.BottomSectionBtnAddBookmark} >
            <span>Add Bookmark <FontAwesomeIcon
                icon={faBookmark}
                className="pt-1 pl-1"
                // size="lg"
                style={{color:"#4ab421",fontSize:"15px"}}
            /> </span>
                <Bookmarks/>

            </button>
        </div>
    </div>
  )
}

export default BottomSection