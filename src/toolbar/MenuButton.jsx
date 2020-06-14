import React from 'react';

function MenuButton({
  editorState,
  dispatchTransaction,
  children,
  command,
  isActive,
  isAllowed,
}) {
  const onMouseDown = (e) => {
    e.stopPropagation();
    // so we don't steal focus from EditorView
    e.preventDefault();
    // this is like an `run` field in prosemirror-menu item spec
    command(editorState, dispatchTransaction);
  };
  // this is like an `select` field in prosemirror-menu item spec
  const disabled = isAllowed && !isAllowed(editorState);
  // this is like an `active` field in prosemirror-menu item spec
  const active = isActive && isActive(editorState);
  return (
    <button disabled={disabled} active={active} onMouseDown={onMouseDown}>
      {children}
    </button>
  );
} export default MenuButton