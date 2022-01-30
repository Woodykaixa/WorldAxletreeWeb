import styled from 'styled-components';

export const EditorStyle = styled.div`
  & .bytemd {
    height: calc(100vh - 120px);
    background-color: #1d1d1d;
    border-color: #3c3c3c !important;
    color: white;
  }

  /* Top toolbar styles */
  & .bytemd-toolbar {
    border-color: #3c3c3c;
    background-color: #252526;
  }

  & .bytemd-toolbar-icon {
    color: #efefef;
  }

  & .bytemd-toolbar-icon:hover {
    background-color: #094771;
  }

  & .tippy-box {
    background-color: #252526;
  }

  & .bytemd-dropdown-item {
    color: #cccccc;
  }

  & .bytemd-dropdown-item:hover {
    background-color: #094771;
  }

  & .bytemd-fullscreen {
    top: 120px;
    height: calc(100vh - 120px);
  }

  & .bytemd-toolbar-right [bytemd-tippy-path='5'] {
    display: none;
  }

  /* WTF? bytemd set vertical-align: top and help panel got overflow??? */
  & .bytemd-help ul div {
    vertical-align: baseline;
  }

  /* Editor styles */
  & .CodeMirror {
    background-color: #1e1e1e;
    color: white;
  }

  & .bytemd-editor .CodeMirror-lines {
    margin: 0;
  }

  & .CodeMirror-gutters {
    border-width: 0;
  }

  & .CodeMirror-linenumbers {
    background-color: #1e1e1e;
  }

  & .CodeMirror-cursor {
    border-left-color: rgba(255, 255, 255, 0.8);
  }

  & .CodeMirror-linenumber {
    color: #d4d4d4;
  }

  & .CodeMirror-selected {
    background-color: rgba(55, 148, 255, 0.2);
  }

  /* Right sidebar styles  */
  & .bytemd-sidebar {
    border-color: #3c3c3c;
  }

  & .bytemd-toc-active {
    color: white;
    background-color: #37373d;
  }

  & .bytemd-sidebar-close:hover {
    color: #3794ff;
  }

  /* Bottom status bar styles */
  & .bytemd-status {
    border-color: #3c3c3c;
  }

  & .bytemd-status-right span:hover {
    color: #3794ff;
  }

  /* Markdown syntax styles */
  & .cm-header {
    color: #569cd6;
  }

  & .cm-def {
    color: #5b5bbb;
  }

  & .cm-atom,
  & .cm-meta {
    color: #ce9178;
  }

  & .cm-comment {
    color: #6a9955;
  }

  & .cm-link {
    color: #ce9178;
    text-decoration: none;
  }

  & .cm-url {
    color: #3794ff;
    text-decoration: underline;
  }

  & .cm-variable-2 {
    color: #519ff8;
  }

  & .cm-keyword {
    color: #4ec9b0;
  }
  & .cm-string {
    color: #b87171;
  }
  /* Markdown preview styles */
  & .markdown-body {
    user-select: none;
  }

  & .markdown-body blockquote {
    border-left-color: rgba(0, 122, 204, 0.5);
  }

  & .markdown-body a:hover {
    color: #3794ff;
    text-decoration: underline;
  }

  & td,
  & th {
    border-left: #494949 solid 2px;
    border-top: #494949 solid 2px;
    padding: 12px;
  }

  & tr {
    border-right: #494949 solid 2px;
    border-bottom: #494949 solid 2px;
  }

  & table {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;
