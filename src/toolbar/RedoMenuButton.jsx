import React from 'react';
import {redo} from 'prosemirror-history'
import MenuButton from './MenuButton'

function RedoMenuButton(props) {
  return (
    <MenuButton {...props} command={redo} isAllowed={redo}>
      Redo
    </MenuButton>
  );
} export default RedoMenuButton