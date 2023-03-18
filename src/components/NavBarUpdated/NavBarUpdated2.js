/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMediaQuery, useTheme } from "@mui/material";

import PropTypes from "prop-types"; // ES6
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/images/download.png";
import StoreIcon from "@mui/icons-material/Store";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { faBlog, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "../../utils/style.css";
import { BASEURL } from "../../connection/BaseUrl";
import styles from "./NavBar.module.css";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SidebarUpdated from "../SidebarUpdated/SidebarUpdated";
const NavBarUpdated = () => {
    const [searchBar, setSearchBar] = useState(false);

    const history = useHistory();
    const [inputVal, SetInputVal] = React.useState("");
    const [SuggestionReady, SetSuggestionReady] = React.useState(false);
    const [Suggestions, SetSuggestions] = React.useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        console.log("scrolled");
        // clean up code
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    var fetchUrl = BASEURL + "autocomplete-ssebowa/";
    const FetchSuggestions = (value) => {
        fetch(fetchUrl, {
            method: "POST",
            headers: {
                query: value,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                var sugg = response;
                SetSuggestionReady(true);
                SetSuggestions(sugg[1]);
            })
            .catch((err) => {
                var error = { status: "error", error: err };
                console.error(error);
                SetSuggestionReady(false);
            });
    };

    useEffect(() => {
        if (SuggestionReady) {
            window.addEventListener("click", function (e) {
                if (document.getElementById("suggestBox") && document.getElementById("suggestBox")?.contains(e.target)) {
                } else {
                    SetSuggestionReady(false);
                }
            });
        }
    }, [SuggestionReady]);

    const onChangeInput = (e) => {
        SetInputVal(e.target.value);
        if (e.target.value.replace(/\s/g, "").length) {
            FetchSuggestions(e.target.value);
        } else {
            SetSuggestionReady(false);
            SetSuggestions([]);
        }
        if (inputVal === "") {
            SetSuggestionReady(false);
            SetSuggestions([]);
        }
    };
    const SubmitSearchRequest = (e = false, text = "") => {
        let searchText = text;
        if (text === "") searchText = inputVal;
        if (e) e.preventDefault();
        if (searchText.replace(/\s/g, "").length) {
            history.push("/search?q=" + searchText, { replace: true });
        }
    };

    const [sideBar, SetsideBar] = useState(false);

    const TogglesideBar = () => {
        SetsideBar(!sideBar);
    };

    // Speech Recognition
    const { transcript, listening, finalTranscript } = useSpeechRecognition();

    useEffect(() => {
        SetInputVal(transcript);
        console.log(transcript.length);
    }, [transcript]);

    useEffect(() => {
        SetInputVal(finalTranscript);
        SubmitSearchRequest(false, finalTranscript);
    }, [finalTranscript]);

    const SetVoiceListening = (e) => {
        e.preventDefault();
    };
    return (
        <>
            {listening ? <VoiceModal listening={listening} transcript={transcript} SpeechRecognition={SpeechRecognition} /> : <></>}
            <SidebarUpdated isOpen={sideBar} SetIsOpen={TogglesideBar} />
            <div className={offset >= 50 ? styles.AppNavBarDark : styles.AppNavBar}>
                <div className={styles.AppMiddleNavSection}>
                    <div className={styles.TopLeftSection}>
                        <a href="/">
                            <img className={styles.LogoNavMain} src={logo} alt={"Ssebowa Logo"} />
                        </a>
                        {offset >= 200 ? (
                            <NavBarSearchBar
                                inputVal={inputVal}
                                Suggestions={Suggestions}
                                SuggestionReady={SuggestionReady}
                                onChangeInput={onChangeInput}
                                SubmitSearchRequest={SubmitSearchRequest}
                                mobile={false}
                                SetVoiceListening={SetVoiceListening}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <ul className={styles.NavLinkDiv}>
                        <button className={styles.NavMenuBar} onClick={TogglesideBar}>
                            <FontAwesomeIcon icon="fa-solid fa-bars" />
                        </button>
                    </ul>
                </div>
                <NavBarSearchBar
                    inputVal={inputVal}
                    SetVoiceListening={SetVoiceListening}
                    Suggestions={Suggestions}
                    SuggestionReady={SuggestionReady}
                    onChangeInput={onChangeInput}
                    SubmitSearchRequest={SubmitSearchRequest}
                    SpeechRecognition={SpeechRecognition}
                    mobile
                />
            </div>
        </>
    );
};
export default NavBarUpdated;

const SuggestSpan = ({ name, SubmitSearchRequest, SpeechRecognition }) => {
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span
            onClick={(e) => {
                SubmitSearchRequest(false, name);
            }}
            className="mainSearchBarSuggestionSpan"
        >
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pt-1 pl-1"
                size="sm"
                style={{
                    color: "#59e3a7",
                    paddingHorizontal: 5,
                }}
            />{" "}
            {name}
        </span>
    );
};

SuggestSpan.propTypes = {
    name: PropTypes.string,
};

export const NavBarSearchBar = ({ inputVal, mobile, SubmitSearchRequest, onChangeInput, Suggestions, SuggestionReady, SetVoiceListening }) => {
    return (
        <div className={mobile ? styles.NavFormMobile : styles.NavForm}>
            <form className={styles.NavSearchBar} onSubmit={(e) => SubmitSearchRequest(e)}>
                <input type="search" value={inputVal} onChange={(e) => onChangeInput(e)} placeholder="Search to plant trees, feed and give sanitary pads" />
                <button type="button" className={styles.MainNavButtonVoice} onClick={SpeechRecognition.startListening}>
                    <KeyboardVoiceIcon />
                </button>
                <button className={styles.MainNavButtonSearch} type="submit">
                    <SearchIcon />
                </button>
            </form>
            {SuggestionReady ? <SuggestionDiv Suggestions={Suggestions} SubmitSearchRequest={SubmitSearchRequest} /> : <></>}{" "}
        </div>
    );
};

const SuggestionDiv = ({ text, SubmitSearchRequest, Suggestions }) => {
    return (
        <div className={styles.SuggestionDiv}>
            {Suggestions.map((item, i) => {
                return <SuggestSpan name={item} SubmitSearchRequest={SubmitSearchRequest} key={i} />;
            })}
        </div>
    );
};

export const VoiceModal = ({ transcript,SpeechRecognition }) => {
    return (
        <div className={styles.VoiceRecordModal}>
            <div className={styles.VoiceRecordInner}>
                <button className={styles.VoiceRecordInnerCloseBtn} onClick={SpeechRecognition.abortListening}>
                    <span role="img" aria-label="close">
                        ❌
                    </span>
                </button>
                <button className={styles.VoiceRecordBtn} onClick={SpeechRecognition.stopListening}>
                    {/* <button className={styles.VoiceRecordBtn}  > */}
                    <KeyboardVoiceIcon size={30} />

                    <div className={styles.pulse_ring}></div>
                </button>
                <p>Start Speaking</p>
                <span>{transcript}</span>
            </div>
        </div>
    );
};
