// File: custom-chart.js (place this file in your theme's js folder or any location you prefer)

// Function to fetch data from Google Sheets
function fetchDataFromGoogleSheets() {
    // Replace 'YOUR_GOOGLE_SHEETS_CSV_LINK' with the actual CSV link of your Google Sheets
    var url = 'https://docs.google.com/spreadsheets/d/1O4kUI0lh-Y-ilnvXjTeUON_idu07F7sCrcWdAA19nVk/edit?usp=sharing';

    // AJAX request to fetch CSV data
    jQuery.ajax({
        url: url,
        dataType: 'text',  // Data type of the response (CSV)
        success: function(data) {
            processData(data);  // Process the fetched data
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
}

// Function to process fetched CSV data
function processData(data) {
    // Split CSV data into rows
    var rows = data.split('\n');
    var labels = [];
    var values = [];

    // Iterate through rows to extract labels and values
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i].split(',');
        labels.push(row[0]);  // Assuming first column is labels (x-axis)
        values.push(parseInt(row[1]));  // Assuming second column is values (y-axis), parse as integer
    }

    // Create a Chart.js chart after data processing
    createChart(labels, values);
}

// Function to create a Chart.js chart
function createChart(labels, values) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',  // Change chart type as needed (line, bar, pie, etc.)
        data: {
            labels: labels,
            datasets: [{
                label: 'Data from Google Sheets',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Call the function to fetch data when document is ready
jQuery(document).ready(function($) {
    fetchDataFromGoogleSheets();
});
