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
function optionChanged(selectedObject) {
    var value = selectedObject
    console.log(value);
    let data = d3.json("samples.json").then(function(d){
        // console.log(d.metadata.length)
        let len = d.metadata.length
        demo_search(value, len);
    });
}


function demographics(data, search) {
    var select_demo = d3.select('#sample-metadata');
    select_demo.text("New Data")
    var demoOut = select_demo.append("ul"); 
    var id = demoOut.append("li").text("ID: " + data[search].id);
    var bb = demoOut.append("li").text("BBtype: " + data[search].bbtype);
    var eth = demoOut.append("li").text("Ethnicity: " + data[search].ethnicity);
    var gen = demoOut.append("li").text("Gender: " + data[search].gender);
    var age = demoOut.append("li").text("Age: " + data[search].age);
    var loc = demoOut.append("li").text("Location: " + data[search].location);
    // console.log(search)

}

function demo_search(search, len){
    let data = d3.json("samples.json").then(function(d){
        // console.log(d.metadata.length)
        let meta = d.metadata
        console.log("My search: " + search)
        for ( var i = 0; i < len; i++){
            if (meta[i].id == search){
                console.log("I found you!!!" + search)
                demographics(meta, i)
            }
        }
    });

}