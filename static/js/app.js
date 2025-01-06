// Build the metadata panel
function buildMetadata(sample) {
 d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
 console.log("Entire Data:", data);

    // get the metadata field
    let metadata = data.metadata;
    console.log("Metadata Field:", metadata);

    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    console.log(`Filtered Metadata for Sample ${sample}:`, resultArray);

    let result = resultArray[0];
    console.log(`Resulting Metadata Object for Sample ${sample}:`, result);


    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");
    console.log("Selected Panel:", panel);

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
          console.log(`Appending Key: ${key}, Value: ${value}`);
          panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

 });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;
    console.log("Samples Field:", samples);

    // Filter the samples for the object with the desired sample number
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    console.log(`Filtered Sample for ID ${sample}:`, result);


    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    console.log("OTU IDs:", otu_ids);
    console.log("OTU Labels:", otu_labels);
    console.log("Sample Values:", sample_values);


    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      type:"bubble",
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };

    // Create the data array for the plot
    let Data = [trace1];

    // Define the layout for the Bubble Chart
    let Layout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Number of Bacteria" },

    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", Data, Layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately

    let top10_otu_ids = otu_ids.slice(0, 10).reverse();
    let top10_sample_values = sample_values.slice(0, 10).reverse();
    let top10_otu_labels = otu_labels.slice(0, 10).reverse();

    let yticks = top10_otu_ids.map(otuID => `OTU ${otuID}`);

    let trace2 = {
      x: top10_sample_values,
      y: yticks,
      text: top10_otu_labels,
      type: "bar",
      orientation: "h"
    };

    let barData = [trace2];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Number of Bacteria" },
    };

    // Render the Bar Chart
        Plotly.newPlot("bar", barData, barLayout);
  });
 }

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names;
    console.log("Sample Names:", sampleNames);

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.

    sampleNames.forEach((sample) => {
          dropdown.append("option")
            .text(sample)
            .property("value", sample);
        });
    // Get the first sample from the list
    let firstSample = sampleNames[0];
    console.log("First Sample:", firstSample);


    // Build charts and metadata panel with the first sample
     buildMetadata(firstSample);
     buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
console.log("Selected Sample:", newSample);
  // Build charts and metadata panel each time a new sample is selected
   buildCharts(newSample);
   buildMetadata(newSample);
}

// Initialize the dashboard
init();
