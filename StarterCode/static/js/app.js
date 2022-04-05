// Part 1
// Use D3 Libary to read in samples - refer to previous code from porject
 

// Load sample data set into data variable - split it up into the 3 main
// JSON sections
let data = d3.json("samples.json").then(function(d) {
    // console.log(d);
    // console.log(d.samples)
    console.log(d.metadata)
    // console.log(d.names)
    dropDown(d.names)
    // bar_chart(d.samples)

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
    // console.log(value);                         // Checked if it is the correct value
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
    var loc = demoOut.append("li").text("Location: " + data[search].location)
    var washfr = demoOut.append("li").text("Wash Frequency: " + data[search].wfreq);;
    // console.log(search)

}

// Searches through the array / JSON (metadata) to find the patient ID from optionCHanged
// Search is the patient ID/name and len is the length of the array to search
function demo_search(search, len){
    let data = d3.json("samples.json").then(function(d){    // Load data
        // console.log(d.metadata.length)
        let meta = d.metadata                               // Just need meta data
        let sample = d.samples
        // console.log("My search: " + search)                 // Test on what I am searching for
        for ( var i = 0; i < len; i++){                     // For loop to find the name
            if (meta[i].id == search){                      // Did I find it?
                // console.log("I found you!!!" + search)
                demographics(meta, i)                       // Pass to demographics which populates the field
                bar_chart(sample, i)
                bubble_chart(sample, i)
                gauge_chart(meta, i)
            }                                               // meta is the data and i is the index of the name
        }
    });

}


// Bar chart is based on the optionChanged selection
//  Need to find the index of the person
// Chart also has index values that can be used to match people up with most
// Sample value - find the top ten then use the index to find otu ids and otu_labels
function bar_chart(data, search) {
    let temp = data[search]
    let sample = data[search].sample_values
    // console.log(sample)
    // console.log("I am at:  " + search)
    // console.log(typeof temp)
    // console.log(temp)
    // console.log(data[search].sample_values)
    let sortbysample = sample.sort((a,b) => b.sample - a.sample);
    slicedData = sortbysample.slice(0,10);
    // console.log(slicedData)
    let trace1 ={
        // x: slicedData.map(object => object.sample),
        // y: slicedData.map(object=> object.otu_ids),
        // text: slicedData.map(object => object.otu_labels),
        x: slicedData,
        y: temp.otu_ids,
        text: temp.otu_labels,
        name: "Testing name",
        type: "bar",
        orientation: "h"
    };
    let tracedata = [trace1]
    let layout = {
        title: "Belly Button Stuff"
        // margin: {
    //     l: 100,
    //     r: 100,
    //     t: 100,
    //     b: 100
    //   }
    // };
    }
    Plotly.newPlot("bar", tracedata,layout)
}


function bubble_chart(data, search){
    // console.log(data, search)
    otu_ids = data[search].otu_ids;
    samples = data[search].sample_values;
    otu_labels = data[search].otu_labels;

    var trace1 = {
        x: otu_ids,
        y: samples,
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: otu_ids,
            size: samples,
            // sizemode: 'area'
        }
    };
    var datas = [trace1];

    var layout ={
        title: "Title",
        showlegend: false
    };
    Plotly.newPlot('bubble',datas, layout);

}

function gauge_chart(data, search) {
    wash_fr = data[search].wfreq
    console.log(wash_fr)
    var datas = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wash_fr,
            title: { text: "Washing Frequency" },
            type: "indicator",
            mode: "gauge+number+delta",
            delta: { reference: 0 },
            gauge: {
              axis: { range: [null, 9] },
              steps: [
                { range: [0, 1], color: "#E0EEE0"},
                { range: [1, 2], color: "#C0D9AF"},
                { range: [2, 3], color: "#8AA37B"},
                { range: [3, 4], color: "#A6D785"},
                { range: [4, 5], color: "#93DB70"},
                { range: [5, 6], color: "#7BBF6A"},
                { range: [6, 7], color: "#55AE3A"},
                { range: [7, 8], color: "#4AC948"},
                { range: [8, 9], color: "#49E20E"}
              ],
              threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: wash_fr
              }
            }
          }
        ];
    
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', datas, layout);
    }