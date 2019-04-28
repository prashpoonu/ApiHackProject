const STORE = {
  

};

$(function () {
    function ImplementTickerAutoComplete(searchText) {
        let tickerLst = [{ value: "A", label: "A" },
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
        { value: "PRU", label: "PRU" }
        ]
        $('.tickerSearch').autocomplete({
            source: tickerLst
        });
    }
    $('form').on('keyup', '.tickerSearch', function (event) {
        ImplementTickerAutoComplete($(this).val());
    })
    $('form').on('click', 'button', function (evnt) {
        evnt.preventDefault();
        $('.Result').html(`<a href="#">${$('.tickerSearch').val()}</a>`);
    });
    $('.Result').on('click', 'a', function (evt) {
        evt.preventDefault();
        GetDataFromUnibitApi();
    });
    function GetDataFromUnibitApi() {
        let url = `https://api.unibit.ai/historicalstockprice/${$('.tickerSearch').val()}`;
        let queryParam =
        {
            range: $('.dataDuration').val(),
            interval: 3,
            AccessKey: 'GkIYaHmIBTNnbr_fAsSnhnAhp4FF85tE'

        }
        let urlQString = GetQueryString(queryParam);
        url = url + '?' + urlQString;
        console.log(url);
        fetch(url)
            .then(r => r.json().then(data => ({
                status: r.status, body: data
            })))
            .then(f => {
                if (f.status == 200) {
                    let stockMktObj = (f.body["Stock price"]);
                    let dateData = [];
                    let highValData = [];
                    let lowValData = [];
                    let dataLength = stockMktObj.length
                    for (let i = 0; i < dataLength; i++) {
                        dateData.push(stockMktObj[i].date);
                        highValData.push(stockMktObj[i].high);
                        lowValData.push(stockMktObj[i].low)
                        //console.log(stockMktObj[i]);
                    }
                    var trace1 = {
                        type: "scatter",
                        mode: "lines",
                        name: `${$('.tickerSearch').val()} High`,
                        x: dateData,
                        y: highValData,
                        line: { color: '#17BECF' }
                    }

                    var trace2 = {
                        type: "scatter",
                        mode: "lines",
                        name: `${$('.tickerSearch').val()} Low`,
                        x: dateData,
                        y: lowValData,
                        line: { color: '#7F7F7F' }
                    }

                    var data = [trace1, trace2];

                    var layout = {
                        title: `Time Series Stock Value Variation Of ${$('.tickerSearch').val()} For a Duration Of ${$('.dataDuration').val()}`,
                    };

                    Plotly.newPlot('GraphResult', data, layout);
                }
                else {
                    $('#GraphResult').html(`Error Occurred : ${f.body.message}`);
                }

            })

            .catch(err => {
                $('#GraphResult').html(`Error Occurred : ${err.message}`)
            });

    }

    function GetQueryString(parameters) {
        let keys = Object.keys(parameters);
        let queryItems = keys.map(k => `${k}=${parameters[k]}`);
        return queryItems.join('&');
    }
});



// Audrey's section start














