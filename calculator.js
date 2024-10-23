let weightLossCalories = 0; // Declare this variable globally to be accessible

// Toggle between cm and feet/inches for height input
document.getElementById('height-option').addEventListener('change', function() {
    const option = this.value;
    if (option === 'cm') {
        document.getElementById('height-cm-input').style.display = 'block';
        document.getElementById('height-feet-inches-input').style.display = 'none';
    } else {
        document.getElementById('height-cm-input').style.display = 'none';
        document.getElementById('height-feet-inches-input').style.display = 'block';
    }
});

// Handle form submission and calculations
document.getElementById('calorie-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const gender = document.getElementById('gender').value;
    const exercise = document.getElementById('exercise').value;
    const dietType = document.getElementById('diet-type').value; // Vegetarian or Non-Vegetarian
    const healthCondition = document.getElementById('health-condition').value;

    // Get height in cm
    let heightInCm = 0;
    if (document.getElementById('height-option').value === 'cm') {
        heightInCm = parseFloat(document.getElementById('height-cm').value);
    } else {
        const feet = parseFloat(document.getElementById('height-feet').value);
        const inches = parseFloat(document.getElementById('height-inches').value);
        heightInCm = (feet * 30.48) + (inches * 2.54);  // Convert feet/inches to cm
    }

    // Calculate BMR (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * heightInCm - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * heightInCm - 5 * age - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    let tdee;
    switch (exercise) {
        case 'sedentary': tdee = bmr * 1.2; break;
        case 'light': tdee = bmr * 1.375; break;
        case 'moderate': tdee = bmr * 1.55; break;
        case 'active': tdee = bmr * 1.725; break;
        case 'very-active': tdee = bmr * 1.9; break;
    }

    // Suggest caloric intake for weight loss (500 calorie deficit)
    weightLossCalories = tdee - 500;

    // Calculate daily protein intake (1.6 grams per kg of body weight)
    const dailyProteinIntake = weight * 1.6;

    // Display the results
    let healthWarning = '';
    if (healthCondition === 'yes') {
        healthWarning = '<br><strong>Note:</strong> You have a health condition. Please consult a doctor before following any diet.';
    }

    document.getElementById('result').innerHTML = `
        <strong>Your BMR is:</strong> ${bmr.toFixed(2)} calories/day<br>
        <strong>Your TDEE is:</strong> ${tdee.toFixed(2)} calories/day<br>
        <strong>To lose weight, consume around:</strong> ${weightLossCalories.toFixed(2)} calories/day<br>
        <strong>Your recommended daily protein intake is:</strong> ${dailyProteinIntake.toFixed(2)} grams/day
        ${healthWarning}
    `;

    // Show diet recommendation button
    document.getElementById('get-diet').style.display = 'block';
});

// Handle diet recommendations based on country and diet type
document.getElementById('get-diet').addEventListener('click', function() {
    document.getElementById('country-section').style.display = 'block';
});

// Show country-specific diet based on vegetarian or non-vegetarian
document.getElementById('get-country-diet').addEventListener('click', function() {
    const country = document.getElementById('country').value;
    const gender = document.getElementById('gender').value;
    const dietType = document.getElementById('diet-type').value; // Vegetarian or Non-Vegetarian
    let dietResult;

    // Suggest diets based on country, gender, and diet type
    if (country === 'usa') {
        dietResult = (dietType === 'non-vegetarian')
            ? (gender === 'male'
                ? `For men in the USA (Non-Vegetarian): 
                    Morning: 3 eggs, toast, 1 orange (~300 kcal)<br>
                    Afternoon: Grilled chicken sandwich with salad (~600 kcal)<br>
                    Evening: Steak with sweet potatoes and greens (~600 kcal).`
                : `For women in the USA (Non-Vegetarian): 
                    Morning: 2 eggs, toast, 1 apple (~250 kcal)<br>
                    Afternoon: Grilled chicken wrap with salad (~500 kcal)<br>
                    Evening: Salmon with quinoa and vegetables (~500 kcal).`)
            : (gender === 'male'
                ? `For men in the USA (Vegetarian): 
                    Morning: Oatmeal with nuts and seeds (~300 kcal)<br>
                    Afternoon: Grilled vegetable sandwich with hummus (~600 kcal)<br>
                    Evening: Lentil soup with quinoa and greens (~500 kcal).`
                : `For women in the USA (Vegetarian): 
                    Morning: Smoothie bowl with nuts and seeds (~250 kcal)<br>
                    Afternoon: Grilled vegetable wrap with hummus (~500 kcal)<br>
                    Evening: Lentil soup with quinoa and greens (~500 kcal).`);
    } else if (country === 'europe') {
        dietResult = (dietType === 'non-vegetarian')
            ? `Your recommended diet for Europe (Non-Vegetarian):<br>
                <strong>Morning:</strong> 2-3 eggs and one fruit (~300 kcal).<br>
                <strong>Afternoon:</strong> 2 slices of wholemeal bread, 1 bowl of vegetables (steamed in the microwave, add spices and 1 spoon of olive oil) (~500 kcal).<br>
                <strong>Night:</strong> 250 grams of chicken (steamed in the microwave), one fruit, and 100 grams of yogurt (~500 kcal).`
            : `Your recommended diet for Europe (Vegetarian):<br>
                <strong>Morning:</strong> Oatmeal with nuts and a fruit (~300 kcal).<br>
                <strong>Afternoon:</strong> 2 slices of wholemeal bread, 1 bowl of vegetables (steamed in the microwave, add spices and 1 spoon of olive oil) (~500 kcal).<br>
                <strong>Night:</strong> 200 grams of tofu, one fruit, and 100 grams of yogurt (~500 kcal).`;
    } else if (country === 'russia') {
        dietResult = (dietType === 'non-vegetarian')
            ? `Your recommended diet for Russia (Non-Vegetarian):<br>
                <strong>Morning:</strong> Eggs with black bread and cheese (~300 kcal).<br>
                <strong>Afternoon:</strong> Borscht soup with chicken breast (~500 kcal).<br>
                <strong>Night:</strong> Beef stew with boiled potatoes (~600 kcal).`
            : `Your recommended diet for Russia (Vegetarian):<br>
                <strong>Morning:</strong> Porridge with berries (~300 kcal).<br>
                <strong>Afternoon:</strong> Vegetable borscht and rye bread (~500 kcal).<br>
                <strong>Night:</strong> Potato pancakes with sour cream (~500 kcal).`;
    } else if (country === 'india') {
        dietResult = (dietType === 'non-vegetarian')
            ? (gender === 'male'
                ? `For men in India (Non-Vegetarian): 
                    Morning: 3 eggs, 1 banana (~250 kcal)<br>
                    Afternoon: 2 chapatis, dal, and vegetables (~500 kcal)<br>
                    Evening: 150g grilled chicken, salad, and yogurt (~500 kcal).`
                : `For women in India (Non-Vegetarian): 
                    Morning: 2 eggs, 1 apple (~200 kcal)<br>
                    Afternoon: 1 chapati, dal, and vegetables (~400 kcal)<br>
                    Evening: 100g grilled chicken, salad, and yogurt (~400 kcal).`)
            : (gender === 'male'
                ? `For men in India (Vegetarian): 
                    Morning: Paneer bhurji, 1 banana (~250 kcal)<br>
                    Afternoon: 2 chapatis, dal, and vegetables (~500 kcal)<br>
                    Evening: 100g paneer, salad, and yogurt (~500 kcal).`
                : `For women in India (Vegetarian): 
                    Morning: 2 slices of whole wheat bread with peanut butter (~200 kcal)<br>
                    Afternoon: 1 chapati, dal, and vegetables (~400 kcal)<br>
                    Evening: 100g tofu or paneer, salad, and yogurt (~400 kcal).`);
    }

    // Check if the diet suggestions match the user's calorie goal
    const totalCalories = 1300; // Example total calories for the diet
    if (totalCalories < weightLossCalories) {
        const extraCalories = weightLossCalories - totalCalories;
        dietResult += `<br><br><strong>You need ${extraCalories} more calories.</strong> You can add snacks like:<br>
        - A handful of nuts (~150 kcal)<br>
        - 1 banana (~90 kcal)<br>
        - Greek yogurt (~120 kcal)<br>
        - YOU Can Add More Eggs or chicken<br>
        - also you can add any health food just check calories.`;
    }

    // Display diet recommendations
    document.getElementById('diet-result').innerHTML = `<strong>Diet Recommendations:</strong><br>${dietResult}<br><br>Total Calories: ${weightLossCalories.toFixed(2)} kcal/day.`;
    document.getElementById('diet-result').style.display = 'block';
});
