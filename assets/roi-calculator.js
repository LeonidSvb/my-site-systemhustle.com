// ROI Calculator Functionality
class ROICalculator {
    constructor() {
        this.teamSizeSlider = document.getElementById('teamSize');
        this.revenueSlider = document.getElementById('monthlyRevenue');
        this.efficiencySlider = document.getElementById('processEfficiency');
        
        if (!this.teamSizeSlider) return; // Exit if ROI calculator not present
        
        this.teamSizeValue = document.getElementById('teamSizeValue');
        this.revenueValue = document.getElementById('revenueValue');
        this.efficiencyValue = document.getElementById('efficiencyValue');
        
        this.timeSaved = document.getElementById('timeSaved');
        this.monthlySavings = document.getElementById('monthlySavings');
        this.revenueIncrease = document.getElementById('revenueIncrease');
        this.annualROI = document.getElementById('annualROI');
        
        this.initEventListeners();
        this.calculateROI();
    }
    
    initEventListeners() {
        this.teamSizeSlider.addEventListener('input', this.updateValues.bind(this));
        this.revenueSlider.addEventListener('input', this.updateValues.bind(this));
        this.efficiencySlider.addEventListener('input', this.updateValues.bind(this));
    }
    
    // Logarithmic mapping for sliders (70% of range for 1-10)
    mapTeamSize(sliderValue) {
        if (sliderValue <= 70) {
            // 0-70 maps to 1-10 (70% of slider range)
            return Math.round(1 + (sliderValue / 70) * 9);
        } else {
            // 71-100 maps to 11-100 (30% of slider range)
            return Math.round(11 + ((sliderValue - 70) / 30) * 89);
        }
    }
    
    mapRevenue(sliderValue) {
        if (sliderValue <= 70) {
            // 0-70 maps to 1K-10K (70% of slider range)
            return Math.round(1000 + (sliderValue / 70) * 9000);
        } else {
            // 71-100 maps to 11K-100K (30% of slider range)
            return Math.round(11000 + ((sliderValue - 70) / 30) * 89000);
        }
    }
    
    updateValues() {
        // Map slider values to actual values
        const actualTeamSize = this.mapTeamSize(parseInt(this.teamSizeSlider.value));
        const actualRevenue = this.mapRevenue(parseInt(this.revenueSlider.value));
        
        // Update display values
        this.teamSizeValue.textContent = actualTeamSize;
        this.revenueValue.textContent = this.formatNumber(actualRevenue);
        this.efficiencyValue.textContent = this.efficiencySlider.value;
        
        // Recalculate ROI
        this.calculateROI();
    }
    
    calculateROI() {
        const teamSize = this.mapTeamSize(parseInt(this.teamSizeSlider.value));
        const monthlyRevenue = this.mapRevenue(parseInt(this.revenueSlider.value));
        const currentEfficiency = parseInt(this.efficiencySlider.value);
        
        // Efficiency multiplier (lower efficiency = more potential for improvement)
        const efficiencyMultiplier = (10 - currentEfficiency) / 9; // 1.0 for efficiency=1, 0.1 for efficiency=9
        
        // Base time savings calculation
        let baseHoursPerPersonPerWeek;
        if (teamSize <= 5) {
            baseHoursPerPersonPerWeek = 6; // Small teams
        } else if (teamSize <= 15) {
            baseHoursPerPersonPerWeek = 8; // Medium teams
        } else {
            baseHoursPerPersonPerWeek = 10; // Large teams
        }
        
        // Calculate weekly time saved based on team size and efficiency
        const timeMultiplier = Math.max(0.2, efficiencyMultiplier); // Minimum 20% improvement
        const totalWeeklyTimeSaved = Math.round(teamSize * baseHoursPerPersonPerWeek * timeMultiplier);
        
        // Revenue increase calculation (more realistic 3-12% range)
        const revenueBoostPercent = 0.03 + (0.09 * efficiencyMultiplier); // 3% to 12%
        const monthlyRevenueIncrease = Math.round(monthlyRevenue * revenueBoostPercent);
        
        // Annual ROI calculation
        const annualValue = monthlyRevenueIncrease * 12;
        
        // Update display with animations
        this.animateValue(this.timeSaved, totalWeeklyTimeSaved);
        this.animateValue(this.revenueIncrease, monthlyRevenueIncrease);
        this.animateValue(this.annualROI, annualValue);
    }
    
    animateValue(element, targetValue) {
        const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
        const increment = (targetValue - currentValue) / 20;
        let currentStep = 0;
        
        const timer = setInterval(() => {
            currentStep++;
            const newValue = Math.round(currentValue + (increment * currentStep));
            
            if (currentStep >= 20) {
                element.textContent = this.formatNumber(targetValue);
                clearInterval(timer);
            } else {
                element.textContent = this.formatNumber(newValue);
            }
        }, 30);
    }
    
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// Initialize ROI Calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ROICalculator();
});