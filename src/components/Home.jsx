import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./home.css";
import Edit from "./Edit";

function App() {
  // const [toggle, setToggle] = useState(true);
  const [data, setData] = useState("");
  const [inputList, setInputList] = useState([
    {
      product: "",
      offer: "",
      discount: "",
      addDiscount: true,
      showVarient: true,
    },
  ]);

  const handleClick = (index) => {
    setInputList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, showVarient: !item.showVarient } : { ...item }
      )
    );
  };

  const handleInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const childToParent = (e, childData) => {
    e.preventDefault()
    console.log(e);
    console.log(childData)
    childData.map((item,i)=> (i.length=== 0 && inputList.length === 0) ? (
      setInputList([
        {
          product: item.title,
          offer: "",
          discount: "",
          addDiscount: true,
          showVarient: true,
        },
      ])
    ): (setInputList([
      ...inputList,
      {
        product: item.title,
        offer: "",
        discount: "",
        addDiscount: true,
        showVarient: true,
      },
    ]))  
 )
      
      // if(inputList.length > 1){
      //   setInputList([
      //     ...inputList
      //     {
      //       product: childData.title,
      //       offer: "",
      //       discount: "",
      //       addDiscount: true,
      //       showVarient: true,
      //     },
      //   ])
      // }else{
      //   setInputList([
      //     {
      //       product: childData[0].title,
      //       offer: "",
      //       discount: "",
      //       addDiscount: true,
      //       showVarient: true,
      //     },
      //   ])
      // }
  }
           
    

  const handleAdd = () => {
    setInputList([
      ...inputList,
      {
        product: "",
        offer: "",
        discount: "",
        addDiscount: true,
        showVarient: true,
      },
    ]);
    console.log("inputList", inputList);
  };

  const handleToggle = (index) => {
    console.log(index);
    setInputList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, addDiscount: false } : { ...item }
      )
    );
    // document.getElementById("toggle").style.display = "block";
    // document.getElementById("togglebtn").style.display = "none";
    //console.log(index);
  };

  return (
    <>
      {/* <DragDropContext> */}
      <div className="home">
        <h4 className="home__title">Add Products</h4>
        <div className="home__pd">
          <h6>Products</h6>
          <h6>Discount</h6>
        </div>
        {/* <Droppable droppableId="body"> */}
        {/* {(provided) => ( */}
        {/* <div ref={provided.innerRef} {...provided.droppableProps}> */}
        {inputList.map((singleService, index) => (
          // <Draggable key={index} draggableId={index.name} index={index}>
          //   {(provided) => (

          <div
            key={index + 1}
            // ref={provided.innerRef}
            // {...provided.droppableProps}
            className="home__main"
          >
            <div className="home__input">
              <BiDotsVerticalRounded
                // {...provided.dragHandleProps}
                className="home__drag"
              />
              <BiDotsVerticalRounded
                // {...provided.dragHandleProps}
                className="home__drag-1"
              />
              <p className="sr-no">{index + 1}</p>
              <input
                className="home__input-main"
                name="product"
                type="text"
                id="product"
                value={singleService.product}
                onChange={(e) => handleInput(e, index)}
                placeholder="Select Products"
              />
              <Edit childToParent={childToParent} />

              {singleService.addDiscount === true ? (
                <button
                  id="togglebtn"
                  onClick={() => handleToggle(index)}
                  className="home__discount-btn"
                >
                  Add Discount
                </button>
              ) : (
                <div id="toggle" className="home-input__toggle">
                  <input
                    className="home__offer-input"
                    name="offer"
                    type="number"
                    placeholder="20"
                    onChange={(e) => handleInput(e, index)}
                    value={singleService.offer}
                  />
                  <select
                    className="home__dropdown"
                    name="discount"
                    onChange={(e) => handleInput(e, index)}
                    value={singleService.discount}
                  >
                    <option value="% off">% off</option>
                    <option value="flat off">flat off</option>
                  </select>
                </div>
              )}

              {inputList.length !== 1 && (
                <GrClose className="home__close" onClick={() => handleRemove(index)} />
              )}
            </div>
            {singleService.showVarient === true ? (
              <div className="change">
                <button
                  className="home__varient"
                  onClick={() => handleClick(index)}
                >
                  Show varient
                  <RiArrowDropUpLine />
                </button>
              </div>
            ) : (
              <div className="change">
                <button
                  className="home__varient"
                  onClick={() => handleClick(index)}
                >
                  Hide varient
                  <RiArrowDropDownLine />
                </button>
                <div className="home__varient-1">
                  <input
                  value={data}
                    className="home__varient-input"
                    type="text"
                  />
                  <input
                    className="home__offer-input-2"
                    name="offer"
                    type="number"
                    placeholder="0"
                  />
                  <select className="home__dropdown-2" name="discount">
                    <option value="% off">% off</option>
                    <option value="flat off">flat off</option>
                  </select>
                  {inputList.length !== 1 && (
                    <GrClose className="home__close-2" onClick={() => handleRemove(index)} />
                  )}
                </div>
              </div>
            )}
          </div>
          // )}
          // </Draggable>
        ))}
        {/* </div> */}
        {/* // )} */}
        {/* </Droppable> */}

        <div className="home__add-btn">
          <button type="button" onClick={handleAdd}  className="add-btn">
            Add Products
          </button>
        </div>
      </div>
      {/* // </DragDropContext> */}
    </>
  );
}

export default App;

// import { useState } from "react";
// import { GrClose } from "react-icons/gr";
// import { BiDotsVerticalRounded } from "react-icons/bi";
// import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
// import { MdEdit } from "react-icons/md";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Model from './Model'
// import "./home.css";

// function App() {
//   const [toggle, setToggle] = useState(true);
//   const [newToggle, setNewToggle] = useState(false);
//   const [inputList, setInputList] = useState([
//     { product: "", offer: "", discount: "" },
//   ]);
//   const[index1, setIndex1]= useState(0);

//   const handleClick = () => {
//     setToggle(!toggle);
//   };

//   const handleInput = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...inputList];
//     list[index][name] = value;
//     setInputList(list);
//   };

//   const handleRemove = (index) => {
//     const list = [...inputList];
//     list.splice(index, 1);
//     setInputList(list);
//   };

//   const handleAdd = () => {
//     setInputList([...inputList, { product: "", offer: "", discount: "" }]);
//   };

//   const handleToggle = (index) => {
//     // document.getElementById("toggle").style.display = "block";
//     // document.getElementById("togglebtn").style.display = "none";
//     console.log("a");
//     setNewToggle(!newToggle)
//     setIndex1(index)
//   };

//   return (
//     <>
//     <DragDropContext>
//     <div className="home">
//         <h4 className="home__title">Add Products</h4>
//         <div className="home__pd">
//           <h6>Products</h6>
//           <h6>Discount</h6>
//         </div>
//         <Droppable droppableId="body">
//         {(provided)=>(
//          <div ref={provided.innerRef} {...provided.droppableProps}>
//           {inputList.map((singleService, index) => (
//              <Draggable key={index} draggableId={index.name} index={index}>
//                {(provided)=>(
//                   <div key={index} ref={provided.innerRef} {...provided.droppableProps} className="home__main">
//                   <div className="home__input"  >
//                   <BiDotsVerticalRounded {...provided.dragHandleProps} className="home__drag" />
//                   <BiDotsVerticalRounded {...provided.dragHandleProps}  className="home__drag-1"/>
//                     <p className="sr-no">{index + 1}</p>
//                     <input
//                       className="home__input-main"
//                       name="product"
//                       type="text"
//                       id="product"
//                       value={singleService.product}
//                       onChange={(e) => handleInput(e, index)}
//                       placeholder="Select Products"
//                     />
//                     <div className="home__model">
//                     <MdEdit className="home__edit-add" />
//                     </div>

//                     <div id="toggle" className={`${newToggle ? '' : 'home-input__toggle'}`} >
//                       <input
//                         className="home__offer-input"
//                         name="offer"
//                         type="number"
//                         placeholder="20"
//                         onChange={(e) => handleInput(e, index)}
//                         value={singleService.offer}
//                       />
//                       <select
//                         className="home__dropdown"
//                         name="discount"
//                         onChange={(e) => handleInput(e, index)}
//                         value={singleService.discount}
//                       >
//                         <option value="% off">% off</option>
//                         <option value="flat off">flat off</option>
//                       </select>
//                     </div>
//                     <button
//                       id="togglebtn"
//                       onClick={()=> handleToggle(index1)}
//                       className={`${newToggle ? 'home__discount-btn' : ''}`}
//                       // className="home__discount-btn"
//                     >
//                       Add Discount
//                     </button>
//                     {inputList.length !== 1 && (
//                       <GrClose onClick={() => handleRemove(index)} />
//                     )}
//                   </div>
//                   {toggle ? (
//                     <div className="change">
//                       <button
//                         className="home__varient"
//                         onClick={() => handleClick(index)}
//                       >
//                         Show varient
//                         <RiArrowDropUpLine />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="change">
//                       <button className="home__varient" onClick={handleClick}>
//                         Hide varient
//                         <RiArrowDropDownLine />
//                       </button>
//                       <div className="home__varient-1">
//                         <input
//                           className="home__varient-input"
//                           type="text"
//                           placeholder="Cotton classic sneakers"
//                         />
//                         <input
//                           className="home__offer-input-2"
//                           name="offer"
//                           type="number"
//                           placeholder="20"
//                         />
//                         <select className="home__dropdown-2" name="discount">
//                           <option value="% off">% off</option>
//                           <option value="flat off">flat off</option>
//                         </select>
//                         {inputList.length !== 1 && (
//                           <GrClose onClick={() => handleRemove(index)} />
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                )}

//              </Draggable>
//             ))}
//          </div>
//         )}
//         </Droppable>

//         <div className="home__add-btn">
//           <button type="button" onClick={handleAdd} className="add-btn">
//             Add Products
//           </button>
//         </div>
//       </div>
//       <Model/>

//     </DragDropContext>
//     </>
//   );
// }

// export default App;
