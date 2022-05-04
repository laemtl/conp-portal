import React, {useState} from "react";
import PropTypes from "prop-types";

import ViewsIcon from "../social/ViewsIcon"
import DownloadsIcon from "../social/DownloadsIcon"
import ArkIdElement from "../ArkIdElement"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import ReactToolTip from "react-tooltip";

const PipelineElement = props => {
  const { authorized, ...element } = props;

  const [showCbrainTipText, setShowCbrainTipText] = useState(false);

  const handleCrainMouseEnter = e => {
    setShowCbrainTipText(true);
  }

  const handleCrainMouseLeave = e => {
    setShowCbrainTipText(false);
  }

  const platforms = element.platforms.map((item, key) =>
    <div className="row w-100 align-items-center">
      <div className="col-10 p-0">
        {item.uri ?
          <a target="_blank" href={`${item.uri}`} role="button" className="btn btn-outline-success m-1">
            <div className="d-flex row align-items-center justify-content-center">
              Process On <img
              className="cbrain-img justify-content-center align-items-center pl-4"
              src="static/img/cbrain-long-logo-blue.png" style={{maxHeight: '30px'}}
            />
            </div>
          </a> :
          <a target="_blank" role="button" className="btn btn-outline-secondary disabled m-1">
            <div className="d-flex row align-items-center justify-content-center">
              Process On
              <img
                  className="cbrain-img justify-content-center align-items-center pl-4"
                  src="static/img/cbrain-long-logo-grey.png" style={{maxHeight: '30px'}}/>
            </div>
          </a>
        }
      </div>
      <div className="col-2 p-2">
        <p className="card-text pl-1">
          <FontAwesomeIcon
            icon={faQuestionCircle}
            color="dimgray"
            size="lg"
            onMouseEnter={handleCrainMouseEnter}
            onMouseLeave={handleCrainMouseLeave}
            data-tip
            data-for="cbrainTip"
          />
          {showCbrainTipText &&
            <ReactToolTip id="cbrainTip" multiline={true} style={{ Width: "70px", WhiteSpace: "pre-wrap" }}>
              CBRAIN is web-based software that allows researchers to perform <br/>
              computationally intensive analyses on data by connecting them to <br/>
              High-Performance Computing (HPC) facilities across Canada and around the world.
            </ReactToolTip>
          }
        </p>
      </div>
    </div>
  );

  return (
    <div className="card container-fluid" data-type="pipeline">
      <div className="row">
        <div className="col col-lg-2 d-flex flex-column p-2">
          <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center pb-3">
            <a href={element.url}>
              <img
                alt="dataset format"
                className="img-fluid"
                style={{ maxWidth: '140px' }}
                src={
                  element.url === undefined
                    ? "static/img/cogs-solid-grey.png"
                    : "static/img/cogs-solid-green.png"
                }
              />
            </a>
          </div>
          <div className="d-flex flex-grow-2 flex-row justify-content-center align-items-end">
            <ViewsIcon type="pipeline" id={element.id} />
            {element.downloads ? <DownloadsIcon type="pipeline" id={element.id} /> : null}
          </div>
        </div>

        <div className="col col-lg-7 card-body d-flex p-2">
          <div className="d-flex flex-column justify-content-center">
            <h5 className="card-title text-card-title">
              <a className="text-reset" href={`pipeline?id=${element.id}`}>
                {element.title}
              </a>
            </h5>
            <div className="py-2">
              <ul className="d-flex align-items-start">
                <li className="card-list-item">
                  <strong>Tags: </strong>{element.tags && element.tags.domain ?
                    Array.isArray(element.tags.domain) ?
                    element.tags.domain.map(tag => <span key={"tag" + tag} className="mr-1"><a href={"/pipelines?tags=" + tag} className="badge badge-primary">{tag}</a></span>)
                    : <span><a href={"/pipelines?tags=" + element.tags.domain} className="badge badge-primary">{element.tags.domain}</a></span>
                  : null}
                </li>
              </ul>
              <ul className="d-flex align-items-start">
                <li className="card-list-item">
                  <strong>Description: </strong> {element.description}
                </li>
              </ul>
              <ul className="d-flex align-items-start">
                <li className="card-list-item">
                  <strong>Pipeline ID: </strong>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={"https://www.zenodo.org/record/" + element.id.split(".")[1]}
                  >
                    {element.id}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ArkIdElement id={element.ark_id}/>
            </div>
          </div>
        </div>

        <div className="col col-lg-3 d-flex flex-column justify-content-center align-items-end p-2">
          <div className="row align-items-center w-100">
            {platforms}
          </div>
        </div>
      </div>
    </div>
  );
};

PipelineElement.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  downloads: PropTypes.number,
  descriptorurl: PropTypes.string,
  platforms: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  commandline: PropTypes.string,
  author: PropTypes.string,
  inputs: PropTypes.arrayOf(PropTypes.object),
  outputfiles: PropTypes.arrayOf(PropTypes.object),
  toolversion: PropTypes.string,
  schemaversion: PropTypes.string,
  containerimage: PropTypes.object,
  tags: PropTypes.object,
  url: PropTypes.string,
  img: PropTypes.string,
  imagePath: PropTypes.string
};

//PipelineElement.defaultProps = {
//  imagePath: ""
//};

export default PipelineElement;
