import React from 'react'
import { GrClose, GrSearch} from "react-icons/gr";


const Modal = ({closeModal}) => {
  return (
    <div className="modal__bg">
      <div className="modal__container">
          <div className="modal__header">
            Search
            <GrClose onClick={()=>closeModal(false)}/>
          </div>
          <div className="modal__search">
            <GrSearch />
            <input type="text" placeholder='Search product'/>
          </div>
          <div className="modal__main-products">
            <input type="checkbox" />
            {/* <img src="" alt="" /> */}
            <p>Long Socks - Made with natural materials</p>
            <div className="modal__sub-products">
            <input type="checkbox" />
                 <p>S/White/Cotton</p>
                 <p>99 available</p>
                 <p>$3.99</p>
            </div>
          </div>
      <div className="modal__footer">
        <p>1 product selected</p>
        <button onClick={()=>closeModal(false)}>Cancel</button>
        <button>Add</button>
      </div>
      </div>
    </div>
  ) 
}

export default Modal