import React from 'react'
import { getAllCards } from '../../lib/api'
import { Link, Redirect } from 'react-router-dom'

const initialState = {
  data: null,
  error: null,
  loading: true
}

function AvailableCards(props) {
  //! takes props passed from form component and adds it to state.
  const [userDetails] = React.useState(props.location.state)
  //! sets an initial state for useEffect.
  const [cards, setCards] = React.useState(initialState)
  const [availableFunds, setAvailableFunds] = React.useState(0)
  const [findOutMore, setFindOutMore] = React.useState({ arr: [] })

  //! useEffect hook to get the data from the mockAPI then sets state with the JSON objects received. 
  React.useEffect(() => {
    const getCards = async () => {
      try {
        const { data } = await getAllCards()
        setCards({ data, loading: false, error: null })
      } catch (err) {
        setCards({ error: true, loading: false, data: null })
      }
    }
    getCards()
  }, [])

  if (!userDetails) return (
    <div className="errors--page">
      <h1> Please submit details to see available cards</h1>
      <p><Link to="/form">Click here</Link> to find out your eligibility</p>
    </div>
  )

  if(cards.error) return <Redirect to="/errors"></Redirect>

  //! Function to capitalize first letters of customers names.
  const capitalize = () => {
    return userDetails.fullName.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ')
  }

  //! Function to filter available card. 
  const filterCards = () => {
    let filteredCards
    //! Filter method cards in state for required employment type against user's employment status. 
    const checkEmploymentStatus = () => {
      filteredCards = cards.data.filter(card => card.employmentType.some(type => type === userDetails.employmentStatus))
      checkIncome()
    }
    //! Takes the cards filtered by employment and filters users income agsinst the required income.
    const checkIncome = () => {
      filteredCards = filteredCards.filter(card => card.incomeNeeded <= userDetails.income)
    }
    checkEmploymentStatus()
    //! return filtered cards for rendering.
    // console.log(filteredCards)
    return filteredCards
  }

  //! A function to handle an onClick. This function sets the the clicked card to the findOutMore array and takes the credit available on each card and adds it to the available funds state.
  const showCardInfo = (card) => {
    //! Only add cards to findOutMore array If the id of the clicked card doesnt already exist.
    if (!findOutMore.arr.some(check => check.id === card.id)) {
      setFindOutMore({ arr: findOutMore.arr.concat({ ...card }) })
      setAvailableFunds(availableFunds + parseInt(card.creditAvailable))
    }
  }

  //! JSX for rendering the findOutMore if its length is atleast one, filtered cards, onClick function to add selected cards and add a total available funds. 
  return (
    <div className="page--container" >
      {cards.loading ? <h1>Loading</h1> :
        <div className="page">

          <div className="left--side">
            <h1>Your Cards:</h1>
            {availableFunds > 1 ? <h3>Total credit available to you: £{availableFunds}</h3> : null}

            {findOutMore.arr.length > 0 ? findOutMore.arr.map(card => (
              <div key={card.id} className="each--card">
                <h4>{card.cardName}</h4>
                <p>Total credit available: £{card.creditAvailable}</p>
                <p>APR: {card.apr}</p>
                <p>Balance Transfer Offer Duration: {card.balanceTransferOfferDuration}</p>
                <p>Purchase Offer Duration: {card.purchaseOfferDuration}</p>
              </div>
            )) : <p>Add cards to find out more.</p>}
          </div>

          <div className="right--side">
            <h1>Hi {capitalize()}!</h1>
            <p>Heres whats available to you</p>
            {filterCards().length > 0 ?
              filterCards().map(card => (
                <div key={card.id} className="each--card" onClick={() => showCardInfo(card)}>
                  <h1>{card.cardName}</h1>
                  <p>(Click to find out more!)</p>
                </div>
              )) :
              <h1> No cards are available to you at this time.</h1>}
          </div>

        </div>}
    </div >
  )
}

export default AvailableCards