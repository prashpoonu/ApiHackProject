const STORE = {
    unibitKeyPrashant: 'GkIYaHmIBTNnbr_fAsSnhnAhp4FF85tE', /* cspell: disable-line */
    unibitKeyAudrey: 'oa1yyhplyzggaowa88stunvzislwdnvkqg1oz8qf',
    unibitHistoricalUrl: 'https://api.unibit.ai/historicalstockprice/',
    queryParamForGraph: {
        range: $('.dataDuration').val(),
        interval: 3,
        AccessKey: 'GkIYaHmIBTNnbr_fAsSnhnAhp4FF85tE'}, /* cspell: disable-line */
    queryParamForNews: {
        AccessKey: 'GkIYaHmIBTNnbr_fAsSnhnAhp4FF85tE'} /* cspell: disable-line */
};
// let data=[];
// let trace1 = {};
// let trace2 = {};

function ImplementTickerAutoComplete(event) {
    let tickerList = [{ value: "A", label: "A" },
        { value: "AA", label: "AA" },
        { value: "AAC", label: "AAC" },
        { value: "AAPL", label: "AAPL" },
        { value: "GOOG", label: "GOOG" },
        { value: "MSFT", label: "MSFT" },
        { value: "CTBK", label: "CTBK" },
        { value: "JPM", label: "JPM" },
        { value: "BAC", label: "BAC" },
        { value: "TSLA", label: "TSLA" },
        { value: "LEN", label: "LEN" },
        { value: "KBH", label: "KBH" },
        { value: "PRU", label: "PRU" }];
    $(this).autocomplete({
        source: tickerList
    });
}
// Event delegator - called at bottom
function startTicking() {
    $('form').on('keyup', '.tickerSearch', event => implementTickerAutoComplete(event));
    $('form').on('click', 'button', function(event) {
        event.preventDefault();
        $('.result').html(`<a href="#">${$('.tickerSearch').val()}</a>`);
    });
    $('.result').on('click', 'a', function(event) {
        event.preventDefault();
        getGraphDataFromUnibitApi();
    });
}
function createApiUrl(queryParam) {
    let queryParams;
    if (queryParam == 'graph') {
        queryParams = STORE.queryParamForGraph;
    }
    else if (queryParam == 'news') {
        queryParams = STORE.queryParamForNews;
    }
    let baseUrl = STORE.unibitHistoricalUrl + $('.tickerSearch').val();
    let urlQString = getQueryString(queryParams);
    outputUrl = baseUrl + '?' + urlQString;
    console.log(outputUrl);
    return outputUrl;
}
function getQueryString(parameters) {
    let keys = Object.keys(parameters);
    let queryItems = keys.map(k => `${k}=${parameters[k]}`);
    return queryItems.join('&');
}
function getGraphDataFromUnibitApi() {
    let queryParam = 'graph';
    const graphUrl = createApiUrl(queryParam);
    fetch(graphUrl)
    .then(r => r.json().then(data => ({
        status: r.status, body: data
    })))
    .then(f => {
        if (f.status == 200) {
            // is there a way to break this down into another function?
            let stockMktObj = (f.body["Stock price"]);
            let dateData = [];
            let highValData = [];
            let lowValData = [];
            let dataLength = stockMktObj.length;
            for (let i = 0; i < dataLength; i++) {
                dateData.push(stockMktObj[i].date);
                highValData.push(stockMktObj[i].high);
                lowValData.push(stockMktObj[i].low);
                //console.log(stockMktObj[i]);
            }
            var trace1 = {
                type: "scatter",
                mode: "lines",
                name: `${$('.tickerSearch').val()} High`,
                x: dateData,
                y: highValData,
                line: { color: '#17BECF' }
            };
            var trace2 = {
                type: "scatter",
                mode: "lines",
                name: `${$('.tickerSearch').val()} Low`,
                x: dateData,
                y: lowValData,
                line: { color: '#7F7F7F' }
            };
            var data = [trace1, trace2];
            var layout = {
                title: `Time Series Stock Value Variation Of ${$('.tickerSearch').val()} For a Duration Of ${$('.dataDuration').val()}`,
            };
            $('#result-modal').dialog("open");
            Plotly.newPlot('graph-result', data, layout);
            displayNews();
        }
        else {
            $('#graph-result').html(`Error Occurred : ${f.body.message}`);
        }
    })
    .catch(err => {
        $('#graph-result').html(`Error Occurred : ${err.message}`);
    });
}
$('#result-modal').dialog({
    modal: true,
    autoOpen: false,
    width: 1400,
    height: 500
});
implementTickerAutoComplete();
startTicking();

// Audrey's section start
// 






function displayNews() {
    let queryParam = 'news';
    const newsUrl = createApiUrl(queryParam);
    //console.log(`News api Url : ${url}`);
    fetch(newsUrl)
    .then(r => r.json().then(data => ({
        status: r.status, body: data
    })))
    .then(jsonData => {
        if (jsonData.status == 200) {
            let newsData = jsonData.body["latest stock news"];
            let cntNewsData = newsData.length;
            let newsDataView = `<table id="tblNewsView">
        <tr>
        <th> Title </th>
        <th> Publish Date </th>
        </tr>
        </table>`;
            $('#newsResult').html('');
            $('#newsResult').html(`<h2>Latest News Of Selected Stock</h2><br/>`);
            $('#newsResult').append(newsDataView);
            for (let i = 0; i < cntNewsData; i++) {
                $('#tblNewsView').append(`<tr><td>${newsData[i].title}</td>
                <td>${newsData[i]["published at"]}</td>
                </tr>`);
            }
        }
        else {
            $('#graph-result').html(`Error Occurred : ${jsonData.body.message}`);
        }
    })
    .catch(err => {
        $('#graph-result').html(`Error Occurred : ${err.message}`);
    });
}





