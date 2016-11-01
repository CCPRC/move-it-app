# move-it

Move IT is a web app for patient health info/metrics. Healthcare Navigators will be the primary users. They will be able to schedule training programs, process referrals, and monitor member progress among other administrative tasks. Other user types include Trainers, Physicians, and Members.

## Design

[https://invis.io/F93QQDKQ8](https://invis.io/F93QQDKQ8)

## Documentation 

See Docs

## Development Setup

``` sh
git clone git@github.com/lincsIO/move-it.git
cd move-it
npm install
npm start
```
## Testing

grunt test

Admin Login Information

## Browser Requirements

* Chrome (latest)
* Firefox (latest)
* IE 10+
* Microsoft Edge
* Safari (latest)
* Android 4.4+
* iPhone 6+

## Technical Stack

* Virtual DOM - https://github.com/Matt-Esch/virtual-dom
* HTML5 
* CSS 
* Browserify - http://browserify.org/
* NodeJS - https://nodejs.org
* Auth0 - https://auth0.com/
* AWS API Gateway - https://aws.amazon.com/api-gateway/
* AWS Lambda - https://aws.amazon.com/lambda/ 
* Palmetto Flow - https://github.com/twilson63/palmettoflow 
* Cloudant (CouchDB) - https://cloudant.com/
* Keen.io 
* Redis - http://redis.io/
* Twilio - https://www.twilio.com/
* docmosis - https://www.docmosis.com/

## Team Roles and Responsibilities

Name | Contact | Role | Responsibilities
-----|-------|---------|---------------------
Jeremy Quarrie | jeremy@moveitus.com | Product Owner | Product Owner is responsible for accepting deliverables on behalf of the business stakeholders and providing key insights from the business stakeholders to the development team. This role is a critical role of any project and a commitment must be made to review and accept deliverables every two weeks. A PO is the core liason of the business stakeholders.
Bryan Chappell | Bryan@lincs.io | Project Manager/SCRUM Master | The scrum master is responsible for managing the development process and schedule, also providing business requirements in a context that the development team can interpet and execute on. This role is primarily the liason of the development team and is a pivotal role for the success of any project.
Tom Wilson | tom@lincs.io | Software Architect | Software Architect is a role that provides the technical vision for the project as well as direction, insight and support for the technical architecture, the SA's goal is to create a scalable platform that embraces change and flexibility, can be a learning system that provides data back to the business day one. The SA provides knowledge support on all technology and is responsible for the developers excelling at the technical direction.
Liz Kline | liz@lincs.io | Lead Frontend Developer | The lead FE developer is responsible for the look and feel of the client facing interface from the development team perspective, they drive change in layout and css.
Lucius Nelson | lucius@lincs.io | Developer | The developers are the first class citizens of the greenfield project, they should have as much direction as possible to execute and ship features, they should be empowered to bring up well thought out improvements and fully understand the purpose and mission of the product.
Kimokeo Rabang | kimo@lincs.io | Developer | The developers are the first class citizens of the greenfield project, they should have as much direction as possible to execute and ship features, they should be empowered to bring up well thought out improvements and fully understand the purpose and mission of the product.
Imee Cuison| imee@lincs.io | Developer | The developers are the first class citizens of the greenfield project, they should have as much direction as possible to execute and ship features, they should be empowered to bring up well thought out improvements and fully understand the purpose and mission of the product.


## Greenfield SDLC (Software Development LifeCycle)

* Sprint duration every 2 weekes

### Cycle

Description of sprint cycle

Day | Task | Description
----|------|-----------------------------
1   | Planning and Estimation | On day one the developers and project manager convine to discuss the planning and estimation and agree on deliverables for this sprint.
2, 3, 4, 5 | Core Development | These days in the cycle are focused on core development of the estimated features, a stand up is held each day to report progress and any stop gaps
5, 6, 7 | Review, Unit Tests and Refinements | These dev days are to complete all code reviews, unit tests and any refinements to the given core features
8 | Acceptance Testing | This day should be used to review with the product owner all delivered features and get each feature accepted and delivered
9 | Patches, Alterations, Integration Testing | On day 9 the team should address any patches or alterations to the provided featurs and focus to get re-accepted and delivered if possible.
10 | Ship and Retrospective | Ship all accepted code and hold a retrospective on how the sprint went, what can be improved, what can be removed from the process etc

### Sprints

Sprint | Goals             |Retrospective
-------|-------------------|-----------------
1      | Setup Client Project, Setup Project Plan, Spec core API, gather documentation for integrations, debrief development team, and bring up to speed on tech stack, make sure each developer understands the product vision and technical vision, setup AWS Gateway IAM Account and server check in.
2      | Start two focuses, front end team begin to focus on client application and add templates, styles, and start to put together a click-thru application, the other developers start to focus on pieces of the backend API, implementing each piece using AWS Lambda and AWS Gateway.
3      | 
4      | 
5      | Connect application and presentation layers for Member module.   

### Terms
* Member - any individual participating in a Program.
* Navigator - individual who manages the assignment of Members to Programs and tracks their progress. Also responsible for receiving referrals from physicians’ offices, assigning Trainers to Programs, conducting phone interviews to onboard new Members, following up with Members who are not attending classes.
* Physician - doctors who are linked to Members. 
* Trainer - professional individuals who conduct a Program.
* Group - category of members, defined by any of number of criteria.
* Class - is an activity or set of exercises with a specified location, date, time, and trainer.
* Activity - recreation that makes up a class
* Program - is a group of classes
* Partners – medical providers and/or in-kind community studio space , like the CCPRC's relationships with RSF and City of North Charleston respectively
* Sponsors – corporate entities that purchase Move IT! passes in bulk for employee wellness programs, and/or entities that sign to a designated sponsor level that ultimately covers MICC hard costs like studio space, equipment, t-shirts, graduation materials, and the like, for example Boeing, MUSC

### Application Roles

* Navigator
* Member
* Trainer
* Physician

### Core Modules

* People
  - Description
    * All users within account

  - User Types
    * Admin
    * Staff
    * Customer / Patient
    * Bot

  - Features
    * Create user
    * User specification - select type of user (e.g. Member, Navigator, Trainer, Physician)
    * Invite user - email invitation  
    * Edit User
    * Delete User 
    * List
    * Search - populate list with People names that include search term

* Programs

* Classes

* Notifications
  - Description
  - Types
    * Email
    * SMS

  - Features
    * Check for Address - check for address (e.g. email, phone number) to which notification is sent
    * Edit frequency of notifications to a user

* Calendar
  - Description
  - Calendar Types
    * Patient calendar
    * Team calendar
  - Features
    * Views - by day, by week, by month, by year
    * Add New Appt
    * Cancel Appt
    * Send Invite to Customer
    * Change Appt

* Account Settings
  - Features
    * oauth facebook
    * oauth twitter
    * oauth email
    * Authorization failure

* Profile Preferences
  - Features
    * Transfer Member

* Metrics
  - Description
  - Metric Types
  - Features

* Login
  - Description
  - Features
    * Email and Password input
    * Login Failure
    * Email Verification
    * Password Recovery

* Admin
  - Description
  - Features
    * Edit company profile
    * Invite users

* Administration Panel/Billing/Invoices
* Landing Site/Sign Up/Marketing/Pricing/Blog (Customer)

### App Url

https://[customer].moveitus.com

subdomain == customer == database

> A database must be named with all lowercase letters (a-z), digits (0-9), or any of the _$()+-/ characters and must end with a slash in the URL. The name has to start with a lowercase letter (a-z).

* multi-location = teams

### Architecture

Backend Development

* AWS Gateway API
* AWS Lambda / Palmetto Flow
* Redis (Cache Layer)
* Cloudant/CouchDB

Front End Development

* Bootstrap
* Virtual DOM
* xhr

### User Stories

See Zenhub.io

"As a"
"I want to"
"So that"

### Licensing

### 
