import React from "react";

const FilterBar = ({setFilter}) =>{
    console.log("Render Filter")
    
    return(
        <div>
           <button onClick={() => setFilter("all")}>All</button>
           <button onClick={()=> setFilter("active")}>Active</button>
           <button onClick={()=> setFilter("completed")}>Completed</button>
        </div>
    )
}

// export default FilterBar;
export default React.memo(FilterBar);