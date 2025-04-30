/**
 * Sets the overflow property of the document based on the provided boolean value.
 *
 * @param {boolean} isOpen - If true, disables scrolling by setting overflow to hidden. If false, restores scrolling by resetting overflow properties.
 */
function setDocumentOverFlowDisplay(isOpen) {
  !isOpen ? (document.body.style.overflow = "") : (document.body.style.overflow = "hidden");
}

export default setDocumentOverFlowDisplay;
