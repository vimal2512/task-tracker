import React from "react";

const FilterBar = ({filter,setFilter,completedTasks,clearCompleted}) =>{
    console.log("Render Filter")
    
  

    return(
        <div className="filter-bar">
           <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
             All
           </button>
           <button onClick={()=> setFilter("active")} className={filter === "active" ? "active" : ""}>
             Active
           </button>
           <button onClick={()=> setFilter("completed")} className={filter === "completed" ? "active" : ""}>
             Completed
            </button>

           {completedTasks > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
                Clear Completed
            </button>
           )}
        </div>
    )
}

// export default FilterBar;
export default React.memo(FilterBar);