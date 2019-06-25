# extra-life-api
A node module to integrate with the extra-life API, and extends it to provide additional info where possible.

## Background
------
[I've been doing Extra Life for multiple years now](https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=362008), and every year I've built a custom little website to send to family, friends, and coworkers to help collect donations.

Initially, Extra Life had no public API to grab data about your team's donations, goals, info, etc.  So the old versions of this used to scrape various Extra Life profile page to return data so people could build cool little site or stream overlays to adverise their campaign more effectively!

However, as things have grown, an official API was released, and this was adapted to work with it.  In some areas methods have extended multiple APIs to provide better aggregate data objects.  Various Extra Life community member and even people over at Donor Drive have helped keep this repo up-to-date and running smoothly as things have changed over the years!

## Installation
------
You can install the repo through NPM

```bash
npm i extra-life-api
```

As of version 3.0.0 the app is written in Typescript as an ES6 Module, and can be imported as one large object, or by individual methods
```javascript
import { getTeamInfo, getTeamDonations } from 'extra-life-api';
import * as extraLifeAPI from 'extra-life-api';
```


## API
------

### Team & Participant IDs Parameters

Every method on the module will require an individual's 'Participant ID' or a team's 'Team ID'.  These can be found by going to your personal profile page or team profile page, and checking the end of the URL:

**Participant ID**

extra-life.org/index.cfm?fuseaction=donordrive.participant&participantID=**[PARTICIPANT ID HERE]**

**Team ID**

extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=**[TEAM ID HERE]**

### Methods

* **getUserInfo( participantId )**
  * Takes `participantId` as a parameter
  * Returns a basic object of user info

  **Returned object**
    ```javascript
    { 
      displayName: 'Joe Smith',
      fundraisingGoal: 400,
      participantID: 506571,
      teamName: 'My Awesome Team',
      eventName: 'Extra Life 2018',
      avatarImageURL: 'https://assets.donordrive.com/extralife/images/$avatars$/constituent_42BB6E88-C292-13D6-00FFFD8987560FD1538.jpg',
      createdDateUTC: '2018-06-15T19:18:15.77+0000',
      eventID: 539,
      sumDonations: 250,
      sumPledges: 0;
      teamID: 38961,
      isTeamCaptain: false,
      numDonations: 17,
      links: {
        donate: 'https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=506571',
        page: 'https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=506571',
        stream: 'http://twitch.tv/mystream' // Optional
      },
      teamURL: 'https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=38961' 
    }
    ```
    
* **getUserDonations( participantId, limit?, page?)**
  * Takes `participantId` as a parameter. `limit` and `page` are optional parameters.  Page size is equal to your `limit` value.
  * Returns information on page and count, and an array of donations, ordered from newest to oldest
  
  **Returned object**
    ```javascript
    {
      countDonations: 73,
      countPages: 1,
      donations: [
        { 
          displayName: 'Tony Stark',
          message: 'Great job!',
          participantID: 681675,
          amount: 25,
          donorID: '5D4DBFFF-B861-D42E-05E6F2B574189698F',
          avatarImageURL: '//assets.donordrive.com/clients/extralife/img/avatar-constituent-default.gif',
          createdDateUTC: '2018-09-04T04:54:16.953+0000'
        },
      ]
    }
    ```
    
* **getTeamInfo(teamId, fetchRoster?)**
  * Takes `teamId` as a parameter and an optional `fetchRoster` boolean (defaults to TRUE)
  * Returns a promise that contains an object with the basic team info and it's full roster (if `fetchRoster` is set to TRUE)
  * Roster returns as array of user objects

  **Returned object**
    ```javascript
    { 
      fundraisingGoal: 50000,
      eventName: 'Extra Life 2018',
      avatarImageURL: 'http://assets.donordrive.com/extralife/images/$event539$/avatar_team_38961.jpg',
      createdDateUTC: '2018-01-20T04:51:25.97+0000',
      eventID: 539,
      sumDonations: 1469,
      teamID: 38961,
      name: 'Extra Life Nerds',
      numDonations: 51,
      links: {
        page: 'https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=38961'
      },
      members: [
        { displayName: 'Alex Muench',
          fundraisingGoal: 1000,
          participantID: 320706,
          teamName: 'Extra Life Nerds',
          eventName: 'Extra Life 2018',
          avatarImageURL: 'https://assets.donordrive.com/extralife/images/$avatars$/constituent_0C07ECD7-C293-34EB-45A3F7B77F8BA043.jpg',
          createdDateUTC: '2018-09-06T20:14:48.0+0000',
          eventID: 539,
          sumDonations: 0,
          teamID: 38961,
          isTeamCaptain: false,
          numDonations: 0,
          links: {
            donate: 'https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=506571',
            page: 'https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=506571',
            stream: 'http://twitch.tv/mystream' // Optional
          },
          URL: 'https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=320706'
        }
      ]
    }
    ```

* **getTeamRoster(teamId, page?)**
  * Takes `teamId` as a parameter, `page` as an optional parameter (defaults to 1)
  * Pages cap at 100 members
  * Returns information on page and count and an array of team members
  **Returned object**
    ```javascript
    { 
      countMembers: 73,
      countPages: 1,
      members: [
        { displayName: 'Alex Muench',
          fundraisingGoal: 1000,
          participantID: 320706,
          teamName: 'Extra Life Nerds',
          eventName: 'Extra Life 2018',
          avatarImageURL: 'https://assets.donordrive.com/extralife/images/$avatars$/constituent_0C07ECD7-C293-34EB-45A3F7B77F8BA043.jpg',
          createdDateUTC: '2018-09-06T20:14:48.0+0000',
          eventID: 539,
          sumDonations: 0,
          teamID: 38961,
          isTeamCaptain: false,
          numDonations: 0,
          links: {
            donate: 'https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=506571',
            page: 'https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=506571',
            stream: 'http://twitch.tv/mystream' // Optional
          },
          URL: 'https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=320706'
        }
      ]
    }
    ```

* **getTeamDonations( teamId, limit, page )**
  * Takes `teamId` as a parameter.  `limit` and `page` are optional parameters.  Page size is equal to your `limit` value.
  * Returns information on page and count, and an array of donations given to the team, ordered from newest to oldest
  * **NOTE** ExtraLife's API includes registrations as donations in this view.  Donations of "null" are a user signing up for a team.  Donations of 19 (assumedly) are users signing up as a Platinum User.  

  **Returned object**
    ```javascript
    {
      countDonations: 73,
      countPages: 1,
      donations: [
        { 
          displayName: 'Joe Smith', // Optional
          message: 'Congrats!', // Optional
          donorID: 'ASDFF-AB7F-8295-1283655555F38D6D', // Optional
          participantID: 55555,
          amount: 19,
          avatarImageURL: '//assets.donordrive.com/extralife/images/$avatars$/constituent_ASDFF-AB7F-8295-1283655555F38D6D.jpg',
          createdDateUTC: '2018-01-22T14:39:04.783+0000',
          teamID: 38961,
          donationID: '82CF0B9B7BB0SFAC'
        }
      ]
    }
    ```
License
------
[The MIT License (MIT)](https://tldrlegal.com/license/mit-license)

Copyright (c) 2015 Alex Muench

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


Thank Yous
-----
I'd like to reach out and thank the following devs for their contributions to the project:

* [EasyAsABC123](https://github.com/EasyAsABC123)
* [timmixell](https://github.com/timmixell)
* [DrGodCarl](https://github.com/DrGodCarl)
* [samph](https://github.com/samph)

Shamless Plug
------
If you like this work, you can [donate to my Extra Life page here](https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=362008).
