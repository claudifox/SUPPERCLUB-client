import React from 'react'

const HomePageSearchForm = () => {
  return (
    <form>
      <label>
        WHERE
        <input type="text" name="where" />
      </label>
      <label>
        DATE
        <input type="text" name="date" />
      </label>
      <label>
        TIME
        <input type="text" name="time" />
      </label>
      <input type="submit" value="Search" />
    </form>
  )
}

export default HomePageSearchForm
