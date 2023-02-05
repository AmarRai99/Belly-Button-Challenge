// Creating the gauge chart
function gaugeChart(subjectID, wfreqValue) {
    
    console.log("subjectID:", subjectID);
    console.log("wfreqValue:", wfreqValue);

    // Calculating the angle for each wfreq segment for the gauge chart
    var angle = (wfreqValue / 9) * 180;

    // Use trigonmetry to calculate the final meter point
    var degrees = 180 - angle,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Shape of the needle
    var main_path = 'M -.0 -0.025 L .0 0.025 L ',
    path_X = String(x),
    space = ' ',
    path_Y = String(y),
    path_end = ' Z';
    var path = main_path.concat(path_X,space,path_Y,path_end);

    // Determine where the needle will be positioned.
    var trace_needle_position = {
        type: 'scatter',
        showlegend: false,
        x: [0],
        y: [0],
        marker: { size: 28, color: '850000' },
        //name: wfreqValue,
        hoverinfo: 'none'
    }

    // Create a trace for the gauge chart
    // Type
    // Text 
    // Values
    // rotation: the angle to rotate the pie, so the used 50% is at the top.
    // Calculate the degrees that include the used segment and then halve the answer.
    var traceGauge = {
        type: "pie",   
        showlegend: false,
        hole: 0.5,
        rotation: 90,  
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
        direction: "clockwise",
        textinfo: "text",
        textposition: "inside",
        hoverinfo: "none",
        marker: {
            colors: ["rgba(240, 236, 220, 0.5)", "rgba(232, 226, 202, .5)", "rgba(210, 206, 145, .5)", 
                    "rgba(202, 209, 95, .5)", "rgba(170, 202, 42, .5)", "rgba(110, 154, 22, .5)", 
                    "rgba(14, 127, 0, .5)", "rgba(10, 105, 0, .5)", "rgba(6, 80, 0, .5)", "white"]
            }
    }

    // Assign the traces for the needle position and gauge chart to a data array
    var dataGauge = [trace_needle_position, traceGauge];

    // Create the layout for gauge chart
    // shapes: this is used for the needle shape and colour
    var layoutGauge = {
        shapes: [{
            type: "path",
            path: path,
            fillcolor: "850000",
            line: {
                color: "850000"
                }
        }],
        title: `<b>Test Subject ${subjectID} <br> Belly Button Washing Frequency</b> <br> Scrubs per Week`,
        height: 500,
        width: 500,
        xaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1]
        },
        yaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false, 
            range: [-1, 1]
        }
    }

    // Render the plot to the div tag with id "gauge"
    Plotly.newPlot("gauge", dataGauge, layoutGauge);

}