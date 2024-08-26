import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useNavigate } from 'react-router-dom';

import './index.css'

const CustomerInfo = () => (
  <Box>
    <div className='customer-info'>
    <div>
      <h2 className='customer-info-heading'>Customer Info</h2>
      <TextField id="outlined-basic" label="FULLNAME(First and Last name)" style={{ marginBottom: '36px', width: '600px' }} className='form-input-el' variant="outlined" />
      <br />
      <TextField id="outlined-basic" label="Mobile number" style={{ marginBottom: '36px', width: '600px'  }} className='form-input-el' variant="outlined" />
      <br />
      <TextField id="outlined-basic" label="Pincode" style={{ marginBottom: '36px', width: '600px'  }} className='form-input-el' variant="outlined" />
      <br />
      <TextField id="outlined-basic" label="Flat, House no., Building, Company, Apartment" style={{ marginBottom: '36px', width: '600px'  }} className='form-input-el' variant="outlined" />
      <br />
      <TextField id="outlined-basic" label="Area, Street, Sector, Village" style={{ marginBottom: '36px', width: '600px'  }} className='form-input-el' variant="outlined" />
      <br />
      <TextField id="outlined-basic" label="Landmark" style={{ marginBottom: '36px', width: '600px'  }} className='form-input-el' variant="outlined" />
      <br />
      <div>
      <TextField id="outlined-basic" label="Town/City" style={{ marginBottom: '36px', width: '600px'  }} className='form-input-el' variant="outlined" />
      </div>
      </div>
    </div>
  </Box>
);

const Payment = () => (
  <Box>
    <div className='payment'>
    <div className='card'>
      <h2 className='customer-info-heading'>Credit Card Details</h2>
      <hr />
      <div className='card-container'>
        <div className='card'>
          <p>CARD HOLDER</p>
          <input type='text' className='card-input-el' />
        </div>
        <div className='card'>
          <p>EXPIRATION DATE</p>
          <input type='month' className='card-input-el' />
        </div>
      </div>
      <div className='card-container'>
        <div className='card'>
          <p>CARD NUMBER</p>
          <input type='text' className='card-input-el' />
        </div>
        <div className='card'>
          <p>CVC</p>
          <input type='text' className='card-input-el' />
        </div>
      </div>
    </div>
    </div>
  </Box>
);
 

const OrderPlaced: React.FC = () => {
    const { width, height } = useWindowSize();
  
    return (
      <div className='order'>
        <Confetti
          width={width}
          height={height}
        />
        <Box>
          <div>
            <Typography variant="h4">Order Placed</Typography>
            <img className='order-placed-img' src='https://res.cloudinary.com/dedvz7flb/image/upload/v1723357140/check_14025690_tfzdi8.png' alt='orderPlaced'/>
          </div>
        </Box>
      </div>
    );
  };
  

const stepComponents = [
  <CustomerInfo />,
  <Payment />,
  <OrderPlaced />,
];

const steps = ['Customer Info', 'Payment', 'OrderPlaced'];



export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/')
  }

  const isStepOptional = (step: number) => {
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
    
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={redirectToHome}>Shop More</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>
            {/* Render the component for the current step */}
            {stepComponents[activeStep]}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button
  onClick={activeStep === steps.length - 1 ? redirectToHome : handleNext}
>
  {activeStep === steps.length - 1 ? 'Shop More' : 'Next'}
</Button>

          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
