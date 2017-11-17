# Phillips Hue Simulation 

A simple node application to simulate a Phillips Hue Lamp API environment.  
As per task instructions the app prints initial configuration of lamps, and any changes made to those lamps.





Make sure you have [Node.js](http://nodejs.org/) installed and that the hardware (or simulator) is 
running on http://localhost:8080/.




## Setup



```sh
git clone git@github.com:raziboy939/phillipshuesim.git #or download the zip file and extract contents.
cd phillipshuesim
npm install
node main.js
```

The app should now be running and reciving data from localhost:8080.

## Notes and strategy

  This is a very simple app limited to the requirements of the assignment.  For now it makes simple HTTP GET requests to fetch the state of the lamps connected to localhost:8080, processes the incoming data and outputs the results.
 
  It does this by parsing out essential data (name, id, brightness) from an initial GET request and saving it as the primary lamps state object.  
 
  Once an initial lamps state object is saved, the app makes the same GET request on one second intervals, parses the important data, compares it to the current state, prints out any changes and updated the current state with the changes.
 