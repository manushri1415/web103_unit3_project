# WEB103 Project 3 - UnityGrid Plaza

Submitted by: **Manushri Muruga Kumar**

About this web app: **UnityGrid Plaza is a virtual community space where visitors can choose a venue from an interactive plaza map and see upcoming or past events for that location.**

Time spent: **2** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [ ] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM events;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.*
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [x] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [x] Added an interactive map with highlighted venue regions and keyboard-focusable location cards.
- [x] Added responsive event cards with venue photos, event descriptions, date/time formatting, and past-event styling.
- [x] Added a PostgreSQL reset script that creates and seeds `locations` and `events` tables.

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='./walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with **ScreenToGif**

## Notes

The main challenge was connecting the starter frontend to a real API flow: the project needed PostgreSQL configuration, Express routes, frontend service calls, and React pages that could render API results for each location.

The walkthrough shows the database connection, table contents, location navigation, and events filtering flow.

## License

Copyright [2026] [Manushri Muruga Kumar]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
