import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const HealthCheck = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [restingHeartRate, setRestingHeartRate] = useState('');
  const [bmr, setBMR] = useState(0);
  const [calorieIntake, setCalorieIntake] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [bmi, setBMI] = useState(0);
  const [bmiCategory, setBMICategory] = useState('');
  const [targetHeartRateZones, setTargetHeartRateZones] = useState({});
  const [proteinIntake, setProteinIntake] = useState(0);
  const [mealPlan, setMealPlan] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    calculateBMR();
  }, [gender, age, weight, feet, inches, activityLevel]);

  const calculateBMR = () => {
    let bmrResult = 0;
    const totalInches = parseInt(feet) * 12 + parseInt(inches);
    if (gender === 'male') {
      bmrResult = 10 * weight + 6.25 * totalInches - 5 * age + 5;
    } else {
      bmrResult = 10 * weight + 6.25 * totalInches - 5 * age - 161;
    }
    setBMR(bmrResult);
    calculateCalorieIntake(bmrResult);
    calculateWaterIntake(weight);
    calculateBMI();
    calculateTargetHeartRateZones();
    calculateProteinIntake();
    generateMealPlan();
  };

  const calculateCalorieIntake = (bmr) => {
    let activityMultiplier = 1;
    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'lightlyActive':
        activityMultiplier = 1.375;
        break;
      case 'moderatelyActive':
        activityMultiplier = 1.55;
        break;
      case 'veryActive':
        activityMultiplier = 1.725;
        break;
      case 'extraActive':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }
    const calorieIntakeResult = Math.round(bmr * activityMultiplier);
    setCalorieIntake(calorieIntakeResult);
  };

  const calculateWaterIntake = (weight) => {
    const waterIntakeResult = Math.round(weight * 0.033);
    setWaterIntake(waterIntakeResult);
  };

  const calculateBMI = () => {
    const totalWeight = parseInt(weight) + (parseInt(feet) * 12 + parseInt(inches)) * 0.45;
    const totalHeight = ((parseInt(feet) * 12 + parseInt(inches)) * 0.025) ** 2;
    const bmiResult = Math.round(totalWeight / totalHeight);
    setBMI(bmiResult);
    calculateBMICategory(bmiResult);
  };

  const calculateBMICategory = (bmi) => {
    if (bmi < 18.5) {
      setBMICategory('Underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
      setBMICategory('Normal weight');
    } else if (bmi >= 25 && bmi < 30) {
      setBMICategory('Overweight');
    } else {
      setBMICategory('Obese');
    }
  };

//   const calculateTargetHeartRateZones = () => {
//     const maxHeartRate = 220 - age;
//     const heartRateReserve = maxHeartRate - parseInt(restingHeartRate);
//     const lowerZone = Math.round(0.5 * heartRateReserve) + parseInt(restingHeartRate);
//     const upperZone = Math.round(0.85 * heartRateReserve) + parseInt(restingHeartRate);
//     setTargetHeartRateZones({
//       lowerZone,
//       upperZone
//     });
//   };

  const calculateProteinIntake = () => {
    const proteinIntakeResult = Math.round(weight * 0.8);
    setProteinIntake(proteinIntakeResult);
  };

  const generateMealPlan = () => {
    const breakfastCalories = Math.round(calorieIntake * 0.25);
    const lunchCalories = Math.round(calorieIntake * 0.35);
    const dinnerCalories = Math.round(calorieIntake * 0.3);
    const snackCalories = Math.round(calorieIntake * 0.1);

    const mealPlanData = [
      { meal: 'Breakfast', calories: breakfastCalories, protein: Math.round(proteinIntake * 0.3), recommendation: 'Eggs, whole grain toast, avocado' },
      { meal: 'Lunch', calories: lunchCalories, protein: Math.round(proteinIntake * 0.4), recommendation: 'Grilled chicken salad with quinoa' },
      { meal: 'Dinner', calories: dinnerCalories, protein: Math.round(proteinIntake * 0.3), recommendation: 'Salmon, sweet potatoes, steamed vegetables' },
      { meal: 'Snack', calories: snackCalories, protein: Math.round(proteinIntake * 0.2), recommendation: 'Greek yogurt with berries' }
    ];
    setMealPlan(mealPlanData);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    let seconds = 0;
    const timerInterval = setInterval(() => {
      seconds++;
      setTimer(seconds);
    }, 1000);
    return () => clearInterval(timerInterval);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/3 bg-white rounded-lg p-4 shadow-lg">
      <div className="relative">
  <h2 className="text-center text-2xl mb-4">Basics Health Check</h2>
  <div className="flex justify-center items-center mb-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 mr-2 text-blue-500 animate-pulse"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 2c-2.667 0-5 2.333-5 5 0 4 5 8 5 8s5-4 5-8c0-2.667-2.333-5-5-5zm-1 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm1-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
        clipRule="evenodd"
      />
    </svg>
    <p className="text-blue-500 font-semibold">Performing health checks...</p>
  </div>
</div>

  <div className="space-y-2">
    <label className="block">
      Gender:
      <select
        className="block w-full border border-gray-300 rounded-md py-2 px-3"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </label>
    {/* Repeat for other input fields */}
    <label className="block">
      Age:
      <input
        type="number"
        className="block w-full border border-gray-300 rounded-md py-2 px-3"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
      />
    </label>
    <label className="block">
      Weight (kg):
      <input
        type="number"
        className="block w-full border border-gray-300 rounded-md py-2 px-3"
        value={weight}
        onChange={(e) => setWeight(parseInt(e.target.value))}
      />
    </label>
    <label className="block">
      Height (feet):
      <input
        type="number"
        className="block w-full border border-gray-300 rounded-md py-2 px-3"
        value={feet}
        onChange={(e) => setFeet(parseInt(e.target.value))}
      />
    </label>
    <label className="block">
      Height (inches):
      <input
        type="number"
        className="block w-full border border-gray-300 rounded-md py-2 px-3"
        value={inches}
        onChange={(e) => setInches(parseInt(e.target.value))}
      />
    </label>
    <label className="block">
      Activity Level:
      <select
        className="block w-full border border-gray-300 rounded-md py-2 px-3"
        value={activityLevel}
        onChange={(e) => setActivityLevel(e.target.value)}
      >
        <option value="sedentary">Sedentary (little or no exercise)</option>
        <option value="lightlyActive">Lightly active (exercise 1-3 days/week)</option>
        <option value="moderatelyActive">Moderately active (exercise 3-5 days/week)</option>
        <option value="veryActive">Very active (exercise 6-7 days/week)</option>
        <option value="extraActive">Extra active (very hard exercise, physical job)</option>
      </select>
    </label>
    <label className="block">
      Resting Heart Rate:
      <input
        type="number"
        className="block w-full border border-gray-300 rounded-md py-2 px-3"
        value={restingHeartRate}
        onChange={(e) => setRestingHeartRate(parseInt(e.target.value))}
      />
    </label>
    <button onClick={calculateBMR} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
      <FontAwesomeIcon icon={faUtensils} className="mr-2" /> Calculate BMR and Generate Meal Plan
    </button>
  </div>
</div>


      <div className="w-3/5 bg-white rounded-lg p-8 shadow-lg ml-8">
      <div className="relative">
  <h2 className="text-center text-2xl mb-4">Results</h2>
  <div className="flex justify-center items-center mb-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-2 w-2 mr-2 text-blue-500 animate-bounce"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 2C5.03 2 1 6.03 1 11a9 9 0 0 0 18 0c0-4.97-4.03-9-9-9zM5 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm1-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        clipRule="evenodd"
      />
    </svg>
    <p className="text-blue-500 font-semibold animate-pulse">Analyzing...</p>
  </div>
</div>

        <div className="space-y-4">
        <div className="result-item">
        <strong>Your BMR is:</strong> {bmr} calories/day
    </div>
    <div className="result-item">
      <strong>Your recommended daily calorie intake is:</strong> {calorieIntake} calories/day
    </div>
    <div className="result-item">
      <strong>Your recommended daily water intake is:</strong> {waterIntake} ml/day
    </div>
    <div className="result-item">
      <strong>Your BMI is:</strong> {bmi}
    </div>
    <div className="result-item">
      <strong>Your BMI category is:</strong> {bmiCategory}
    </div>
    <div className="result-item">
      <strong>Your target heart rate zones:</strong>
      <ul>
        <li>Lower Zone: {targetHeartRateZones.lowerZone} bpm</li>
        <li>Upper Zone: {targetHeartRateZones.upperZone} bpm</li>
      </ul>
    </div>
    <div className="result-item">
      <strong>Your recommended daily protein intake is:</strong> {proteinIntake} grams/day
    </div>
  </div>
  <div className="meal-plan">
    <h3>Meal Plan</h3>
    <ul>
      {/* Meal plan items */}
      {mealPlan.map((item, index) => (
        <li key={index}>
          <strong>{item.meal}:</strong> {item.calories} calories, {item.protein} grams of protein, Recommendation: {item.recommendation}
        </li>
      ))}
    </ul>
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;
