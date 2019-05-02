const STORE = {
    unibitKeyPrashant: 'GkIYaHmIBTNnbr_fAsSnhnAhp4FF85tE', /* cspell: disable-line */
    unibitKeyAudrey: 'oa1yyhplyzggaowa88stunvzislwdnvkqg1oz8qf',
    unibitHistoricalUrl: 'https://api.unibit.ai/historicalstockprice/',
    unibitNewsUrl: 'https://api.unibit.ai/news/latest/',
    queryParamForGraph: {
        range: $('.dataDuration').val(),
        interval: 3,
        AccessKey: 'GkIYaHmIBTNnbr_fAsSnhnAhp4FF85tE'}, /* cspell: disable-line */
    queryParamForNews: {
        AccessKey: 'GkIYaHmIBTNnbr_fAsSnhnAhp4FF85tE'}, /* cspell: disable-line */
    queryParamForColumns: {
        range: $('.dataDuration').val(),
        interval: 1,
        AccessKey: 'GkIYaHmIBTNnbr_fAsSnhnAhp4FF85tE'}, /* cspell: disable-line */
    tickerCounter: 0,
    tickerObjStorage: []
};
// let data=[];
// let trace1 = {};
// let trace2 = {};


function ImplementTickerAutoComplete() {
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
    $('.tickerSearch').autocomplete({
        source: tickerList
    });
}
// Event delegator - called at bottom
function startTicking() {
    $('#result-modal').dialog({
        modal: true,
        autoOpen: false,
        width: 1400,
        height: 500
    });
    $('form').on('keyup', '.tickerSearch', event => ImplementTickerAutoComplete(event));
    $('form').submit(function(event) {
        event.preventDefault();
        STORE.tickerInputVal = $('.tickerSearch').val();
        console.log(STORE.tickerInputVal);
        if (STORE.tickerInputVal) {
        dataColSwitcher(STORE.tickerInputVal);
        $('.tickerSearch').text('');
    }});
    $('.anchor-tag').on('click', function(event) {
        // event.preventDefault();
        getGraphDataFromUnibitApi();
    });
}
// a function that will iterate over the tickerObjStorage and search for the res.data["Meta Data"].ticker == $(a tag).children('.result').text();
function stockObjIter() {

}
function createApiUrl(queryParam) {
    let queryParams;
    let baseUrl;
    if (queryParam == 'graph') {
        queryParams = STORE.queryParamForGraph;
        baseUrl = STORE.unibitHistoricalUrl + $('.tickerSearch').val();
    }
    else if (queryParam == 'news') {
        queryParams = STORE.queryParamForNews;
        baseUrl = STORE.unibitNewsUrl + $('.tickerSearch').val();
    }
    else if (queryParam == 'columns') {
        queryParams = STORE.queryParamForColumns;
        baseUrl = STORE.unibitHistoricalUrl + $('.tickerSearch').val();
    }
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
    console.log('getGraphDataFromUnibitApi ran!');
    // let queryParam = 'graph';
    // const graphUrl = createApiUrl(queryParam);
    // fetch(graphUrl)
    // .then(r => r.json().then(data => ({
    //     status: r.status, body: data
    // })))
    // .then(f => {
    //     if (f.status == 200) {
            let stockMktObj = [ {
                  "date" : "2019-04-08",
                  "open" : 29.55,
                  "high" : 29.73,
                  "low" : 29.32,
                  "close" : 29.66,
                  "adj_close" : 29.66,
                  "volume" : 2375490
                }, {
                  "date" : "2019-04-03",
                  "open" : 28.45,
                  "high" : 28.87,
                  "low" : 28.31,
                  "close" : 28.69,
                  "adj_close" : 28.69,
                  "volume" : 4675900
                }, {
                  "date" : "2019-03-29",
                  "open" : 28.28,
                  "high" : 28.8,
                  "low" : 28.01,
                  "close" : 28.16,
                  "adj_close" : 28.16,
                  "volume" : 3382500
                }, {
                  "date" : "2019-03-26",
                  "open" : 28.14,
                  "high" : 27.54,
                  "low" : 27.27,
                  "close" : 28.5,
                  "adj_close" : 27.54,
                  "volume" : 4275996
                }, {
                  "date" : "2019-03-21",
                  "open" : 28.54,
                  "high" : 29.53,
                  "low" : 28.5,
                  "close" : 29.41,
                  "adj_close" : 29.41,
                  "volume" : 3186214
                }, {
                  "date" : "2019-03-18",
                  "open" : 28.0,
                  "high" : 28.86,
                  "low" : 27.927,
                  "close" : 28.64,
                  "adj_close" : 28.64,
                  "volume" : 3522200
                }, {
                  "date" : "2019-03-13",
                  "open" : 28.62,
                  "high" : 29.32,
                  "low" : 28.56,
                  "close" : 28.98,
                  "adj_close" : 28.98,
                  "volume" : 3670400
                }, {
                  "date" : "2019-03-08",
                  "open" : 26.93,
                  "high" : 27.16,
                  "low" : 26.51,
                  "close" : 26.82,
                  "adj_close" : 26.82,
                  "volume" : 2864000
                }, {
                  "date" : "2019-03-05",
                  "open" : 29.07,
                  "high" : 29.31,
                  "low" : 28.76,
                  "close" : 29.2,
                  "adj_close" : 29.2,
                  "volume" : 1890800
                }, {
                  "date" : "2019-02-28",
                  "open" : 31.02,
                  "high" : 31.02,
                  "low" : 29.33,
                  "close" : 29.5,
                  "adj_close" : 29.5,
                  "volume" : 3660500
                } ];
                console.log(stockMktObj);
            // (f.body["Stock price"]);
            let dateData = [];
            let highValData = [];
            let lowValData = [];
            let dataLength = stockMktObj.length;
            for (let i = 0; i < dataLength; i++) {
                dateData.push(stockMktObj[i].date);
                highValData.push(stockMktObj[i].high);
                lowValData.push(stockMktObj[i].low);
                console.log(stockMktObj[i]);
            }
            var trace1 = {
                type: "scatter",
                mode: "lines",
                name: `${r.body["Meta Data"].ticker} High`,
                x: dateData,
                y: highValData,
                line: { color: '#17BECF' }
            };
            var trace2 = {
                type: "scatter",
                mode: "lines",
                name: `${r.body["Meta Data"].ticker} Low`,
                x: dateData,
                y: lowValData,
                line: { color: '#7F7F7F' }
            };
            var data = [trace1, trace2];
            var layout = {
                title: `Time Series Stock Value Variation Of ${r.body["Meta Data"].ticker}`
            };
            $('#result-modal').dialog("open");
            Plotly.newPlot('graph-result', data, layout);
            // displayNews();
        // }
    //     else {
    //         $('#graph-result').html(`Error Occurred : ${f.body.message}`);
    //     }
    // })
    // .catch(err => {
    //     $('#graph-result').html(`Error Occurred : ${err.message}`);
    // });
}

// function displayNews() {
//     let queryParam = 'news';
//     const newsUrl = createApiUrl(queryParam);
//     //console.log(`News api Url : ${url}`);
//     fetch(newsUrl)
//     .then(r => r.json().then(data => ({
//         status: r.status, body: data
//     })))
//     .then(jsonData => {
//         if (jsonData.status == 200) {
//             let newsData = jsonData.body["latest stock news"];
//             let cntNewsData = newsData.length;
//             let newsDataView = 
//                 `<table id="tblNewsView">
//                 <tr>
//                 <th> Title </th>
//                 <th> Publish Date </th>
//                 </tr>
//                 </table>`;
//             $('#news-result').html('');
//             $('#news-result').append(`<h2>Latest News Of Selected Stock</h2><br/>`);
//             $('#news-result').append(newsDataView);
//             for (let i = 0; i < cntNewsData; i++) {
//                 $('#tblNewsView').append(`<tr><td>${newsData[i].title}</td>
//                 <td>${newsData[i]["published at"]}</td>
//                 </tr>`);
//             }
//         }
//         else {
//             $('#graph-result').html(`Error Occurred : ${jsonData.body.message}`);
//         }
//     })
//     .catch(err => {
//         $('#graph-result').html(`Error Occurred : ${err.message}`);
//     });
// }

// Audrey will have to add more tomorrow for the clicks - I just finished merging it
function dataColSwitcher(tickerInputVal) {
    console.log("dataColSwitcher ran!!");
    STORE.tickerCounter++;
    let tickerCount = STORE.tickerCounter;
    console.log(tickerCount);
    console.log(STORE.tickerCounter);
    // let queryParam = 'columns';
    // const columnsUrl = createApiUrl(queryParam);
    // fetch(columnsUrl)
    // .then(response => response.json().then(responseJson => ({
    //     status: response.status, data: responseJson
    // })))
    // .then(res => {
    //     if (res.status == 200) {
            let firstDayObj = {
                "date" : "2019-04-08",
                "open" : 29.55,
                "high" : 29.73,
                "low" : 29.32,
                "close" : 29.66,
                "adj_close" : 29.66,
                "volume" : 2375490
              };
            STORE.tickerObjStorage.push(res.data);
            // res.data["Stock price"]["0"];
            console.log(firstDayObj);
            if (tickerCount == 1) {
                console.log('tickerCount must be 1?');
                $('#ticker-1').html(`<a href="#" class="text-center anchor-tag"><h3 class="data-name ticker-name result">${tickerInputVal}</h3></a>
                <h3 class="data-latest-closing-date">${firstDayObj.date}</h3>
                <h3 class="data-open">${firstDayObj.open}</h3>
                <h3 class="data-high">${firstDayObj.high}</h3>
                <h3 class="data-low">${firstDayObj.low}</h3>
                <h3 class="data-close">${firstDayObj.close}</h3>`);
            }
            else if (tickerCount == 2) {
                console.log('tickerCount must be 2?');
                $('#ticker-2').html(`<a href="#" class="text-center anchor-tag"><h3 class="data-name ticker-name result">${tickerInputVal}</h3></a>
                <h3 class="data-latest-closing-date">${firstDayObj.date}</h3>
                <h3 class="data-open">${firstDayObj.open}</h3>
                <h3 class="data-high">${firstDayObj.high}</h3>
                <h3 class="data-low">${firstDayObj.low}</h3>
                <h3 class="data-close">${firstDayObj.close}</h3>`);
            }
            else if (tickerCount >= 3) {
                console.log('tickerCount must be 3+?');
                const tickSaver =  $('#ticker-2').html();
                $('#ticker-1').html(tickSaver);
                $('#ticker-2').html(`<a href="#" class="text-center anchor-tag"><h3 class="data-name ticker-name result">${tickerInputVal}</h3></a>
                <h3 class="data-latest-closing-date">${firstDayObj.date}</h3>
                <h3 class="data-open">${firstDayObj.open}</h3>
                <h3 class="data-high">${firstDayObj.high}</h3>
                <h3 class="data-low">${firstDayObj.low}</h3>
                <h3 class="data-close">${firstDayObj.close}</h3>`);
            }
            else {
                throw console.error("You must have messed up the views!!!");
            }
    //     }
    // });
}





//implementTickerAutoComplete();

startTicking();