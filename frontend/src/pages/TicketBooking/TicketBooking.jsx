import React, { useState } from 'react'
import './TicketBooking.css'
import Search from'../../components/Search/Search.jsx'

const TicketBooking = () => {
  const steps = [
    { number: 1, name: 'Search', component: Search },
    { number: 2, name: 'Listing', component: Search },
    { number: 3, name: 'Book', component: Search },
    { number: 4, name: 'Confirm', component: Search },
  ];
  
  
  const [activeStep, setActiveStep] = useState(1);

  const handleStepClick = (stepNumber) => {
    setActiveStep(stepNumber);
  };

  const getStepClass = (stepNumber) => {
    if (stepNumber === activeStep) return 'active';
    if (stepNumber < activeStep) return 'completed';
    return 'inactive';
  };

  return (
    <div className="progress-container">
      <div className="progress-bar">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div
              className={`step ${getStepClass(step.number)}`}
              onClick={() => handleStepClick(step.number)}
            >
              <div className="step-circle">
                <span className="step-number">{step.number}</span>
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
              <span className="step-name">{step.name}</span>
            </div>
            {index < steps.length - 1 && <div className={`step-connector ${getStepClass(step.number + 1)}`}></div>}
          </React.Fragment>
        ))}
      </div>
      <div className="step-content-container">
        {React.createElement(steps[activeStep - 1].component)}
      </div>
    </div>
  )
}

export default TicketBooking
