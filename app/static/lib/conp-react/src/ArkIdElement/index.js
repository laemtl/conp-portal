import React, { useState, useEffect } from "react";
import ReactToolTip from "react-tooltip";

import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faCopy} from '@fortawesome/free-regular-svg-icons'
import { faCheck} from '@fortawesome/free-solid-svg-icons'

const ArkIdElement = (props) => {

  const ark_id = props.id

  const [showText, setShowText] = useState(false)

  const [showCopyIcon, setShowCopyIcon] = useState(true)
  const [showCheckIcon, setShowCheckIcon] = useState(false)

  const handleMouseEnter = e => {
    setShowText(true)
  }

  const handleMouseLeave = e => {
    setShowText(false)
  }

  const handleCopyToClipboard = e => {
    setShowCopyIcon(false)
    setShowCheckIcon(true)
    setTimeout(() => {
      setShowCopyIcon(true)
      setShowCheckIcon(false)
    }, 1000)

  }

  return (
    <div className="card-list-item">
      <p className="card-text pr-1">
        <strong>ARK ID <FontAwesomeIcon
              icon={faQuestionCircle}
              color="dimgray"
              size="md"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              data-tip
              data-for="arktip"
          />
          {showText &&
            <ReactToolTip id="arktip" multiline={true} style={{ Width: "70px", WhiteSpace: "pre-wrap" }}>
              Archival Resource Keys (ARKs) serve as persistent <br/>
              identifiers, or stable, trusted references for information <br/>
              objects. For more information, please visit https://arks.org.
            </ReactToolTip>}
        : </strong>
        {ark_id} {showCopyIcon && <CopyToClipboard text={ark_id} onCopy={handleCopyToClipboard} data-tip data-for="copiedtip">
          <button>
            <FontAwesomeIcon icon={faCopy} color="dimgray" size="md"/>
          </button>
        </CopyToClipboard>}
        {showCheckIcon && <button disabled>
          <FontAwesomeIcon icon={faCheck} color="dimgray" size="md"/>
        </button>}
      </p>
    </div>
  );
};

export default ArkIdElement;
