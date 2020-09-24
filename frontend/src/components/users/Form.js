import React from 'react'
import { useHistory } from 'react-router-dom'

function Form() {
  const history = useHistory()
  const [formData, setFormData] = React.useState({
    title: 'Mr',
    fullName: '',
    dateOfBirth: '',
    houseNumber: '',
    postcode: '',
    employmentStatus: 'Full Time',
    income: ''
  })
  const [errors, setErrors] = React.useState({})

  //! Function to handle changes to the form and set the form data to state. This is done by spreading the current formData in state then applying changes based on event target name and event target value.
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: false })

  }

  //! Function to handle submit on the form. Redirect user to the available cards component and supply the inputted data via props. This can then be used to make neccisary comparisons against the criteria of the card. 
  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      //! Check for unfilled input fields
      const errs = {}
      for (const [key, value] of Object.entries(formData)) {
        if (value === '') errs[key] = true
      }
      //! if no errors are found in the object proceed to cards available to the user. else set the errors state for input fields to turn red.
      return Object.keys(errs).length < 1 ? history.push('/your-available-cards', { ...formData }) : setErrors(errs)
    } catch (err) {
      console.log(err)
    }
  }

  //! Render JSX of a form of title, name, date of birth, employment status, address (house number/ name and postcode) and annual income.
  return (
    <div className="form--page">

      <form onSubmit={handleSubmit}>
        <h1> Find out what cards you are eligible for</h1>

        <div className="form--input">
          <label>Please enter your title<span>*</span></label>
          <select
            onChange={handleChange}
            name="title"
            value={formData.title}>
            <option value="Mr">Mr.</option>
            <option value="Mrs">Mrs.</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
          </select>
        </div>

        <div className="form--input">
          <label>Please enter your full name<span>*</span></label>
          <input
            onChange={handleChange}
            placeholder="Full Name"
            type="text"
            name="fullName"
            className={`input ${errors.fullName ? 'red' : ''}`}
            value={formData.fullName}
          />
        </div>

        <div className="form--input">
          <label>Please enter your date of birth<span>*</span></label>
          <input
            onChange={handleChange}
            type="date"
            name="dateOfBirth"
            className={`input ${errors.dateOfBirth ? 'red' : ''}`}
            value={formData.dateOfBirth}
          />
        </div>

        <div className="form--input">
          <label>Please enter your employment status<span>*</span></label>
          <select
            onChange={handleChange}
            name="employmentStatus"
            value={formData.employmentStatus}>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <div className="form--input">
          <label>Please enter your house number<span>*</span></label>
          <input
            className={`input ${errors.houseNumber ? 'red' : ''}`}
            onChange={handleChange}
            placeholder="House number or name"
            type="text"
            name="houseNumber"
            value={formData.houseNumber}
          />
        </div>

        <div className="form--input">
          <label>Please enter your postcode<span>*</span></label>
          <input
            className={`input ${errors.postcode ? 'red' : ''}`}
            onChange={handleChange}
            placeholder="Postcode"
            type="text"
            name="postcode"
            value={formData.postcode}
          />
        </div>

        <div className="form--input">
          <label>Please enter your annual income<span>*</span></label>
          <input
            className={`input ${errors.income ? 'red' : ''}`}
            onChange={handleChange}
            placeholder="Income"
            type="number"
            name="income"
            value={formData.income}
          />

        </div>
        <button>Submit</button>
      </form>

    </div>
  )
}

export default Form