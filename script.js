document.addEventListener('DOMContentLoaded', function () {
    const lessonMatch = document.title.match(/Lesson (\d+):/);
    const lessonNum = lessonMatch ? lessonMatch[1] : '1';

    let questions;

    const allQuestions = {
        "1": [ // Making a Reservation
            { q: "What is the first step when calling for a reservation?", a: "Stating the date and time", options: ["Asking for the bill", "Stating the date and time", "Complaining about food"] },
            { q: "What does 'party of four' mean?", a: "Four people in total", options: ["Four people in total", "A party with music", "Four separate tables"] },
            { q: "Which word describes a table that is already taken?", a: "Reserved", options: ["Vacant", "Reserved", "Available"] },
            { q: "What should you do if you are running 15 minutes late?", a: "Call the restaurant", options: ["Ignore it", "Call the restaurant", "Ask for a refund"] },
            { q: "A 'no-show' fee is charged when:", a: "You don't show up without cancelling", options: ["You arrive early", "You don't show up without cancelling", "You order dessert"] },
            { q: "What is a 'booth' in a restaurant?", a: "A semi-enclosed seating area", options: ["A storage room", "A semi-enclosed seating area", "The kitchen entrance"] },
            { q: "When is the 'off-peak' time usually?", a: "Between lunch and dinner", options: ["Saturday night", "Between lunch and dinner", "7:00 PM"] },
            { q: "What does 'fully booked' mean?", a: "No more tables are available", options: ["The books are heavy", "No more tables are available", "The staff is tired"] },
            { q: "Why might a restaurant ask for a credit card number?", a: "To secure the booking against no-shows", options: ["To buy groceries", "To secure the booking against no-shows", "To tip the chef"] }
        ],
        "2": [ // Booking a Hotel Room
            { q: "What does 'occupancy' refer to in a hotel?", a: "The number of people in a room", options: ["The hotel's location", "The number of people in a room", "The price of breakfast"] },
            { q: "A 'suite' is usually:", a: "Larger than a standard room", options: ["Smaller than a standard room", "Larger than a standard room", "Located in the basement"] },
            { q: "What is a 'non-refundable' rate?", a: "You won't get money back if you cancel", options: ["Free of charge", "You won't get money back if you cancel", "A discount for kids"] },
            { q: "What is 'half-board'?", a: "Breakfast and one other meal included", options: ["Half a bed", "Breakfast and one other meal included", "No meals included"] },
            { q: "A 'Twin Room' has:", a: "Two separate single beds", options: ["One large bed", "Two separate single beds", "Three beds"] },
            { q: "What is the 'rack rate'?", a: "The standard price without discounts", options: ["Discounted price", "The standard price without discounts", "Price for luggage"] },
            { q: "What does 'check-in' time mean?", a: "The earliest time you can enter your room", options: ["When you leave", "The earliest time you can enter your room", "When the gym opens"] },
            { q: "What is a 'complimentary' service?", a: "A service provided for free", options: ["A paid service", "A service provided for free", "A mandatory service"] },
            { q: "Why do hotels ask for 'identification'?", a: "To verify your identity and booking", options: ["To take a photo", "To verify your identity and booking", "To sell it"] }
        ],
        "3": [ // Arriving and Being Seated
            { q: "What should you say to the 'host' upon arrival?", a: "I have a reservation under [Name]", options: ["Give me food now", "I have a reservation under [Name]", "Where is the exit?"] },
            { q: "What is a 'host' or 'hostess'?", a: "The person who greets and seats guests", options: ["The person who cooks", "The person who greets and seats guests", "The dishwasher"] },
            { q: "What does 'Walk-in' mean?", a: "Arriving without a reservation", options: ["Walking inside the kitchen", "Arriving without a reservation", "Leaving without paying"] },
            { q: "If you want a quieter spot, you might ask for:", a: "A corner table", options: ["A table by the DJ", "A corner table", "A table by the bar"] },
            { q: "What is a 'cloakroom' used for?", a: "Storing coats and bags", options: ["Storing food", "Storing coats and bags", "Washing dishes"] },
            { q: "What does 'Wait to be seated' mean?", a: "Don't pick your own table", options: ["Sit anywhere", "Don't pick your own table", "Wait for the bill"] },
            { q: "What is 'table turnover'?", a: "The time spent by one party at a table", options: ["Flipping a table over", "The time spent by one party at a table", "Moving a table"] },
            { q: "A 'cover' in restaurant terms refers to:", a: "A single guest", options: ["A tablecloth", "A single guest", "The roof"] },
            { q: "What is a 'high chair' for?", a: "Young children/infants", options: ["The chef", "Young children/infants", "VIP guests"] }
        ],
        "4": [ // Checking In at the Desk
            { q: "What is the 'front desk'?", a: "The main reception area", options: ["The kitchen counter", "The main reception area", "The laundry room"] },
            { q: "What is a 'registration card'?", a: "A form with guest details and signature", options: ["A credit card", "A form with guest details and signature", "A menu"] },
            { q: "What is a 'room key' or 'key card'?", a: "An electronic card to open the room", options: ["A metal key", "An electronic card to open the room", "A map"] },
            { q: "What is an 'incidentals' deposit?", a: "Money held for extra charges", options: ["Payment for the room", "Money held for extra charges", "A tip"] },
            { q: "What is the 'bellhop' or 'porter' responsible for?", a: "Carrying guest luggage", options: ["Cleaning rooms", "Carrying guest luggage", "Cooking breakfast"] },
            { q: "What is a 'late check-out'?", a: "Leaving the room after the usual time", options: ["Arriving at night", "Leaving the room after the usual time", "Staying forever"] },
            { q: "What is 'concierge' service?", a: "Assistance with bookings and local info", options: ["Laundry service", "Assistance with bookings and local info", "Room cleaning"] },
            { q: "What does 'valet parking' mean?", a: "Staff park your car for you", options: ["Self-parking", "Staff park your car for you", "No parking"] },
            { q: "What is a 'wake-up call'?", a: "A phone call to wake you up", options: ["A call from your boss", "A phone call to wake you up", "A marketing call"] }
        ],
        "5": [ // Understanding the Menu
            { q: "What is an 'appetizer'?", a: "A small dish served before the main course", options: ["The main course", "A small dish served before the main course", "Dessert"] },
            { q: "What does 'à la carte' mean?", a: "Ordering separate dishes from the menu", options: ["A fixed price for everything", "Ordering separate dishes from the menu", "A secret menu"] },
            { q: "What is a 'tasting menu'?", a: "Multiple small courses showcasing the chef", options: ["Testing the food for poison", "Multiple small courses showcasing the chef", "A kids menu"] },
            { q: "What are 'allergens'?", a: "Substances that cause allergic reactions", options: ["Spices", "Substances that cause allergic reactions", "Vitamins"] },
            { q: "What is a 'side dish'?", a: "A small portion served with the main meal", options: ["The main meal", "A small portion served with the main meal", "The first course"] },
            { q: "What does 'entrée' mean in many countries?", a: "The main course", options: ["The exit", "The main course", "The starter"] },
            { q: "What is 'daily special'?", a: "A dish not on the regular menu", options: ["The cheapest dish", "A dish not on the regular menu", "A free dish"] },
            { q: "What does 'seasonal' refer to?", a: "Ingredients available at this time of year", options: ["Expensive ingredients", "Ingredients available at this time of year", "Imported food"] },
            { q: "What is 'prix fixe'?", a: "A multi-course meal at a fixed price", options: ["A broken menu", "A multi-course meal at a fixed price", "Pay what you want"] }
        ],
        "6": [ // Ordering Room Service
            { q: "How do you usually order room service?", a: "By phone using a specific extension", options: ["Shouting in the hall", "By phone using a specific extension", "Emailing the manager"] },
            { q: "What is a 'service charge'?", a: "An extra fee for delivering the food", options: ["A tip for the chef", "An extra fee for delivering the food", "The price of the food"] },
            { q: "Where is the room service menu usually found?", a: "In the room directory or on the TV", options: ["Under the bed", "In the room directory or on the TV", "In the elevator"] },
            { q: "What should you do with the tray when finished?", a: "Put it outside the door or call for pickup", options: ["Keep it as a souvenir", "Put it outside the door or call for pickup", "Wash it in the sink"] },
            { q: "Can you order drinks via room service?", a: "Yes, usually both hot and cold", options: ["Only water", "Yes, usually both hot and cold", "No, go to the bar"] },
            { q: "What is '24-hour room service'?", a: "Service available day and night", options: ["Service for 24 minutes", "Service available day and night", "Free service"] },
            { q: "What is a 'breakfast hanger'?", a: "A menu you hang on your door handle", options: ["A coat hanger", "A menu you hang on your door handle", "A type of bread"] },
            { q: "Is 'gratuity' included in room service bills?", a: "Sometimes, check the bill carefully", options: ["Always", "Sometimes, check the bill carefully", "Never"] },
            { q: "What if you have a 'Do Not Disturb' sign on?", a: "Room service will likely not knock", options: ["They will enter anyway", "Room service will likely not knock", "They will shout"] }
        ],
        "7": [ // Ordering Appetizers and Drinks
            { q: "What is 'sparkling water'?", a: "Water with carbonation (bubbles)", options: ["Tap water", "Water with carbonation (bubbles)", "Hot water"] },
            { q: "What is an 'apéritif'?", a: "An alcoholic drink taken before a meal", options: ["A digestive", "An alcoholic drink taken before a meal", "Dessert wine"] },
            { q: "What is a 'mocktail'?", a: "A non-alcoholic mixed drink", options: ["A funny drink", "A non-alcoholic mixed drink", "A strong cocktail"] },
            { q: "What does 'on the rocks' mean?", a: "With ice", options: ["With salt", "With ice", "Pure spirit"] },
            { q: "What are 'hors d'oeuvres'?", a: "Small appetizers served before a meal", options: ["The main course", "Small appetizers served before a meal", "Large desserts"] },
            { q: "What is a 'wine list'?", a: "A menu showing available wines", options: ["A list of prices", "A menu showing available wines", "The staff's names"] },
            { q: "What is 'house wine'?", a: "The standard, affordable wine of the restaurant", options: ["Wine made at home", "The standard, affordable wine of the restaurant", "Very expensive wine"] },
            { q: "What does 'neat' mean for a drink?", a: "Served without ice or mixers", options: ["Mixed with juice", "Served without ice or mixers", "Very clean glass"] },
            { q: "What is 'decanting' wine?", a: "Pouring wine into a vessel to aerate it", options: ["Drinking it fast", "Pouring wine into a vessel to aerate it", "Freezing it"] }
        ],
        "8": [ // Housekeeping and Cleanliness
            { q: "What is 'housekeeping'?", a: "The department responsible for cleaning", options: ["The kitchen staff", "The department responsible for cleaning", "The security team"] },
            { q: "What does 'DND' stand for?", a: "Do Not Disturb", options: ["Dinner and Drinks", "Do Not Disturb", "During Next Day"] },
            { q: "What are 'toiletries'?", a: "Soap, shampoo, and other personal items", options: ["Bed sheets", "Soap, shampoo, and other personal items", "Towels"] },
            { q: "What is the 'turndown service'?", a: "Preparing the bed for the night", options: ["Turning the light off", "Preparing the bed for the night", "Fixing the TV"] },
            { q: "What should you do if you need extra towels?", a: "Call housekeeping or the front desk", options: ["Ask the chef", "Call housekeeping or the front desk", "Go to the laundry"] },
            { q: "What is a 'linen' change?", a: "Replacing bed sheets and pillowcases", options: ["Cleaning the floor", "Replacing bed sheets and pillowcases", "Fixing curtains"] },
            { q: "What is an 'amenity'?", a: "A useful or pleasant feature of the room", options: ["A billing error", "A useful or pleasant feature of the room", "A complaint"] },
            { q: "Where should you put valuables?", a: "In the in-room safe", options: ["Under the pillow", "In the in-room safe", "In the fridge"] },
            { q: "What is a 'complaint' about cleanliness?", a: "Stating that the room is dirty", options: ["Asking for more food", "Stating that the room is dirty", "Checking out early"] }
        ],
        "9": [ // Mains and Dietary Restrictions
            { q: "What does 'vegan' mean?", a: "No animal products at all", options: ["No meat but eggs allowed", "No animal products at all", "Only organic food"] },
            { q: "What is 'gluten-free'?", a: "No wheat, barley, or rye", options: ["No sugar", "No wheat, barley, or rye", "No dairy"] },
            { q: "What is 'halal' or 'kosher'?", a: "Prepared according to religious laws", options: ["Vegetarian", "Prepared according to religious laws", "Very spicy"] },
            { q: "What does 'rare', 'medium', 'well-done' refer to?", a: "The level of cooking for meat", options: ["The size of the portion", "The level of cooking for meat", "The price of the dish"] },
            { q: "What is a 'signature dish'?", a: "A unique dish the chef is famous for", options: ["A dish you have to sign for", "A unique dish the chef is famous for", "The cheapest dish"] },
            { q: "What is a 'garnish'?", a: "An edible decoration on the plate", options: ["A side dish", "An edible decoration on the plate", "The main ingredient"] },
            { q: "What does 'dairy-free' exclude?", a: "Milk, butter, and cheese", options: ["Meat", "Milk, butter, and cheese", "Eggs"] },
            { q: "What is 'sustainability' in food?", a: "Environmentally friendly sourcing", options: ["Cheap food", "Environmentally friendly sourcing", "Fast food"] },
            { q: "What is a 'catch of the day'?", a: "Fresh fish caught that day", options: ["A discounted dish", "Fresh fish caught that day", "A secret ingredient"] }
        ],
        "10": [ // Using Hotel Facilities
            { q: "What is a 'fitness center'?", a: "The hotel gym", options: ["The business center", "The hotel gym", "The sauna"] },
            { q: "Where is the 'infinity pool' usually?", a: "On a high floor or overlooking a view", options: ["In the basement", "On a high floor or overlooking a view", "Near the laundry"] },
            { q: "What does 'complimentary Wi-Fi' mean?", a: "Free internet access", options: ["Paid internet", "Free internet access", "Slow internet"] },
            { q: "What is a 'spa'?", a: "A facility for health and relaxation treatments", options: ["A cooking school", "A facility for health and relaxation treatments", "A parking lot"] },
            { q: "What is the 'business center' for?", a: "Printing, computers, and meetings", options: ["Selling snacks", "Printing, computers, and meetings", "Buying clothes"] },
            { q: "What is an 'executive lounge'?", a: "A private area for specific guest categories", options: ["A public lobby", "A private area for specific guest categories", "A smoking area"] },
            { q: "What are 'operating hours'?", a: "The times a facility is open", options: ["The price list", "The times a facility is open", "The staff names"] },
            { q: "What is a 'sauna'?", a: "A room for heat and steam therapy", options: ["A cold pool", "A room for heat and steam therapy", "A gym machine"] },
            { q: "What is a 'kids club'?", a: "Entertainment and supervision for children", options: ["A nightclub", "Entertainment and supervision for children", "A sports bar"] }
        ],
        "11": [ // Wine Selection and Etiquette
            { q: "What is a 'sommelier'?", a: "A trained wine professional", options: ["A waiter", "A trained wine professional", "A chef"] },
            { q: "What does 'body' mean in wine?", a: "The weight or feel of the wine in the mouth", options: ["The shape of the bottle", "The weight or feel of the wine in the mouth", "The color"] },
            { q: "What is 'tannin'?", a: "Substance that gives a dry feeling in the mouth", options: ["A type of sugar", "Substance that gives a dry feeling in the mouth", "A grape variety"] },
            { q: "What is 'pairing'?", a: "Matching wine with specific foods", options: ["Cleaning glasses", "Matching wine with specific foods", "Drinking two glasses"] },
            { q: "What is a 'corkage' fee?", a: "A fee for bringing your own wine", options: ["The price of a cork", "A fee for bringing your own wine", "A tip for the sommelier"] },
            { q: "What does 'dry' wine mean?", a: "Wine with very little sugar", options: ["Wine that is old", "Wine with very little sugar", "Wine that is cold"] },
            { q: "What is a 'vintage'?", a: "The year the grapes were harvested", options: ["A style of bottle", "The year the grapes were harvested", "The label design"] },
            { q: "How should you hold a wine glass?", a: "By the stem", options: ["By the bowl", "By the stem", "With two hands"] },
            { q: "What is 'swirling' wine for?", a: "Releasing aromas", options: ["Mixing it", "Releasing aromas", "Cooling it down"] }
        ],
        "12": [ // Requesting Repairs or Upgrades
            { q: "What is an 'upgrade'?", a: "Moving to a better room category", options: ["Moving to a smaller room", "Moving to a better room category", "Getting a discount"] },
            { q: "What is 'maintenance'?", a: "The department that fixes things", options: ["The cleaning team", "The department that fixes things", "Front desk"] },
            { q: "How to report a broken AC?", a: "Call the front desk immediately", options: ["Wait until checkout", "Call the front desk immediately", "Fix it yourself"] },
            { q: "What is a 'technical issue'?", a: "A problem with electronics or appliances", options: ["A bill error", "A problem with electronics or appliances", "Missing towels"] },
            { q: "What does 'out of order' mean?", a: "The facility or room is not working", options: ["Arriving late", "The facility or room is not working", "A messy room"] },
            { q: "A 'clogged' drain means:", a: "The water won't go down", options: ["A dirty floor", "The water won't go down", "A broken light"] },
            { q: "What is 'compensation'?", a: "Something provided to make up for a problem", options: ["The total bill", "Something provided to make up for a problem", "A new reservation"] },
            { q: "What is 'room move'?", a: "Transferring to a different room", options: ["Packing bags", "Transferring to a different room", "Checking out"] },
            { q: "What is a 'follow-up'?", a: "Checking if the problem was solved", options: ["Calling a friend", "Checking if the problem was solved", "Reading a menu"] }
        ],
        "13": [ // Handling Food Issues Correctly
            { q: "What if your food is 'undercooked'?", a: "Politely ask to have it cooked more", options: ["Eat it anyway", "Politely ask to have it cooked more", "Leave the restaurant"] },
            { q: "What is a 'foreign object' in food?", a: "Something that shouldn't be there (e.g. hair)", options: ["A new spice", "Something that shouldn't be there (e.g. hair)", "An appetizer"] },
            { q: "How to handle a wrong order?", a: "Inform the waiter immediately", options: ["Wait for the bill", "Inform the waiter immediately", "Complain on social media"] },
            { q: "What is a 'cold' dish that should be hot?", a: "A temperature issue", options: ["A salad", "A temperature issue", "A dessert"] },
            { q: "What if the bill is incorrect?", a: "Ask the waiter to review the charges", options: ["Pay it anyway", "Ask the waiter to review the charges", "Call the police"] },
            { q: "What is 'over-seasoned' food?", a: "Too much salt or spice", options: ["Under-cooked", "Too much salt or spice", "Very fresh food"] },
            { q: "How to leave a 'polite' complaint?", a: "Speak calmly to the manager", options: ["Shout at the waiter", "Speak calmly to the manager", "Throw the plate"] },
            { q: "What is 'comping' a meal?", a: "Removing it from the bill (free of charge)", options: ["Adding extra charges", "Removing it from the bill (free of charge)", "Changing the recipe"] },
            { q: "What are 'dietary cross-contaminations'?", a: "Unintended contact between different foods", options: ["Mixing drinks", "Unintended contact between different foods", "Washing hands"] }
        ],
        "14": [ // Local Transport and Shuttles
            { q: "What is a 'shuttle bus'?", a: "A free or cheap hotel transport", options: ["A public bus", "A free or cheap hotel transport", "A private taxi"] },
            { q: "What is 'airport transfer'?", a: "Transport between the hotel and airport", options: ["A flight booking", "Transport between the hotel and airport", "A luggage service"] },
            { q: "How to book a 'taxi' from the hotel?", a: "Ask the concierge or front desk", options: ["Stop one on the street", "Ask the concierge or front desk", "Wait in the gym"] },
            { q: "What is a 'luxury car' service?", a: "Private transport in a high-end vehicle", options: ["The shuttle", "Private transport in a high-end vehicle", "Public train"] },
            { q: "What is a 'pick-up point'?", a: "The designated area to wait for transport", options: ["The guest's room", "The designated area to wait for transport", "The kitchen"] },
            { q: "What does 'fixed rate' mean for a taxi?", a: "A set price instead of a meter", options: ["A broken meter", "A set price instead of a meter", "A tip"] },
            { q: "What is a 'ride-sharing' app?", a: "Uber, Lyft, etc.", options: ["A hotel shuttle", "Uber, Lyft, etc.", "A rental car"] },
            { q: "What is 'public transport'?", a: "Buses, trains, and subways", options: ["Private cars", "Buses, trains, and subways", "Walking"] },
            { q: "What is a 'walking tour'?", a: "Exploring local sites on foot", options: ["A bus tour", "Exploring local sites on foot", "A taxi ride"] }
        ],
        "15": [ // Paying the Bill and Gratuity
            { q: "What is 'gratuity'?", a: "A tip for the service", options: ["The total bill", "A tip for the service", "A tax"] },
            { q: "What is 'VAT' or 'GST'?", a: "Value-added tax on the bill", options: ["A drink price", "Value-added tax on the bill", "A discount"] },
            { q: "What is 'splitting the bill'?", a: "Dividing the cost between guests", options: ["Breaking the paper", "Dividing the cost between guests", "Paying twice"] },
            { q: "What does 'service included' mean?", a: "The tip is already in the price", options: ["Free food", "The tip is already in the price", "You must tip more"] },
            { q: "What is a 'receipt'?", a: "A document proving payment", options: ["A menu", "A document proving payment", "A reservation"] },
            { q: "How to ask for the bill?", a: "The bill/check, please", options: ["Money time!", "The bill/check, please", "Bye!"] },
            { q: "What are 'accepted payment methods'?", a: "Cards, cash, or mobile pay", options: ["Only gold", "Cards, cash, or mobile pay", "Promises"] },
            { q: "What is a 'service charge' on the bill?", a: "A mandatory fee added by the restaurant", options: ["A voluntary tip", "A mandatory fee added by the restaurant", "A drink price"] },
            { q: "What is 'cashback'?", a: "Getting cash back when paying by card", options: ["Losing your card", "Getting cash back when paying by card", "A discount"] }
        ],
        "16": [ // Security and Valuables
            { q: "What is an 'in-room safe'?", a: "A secure box for your valuables", options: ["A fridge", "A secure box for your valuables", "A drawer"] },
            { q: "What is '24/7 security'?", a: "Security staff present at all times", options: ["Open doors", "Security staff present at all times", "No security"] },
            { q: "What are 'CCTV' cameras?", a: "Surveillance cameras for safety", options: ["Television channels", "Surveillance cameras for safety", "Air conditioners"] },
            { q: "What's the procedure for a 'lost key'?", a: "Alert the front desk immediately", options: ["Wait outside", "Alert the front desk immediately", "Break the door"] },
            { q: "What is a 'fire evacuation' plan?", a: "Instructions for leaving during an emergency", options: ["A cooking guide", "Instructions for leaving during an emergency", "A gym schedule"] },
            { q: "What's an 'unauthorized' entry?", a: "Someone entering who shouldn't be there", options: ["Room service", "Someone entering who shouldn't be there", "Owner's visit"] },
            { q: "Why use 'secondary' locks on doors?", a: "For extra safety while inside", options: ["To stay forever", "For extra safety while inside", "To block staff"] },
            { q: "What does 'valet security' mean?", a: "Security for parked cars", options: ["Cleaning cars", "Security for parked cars", "No insurance"] },
            { q: "What's an 'emergency exit'?", a: "A designated door for leaving quickly", options: ["The main entrance", "A designated door for leaving quickly", "The elevator"] }
        ],
        "17": [ // Table Manners and Etiquette
            { q: "Where should you place your 'napkin'?", a: "On your lap", options: ["In your collar", "On your lap", "On the floor"] },
            { q: "Which fork do you use 'first'?", a: "The one furthest from the plate", options: ["The smallest one", "The one furthest from the plate", "Any fork"] },
            { q: "How do you signal you are 'finished'?", a: "Place knife and fork parallel on the plate", options: ["Cross them", "Place knife and fork parallel on the plate", "Push the plate away"] },
            { q: "What to do with your 'phone'?", a: "Keep it on silent and out of sight", options: ["Put it on the table", "Keep it on silent and out of sight", "Talk loudly"] },
            { q: "How to 'summon' a waiter politely?", a: "Catch their eye or raise a hand slightly", options: ["Shout 'Hey!'", "Catch their eye or raise a hand slightly", "Snap fingers"] },
            { q: "Which side is the 'bread plate' on?", a: "Left side", options: ["Right side", "Left side", "Under the plate"] },
            { q: "What is 'clinking' glasses?", a: "Touching glasses together during a toast", options: ["Breaking them", "Touching glasses together during a toast", "Washing them"] },
            { q: "How to 'excuse' yourself from the table?", a: "I'll be right back, excuse me", options: ["Just leave", "I'll be right back, excuse me", "Bye everyone"] },
            { q: "Should you 'reach' across others for salt?", a: "No, ask someone to pass it", options: ["Yes, quickly", "No, ask someone to pass it", "Stand up"] }
        ],
        "18": [ // Exploring Local Area with Concierge
            { q: "What can a 'concierge' help with?", a: "Activity bookings and local maps", options: ["Cooking meals", "Activity bookings and local maps", "Cleaning the room"] },
            { q: "What are 'hidden gems'?", a: "Less known but great local spots", options: ["Shiny rocks", "Less known but great local spots", "Expensive malls"] },
            { q: "What is a 'tourist trap'?", a: "Overpriced spots aimed at tourists", options: ["A literal trap", "Overpriced spots aimed at tourists", "A park"] },
            { q: "How to get 'local' recommendations?", a: "Ask the hotel staff or locals", options: ["Read only big ads", "Ask the hotel staff or locals", "Follow any crowd"] },
            { q: "What is 'off the beaten path'?", a: "Places not commonly visited by tourists", options: ["A dangerous road", "Places not commonly visited by tourists", "The airport"] },
            { q: "What are 'opening hours' for attractions?", a: "The times you can visit them", options: ["The prices", "The times you can visit them", "The location"] },
            { q: "A 'landmark' is:", a: "A significant historical or cultural site", options: ["A piece of dirt", "A significant historical or cultural site", "A parking lot"] },
            { q: "What is 'local etiquette'?", a: "Cultural norms and manners of the area", options: ["The local language", "Cultural norms and manners of the area", "The local food"] },
            { q: "Why use a 'hotel map'?", a: "To find your way and marked locations", options: ["To play games", "To find your way and marked locations", "To wrap food"] }
        ],
        "19": [ // Feedback and Management
            { q: "What is a 'feedback form'?", a: "A document to rate your experience", options: ["A menu", "A document to rate your experience", "The bill"] },
            { q: "What is a 'review' on TripAdvisor/Google?", a: "An online rating of the service", options: ["A personal diary", "An online rating of the service", "A private letter"] },
            { q: "How to give 'constructive' feedback?", a: "Be specific and polite about issues", options: ["Be rude and general", "Be specific and polite about issues", "Don't say anything"] },
            { q: "What is a 'manager's' role?", a: "Overseeing staff and handling issues", options: ["Cooking food", "Overseeing staff and handling issues", "Cleaning tables"] },
            { q: "What's an 'online reputation'?", a: "How the business is perceived on the web", options: ["The price of stars", "How the business is perceived on the web", "The staff list"] },
            { q: "What is a 'satisfaction survey'?", a: "A list of questions about your stay", options: ["A test", "A list of questions about your stay", "A booking form"] },
            { q: "What is a 'complimentary' gesture for a bad stay?", a: "A discount or free amenitity", options: ["A bill increase", "A discount or free amenitity", "An apology only"] },
            { q: "What is 'customer retention'?", a: "Keeping customers coming back", options: ["Firing staff", "Keeping customers coming back", "Closing early"] },
            { q: "What is a 'VIP' guest?", a: "A very important person", options: ["A regular guest", "A very important person", "A loud guest"] }
        ],
        "20": [ // Final Check-out and Departure
            { q: "What is 'check-out' time?", a: "The time you must leave the room", options: ["The time you arrive", "The time you must leave the room", "When the gym closes"] },
            { q: "What is a 'final bill' or 'folio'?", a: "A summary of all room and extra charges", options: ["A menu", "A summary of all room and extra charges", "A feedback form"] },
            { q: "Where to leave the 'room key'?", a: "At the front desk or in the drop box", options: ["On the bed", "At the front desk or in the drop box", "Take it with you"] },
            { q: "What is 'express check-out'?", a: "Leaving without waiting at the desk", options: ["Running away", "Leaving without waiting at the desk", "Staying late"] },
            { q: "What's a 'luggage storage' service?", a: "Storing bags after check-out before departure", options: ["Buying new bags", "Storing bags after check-out before departure", "Lost and found"] },
            { q: "Should you 'check' the room before leaving?", a: "Yes, to avoid leaving items behind", options: ["No, it's fine", "Yes, to avoid leaving items behind", "Only the fridge"] },
            { q: "What is a 'departure' shuttle?", a: "Transport to the airport/station", options: ["Arriving bus", "Transport to the airport/station", "A tour bus"] },
            { q: "What is a 'loyalty program'?", a: "A system for rewarding repeat guests", options: ["A secret club", "A system for rewarding repeat guests", "A tax"] },
            { q: "What is the 'last' step of departure?", a: "Settling the bill and returning keys", options: ["Ordering breakfast", "Settling the bill and returning keys", "Going to the spa"] }
        ]
    };

    questions = allQuestions[lessonNum] || [];

    const sentences = {
        correct: [
            "What a phenomenal command!", "That is right!", "What a exact execution!", "Simply amazing!", "You're crushing it!", "Simply wonderful!", "You're a natural!", "Untouchable!", "What a pure mastery!", "What a magnificent result!",
            "What a tremendous wisdom!", "A true professional!", "Mind-blowing!", "Unrivaled!", "What a spot-on precision!", "What a right response!", "What a excellent participation!", "What a a+ job!", "What a remarkable grace!", "What a sensational talent!",
            "That is super!", "That is sharp!", "What a skilled precision!", "Stunning hospitality!", "That is good!", "You're sharp!", "What a sharp performance!", "Great!", "Incredible talent!", "Spot-on!",
            "What a total delivery!", "Masterful logic!", "Super result!", "Mastery!", "Unstoppable!", "Top-notch!", "What a magnificent skills!", "Stellar!", "Sensational talent!", "What a sterling finesse!",
            "Excellent result!", "Top marks!", "That is absolute!", "Yes!", "That is accurate!", "That is great!", "Remarkable quality!", "What a tremendous standard!", "What a spot-on thinking!", "Phenomenal delivery!",
            "Phenomenal result!", "Pure!", "Brilliant!", "Smashed it!", "What a stunning answer!", "Spectacular accuracy!", "What a a+ response!", "Well done!", "Excellent progress!", "Concierge-level!",
            "Marvellous answer!", "Elite engagement!", "First-class expertness!", "Incredible hospitality!", "You're a champion!", "You're gifted!", "Great job!", "What a great talent!", "Exquisite grace!", "Winning!",
            "What a accurate talent!", "That is majestic!", "Great work!", "You're a sensation!", "That is a+!", "What a tremendous insight!", "Pure excellence!", "What a brilliant focus!", "That is splendid!", "Gifted result!",
            "Good answer!", "Impressive delivery!", "You're unstoppable now!", "A+!", "Super thinking!", "Magnificent job!", "Excellent!", "That's the spirit!", "Killing it!", "What a marvellous command!",
            "What a complete mastery!", "That is correct!", "Amazing quality!", "Fine skills!", "Keep moving!", "That is wonderful!", "Sharp quality!", "Perfect score!", "Right effort!", "Chef's kiss!",
            "What a top-notch focus!", "Excellent delivery!", "Exceptional!", "Majestic precision!", "Outstanding result!", "Incredible skill!", "Stunning standard!", "Impressive participation!", "Truly remarkable!", "That is precise!",
            "Pure talent!", "What a skilled delivery!", "Top-notch logic!", "What a extraordinary work!", "Exactly!", "Spot on!", "What a tremendous effort!", "What a pure knowledge!", "Correct!", "What a masterful thinking!",
            "What a stunning knowledge!", "First-class accuracy!", "Front-desk perfection!", "Right on the money!", "Great wisdom!", "What a outstanding accuracy!", "First class!", "Nice thinking!", "You've outdone yourself!", "That is amazing!",
            "Perfect!", "Skilled wisdom!", "What a expert insight!", "That is gifted!", "What a expert thinking!", "Absolutely right!", "That is first-class!", "Correct finesse!", "Precise result!", "That is expert!",
            "What a first-class professionalism!", "That is outstanding!", "What a good accuracy!", "That is sensational!", "Smart!", "What a incredible result!", "What a exquisite performance!", "That is extraordinary!", "Premier!", "You're at the top!",
            "First-class answer!", "Magnificent precision!", "What a accurate engagement!", "Naturally!", "Stunning response!", "What a correct talent!", "What a splendid attention!", "Good thinking!", "What a perfect talent!", "Stellar attention!",
            "That's perfect!", "Marvellous input!", "What a excellent accuracy!", "Sterling response!", "Keep going!", "Spectacular!", "You've got the touch!", "You're a legend!", "Perfect answer!", "What a masterful performance!",
            "What a spot-on expertness!", "Super standard!", "Stunning delivery!", "On fire!", "What a nice standard!", "What a expert engagement!", "Complete response!", "Precise input!", "Perfect delivery!", "Flawless logic!",
            "What a good knowledge!", "What a brilliant standard!", "Good!", "What a absolute precision!", "Superior!", "Sterling performance!", "Sharp knowledge!", "What a exact standard!", "That is brilliant!", "Nice delivery!",
            "You're smart!", "That is smart!", "Accurate!", "What a exceptional finesse!", "That is remarkable!", "Spot-on response!", "Top-shelf performance!", "Total!", "What a complete participation!", "Peerless!",
            "Winner's circle!", "Perfect response!", "What a elite job!", "What a absolute job!", "Exact!", "Phenomenal participation!", "Flawless service!", "What a tremendous expertness!", "What a spectacular delivery!", "That is stunning!",
            "What a elite precision!", "That is nice!", "What a precise accuracy!", "Exact logic!", "You're on fire!", "Gifted expertness!", "What a magnificent attention!", "That is exceptional!", "Incredible!", "Superb delivery!",
            "What a impressive answer!", "You're a master!", "Impressive expertness!", "Legendary!", "Beyond compare!", "Super work!", "Complete quality!", "Exact input!", "What a smart precision!", "That is spectacular!",
            "Indeed!", "Wonderful focus!", "Certainly!", "What a stellar mastery!", "Flawless!", "Housekeeping hero!", "Right thinking!", "Sharp logic!", "Tremendous thinking!", "Top-grade work!",
            "What a great command!", "What a excellent job!", "Impressive command!", "What a nice execution!", "Top-notch skills!", "Gold medal performance!", "What a nice accuracy!", "Expert focus!", "You're a shining star!", "What a superb grace!",
            "Top-tier performance!", "Splendid response!", "Right as rain!", "Exceptional attention!", "Bravo!", "Sterling!", "What a absolute attention!", "What a flawless precision!", "What a tremendous engagement!", "Keep that momentum!",
            "Exact focus!", "You're brilliant!", "That is pure!", "Accurate focus!", "What a masterful grace!", "Complete thinking!", "What a sensational response!", "What a stunning command!", "That is complete!", "What a amazing skills!",
            "Right hospitality!", "Complete effort!", "That is excellent!", "Outstanding logic!", "What a remarkable professionalism!", "Wonderful participation!", "First-class professionalism!", "Exactly right!", "A work of art!", "Absolute effort!",
            "What a nice expertness!", "Top-notch thinking!", "You nailed it!", "What a outstanding work!", "What a spectacular expertness!", "Complete!", "What a good professionalism!", "That is magnificent!", "Majestic answer!", "Success!",
            "Impressive!", "Masterful quality!", "Smart finesse!", "Pure finesse!", "What a top-notch response!", "A perfect result!", "What a flawless hospitality!", "Brilliant effort!", "What a brilliant service!", "What a exact engagement!",
            "Phenomenal!", "Breathtaking!", "Pure gold!", "That is exact!", "First-class effort!", "You're a superstar!", "What a complete work!", "Smart grace!", "What a smart accuracy!", "Expert delivery!",
            "What a sensational job!", "You're making it look easy!", "What a flawless knowledge!", "Simply superb!", "Amazing job!", "Sharp!", "What a marvellous logic!", "Superb!", "Masterful!", "What a right finesse!",
            "What a great effort!", "What a complete professionalism!", "Brilliantly executed!", "What a exquisite quality!", "You got it!", "What a gifted answer!", "A masterclass!", "You're a genius at this!", "Wonderful!", "What a wonderful thinking!",
            "What a splendid talent!", "What a first-class focus!", "Nonpareil!", "You're an inspiration!", "That is perfect!", "What a impressive accuracy!", "Keep it up!", "Masterpiece!", "Skilled!", "Flawless accuracy!",
            "Majestic!", "What a spectacular answer!", "Accurate attention!", "Expert!", "Exceptional execution!", "That is elite!", "What a top-notch finesse!", "First-class!", "Right!", "Strikingly good!",
            "Crushing it!", "What a exact grace!", "Smart execution!", "Incredible focus!", "High five!", "Tremendous!", "That is fine!", "Sensational logic!", "What a skilled talent!", "That is sterling!",
            "Extraordinary performance!", "What a magnificent thinking!", "Sterling delivery!", "What a remarkable knowledge!", "Absolutely!", "World-class!", "Wonderful command!", "What a majestic expertness!", "Accurate delivery!", "Incredible knowledge!",
            "What a impressive result!", "Brilliant thinking!", "What a exquisite thinking!", "Fantastic!", "Correct again!", "You're a genius!", "Expert thinking!", "A true expert!", "Pure precision!", "Sommelier status!",
            "Marvellous!", "Elite!", "In a league of your own!", "Simply the best!", "You're doing great!", "Extraordinary!", "You're on the right track!", "Spectacular execution!", "Unsurpassed!", "You're a pro!",
            "Precise!", "What a phenomenal engagement!", "You're a visionary!", "That is total!", "Amazing!", "Top notch!", "You're on top of things!", "What a right insight!", "What a sharp job!", "Remarkable mastery!",
            "What a stellar accuracy!", "Nice!", "You're the GOAT!", "Total service!", "What a elite accuracy!", "What a nice finesse!", "Fine!", "Amazing expertness!", "Wonderful knowledge!", "Magnificent effort!",
            "That is marvellous!", "That is tremendous!", "Magnificent!", "What a excellent precision!", "Stunning!", "Victory is yours!", "You're a star!", "What a exquisite expertness!", "Expert participation!", "Matchless!",
            "Excellent logic!", "Impressive insight!", "What a top-notch command!", "Absolute input!", "You've won this round!", "Wow!", "Aced it!", "You're right!", "Nice work!", "What a correct grace!",
            "First-rate!", "What a right grace!", "Outstanding precision!", "That is stellar!", "Awesome!", "You've got it!", "Perfect command!", "Supreme!", "Masterful professionalism!", "What a top-notch result!",
            "Amazing response!", "What a elite service!", "Outstanding!", "What a stellar expertness!", "Correct expertness!", "Extraordinary logic!", "Gifted!", "Impressive hospitality!", "Perfectly stated!", "Top tier!",
            "Precise job!", "Way to go!", "Grand Slam!", "That is spot-on!", "What a stellar result!", "What a perfect knowledge!", "Gold medal!", "Stunning job!", "What a fine work!", "Majestic hospitality!",
            "Excellent knowledge!", "Stellar mastery!", "That is top-notch!", "Flawless effort!", "You're a wiz!", "Excellent participation!", "What a majestic wisdom!", "Absolute!", "That is flawless!", "Legendary work!",
            "Accurate thinking!", "What a gifted wisdom!", "That is incredible!", "Phenomenal attention!", "That is exquisite!", "That is skilled!", "Extraordinary professionalism!", "Top-of-the-line!", "Sensational!", "What a pure grace!",
            "You're improving fast!", "Fine job!", "A+ answer!", "Precise delivery!", "Victory!", "Exquisite!", "Nailed it!", "A+ insight!", "Super!", "Tremendous participation!",
            "Total input!", "Exact thinking!", "Michelin-grade!", "What a skilled knowledge!", "Splendid!", "That is phenomenal!", "What a expert grace!", "Absolute service!", "Remarkable!", "That is masterful!"
        ],
        incorrect: [
            "Not quite... Stay focused!", "Revisit the menu.", "Don't give up!", "Uh oh, the menu.", "Give it another shot!", "Careful now, the option.", "Minor slip in... Try it once more!", "Not a perfect match!", "Let's review... Next one!", "Not quite the standard.",
            "Oopsie, the menu.", "Oops!, keep trying!", "Almost, you're getting closer!", "Nearly... Room for improvement!", "No luck!", "Not the answer this time!", "Revisit the detail.", "A bit off... You're getting closer!", "Just missed the standard.", "Keep up the momentum!",
            "Not the right pick this time!", "Nearly the selection.", "Oopsie,, one more time!", "Nearly, room for improvement!", "Not quite, keep your head up!", "Oopsie,... Focus up!", "Oopsie, the order.", "Oopsie,... Mistakes help you learn!", "Give it another whirl!", "Just missed the fact.",
            "Let's review, one more time!", "Revisit... Study that!", "Slight error in... Focus up!", "Wrong way!", "Wrong choice!", "Not there yet!", "Oopsie,... Don't stop now!", "Not quite a masterpiece!", "Almost, next one!", "Keep up the hard work!",
            "Not quite a victory!", "Hold on,... Room for improvement!", "Think about this one.", "Oopsie, the detail.", "Minor slip in, don't stop now!", "Not the correct option!", "Oops!, let's polish this!", "Let's try that again!", "Keep moving forward!", "Just missed the response.",
            "My apologies,, keep practicing!", "A bit off the logic.", "Oopsie,... You can do this!", "Revisit, one more time!", "Next one!", "Revisit, mistakes help you learn!", "Minor slip in... Focus up!", "Slight error in, learning takes time!", "Careful now,, let's polish this!", "Hold on,, stay determined!",
            "Give it more thought!", "You're getting closer!", "Not what we're looking for!", "Try once again!", "Oops!, don't lose heart!", "You'll get it eventually!", "Not a match!", "Not quite a bullseye yet!", "Hold on,... One more time!", "Oops!... Keep practicing!",
            "Not quite through yet!", "Hold on,... You're getting closer!", "Uh oh,, one more time!", "Careful now,... Room for improvement!", "Guess again!", "A bit off... Don't give up!", "Careful now, the selection.", "Keep trying!", "Uh oh, this one.", "Not exactly!",
            "My apologies,, stay determined!", "Wait, check that answer.", "Nearly... Try again!", "Wait, check... Almost there!", "My apologies,... Let's polish this!", "Wait, check the reservation.", "Careful now,, mistakes help you learn!", "Not the correct move!", "Uh oh,... You're getting closer!", "Uh oh,... Almost there!",
            "Not quite the right move!", "Wait, check, each try makes you better!", "Don't lose heart!", "Not quite there!", "Just missed the reservation.", "Try again!", "Hold on,, keep practicing!", "Revisit, focus up!", "Oops!... Try a different path!", "Getting closer!",
            "Careful now, the procedure.", "Hold on,, don't stop now!", "Close, but no... Mistakes help you learn!", "Not quite the selection.", "Not quite... Try a different path!", "Hold on, the reservation.", "Not the right conclusion!", "Not quite... One more time!", "Stay focused!", "Hold on,... Stay determined!",
            "Close, but no, mistakes help you learn!", "Oops!... Don't lose heart!", "Oops!, keep your head up!", "Oops!, don't give up!", "Let's review the logic.", "Close, but no the selection.", "Study that one again!", "Oops! the procedure.", "Uh oh,, stay determined!", "Think about... Wait, let's rethink!",
            "Careful now,... Try a different path!", "A bit off the reservation.", "Just missed it!", "Oops! the response.", "Nearly... Try a different path!", "Better luck next time!", "Let's review, keep your head up!", "Oopsie,... Keep practicing!", "Not quite a success yet!", "Not quite there yet!",
            "My apologies,, keep your head up!", "Give it another attempt!", "Revisit... You can do this!", "Stay determined!", "My apologies,, mistakes help you learn!", "Not the one!", "Slight error in the selection.", "Each try makes you better!", "Keep at it!", "Just missed, don't stop now!",
            "Close, but no... Stay determined!", "Close, but no the choice.", "Wait, check, wait, let's rethink!", "Just missed... Keep practicing!", "Careful now,, room for improvement!", "Nearly, try again!", "Wait, check... Study that!", "Hold on,... Study that!", "Almost!", "Close, but no... Keep practicing!",
            "A bit off... Study that!", "Not quite the right turn!", "Wait, check... Keep your head up!", "Not this time, sorry!", "Hold on,... Focus up!", "Not quite spot on!", "My apologies,... Don't lose heart!", "Don't stop now!", "Wait, check, don't give up!", "Wait, check, give it another shot!",
            "Nearly the option.", "Not quite a triumph!", "Keep your head up!", "Careful now, the fact.", "Keep going!", "Think about... Try again!", "Close, but no the standard.", "Close, but no the order.", "Wrong!", "Nearly... Don't lose heart!",
            "Think about, wait, let's rethink!", "Slight error in... Keep trying!", "Oops!... You can do this!", "Sorry!", "My apologies,, study that!", "My apologies,, focus up!", "Close, but no... Try a different path!", "A bit off the detail.", "Not right yet!", "A bit off, don't stop now!",
            "Let's review, learning takes time!", "Just missed... Don't lose heart!", "Let's review, try it once more!", "Minor slip in... Give it another shot!", "Wait, check... Each try makes you better!", "Incorrect choice!", "Nearly the logic.", "Uh oh,, let's polish this!", "Wait, let's rethink!", "Close, but no... Study that!",
            "Wait, check, try a different path!", "Close, but no, room for improvement!", "Slight error in... Don't give up!", "A bit off!", "Minor slip in the procedure.", "Let's review the procedure.", "Almost the menu.", "Uh oh,, try it once more!", "Just missed... Give it another shot!", "Not quite the right path!",
            "Minor slip in this one.", "A bit off the option.", "Give it another chance!", "My apologies, the option.", "Uh oh,, don't stop now!", "Minor slip in, don't give up!", "Not a bullseye!", "Let's review, keep trying!", "Oopsie,... Room for improvement!", "Room for improvement!",
            "Slight error in the option.", "Uh oh,... Study that!", "Let's review the choice.", "Try again later!", "Not quite on target!", "Close, but no this one.", "Careful now, that answer.", "Let's try a new approach!", "Let's try a fresh start!", "Not quite, almost there!",
            "Minor slip in, focus up!", "Not quite what was expected!", "Another try!", "Try harder!", "Let's rethink that!", "Oops!... Wait, let's rethink!", "Uh oh, the selection.", "That's not right!", "Wait, check the logic.", "Almost there!",
            "A bit off, let's polish this!", "Oops!... Learning takes time!", "Almost... Keep practicing!", "Not this time!", "My apologies,... Try a different path!", "Wait, check the option.", "Wait, check, you can do this!", "Hold on,... Try again!", "Uh oh,... Don't give up!", "Let's review... Don't give up!",
            "A bit off the menu.", "Revisit, don't stop now!", "Not the right choice at all!", "Let's review... Keep trying!", "Careful now, the choice.", "Try exploring another idea!", "Close, but no... Keep your head up!", "Needs more work!", "Not quite a winner!", "Oops!... Study that!",
            "Not exactly what we need!", "My apologies,, try again!", "Oops!... Let's polish this!", "Maybe next time!", "Almost... One more time!", "Nearly the fact.", "Just missed this one.", "Hold on,, don't give up!", "Learning takes time!", "Revisit this one.",
            "Careful now,, don't lose heart!", "Think about... Try a different path!", "Think about, you can do this!", "Wrong answer!", "Close, but no... One more time!", "Oops!... Almost there!", "Not quite the menu.", "Not quite correct!", "Stay engaged!", "Keep working!",
            "Just missed, you can do this!", "Minor slip in... Study that!", "Almost had it!", "A bit off... Learning takes time!", "Minor slip in the standard.", "Stay in the game!", "Not quite in the bag!", "Careful now,, focus up!", "Let's polish this!", "Minor slip in the detail.",
            "Slight error in, wait, let's rethink!", "Not quite!", "A bit off the fact.", "Close, but no, keep practicing!", "Nearly, try it once more!", "My apologies,, one more time!", "Give it another look!", "Just missed... One more time!", "Wait, check, stay focused!", "Not quite, try it once more!",
            "Not quite... Mistakes help you learn!", "Revisit the reservation.", "Not quite, don't give up!", "Close, but no, don't give up!", "Oh no!", "That's not it!", "Wait, check... Let's polish this!", "Take a closer look!", "Just missed, one more time!", "Nearly... Give it another shot!",
            "Slight error in, stay focused!", "Let's review, try a different path!", "Let's try one more time!", "Minor slip in, wait, let's rethink!", "Wait, check the procedure.", "Careful now,, stay determined!", "Incorrect!", "Slight error in, keep trying!", "Revisit, keep practicing!", "Not the correct path here!",
            "Keep aiming high!", "Slight error in, you're getting closer!", "Hold on, the choice.", "Slight error in, one more time!", "Wait, check, try again!", "Think about, stay determined!", "Not the right answer now!", "My apologies,, don't stop now!", "Let's try a different path!", "Let's review the selection.",
            "My apologies,, keep trying!", "Think about, let's polish this!", "Revisit the fact.", "Let's try a different one!", "Wait, check... Learning takes time!", "Stay sharp!", "Mistakes help you learn!", "Keep up the effort!", "Uh oh, the reservation.", "Slight error in... Let's polish this!",
            "Not the right way!", "Revisit the standard.", "Minor slip in... Keep trying!", "Check your notes!", "Slight error in, try again!", "My apologies, the order.", "Keep up the practice!", "Not quite... You can do this!", "Just missed... Focus up!", "Oopsie,... Give it another shot!",
            "Try a different option!", "Nearly, study that!", "One more time!", "Think about... Study that!", "Not the right choice for this!", "Nearly... Focus up!", "My apologies, the menu.", "Think about... You can do this!", "Just missed... Mistakes help you learn!", "Slight error in, study that!",
            "Keep trying your best!", "Slight error in... Each try makes you better!", "Not quite at the finish line!", "Minor slip in the logic.", "Not quite... Don't lose heart!", "Think about... Mistakes help you learn!", "Oopsie, the option.", "Careful now,... Try it once more!", "Hold on,, don't lose heart!", "Revisit the logic.",
            "Slight error in... Stay focused!", "Give it another shot at success!", "Hold on,, try again!", "Slight error in, almost there!", "Keep learning!", "My apologies, the response.", "Revisit... Try a different path!", "Minor slip in, keep your head up!", "Let's review... Try again!", "Uh oh,, learning takes time!",
            "A bit off the order.", "Close, but no!", "Minor slip in... Room for improvement!", "You can do this!", "Close, but no... Each try makes you better!", "Wait, check, keep trying!", "Uh oh,... Let's polish this!", "Let's review... Give it another shot!", "Oops!, keep practicing!", "Not the winning pick!",
            "Not quite, stay determined!", "Hold on, the logic.", "Almost, try it once more!", "Think about... Don't lose heart!", "Close, but no the option.", "Wait, check... Try again!", "My apologies,... You can do this!", "Not the right selection!", "A bit off, keep trying!", "Study that!",
            "Focus up!", "Revisit, learning takes time!", "Revisit... Wait, let's rethink!", "Hold on,, keep trying!", "Just missed, stay determined!", "Careful now,, don't give up!", "Just missed, study that!", "Not quite the right fit!", "Not quite, try again!", "Wait, check... Wait, let's rethink!",
            "A bit off the response.", "My apologies,, you're getting closer!", "Just missed, try a different path!", "Just missed, focus up!", "Stay positive!", "Almost... Learning takes time!", "Nearly the reservation.", "Nearly the order.", "Keep up the spirit!", "Not quite, learning takes time!",
            "Hold on, the standard.", "My apologies, the selection.", "Give it one more go!", "Careful now,... Don't stop now!", "Nearly, keep practicing!", "Not the right response!", "A bit off... Each try makes you better!", "Minor slip in... Don't stop now!", "Keep practicing!", "Slight error in this one.",
            "Let's try again tomorrow!", "Close, but no, try a different path!", "Think about, stay focused!", "Not the right answer!", "My apologies, the fact.", "Slight error in... Don't stop now!", "A bit off, try a different path!", "Keep believing!", "Revisit... Almost there!", "Not the correct choice today!",
            "A bit off... Wait, let's rethink!", "Not quite... Keep practicing!", "Revisit, try a different path!", "Wrong path!", "Minor slip in the fact.", "Revisit that one!", "Nearly... Keep practicing!", "Oopsie,... Don't give up!", "Think it over!", "Oopsie,... Keep your head up!",
            "Not correct!", "You can do better!", "Slight error in, try it once more!", "Almost the detail.", "Oops! the reservation.", "Let's try another one!", "Nope!", "Close, but no... You're getting closer!", "Nearly, mistakes help you learn!", "Nearly, next one!",
            "Almost... You're getting closer!", "A bit off... One more time!", "Oops!, focus up!", "Almost, almost there!", "Almost that answer.", "Just missed, let's polish this!", "Revisit, don't lose heart!", "Oopsie,, almost there!", "Not quite on the mark!", "Keep pushing!",
            "Oopsie, the response.", "Oopsie, the choice.", "Give it another go-around!", "Oops!", "Almost... Each try makes you better!", "Close, but no, give it another shot!", "Think about the reservation.", "Think about, don't lose heart!", "Wait, check... Don't stop now!", "Not quite a hit!",
            "Wait, check, room for improvement!", "A bit off... Room for improvement!", "Hold on,... Let's polish this!", "Careful now,... Don't give up!", "Let's review the menu.", "Think about, don't stop now!", "Let's review, don't give up!", "Hold on, that answer.", "Wait, check the selection.", "Just missed, learning takes time!",
            "Oopsie,... Try it once more!", "Oops!, room for improvement!", "Let's review the fact.", "Let's review... Mistakes help you learn!", "A bit off, next one!", "Try once more!", "Revisit, don't give up!", "Slight error in, don't stop now!", "Not quite, don't lose heart!", "Close, but no the fact.",
            "Let's review, you're getting closer!", "Nearly right!", "Try to refocus!", "Try it once more!", "Uh oh,... Stay focused!", "Not quite, next one!", "Almost... Don't stop now!", "Wait, check, next one!", "Try a different path!", "Keep striving!"
        ]
    };

    const quizContainer = document.getElementById('quiz-container');
    let score = 0;
    let answeredCount = 0;

    let voicesLoaded = false;
    let voices = [];

    speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices();
        voicesLoaded = true;
    };

    let audioContext;
    function initAudio() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    function playSound(frequency, duration) {
        if (!audioContext) initAudio();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    function speakRandomSentence(isCorrect) {
        const array = isCorrect ? sentences.correct : sentences.incorrect;
        const sentence = array[Math.floor(Math.random() * array.length)];
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 0.5;
        if (voicesLoaded) {
            const maleVoice = voices.find(voice => voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('robot'));
            if (maleVoice) utterance.voice = maleVoice;
        }
        speechSynthesis.speak(utterance);
    }

    function initQuiz() {
        if (!quizContainer) return;
        questions.forEach((item, i) => {
            const shuffledOptions = [...item.options].sort(() => Math.random() - 0.5);
            const card = document.createElement('div');
            card.className = 'quiz-item';
            card.innerHTML = `
                <p><strong>Question ${i + 1}:</strong> ${item.q}</p>
                <div class="options-grid" id="q-grid-${i}">
                    ${shuffledOptions.map(opt => `<button class="option-btn" onclick="handleChoice(this, ${i}, '${opt}')">${opt}</button>`).join('')}
                </div>
            `;
            quizContainer.appendChild(card);
        });
    }

    function handleChoice(btn, qIdx, selected) {
        const correct = questions[qIdx].a;
        const grid = document.getElementById(`q-grid-${qIdx}`);
        const btns = grid.querySelectorAll('.option-btn');
        btns.forEach(b => b.disabled = true);
        btn.classList.add('clicked');

        setTimeout(() => {
            btn.classList.remove('clicked');
            if (selected === correct) {
                btn.classList.add('correct');
                score++;
                playSound(800, 0.5);
                speakRandomSentence(true);
            } else {
                btn.classList.add('wrong');
                btns.forEach(b => { if (b.innerText === correct) b.classList.add('correct'); });
                playSound(300, 0.5);
                speakRandomSentence(false);
            }
            answeredCount++;
            if (answeredCount === questions.length) {
                const res = document.getElementById('final-result');
                if (res) {
                    res.style.display = 'block';
                    res.innerHTML = `🌟 Completed! Score: ${score} / ${questions.length}`;
                }
            }
        }, 500);
    }

    initQuiz();
    window.handleChoice = handleChoice;

    // Back to top functionality
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Active nav link indicator ───────────────────────────────────────────
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        // Match exact filename or anchor on index page
        if (href === currentPage ||
            (currentPage === 'index.html' && href === 'index.html') ||
            href === currentPage.replace('index.html', '#lessons')) {
            link.classList.add('active');
        }
        // For lesson pages, also keep "All Lessons" active feel — skip to avoid double highlight
    });

    // ─── Lesson Audio Data (Embedded for local reliability) ─────────────────
    const lessonAudioData = {
        "1": "Welcome to Lesson 1. Today's topic is Welcoming Guests with Confidence. In the world of high-end hospitality, the first seven seconds are often more important than the next seven hours. Research consistently shows that guests form an indelible impression of your establishment almost instantly upon crossing the threshold. This lesson, titled 'The Architecture of Welcome', is designed to transform your approach from a simple greeting to a masterclass in professional reception. We will explore how to project warmth, authority, and genuine care through a combination of precise verbal scripts and mastered non-verbal communication. You will learn the concept of 'peripheral hospitality'—the art of maintaining awareness of the room even while engaged in other tasks—ensuring that no guest ever feels invisible. We will also dive into the psychology of recognition, discussing why making eye contact from across a lobby can be more powerful than a rehearsed speech at the front desk. By the end of this session, you will understand how to calibrate your welcome for different guest profiles, from the hurried business traveler to the relaxed vacationing family, ensuring every individual feels they are exactly where they need to be.",
        "2": "Welcome to Lesson 2. Today's topic is Taking Restaurant Reservations. A reservation is more than just a line in a booking book; it is the first professional contract between the guest and the restaurant. This lesson focuses on the linguistic precision required to manage this critical first touchpoint. We will break down the anatomy of a perfect reservation call, covering everything from the polite opening to the essential details: date, time, party size, and contact information. You will master the vocabulary of 'party counts', 'seating preferences', and 'special occasions'. Beyond the basics, we will discuss how to handle difficult situations, such as telling a guest you are fully booked during peak hours without losing their future business. We'll explore the art of 'cushioning'—suggesting alternative times or offering a spot at the bar or on a waitlist. We also cover the technical side, including 'no-show policies' and 'credit card guarantees', explaining them to guests with grace and clarity. Achieving excellence in reservations sets the stage for a flawless service, ensuring the kitchen and floor staff are perfectly prepared for every guest who walks through the door.",
        "3": "Welcome to Lesson 3. Today's topic is Hotel Check-In Excellence. The check-in process at the front desk is the definitive transition from a traveler's journey to their stay. In this lesson, we master the choreography of the professional arrival. We will start with the 'Identification and Verification' phase, where you learn the polite ways to request passports and credit cards while maintaining a conversational flow. We will dive deep into the 'Registration Card' and the importance of confirming the length of stay and room preferences. A major focus of this session is explaining hotel amenities and services—elevating the interaction from a paperwork exercise to a concierge-style introduction. You'll learn how to describe the 'incidentals deposit' in a way that feels like a standard procedure rather than an inconvenience. We also cover the 'Porter Hand-off', ensuring a seamless transition from the desk to the room. Whether you are dealing with an early arrival where the room isn't ready or a high-ranking VIP with complex demands, this lesson provides the professional English needed to handle every check-in with absolute poise and efficiency.",
        "4": "Welcome to Lesson 4. Today's topic is Presenting the Menu with Authority. The menu is a restaurant's primary tool for storytelling, and as a server, you are the narrator. This lesson is about moving beyond simply reading a list of dishes to becoming a trusted guide for your guests. We will analyze the different sections of the menu—from appetizers and 'small plates' to the 'entrée' and the 'daily specials'. You will learn the technical vocabulary used to describe cooking methods: from 'sous-vide' and 'char-grilled' to 'braised' and 'pan-seared'. A key part of this lesson is 'The Narrative Lead'—how to introduce a dish by highlighting its origin, its ingredients, or the chef's inspiration. We also tackle the critical skill of 'pacing the order', suggesting the right number of dishes to ensure the guest feels satisfied but not overwhelmed. We'll practice explaining 'à la carte' versus 'tasting menus' and how to pivot smoothly when a guest asks for a recommendation. By the end of this session, you will be able to present your menu with such authority and enthusiasm that guests will feel confident in every choice they make.",
        "5": "Welcome to Lesson 5. Today's topic is Handling Special Requests and VIP Guests. In the world of luxury hospitality, 'no' is a word we try to avoid. This lesson focuses on the linguistics of 'The Yes Culture'—the art of accommodating even the most complex guest needs. We will start by looking at 'Personalized Service', including how to address guests by name and remember their past preferences. A significant portion of this unit is dedicated to 'Dietary Requirements', moving beyond simple allergies to understanding lifestyle choices like veganism, paleo diets, and religious restrictions like Halal or Kosher. You will learn how to consult the kitchen with precision and relay information back to the guest with absolute confidence. We also explore 'Special Occasions'—how to handle birthdays, anniversaries, and honeymooners with appropriate levels of celebration and discretion. For VIP guests, we discuss the 'Discreet Hand-off' and 'Anticipatory Service'—solving a problem before the guest even realizes they have one. This lesson is designed to give you the advanced English needed to make every guest feel like the most important person in the building.",
        "6": "Welcome to Lesson 6. Today's topic is Room Service — The Language of In-Room Dining. Room service is a unique challenge because it removes the visual cues of a dining room, relying entirely on voice and timing. This lesson mastes the 'Phone Protocol', from the professional greeting to the precise verification of the order and the guest's room number. We will study the vocabulary of 'In-Room Menus', 'Service Charges', and 'Delivery Windows'. You will learn how to manage expectations regarding wait times during peak breakfast or late-night rushes. A major focus is 'The Delivery Ritual'—the polite knock, the entrance into the guest's private space, and the elegant set-up of the tray or trolley. We'll discuss where to place the tray, how to present the bill for signature, and the polite 'exit script'. We also cover 'Tray Removal' procedures, ensuring the hallway remains clear and the guest knows exactly how to request a pickup. This session is essential for anyone working in a hotel environment who wants to deliver a seamless, five-star dining experience behind closed doors.",
        "7": "Welcome to Lesson 7. Today's topic is Bar Service, Appetizers, and Opening Drinks. The bar is often the heartbeat of a hospitality establishment, where the atmosphere is set for the evening. In this lesson, we explore the sophisticated language of mixology and beverage service. You will learn to describe 'Apéritifs', 'Signature Cocktails', and 'Mocktails' with flair. We will dive into the terminology of glass types—from highballs to martinis—and the precise language of 'garnishes' and 'mixers'. You'll master the art of 'The Rocks', 'Neat', and 'Straight Up', ensuring you never have to ask for a definition in front of a guest. We also focus on the service of 'Bar Snacks' and 'Hors d'oeuvres', discussing how to describe small bites in a way that stimulates the appetite. A key part of the session is 'The Drink Recommendation'—using descriptors like 'crisp', 'botanical', 'refreshing', and 'spirit-forward' to guide the guest's choice. Whether it's a high-volume hotel bar or an intimate cocktail lounge, this lesson provides the professional English needed to serve with speed, style, and absolute technical knowledge.",
        "8": "Welcome to Lesson 8. Today's topic is Housekeeping Communication and Room Care. While often working behind the scenes, the housekeeping team is the foundation of guest satisfaction. This lesson focuses on the 'Language of Immaculate Care'. We will cover the essential vocabulary of the 'Room Attendant', from 'linens' and 'toiletries' to 'par levels' and 'amenities'. You will learn the professional way to respond to guest requests for extra pillows or towels, and how to handle the 'Do Not Disturb' (DND) protocol with respect for guest privacy. We also dive into the 'Turndown Service'—the evening ritual of preparing the room for sleep, including lighting, music, and bedside amenities. A significant part of this lesson is 'Maintenance Reporting'—learn how to describe 'clogged drains', 'flickering lights', or 'leaking faucets' with technical clarity so your colleagues can fix them fast. We'll also discuss how to handle 'Lost and Found' items with honesty and procedure. By the end of this session, you'll be able to communicate the high standards of your department with pride and professional precision.",
        "9": "Welcome to Lesson 9. Today's topic is Main Courses and Dietary Requirement Management. The main course is the centerpiece of the meal, and managing it correctly requires a deep understanding of both culinary art and guest safety. This lesson focuses on the 'Technical Description of Mains'. You will learn the vocabulary of 'Proteins', 'Sides', and 'Sauces', and how to describe the 'Sourcing' of ingredients—words like 'heritage-breed', 'locally-foraged', and 'sustainably-caught'. We will master the 'Temperature Guide' for steaks and fish, from 'Blue-Rare' to 'Well-Done'. Crucially, we devote a large portion of this unit to 'Allergen Management'. You will learn the 'Big Fourteen' allergens and the professional English needed to handle a 'Cross-Contamination' concern. We'll practice the 'Safety Check' dialogue: 'I've consulted the chef, and we can prepare this dish without the dairy component'. This lesson is about providing guests with not just a meal, but a safe, informed, and truly exceptional dining experience where they feel completely cared for by a knowledgeable professional.",
        "10": "Welcome to Lesson 10. Today's topic is Using Hotel Facilities. A modern hotel is much more than just a room; it is a collection of experiences. This lesson is designed to help you guide guests through the 'Leisure and Business Landscape' of your property. We will start with the 'Wellness Facilities', mastering the vocabulary of the 'Fitness Center', 'Infinity Pool', 'Sauna', and 'Steam Room'. You'll learn how to explain 'Operating Hours', 'Access Requirements', and 'Towel Policies' with clarity. We also explore 'Business Services', covering the 'Executive Lounge', 'Boardrooms', and 'Secretarial Support'. You'll learn how to help a guest with 'Printing Requests' or 'Wi-Fi Troubleshooting'. A key part of the session is 'The Facility Recommendation'—suggesting the best time to visit the spa to avoid the rush or where to find the quietest corner for a morning coffee. By the end of this lesson, you will be an expert on every corner of your hotel, acting as a knowledgeable host who ensures guests don't just stay with you, but truly live the full experience of the property.",
        "11": "Welcome to Lesson 11. Today's topic is Wine Selection and Etiquette. Wine service is one of the most visible markers of high-end hospitality. This lesson, titled 'The Language of the Vine', is designed to give you the confidence of a sommelier. We will cover the fundamental concepts of 'Body', 'Acidity', 'Tannin', and 'Finish'. You will learn how to describe a wine's 'Bouquet' and 'Flavor Profile' using professional descriptors like 'oaky', 'herbaceous', 'stone-fruit', and 'mineral'. We will master the 'Ritual of Wine Service'—from presenting the bottle to the 'The First Pour' for tasting. You'll learn how to handle 'Corkage' questions and how to suggest 'Food and Wine Pairings' that enhance the guest's meal. We also discuss the etiquette of 'Decanting' and the importance of 'Serving Temperatures'. Whether you are serving a casual glass of house wine or an expensive vintage, this lesson provides the sophisticated English needed to speak with authority about one of the world's most complex and celebrated beverages.",
        "12": "Welcome to Lesson 12. Today's topic is Requesting Repairs or Upgrades. No matter how perfect a hotel is, physical things occasionally break and expectations occasionally differ. This lesson is about 'The Art of Resolution'. We will start with 'Maintenance Requests'—learning how to describe technical problems with HVAC systems, plumbing, or electronics with enough detail for the engineers to act quickly. But the core of this lesson is 'Service Recovery'. You will learn the linguistic techniques for an 'Effective Apology'—acknowledging the inconvenience without becoming defensive. We'll practice the 'Upgrade Negotiation'—when and how to move a guest to a better room category to compensate for a problem. You'll master the vocabulary of 'Room Moves', 'Complimentary Adjustments', and 'Loyalty Point Compensation'. We also discuss the 'Follow-Up'—the critical step of checking back with the guest to ensure the issue was solved. This session is essential for developing the diplomacy and problem-solving skills that define a true hospitality leader.",
        "13": "Welcome to Lesson 13. Today's topic is Handling Food Issues Correctly. In a restaurant, the moment a guest is unhappy with their food is a 'Moment of Truth'. How you react determines if they leave as a critic or a fan. This lesson focuses on the 'Tactful Correction of Food Issues'. We will cover the vocabulary of 'Culinary Errors'—from 'overcooked' and 'undercooked' to 'incorrect seasoning' and 'temperature issues'. You will learn the 'Linguistic Pivot'—moving from a guest's complaint to a proactive solution: 'I am so sorry, let me take that back to the kitchen and have a fresh one prepared for you immediately'. We also tackle the difficult subject of 'Foreign Objects' in food and the immediate, high-priority protocol for handling such a serious error. We'll practice 'Managerial Intervention'—knowing when to bring a supervisor to the table. By the end of this session, you will have the linguistic tools to de-escalate tension, restore trust, and ensure that a temporary problem becomes an opportunity for exceptional service recovery.",
        "14": "Welcome to Lesson 14. Today's topic is Local Transport and Shuttles. For many guests, the hotel is their home base in an unfamiliar city, and they rely on you to help them navigate it. This lesson covers 'The Language of Movement'. We will start with 'Airport Transfers' and 'Shuttle Services'—mastering the vocabulary of 'pick-up points', 'departure times', and 'luggage handling'. You will learn how to book 'Taxis' and 'Executive Cars', explaining 'flat rates' versus 'metered fares' to guests. A major focus is 'Providing Directions'—learning the prepositions and landmarks needed to help someone find a nearby train station or a hidden local landmark. We also discuss 'Public Transport Etiquette' and 'Ride-Sharing Apps', helping guests understand the local norms. Whether you are at the concierge desk or the front-of-house, this lesson gives you the English needed to be a reliable local guide, ensuring your guests move through your city with confidence, safety, and ease.",
        "15": "Welcome to Lesson 15. Today's topic is Paying the Bill and Gratuity. The final transaction is the last memory a guest has of your service, and it must be handled with absolute professionalism and discretion. This lesson focuses on 'Financial Hospitality'. We will cover the vocabulary of the 'Check' or 'Bill', including 'VAT', 'Service Charges', and 'Line-Item Breakdown'. You'll learn how to handle 'Splitting the Bill' between multiple guests with speed and accuracy. We'll dive into the delicate subject of 'Gratuity' and 'Tipping'—explaining how to respond when a guest asks if service is included. You will master the English of 'Card Transactions', 'Contactless Payments', and 'Foreign Currency' questions. We also discuss the 'Final Farewell'—the words you say after the bill is paid to leave a lasting positive impression. This session is designed to ensure that the technical side of the payment process is as smooth and elegant as the service that preceded it, ensuring the guest leaves feeling that every penny was well-spent.",
        "16": "Welcome to Lesson 16. Today's topic is Security and Valuables. At the heart of hospitality is the promise of safety. This lesson focuses on 'The Language of Security and Guest Protection'. We will start with 'In-Room Security', learning how to explain the 'Master Safe' and 'Secondary Locks' to guests. A major portion of this unit is dedicated to 'Emergency Procedures'—mastering the clear, command-level English needed for 'Fire Evacuations' and 'First-Aid Situations'. You will learn how to describe 'Unauthorized Entry' and 'Lost Key Protocols' with the appropriate level of seriousness and calm. We also discuss 'CCTV' and 'Physical Security Presence', explaining to guests how the property is monitored for their safety. We'll practice 'Conflict De-escalation'—the words used to handle a disruptive or intoxicated guest with professional distance and firm politeness. This lesson is essential for ensuring that you are not just a host, but a trained professional who can protect and reassure your guests in any situation.",
        "17": "Welcome to Lesson 17. Today's topic is Table Manners and Etiquette. For many guests, a fine dining meal is an education in itself, and as a server, you must be the authority on 'Domestic and International Etiquette'. This lesson explores the finer points of 'The Service Ritual'. We will cover 'Silverware Management'—how to properly set and clear a table using the 'From the Right, From the Left' rules. You will learn the 'Napkin Protocol' and the professional way to respond when a guest leaves the table temporarily. We'll dive into the vocabulary of 'Bread Service', 'Water Service', and 'The Crumbing Process'. A major focus is 'Non-Verbal Service Cues'—reading the position of the guest's fork and knife to know when they are finished without having to interrupt. We also discuss 'Summoning a Waiter' politely and the etiquette of 'Toasting'. By the end of this session, you will understand the deep cultural roots of dining manners, allowing you to provide a service that is both technically perfect and culturally inclusive.",
        "18": "Welcome to Lesson 18. Today's topic is Cultural Sensitivity and International Guest Communication. In the global hospitality industry, your guests come from every corner of the world, each with their own unique expectations of what 'good service' looks like. This lesson is about 'The Global Mindset'. We will explore how to adapt your 'Formality Level'—knowing when to be stiffly professional and when to be warmly casual. We will discuss 'Non-Verbal Differences', from eye contact and personal space to hand gestures that may be polite in one culture but offensive in another. You will learn the 'Linguistic Softeners' used to avoid sounding too direct or blunt in English. We'll look at the specific needs of travelers from different regions, discussing 'Breakfast Preferences', 'Communication Styles', and 'Relationship with Time'. This lesson is designed to help you avoid the 'Cultural Blind Spots' that lead to service failures, ensuring you can connect genuinely with every guest, regardless of where they are from or what language they speak.",
        "19": "Welcome to Lesson 19. Today's topic is The Art of Upselling and Revenue Communication. Hospitality is a business, and your ability to drive revenue is directly linked to your professional success. However, 'Upselling' in a luxury environment is about enhancement, not pressure. This lesson focuses on 'The Language of Suggestion'. You will learn to move from 'Do you want...?' to 'Might I suggest...?', using evocative adjectives to make premium options irresistible. We'll cover 'Menu Upselling'—suggesting a side dish that perfectly complements the main, or a dessert wine that elevates the final course. We also explore 'Front-Desk Upselling'—how to present a 'Suite Upgrade' by highlighting the view, the space, or the exclusive amenities. You will master the 'Value Proposition'—explaining why the premium option is worth the extra cost. By the end of this session, you will see upselling as a service skill that improves the guest's experience while simultaneously hitting your department's financial targets.",
        "20": "Welcome to Lesson 20. Today's topic is Career Development and Professional English for Advancement. In our final lesson, we shift our focus from serving guests to serving your own career. This session, titled 'The Path to Leadership', covers the language of professional growth in the hospitality industry. We will explore the vocabulary of 'Management and Supervision'—from 'Staff Scheduling' and 'Cost-Control' to 'Performance Reviews' and 'Team-Building'. You will learn the English needed for 'The Promotion Interview', practicing how to describe your hospitality successes and your 'Service Philosophy'. We'll look at 'Corporate Communication'—how to write professional emails to head office and how to present 'Service Scores' at a team meeting. We also discuss 'Personal Branding'—how to position yourself as an expert in your field. This lesson is the capstone of our course, designed to give you the linguistic tools and the professional confidence to move from the floor or the front desk into the ranks of hospitality management."
    };
    const pageAudioData = {
        "index.html": "Welcome to our academy. Master professional hospitality English for service excellence.",
        "about.html": "Learn about our mission to empower hospitality professionals with language.",
        "resources.html": "Explore helpful tools and guides to support your professional growth.",
        "gallery.html": "View our high-quality facilities and professional hospitality environments in action.",
        "faq.html": "Find answers to common questions about our hospitality English courses.",
        "support.html": "Contact our support team for any assistance with your learning.",
        "events.html": "Stay updated on upcoming workshops and networking events for professionals.",
        "blog.html": "Read latest insights and stories from the world of hospitality.",
        "community.html": "Join our community of dedicated hospitality professionals and share experiences."
    };
    function initPageAudio() {
        const title = document.querySelector('.topic-title');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageText = pageAudioData[currentPage];

        if (!title || !pageText) return;

        let container = document.querySelector('.topic-title-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'topic-title-container';
            title.parentNode.insertBefore(container, title);
            container.appendChild(title);
        }

        if (container.querySelector('.audio-btn-page')) return;

        const playBtn = document.createElement('button');
        playBtn.className = 'audio-btn audio-btn-page';
        playBtn.innerHTML = '🔊';
        playBtn.title = 'Listen to Page Introduction';
        container.appendChild(playBtn);

        let isPlaying = false;

        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                speechSynthesis.cancel();
                isPlaying = false;
                playBtn.innerHTML = '🔊';
            } else {
                speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(pageText);
                utterance.lang = 'en-US';
                utterance.rate = 0.9;

                utterance.onend = () => {
                    isPlaying = false;
                    playBtn.innerHTML = '🔊';
                };

                speechSynthesis.speak(utterance);
                isPlaying = true;
                playBtn.innerHTML = '⏹️';
            }
        });
    }

    function initLessonAudio() {
        const title = document.querySelector('.topic-title');
        // Extract lesson number from the page title (e.g., "Lesson 1: ...")
        const lessonMatch = document.title.match(/Lesson\s+(\d+):/i);

        if (!title || !lessonMatch) return;

        const lNum = lessonMatch[1];
        const lessonText = lessonAudioData[lNum];

        if (!lessonText) return;

        // Create the container if it doesn't exist
        let container = document.querySelector('.topic-title-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'topic-title-container';
            title.parentNode.insertBefore(container, title);
            container.appendChild(title);
        }

        // Add the play button
        const playBtn = document.createElement('button');
        playBtn.className = 'audio-btn';
        playBtn.innerHTML = '🔊';
        playBtn.title = 'Listen to Introduction';
        container.appendChild(playBtn);

        let isPlaying = false;
        let utterance = null;

        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                speechSynthesis.cancel();
                isPlaying = false;
                playBtn.classList.remove('playing');
                playBtn.innerHTML = '🔊';
            } else {
                speechSynthesis.cancel(); // Stop any other playing voices
                utterance = new SpeechSynthesisUtterance(lessonText);
                utterance.lang = 'en-US';
                utterance.rate = 0.9;

                utterance.onend = () => {
                    isPlaying = false;
                    playBtn.classList.remove('playing');
                    playBtn.innerHTML = '🔊';
                };

                speechSynthesis.speak(utterance);
                isPlaying = true;
                playBtn.classList.add('playing');
                playBtn.innerHTML = '⏹️';
            }
        });
    }

    initLessonAudio();
    initPageAudio();
});
