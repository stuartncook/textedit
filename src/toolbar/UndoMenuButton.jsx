import React from 'react';
import {undo} from 'prosemirror-history'
import MenuButton from './MenuButton'

function UndoMenuButton(props) {
  return (
    <MenuButton {...props} command={undo} isAllowed={undo}>
      Undo
    </MenuButton>
  );
} export default UndoMenuButton