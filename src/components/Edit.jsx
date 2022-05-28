
import React, { useState, useEffect } from "react";
import { Checkbox, Modal, styled } from "@mui/material";
import { Box } from "@mui/system";
import "./edit.css";
import { MdEdit } from "react-icons/md";
import { GrClose, GrSearch } from "react-icons/gr";
import ReactPaginate from "react-paginate";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});


const Edit = ({childToParent}) => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  const [checkBox, setCheckBox] = useState([])

  // const data= "HElo"
  const getUsers = async () => {
    const response = await fetch(
      "https://stageapibc.monkcommerce.app/admin/shop/product?search=F&page=1"
    );
    const data = await response.json();
    setProducts(data);
    // console.log(data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  // const handleChange = (e) => {
  //   const { name, checked } = e.target;

  //   if (name === "allSelect") {
  //     let tempUser = products.map((data) => {
  //       return { ...data, isChecked: checked };
  //     });
  //     setProducts(tempUser);
  //   } else {
  //     // let tempUser = products?.variants.map(products=>products.title === title ? {...products, isChecked: checked}: products
  //     let tempUser = products?.variants.map((d) =>
  //       d.name === name ? { ...d, isChecked: checked } : d
  //     );
  //     console.log(products.variants.title);

  //     setProducts(tempUser);
  //   }
  // };

// const handleChek=(data)=>{
//   if(checkBox.length === 0){
//     setCheckBox([{title:data.title, checked:true}])
//   }else{
//     checkBox.map(item => item === data ? ( 
//       setCheckBox(prev=> prev.map(each => each.title === data.title ? {...each, checked:false} : {...each})) 
//     ) : (
//       setCheckBox(prev=> prev.map(each => each === data ? {...each} :  {title:data.title, checked:true} ))
//     ))
//   }
// }

const handleChek =(data)=>{
  const exist = checkBox.find((x) => x.title === data.title);
  // console.log("data")
  // console.log(exist)
  if(exist){
    setCheckBox(
      checkBox.map((x)=>
      x.title === data.title ? {...exist, checked:!x.checked} : x
      )
    );
  }else{
    setCheckBox([...checkBox, {title:data.title, checked:true}]);
  }
}

const handleChek2 =(d)=>{
  const exist = checkBox.find((x) => x.title === d.title);
  // console.log("data")
  // console.log(exist)
  if(exist){
    setCheckBox(
      checkBox.map((x)=>
      x.title === d.title ? {...exist, checked:!x.checked} : x
      )
    );
  }else{
    setCheckBox([...checkBox, {title:d.title, checked:true}]);
  }
}

// const handleChek2=(d)=>{
//   if (checkBox.includes(d.title) === false){
//     setCheckBox(prev=>[...prev, d.title])
//   } 
//   console.log(d)

// }
  return (
    <>
      <div onClick={(e) => setOpen(true)} className="home__model">
        <MdEdit className="home__edit-add" />
      </div>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ overflowY: "scroll" }}
          width={600}
          height={600}
          bgcolor="white"
        >
          <div className="div">
            <div className="edit__header" varient="h6" fontWeight={700}>
              Search Products <GrClose onClick={() => setOpen(false)} />
            </div>
            <div className="edit__search">
              <GrSearch className="edit__search-icon" />
              <input
                className="edit__input"
                type="text"
                placeholder="Search product"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="opacity">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
            laborum esse accusamus velit sit, voluptates doloremque consequuntur
            obcaecati rem? Quaerat placeat quod commodi delectus ipsum! Nulla
            error facilis laudantium amet magnam odio esse, fugiatas Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Magnam illo, nesciunt
            earum eveniet inventore adipisci
          </div>

          {products
            .filter((data) => data.title.toLowerCase().includes(query))
            .map((data) => {
              return (
                <div key={data.id} className="edit__main-products">
                  <div className="edit__main-top">
                    <Checkbox
                      color="default"
                      name="allSelect"
                      onClick={()=>handleChek(data)}
                      // checked={
                      //   products.filter((data) => data?.isChecked !== true)
                      //     .length < 1
                      // }
                      // onChange={handleChange}
                    />
                    <img
                      className="edit__main-img"
                      src={data?.image?.src}
                      alt=""
                    />
                    <p className="edit__main-top-title">{data?.title}</p>
                  </div>
                  {data?.variants.map((d) => {
                    
                    return (
                      <div key={d?.id} className="edit__sub-products">
                        <Checkbox
                          color="default"
                          name={d?.title}
                      onClick={()=>handleChek2(d)}

                          // checked={d?.isChecked || false}
                          // onChange={handleChange}
                        />
                        <div className="edit__sub-info">
                          <p>{d?.title}</p>
                          <p>{"$" + d?.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          <div className="edit__footer">
            <p>1 product selected</p>
            <div>
            <button className="edit__btn" onClick={() => setOpen(false)}>Cancel</button>
            <button className="edit__btn-2" onClick={(e) => childToParent(e, checkBox)}>Add</button>
            </div>
          </div>
        </Box>
      </StyledModal>
    </>
  );
};

export default Edit;
