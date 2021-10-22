# School of Computing &mdash; Year 4 Project Proposal Form

## SECTION A

|                     |                   |
|---------------------|-------------------|
|Project Title:       | Allert            |
|Student 1 Name:      | Conor Clerkin            |
|Student 1 ID:        | 18773059            |
|Student 2 Name:      | David Moore            |
|Student 2 ID:        | 18722869            |
|Project Supervisor:  | Paul Clarke            |

## SECTION B

### Introduction

For people who suffer from various food allergies keeping track of which items, products or brands may contain allergens can be a difficult task. Depending on the severity of a person’s allergies, cross contamination between products can be a serious concern, and challenging to keep track of.

Allert is intended to provide a user with various tools to keep track of their allergen data, by allowing them to scan product ingredient listings with their smartphones. Allert will automatically detect any allergens found in the listings and notify a user if it conflicts with their own history. Users may also be able to mark newly occurring reactions, allowing Allert to make guesses and suggestions as to what products might have been responsible, helping users to pin down newly developed allergies.

### Outline

Allert will be developed as a mobile application for Android and iOS, making use of Electron for a cross-platform front-end, along with an AWS hosted back-end for user account data, making use of the AWS Lambda service for image processing.
Users will be able to create an account and input their own allergen history and data. Using the app, they will be able to scan ingredient listings of various products; Allert with flag any known allergens if they conflict with the user’s own history.

### Background

Allert was inspired by a combination of continued interest in our previous work during the course of our INTRA placements, and a project proposal put forth by Paul Clarke; During our internships in the previous year, we have worked with a combination of React and AWS services to create various web applications and tools.
While looking for suitable projects, we encountered a proposal by Paul Clarke to create a tool for tracking a user’s allergen information and providing them with tools to avoid and track products that might conflict with their allergen history.
We felt this proposal would be both an invaluable tool for those who suffer from serious allergic reactions, and also in-line with the kinds of tools and technologies we wanted to work with for our project.


### Achievements

This project should allow people with allergies to shop more efficiently by spending less time reading ingredient lists or searching for allergens. It should also ensure that they do not make any mistakes leading to allergic reactions. Finally, it should allow the user to take control of their allergy by tracking allergic reactions, and prevent these from occuring in the future.
The app itself should be easy to navigate and should return allergen flags quickly. It should be consistent and reliable. The allergic reaction tracking element should be easy to understand and should provide the user with sufficient information to allow prevention of similar reactions.

### Justification

“Globally, more than 250 million people suffer from a food allergy with more than 17 million people suffering from food allergies in Europe alone. It is estimated that over three percent of adults and up to six percent of children have a food allergy”. This app will be useful to these people who have to live with often life-threatening allergies.
[https://www.rte.ie/brainstorm/2018/1112/1010346-why-has-there-been-a-global-increase-in-food-allergies/]
It will make their shopping experience much less stressful and will be useful in many other environments. Rather than having to search through a list of ingredients or allergens before eating or shopping, they will simply be able to scan the ingredients through the app and flag any relevant allergens.
In Ireland, “in 2019, 52 food allergen alerts were issued.”. These are instances when allergens have been mislabelled on packaging and can lead to serious reactions. This app should help to reduce the impact of events like this.
[https://www.fsai.ie/food__and_allergen_stats_050320.html]

### Programming language(s)

Python
JavaScript, TypeScript
HTML5, CSS3

### Programming tools / Tech stack

AWS DynamoDB for storing user credentials.
AWS Lambda for hosting microservices (python)
Electron Cross-Platform Front-End

### Hardware

The application is intended for smartphones; users will be expected to have a smartphone with a functional camera. 

### Learning Challenges

Working with AWS cloud solutions will be a challenge to work through. Services like DynamoDB and AWS Lambda will be integral to storing user credentials and hosting microservices respectively.
The development of these microservices themselves will also be a challenge. The process of text recognition and comprehension will allow us to work with various python libraries and learn how they work.
Development with React will prove to be a learning experience as we connect the backend and frontend. Providing the user with an intuitive experience across multiple platforms will also be a challenge.

### Breakdown of work

#### Student 1

Given the bulk of my experience from my INTRA placement was working with React applications, I will be primarily responsible for the front-end of the application. This will involve developing a cross-platform UI for Android and iOS using React and Electron.

The application will allow users to create and manage an account using an email and password sign-in, allow a user to input their known allergen data and provide the user with visualisations of their data. The primary function of the application will be using the phone’s camera to scan ingredient listings and flag known allergens; this image will be sent to the application’s back-end to be processed using a computer vision tool with Python.
While my focus will be on the front-end of the application, this will be a collaborative effort, with both of us contributing to all aspects of the project.

#### Student 2

My focus for this project will be mainly on the backend elements hosted in AWS. Having worked with many AWS provided services over the course of my INTRA placement, this project will give me the opportunity to work with familiar technologies but also expand my knowledge of services like AWS Lambda.
The backend itself will be an opportunity to work in Python and improve those skills. I will be using tools such as openCV for the processing of the image provided by the camera. I will also be working on the machine learning aspect of the python code in which users report any allergic reactions and the event will then be analysed for associations with food products or ingredients.
The collaborative nature of this project means that both of us will be working on every element of the stack and in particular we will be working on ensuring that they all work together. This will be an ongoing process in order to ensure that both front-end and back-end interact seamlessly.

