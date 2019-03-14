import React from 'react'
import '../css/HomePageSearchForm.css';


const HomePageSearchForm = () => {
  return (
    <div className="SearchForm" >
      <h3 className="title">Find a unique experience.</h3>
      <form>
        <label className="label">
          WHERE
          <input className="input" type="text" name="where" />
        </label>
        <label className="label">
          DATE
          <input className="input" type="text" name="date" />
        </label>
        <label className="label">
          TIME
          <input className="input" type="text" name="time" />
        </label>
        <input type="submit" value="Search" />
      </form>
    </div>
  )
}

export default HomePageSearchForm
