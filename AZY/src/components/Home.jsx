import React, { useState, useEffect } from "react";
import logo from '../assets/logo.png'; // Import image from src/assets
import "../App.css"; 
import { FaMale, FaFemale, FaGenderless, FaStethoscope, FaChartBar, FaUserAlt, FaCog } from "react-icons/fa"; // Import icons


const Home = () => {
  const [step, setStep] = useState(1); // Current step
  const [breadcrumbs, setBreadcrumbs] = useState([]); // Track breadcrumb trail

  // Define the steps content for each step
  const stepsContent = {
    1: ["Pharma", "Medical", "Area", "Demographics"],
    2: ["Male", "Female", "Other"],
    3: ["10-20", "20-30", "30-40", "40-50", "50-60"],
    4: ["P1", "P2", "P3", "P4", "P5"],
  };
// Map each step content to an icon
const getIconForStep = (content, step) => {
    switch (step) {
      case 1:
        if (content === "Pharma") return <FaStethoscope />;
        if (content === "Medical") return <FaChartBar />;
        if (content === "Area") return <FaUserAlt />;
        if (content === "Demographics") return <FaCog />;
        break;
      case 2:
        if (content === "Male") return <FaMale />;
        if (content === "Female") return <FaFemale />;
        if (content === "Other") return <FaGenderless />;
        break;
      case 3:
        return <FaUserAlt />; // Example icon for age ranges
      case 4:
        return <FaCog />; // Example icon for P1, P2, etc.
      default:
        return null;
    }
  };
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setAnimationClass("rotate");
    const timer = setTimeout(() => setAnimationClass(""), 500);
    return () => clearTimeout(timer);
  }, [step]);

  // Handle the circle click: Move to the next step and update the breadcrumb
  const handleCircleClick = (index) => {
    // Prevent the click action if we're in step 4
    if (step === 4) {
      return; // Do nothing if clicked on P1, P2, P3, P4, or P5
    }
  
    const selectedContent = stepsContent[step][index];
    
    // Update breadcrumbs based on the current step
    setBreadcrumbs((prevBreadcrumbs) => {
      const newBreadcrumbs = [...prevBreadcrumbs];
      // If we're not at the last step, update the breadcrumb at the current step index
      if (newBreadcrumbs.length < step) {
        newBreadcrumbs.push(selectedContent);
      } else {
        newBreadcrumbs[step - 1] = selectedContent;
      }
      return newBreadcrumbs;
    });
  
    // Move to the next step
    setStep(step + 1);
  };
  

  // Handle clicking on a breadcrumb to navigate back
  const handleBreadcrumbClick = (breadcrumbIndex) => {
    setStep(breadcrumbIndex + 1); // Go to the step corresponding to the clicked breadcrumb
    setBreadcrumbs(breadcrumbs.slice(0, breadcrumbIndex + 1)); // Trim the breadcrumb path
  };

  const calculatePosition = (index, length) => {
    const angle = (index / length) * 2 * Math.PI;
    const x = 200 * Math.cos(angle);
    const y = 200 * Math.sin(angle);
    return { x, y };
  };

  const currentCircles = stepsContent[step] || []; // Safeguard if no content for the current step

  return (
    <div className="app">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={index}>
            <button
              onClick={() => handleBreadcrumbClick(index)}
              aria-label={`Go to ${breadcrumb}`}
              className="breadcrumb-button"
            >
              {breadcrumb}
            </button>
            {index < breadcrumbs.length - 1 && " > "}
          </span>
        ))}
      </div>

      <div className="home">
        <div className="circle-outline">
          <div className="center-logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>

        {/* Outer Circles */}
        <div className={`circle-container ${animationClass}`}>
        {currentCircles.map((content, index) => {
            const { x, y } = calculatePosition(index, currentCircles.length);
            return (
              <div
                key={index}
                className="outer-circle"
                style={{
                  transform: `translate(${x + 200 - 40}px, ${y + 200 - 40}px)`, 
                  // Correct translation
                }}
                onClick={() => handleCircleClick(index)}
                aria-label={`Select ${content}`} // Adding accessibility
                tabIndex={0} // Adding keyboard navigation
              > 
                {/* {getIconForStep(content, step)}  */}
                {content}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default Home;
