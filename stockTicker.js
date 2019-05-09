const STORE = {
    unibitKeyPrashant: 'DcpwsFKJIS7b7q2fDhqUZbL61Vje1Xso', /* cspell: disable-line */
    unibitKeyAudrey: 'oa1yyhplyzggaowa88stunvzislwdnvkqg1oz8qf',
    unibitHistoricalUrl: 'https://api.unibit.ai/api/historicalstockprice/',
    unibitNewsUrl: 'https://api.unibit.ai/api/news/latest/',
    queryParamForGraph: {
        range: $('.dataDuration').val(),
        interval: 3,
        AccessKey: 'DcpwsFKJIS7b7q2fDhqUZbL61Vje1Xso'
    }, /* cspell: disable-line */
    queryParamForNews: {
        AccessKey: 'DcpwsFKJIS7b7q2fDhqUZbL61Vje1Xso', /* cspell: disable-line */
    },
    queryParamForColumns: {
        range: $('.dataDuration').val(),
        interval: 3,
        AccessKey: 'DcpwsFKJIS7b7q2fDhqUZbL61Vje1Xso'
    }, /* cspell: disable-line */
    tickerCounter: 0
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
    $('form').on('keyup', '.tickerSearch', event => ImplementTickerAutoComplete(event));
    $('form').submit(function (event) {

        event.preventDefault();
        let tickerInputVal = $('.tickerSearch').val();
        console.log(tickerInputVal);
        $('.tickerSearch').val('');
        if (tickerInputVal) {
            dataColSwitcher(tickerInputVal);
        }
    });

    // $('#refresh-page').on("click", event => window.location.reload());
    $('#stock-details').on('click', 'h3', function(event) {
 
        //event.preventDefault();
        $('#news-result').html('');//clear the news section
        console.log(`Currently clicked ticker is : ${$(this).text()}`);
        let currentTicker = $(this).text();
        getGraphDataFromUnibitApi(currentTicker);
        $('#news-button').on('click', function (event) {
            $('#news-button').hide();
            displayNews(currentTicker);
        });
    });
}
function createApiUrl(queryParam, tickerName) {
    let queryParams;
    let baseUrl;
    if (queryParam == 'graph') {
        queryParams = STORE.queryParamForGraph;
        baseUrl = STORE.unibitHistoricalUrl + tickerName;
    }
    else if (queryParam == 'news') {
        queryParams = STORE.queryParamForNews;
        baseUrl = STORE.unibitNewsUrl + tickerName;
    }
    else if (queryParam == 'columns') {
        queryParams = STORE.queryParamForColumns;
        baseUrl = STORE.unibitHistoricalUrl + tickerName;
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
function getGraphDataFromUnibitApi(tickerName) {
    let queryParam = 'graph';
    const graphUrl = createApiUrl(queryParam, tickerName);
    fetch(graphUrl)
        .then(r => r.json().then(data => ({
            status: r.status, body: data
        })))
        .then(f => {
            if (f.status == 200) {
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
                    name: `${tickerName} High`,
                    x: dateData,
                    y: highValData,
                    line: { color: '#17BECF' }
                };
                var trace2 = {
                    type: "scatter",
                    mode: "lines",
                    name: `${tickerName} Low`,
                    x: dateData,
                    y: lowValData,
                    line: { color: '#7F7F7F' }
                };
                var data = [trace1, trace2];
                var layout = {
                    font: { size: 10 }
                };
                $('#result-modal').dialog("open");
                $('.ui-dialog-title').text(`Time Series Stock Value Variation Of ${tickerName} For a Duration Of ${$('.dataDuration').val()}`);
                Plotly.newPlot('graph-result', data, layout, { responsive: true });
                $('#news-button').show();
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
    width: $(window).width() * 0.85,
    height: $(window).height() * 0.85
    // position: 'center'
});
function displayNews(tickerName) {
    let queryParam = 'news';
    const newsUrl = createApiUrl(queryParam, tickerName);
    //console.log(`News api Url : ${url}`);
    fetch(newsUrl)
        .then(r => r.json().then(data => ({
            status: r.status, body: data
        })))
        .then(jsonData => {
            if (jsonData.status == 404 || jsonData.status == 403 || jsonData.status == 402 || jsonData.status == 401 || jsonData.status == 400) {
                // console.log(jsonData.body.message);
                if (jsonData.status == 400) {
                    throw new Error("News data not available for selected stock.");   

                }
                else {
                    throw new Error("An error occurred while retrieving news data from api.");
                }
            }
            else if (jsonData.status == 200) {
                let newsData = jsonData.body["latest stock news"];
                let cntNewsData = newsData.length;
                let newsDataView =
                    `<table id="tblNewsView" class="layout display responsive-table">
                    <caption>Latest News Of ${tickerName} Stock</caption>
                    <thead>
                <tr>
                <th> Title </th>
                <th> Publish Date </th>
                </tr>
                </thead>
                </table>`;
                $('#news-result').html('');
                $('#news-result').append(newsDataView);
                for (let i = 0; i < cntNewsData; i++) {
                    $('#tblNewsView').append(`<tr><td class="news-title">${newsData[i].title}</td>
                <td class = "news-date">${newsData[i]["published at"].replace('Z', '').replace('T', ' ')}</td>
                </tr>`);
                }
            }
        })
        .catch(err => {
            $('#news-result').html(`Error Occurred : ${err.message}`);
        });
}

// Audrey will have to add more tomorrow for the clicks - I just finished merging it
function dataColSwitcher(tickerInputVal) {
    console.log("dataColSwitcher ran!!");
    STORE.tickerCounter++;
    let tickerCount = STORE.tickerCounter;
    console.log(tickerCount);
    console.log(STORE.tickerCounter);
    let queryParam = 'columns';
    const columnsUrl = createApiUrl(queryParam, tickerInputVal);
    fetch(columnsUrl)
    .then(response => response.json().then(responseJson => ({
        status: response.status, data: responseJson
    })))
    .then(res => {
        if (res.status == 200) {
            let firstDayObj = res.data["Stock price"][0];
            console.log(firstDayObj);
            if (tickerCount == 1) {
                console.log('tickerCount must be 1?');
                $('#ticker-1').html(`<div class="ticker-1"><a href="#" class="text-center"><h3 class="data-name result">${tickerInputVal}</h3></a>
                <h3 class="data-latest-closing-date">${firstDayObj.date}</h3>
                <h3 class="data-open">${firstDayObj.open}</h3>
                <h3 class="data-high">${firstDayObj.high}</h3>
                <h3 class="data-low">${firstDayObj.low}</h3>
                <h3 class="data-close">${firstDayObj.close}</h3></div>`);
            }
            else if (tickerCount == 2) {
                console.log('tickerCount must be 2?');
                $('#ticker-2').html(`<div class="ticker-2"><a href="#" class="text-center"><h3 class="data-name result">${tickerInputVal}</h3></a>
                <h3 class="data-latest-closing-date">${firstDayObj.date}</h3>
                <h3 class="data-open">${firstDayObj.open}</h3>
                <h3 class="data-high">${firstDayObj.high}</h3>
                <h3 class="data-low">${firstDayObj.low}</h3>
                <h3 class="data-close">${firstDayObj.close}</h3></div>`);
            }
            else if (tickerCount >= 3) {
                console.log('tickerCount must be 3+?');
                const tickSaver =  $('#ticker-2').html();
                $('#ticker-1').html(tickSaver);
                $('#ticker-2').html(`<div class="ticker-2"><a href="#" class="text-center"><h3 class="data-name result">${tickerInputVal}</h3></a>
                <h3 class="data-latest-closing-date">${firstDayObj.date}</h3>
                <h3 class="data-open">${firstDayObj.open}</h3>
                <h3 class="data-high">${firstDayObj.high}</h3>
                <h3 class="data-low">${firstDayObj.low}</h3>
                <h3 class="data-close">${firstDayObj.close}</h3></div>`);
            }
        }
});
}

$(window).resize(function () {

    $("#result-modal").dialog("option", "width", $(window).width() * 0.85);
    $("#result-modal").dialog("option", "height", $(window).height() * 0.85);
    //$("#result-modal").dialog("option", "position", "center");

});






//implementTickerAutoComplete();

startTicking();