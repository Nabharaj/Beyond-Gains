document.getElementById('calorie-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form submission

    // Get values from the form
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const gender = document.getElementById('gender').value;
    const exercise = document.getElementById('exercise').value;  // Get exercise level
    const dietType = document.getElementById('diet-type').value; // Get diet type (veg/non-veg)

    // Calculate BMR using the Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE based on activity level
    let tdee;
    switch (exercise) {
        case 'sedentary': tdee = bmr * 1.2; break;
        case 'light': tdee = bmr * 1.375; break;
        case 'moderate': tdee = bmr * 1.55; break;
        case 'active': tdee = bmr * 1.725; break;
        case 'very-active': tdee = bmr * 1.9; break;
    }

    // Suggest caloric intake for weight loss
    const weightLossCalories = tdee - 500;  // To lose weight, suggest a 500-calorie deficit

    // Calculate daily protein intake (1.6 grams per kg of body weight)
    const dailyProteinIntake = weight * 1.6; // This can be adjusted based on goals (muscle gain etc.)

    // Protein diet suggestions based on diet type
    let proteinSuggestions;
    if (dietType === 'vegetarian') {
        proteinSuggestions = 'To meet your protein needs, you can include foods like lentils, chickpeas, tofu, quinoa, Greek yogurt, and beans in your diet.';
    } else {
        proteinSuggestions = 'To meet your protein needs, you can include chicken breast, eggs, fish, lean beef, turkey, and protein shakes in your diet.';
    }

    // Display the results
    document.getElementById('result').innerHTML = `
        Your BMR is ${bmr.toFixed(2)} calories/day.<br>
        Your TDEE (Total Daily Energy Expenditure) is ${tdee.toFixed(2)} calories/day.<br>
        To lose weight, you should consume around ${weightLossCalories.toFixed(2)} calories per day.<br>
        Your daily protein intake should be around ${dailyProteinIntake.toFixed(2)} grams.<br>
        ${proteinSuggestions}
    `;
});
