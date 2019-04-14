import React, { Component } from "react";
import DropZone from "react-dropzone";
import { distanceInWords } from "date-fns";
import { MdInsertDriveFile } from "react-icons/md";
import pt from "date-fns/locale/pt";
import socket from "socket.io-client";

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
    this.subscribeToNewFiles(boxId);
  }

  handleUpload = files => {
    files.forEach(async file => {
      const data = new FormData();
      data.append("file", file);

      await api.post(`/boxes/${this.state.box._id}/files`, data);
    });
  };

  subscribeToNewFiles = boxId => {
    const io = socket("http://rafabox-backend.herokuapp.com");
    io.emit("connectRoom", boxId);

    io.on("file", newFile => {
      this.setState({
        box: {
          ...this.state.box,
          files: [newFile, ...this.state.box.files]
        }
      });
    });
  };

  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          <h1>Rafabox</h1>
          <h2>{this.state.box.title}</h2>
        </header>

        <DropZone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Arraste arquivos ou clique aqui</p>
            </div>
          )}
        </DropZone>

        <ul>
          {this.state.box.files &&
            this.state.box.files.map(file => (
              <li key={file._id}>
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
