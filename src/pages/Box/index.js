import React, { Component } from "react";

import { MdInsertDriveFile } from "react-icons/md";

import logo from "../../assets/logo.png";
import "./styles.css";

export default class Box extends Component {
  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          <h1>Box name</h1>
        </header>

        <ul>
          <li>
            <a className="fileInfo" href="/">
              <MdInsertDriveFile size={24} color="#A5CFFF" />
              <strong>Desafio.pdf</strong>
            </a>
            <span>há 2 dias atrás</span>
          </li>
          <li>
            <a className="fileInfo" href="/">
              <MdInsertDriveFile size={24} color="#A5CFFF" />
              <strong>Desafio.pdf</strong>
            </a>
            <span>há 2 dias atrás</span>
          </li>
          <li>
            <a className="fileInfo" href="/">
              <MdInsertDriveFile size={24} color="#A5CFFF" />
              <strong>Desafio.pdf</strong>
            </a>
            <span>há 2 dias atrás</span>
          </li>
        </ul>
      </div>
    );
  }
}
