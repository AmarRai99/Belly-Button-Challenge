// Get the url for sample data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Populate the dropdown menu with the sample names using D3.
function populateDropDown() {

    
    var dropdownMenu = d3.select("#selDataset");

    
    d3.json(url).then((data) => {

        // Collect names of the samples from the json data which populates in the dropdown menu
        var sample_names = data.names;
    
        //  Loop over each name and Assign the value of the dropdown menu option to a variable
        sample_names.forEach((name) => {
            var options = dropdownMenu.append("option");
            options.text(name);
        });

        
        var display_ID = dropdownMenu.property("value");
        console.log("displayID:", display_ID);

        // Update the information and chart.
        updateInfo(display_ID);
    });    
}


// Update the demographic info and create charts and Use D3 to select the demographic info panel
function updateInfo(subject_ID) {

    
    var demographic_info = d3.select("#sample-metadata");

    // Clear the demographic info panel
    demographic_info.html("");

    d3.json(url).then((data) => {

        
        var metaData = data.metadata.filter(sample => sample.id == subject_ID)[0];
        console.log("metaData:", metaData);

        
        Object.entries(metaData).forEach(([key, value]) => {
            demographic_info.append("h6").text(`${key}: ${value}`);
        });

        // Fetch the samples values from json data
        var samples_data = data.samples.filter(sample => sample.id == subject_ID)[0];

        
        createCharts(subject_ID, samples_data);

        // Search for the washing frequency data from metadata
        var wfreq = metaData.wfreq;

        // Create gauge chart
        gaugeChart(subject_ID, wfreq);
    });
}


// Create bar and bubble charts
function createCharts(subject_ID, samplesInfo) {

    console.log("samplesInfo:", samplesInfo);

    console.log("subjectID:", subject_ID);

    // Assign the values as for the OTU IDs, OTU Labels and sample values as required
    var otu_IDs = samplesInfo.otu_ids;

    var otu_labels = samplesInfo.otu_labels;

    var sample_values = samplesInfo.sample_values;

    
    // Bar Chart 
    

    // Top 10 OTU IDs and data as required.
    // Collate the values in descending order for the horizontal bar chart

    var topOtuIDs = otu_IDs.slice(0,10).reverse().map(otuID => "OTU " + otuID);

    var topOtuLabels = otu_labels.slice(0,10).reverse();

    var topsampleValues = sample_values.slice(0,10).reverse();

    // Trace for the bar chart
    let traceBar = {
        x: topsampleValues,
        y: topOtuIDs,
        text: topOtuLabels,
        type: "bar",
        orientation: "h"
    }

    
    let dataBar = [traceBar];

    // Layout for bar chart
    let layoutBar = {
        title: `<b>The Top 10 Bacteria Species<br> in Test Subject ${subject_ID}</b>`,
        xaxis: {title: `Sample Values`},
        yaxis: {title: `OTU IDs`}
    }

    
    Plotly.newPlot("bar", dataBar, layoutBar);

    
    // Bubble Chart
    

    // Trace for the bubble chart
    let traceBubble = {
        x: otu_IDs,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_IDs,
            colorscale: "Earth"
        }
    }

    // Assign the trace to a data array
    let dataBubble = [traceBubble];

    // Layout for bubble chart
    let layoutBubble = {
        title: `<b>All the Bacteria Species in Test Subject ${subject_ID}</b>`,
        xaxis: {title: `OTU ID`},
        yaxis: {title: `Sample Values`}
    }

    
    Plotly.newPlot("bubble", dataBubble, layoutBubble);
    
}

// Use this if the dropdown menu option is changed
function optionChanged(newID) {
    console.log("newID:", newID)
    updateInfo(newID);
}

populateDropDown();