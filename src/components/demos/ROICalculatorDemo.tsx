import React, { useState } from "react";
import "./ROICalculatorDemo.css";

interface CalculationResult {
  monthlySavings: number;
  annualSavings: number;
  paybackPeriod: number;
  threeYearROI: number;
  fiveYearROI: number;
}

const ROICalculatorDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    currentOperators: 5,
    operatorSalary: 3500,
    benefits: 25,
    shiftHours: 8,
    shiftsPerDay: 2,
    workingDays: 22,
    robotCost: 150000,
    maintenanceCost: 5000,
    electricityCost: 200,
    installationCost: 25000,
    trainingCost: 10000,
  });

  const [results, setResults] = useState<CalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    const {
      currentOperators,
      operatorSalary,
      benefits,
      shiftHours,
      shiftsPerDay,
      workingDays,
      robotCost,
      maintenanceCost,
      electricityCost,
      installationCost,
      trainingCost,
    } = formData;

    // Calculate current costs
    const monthlyOperatorCost =
      currentOperators * operatorSalary * (1 + benefits / 100);
    const annualOperatorCost = monthlyOperatorCost * 12;

    // Calculate robot costs
    const totalRobotCost = robotCost + installationCost + trainingCost;
    const annualRobotCost = maintenanceCost + electricityCost * 12;

    // Calculate savings
    const monthlySavings = monthlyOperatorCost - annualRobotCost / 12;
    const annualSavings = annualOperatorCost - annualRobotCost;

    // Calculate ROI
    const paybackPeriod = totalRobotCost / annualSavings;
    const threeYearROI =
      ((annualSavings * 3 - totalRobotCost) / totalRobotCost) * 100;
    const fiveYearROI =
      ((annualSavings * 5 - totalRobotCost) / totalRobotCost) * 100;

    setResults({
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      threeYearROI: Math.round(threeYearROI * 10) / 10,
      fiveYearROI: Math.round(fiveYearROI * 10) / 10,
    });
    setShowResults(true);
  };

  const handleInputChange = (field: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      currentOperators: 5,
      operatorSalary: 3500,
      benefits: 25,
      shiftHours: 8,
      shiftsPerDay: 2,
      workingDays: 22,
      robotCost: 150000,
      maintenanceCost: 5000,
      electricityCost: 200,
      installationCost: 25000,
      trainingCost: 10000,
    });
    setShowResults(false);
  };

  return (
    <div className="roi-calculator-demo">
      <div className="demo-header">
        <h3>ROI Calculator - Forklift Replacement Analysis</h3>
        <p>
          Calculate the return on investment for replacing forklift operators
          with Balyo robots.
        </p>
      </div>

      <div className="calculator-container">
        <div className="input-section">
          <h4>Current Operations</h4>
          <div className="input-grid">
            <div className="input-group">
              <label>Number of Operators</label>
              <input
                type="number"
                value={formData.currentOperators}
                onChange={(e) =>
                  handleInputChange(
                    "currentOperators",
                    parseInt(e.target.value) || 0
                  )
                }
                min="1"
                max="50"
              />
            </div>
            <div className="input-group">
              <label>Monthly Salary (€)</label>
              <input
                type="number"
                value={formData.operatorSalary}
                onChange={(e) =>
                  handleInputChange(
                    "operatorSalary",
                    parseInt(e.target.value) || 0
                  )
                }
                min="2000"
                max="8000"
              />
            </div>
            <div className="input-group">
              <label>Benefits (%)</label>
              <input
                type="number"
                value={formData.benefits}
                onChange={(e) =>
                  handleInputChange("benefits", parseInt(e.target.value) || 0)
                }
                min="0"
                max="50"
              />
            </div>
            <div className="input-group">
              <label>Hours per Shift</label>
              <input
                type="number"
                value={formData.shiftHours}
                onChange={(e) =>
                  handleInputChange("shiftHours", parseInt(e.target.value) || 0)
                }
                min="4"
                max="12"
              />
            </div>
            <div className="input-group">
              <label>Shifts per Day</label>
              <input
                type="number"
                value={formData.shiftsPerDay}
                onChange={(e) =>
                  handleInputChange(
                    "shiftsPerDay",
                    parseInt(e.target.value) || 0
                  )
                }
                min="1"
                max="3"
              />
            </div>
            <div className="input-group">
              <label>Working Days per Month</label>
              <input
                type="number"
                value={formData.workingDays}
                onChange={(e) =>
                  handleInputChange(
                    "workingDays",
                    parseInt(e.target.value) || 0
                  )
                }
                min="15"
                max="31"
              />
            </div>
          </div>

          <h4>Robot Investment</h4>
          <div className="input-grid">
            <div className="input-group">
              <label>Robot Cost (€)</label>
              <input
                type="number"
                value={formData.robotCost}
                onChange={(e) =>
                  handleInputChange("robotCost", parseInt(e.target.value) || 0)
                }
                min="50000"
                max="500000"
              />
            </div>
            <div className="input-group">
              <label>Installation Cost (€)</label>
              <input
                type="number"
                value={formData.installationCost}
                onChange={(e) =>
                  handleInputChange(
                    "installationCost",
                    parseInt(e.target.value) || 0
                  )
                }
                min="5000"
                max="100000"
              />
            </div>
            <div className="input-group">
              <label>Training Cost (€)</label>
              <input
                type="number"
                value={formData.trainingCost}
                onChange={(e) =>
                  handleInputChange(
                    "trainingCost",
                    parseInt(e.target.value) || 0
                  )
                }
                min="1000"
                max="50000"
              />
            </div>
            <div className="input-group">
              <label>Annual Maintenance (€)</label>
              <input
                type="number"
                value={formData.maintenanceCost}
                onChange={(e) =>
                  handleInputChange(
                    "maintenanceCost",
                    parseInt(e.target.value) || 0
                  )
                }
                min="1000"
                max="20000"
              />
            </div>
            <div className="input-group">
              <label>Monthly Electricity (€)</label>
              <input
                type="number"
                value={formData.electricityCost}
                onChange={(e) =>
                  handleInputChange(
                    "electricityCost",
                    parseInt(e.target.value) || 0
                  )
                }
                min="50"
                max="1000"
              />
            </div>
          </div>

          <div className="button-group">
            <button onClick={calculateROI} className="calculate-btn">
              Calculate ROI
            </button>
            <button onClick={resetForm} className="reset-btn">
              Reset
            </button>
          </div>
        </div>

        {showResults && results && (
          <div className="results-section">
            <h4>ROI Analysis Results</h4>
            <div className="results-grid">
              <div className="result-card">
                <div className="result-icon">💰</div>
                <div className="result-content">
                  <div className="result-value">
                    €{results.monthlySavings.toLocaleString()}
                  </div>
                  <div className="result-label">Monthly Savings</div>
                </div>
              </div>
              <div className="result-card">
                <div className="result-icon">📈</div>
                <div className="result-content">
                  <div className="result-value">
                    €{results.annualSavings.toLocaleString()}
                  </div>
                  <div className="result-label">Annual Savings</div>
                </div>
              </div>
              <div className="result-card">
                <div className="result-icon">⏱️</div>
                <div className="result-content">
                  <div className="result-value">
                    {results.paybackPeriod} years
                  </div>
                  <div className="result-label">Payback Period</div>
                </div>
              </div>
              <div className="result-card">
                <div className="result-icon">🎯</div>
                <div className="result-content">
                  <div className="result-value">{results.threeYearROI}%</div>
                  <div className="result-label">3-Year ROI</div>
                </div>
              </div>
              <div className="result-card">
                <div className="result-icon">🚀</div>
                <div className="result-content">
                  <div className="result-value">{results.fiveYearROI}%</div>
                  <div className="result-label">5-Year ROI</div>
                </div>
              </div>
            </div>

            <div className="summary">
              <h5>Investment Summary</h5>
              <div className="summary-content">
                <div className="summary-item">
                  <span>Total Investment:</span>
                  <span>
                    €
                    {(
                      formData.robotCost +
                      formData.installationCost +
                      formData.trainingCost
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Annual Robot Costs:</span>
                  <span>
                    €
                    {(
                      formData.maintenanceCost +
                      formData.electricityCost * 12
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Net Annual Savings:</span>
                  <span>€{results.annualSavings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROICalculatorDemo;
