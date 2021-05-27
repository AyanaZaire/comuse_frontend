# Comuse Frontend

Learn how to code from artists. Comuse is an educational platform for learning code where the classes are created and taught by artists. For demo instructions, see step by step walkthrough below.

Comuse uses Ruby on Rails as the framework for building the backend. Comuse leverages `sqlite3` as the database for Active Record. The frontend of the application is built using React providing the UI for members to fetch and change data from the backend.

**This application is deployed on Heroku and can be found here: https://comuse.herokuapp.com**

## Features

For authentication functionality Comuse uses the `bcrypt` gem and [JSON Web Tokens](https://jwt.io/). For payment functionality Comuse uses the [Stripe API](https://stripe.com/docs/api) and [Bootstrap's Leap Template](https://themes.getbootstrap.com/product/leap-multipurpose-bootstrap-theme/) for the frontend UI.

## Backend

**The backend for this application is deployed on Heroku and can be found here: https://comuse-backend.herokuapp.com**

The GitHub repository for the backend of this application can be found [here](https://github.com/AyanaZaire/comuse_backend).

## Demo

In order to demo this application

**Test User**<br>
Email: `info@zolajones.com` <br>
Password: `pw `

**Test Card**<br>
Card Number: `4242 4242 4242 4242` <br>

1. Log in as "demo member", Zola Jones
2. Head to "Classes" in the menu and view all classes in the database
3. Search a class by keyword (Ex: "Code")
4. Click on a course you are not already enrolled in and enroll using the test credit card number, any valid expiration date, any CVC, and any zip code. Notice how you now have access to the course's lessons. The payment of this new enrollment will now be visible on the respective teacher's payment dashboard.
5. Click "Logged in as: Zola Jones" to reveal drop down menu
6. Click "My Profile" to view your profile, edit your profile, create a new class, view classes Zola's teaching, and view classes Zola's enrolled in
7. Click on one of the classes you're teaching and click the "Edit" button next to one of the lessons to activate "Edit Lesson" modal
8. For each course you've created you can also edit the class and add lessons to the class. Each lesson has the option to include a YouTube video.
9. Click "Payments Dashboard" to view your payments profile, connected cards, balance activity, and upcoming payouts from students enrolled in your class.
10. When finished with this demo, logout using the drop down submenu within the main menu.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
