// Part 1
// Use D3 Libary to read in samples - refer to previous code from porject

// TODO:Values = sample_values
// TODO:otu_ids = ;abels for bar chart
// TODO:otu_labels = hovertext for chart 

// Load sample data set into data variable - split it up into the 3 main
// JSON sections
let data = d3.json("samples.json").then(function(d) {
    // console.log(d);
    // console.log(d.samples)
    console.log(d.metadata)
    // console.log(d.names)
    dropDown(d.names)
    // demographics(d.metadata)

});

// Function takes the whole dataset and the adds the names (numbers) to dropdown menu
function dropDown(sdata) {
    let select_name = d3.select("#selDataset");
    // let sampleNames = sdata.names.map(ele =>ele.NAME);
            
    sdata.forEach((sample) => {
        select_name
            .append("option")
            .text(sample)
            .property("value", sample);
    });

}
// Try to pull the data from the drop down menu
// The next three functions can probably be combined to be less clucky
// TODO: Combine dropdown and demographics functions
function optionChanged(selectedObject) {        // references the function in index.html
    var value = selectedObject                  // Unneeded and can probably just pass it
    console.log(value);                         // Checked if it is the correct value
    let data = d3.json("samples.json").then(function(d){    // Pulling JSON
        // console.log(d.metadata.length)                   // Getting array length to pass
        let len = d.metadata.length
        demo_search(value, len);                            // Pass to the search function
    }); 
}

// Takes in data which is the meta data.  
//  Seearch is the index of the  array of the name selected
//  Creates a unordered list of demographics
function demographics(data, search) {
    var select_demo = d3.select('#sample-metadata');    // Selects the html class to put list in
    select_demo.text("New Data")                        // Helps to delete stale data so new one is inputted
    var demoOut = select_demo.append("ul");             // Creates list follow by the list
    var id = demoOut.append("li").text("ID: " + data[search].id);
    var bb = demoOut.append("li").text("BBtype: " + data[search].bbtype);
    var eth = demoOut.append("li").text("Ethnicity: " + data[search].ethnicity);
    var gen = demoOut.append("li").text("Gender: " + data[search].gender);
    var age = demoOut.append("li").text("Age: " + data[search].age);
    var loc = demoOut.append("li").text("Location: " + data[search].location);
    // console.log(search)

}

// Searches through the array / JSON (metadata) to find the patient ID from optionCHanged
// Search is the patient ID/name and len is the length of the array to search
function demo_search(search, len){
    let data = d3.json("samples.json").then(function(d){    // Load data
        // console.log(d.metadata.length)
        let meta = d.metadata                               // Just need meta data
        console.log("My search: " + search)                 // Test on what I am searching for
        for ( var i = 0; i < len; i++){                     // For loop to find the name
            if (meta[i].id == search){                      // Did I find it?
                console.log("I found you!!!" + search)
                demographics(meta, i)                       // Pass to demographics which populates the field
            }                                               // meta is the data and i is the index of the name
        }
    });

}