import React, { Component } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";

import api from "../../services/api";

import logo from "../../assets/logo.png";
import "./styles.css";

export default class Box extends Component {
  state = {
    box: {}
  };
  async componentDidMount() {
    const boxId = this.props.match.params.id;
    const response = await api.get(`/boxes/${boxId}`);

    this.setState({ box: response.data });
  }

  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          <h1>Rafabox</h1>
          <h2>{this.state.box.title}</h2>
        </header>

        <ul>
          {this.state.box.files &&
            this.state.box.files.map(file => (
              <li>
                <a
                  className="fileInfo"
                  href={file.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MdInsertDriveFile size={24} color="#A5CFFF" />
                  <strong>{file.title}</strong>
                </a>
                <span>
                  há{" "}
                  {distanceInWords(file.createdAt, new Date(), { locale: pt })}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
