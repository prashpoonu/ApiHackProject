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
    $('form').on('click','button',function(evnt){
    //evnt.preventDefault();
    //console.log(`${$('.tickerSearch').val()}`)
    $('.Result').html(`<a href="#">${$('.tickerSearch').val()}</a>`);
    });
    function GetDataFromUnibitApi()
    {
        let url = `https://api.unibit.ai/historicalstockprice/${$('.tickerSearch')}`;
        let queryParam = 
        {
            ticker:$('.tickerSearch').val(),
           range:$('.dataDuration').val(),
           interval:3,
           AccessKey:'hf8cQehsukDBW8oWQHvUTPDGYP8RAjns'

        }

       


    }
    function GetQueryString(parameters)
    {
        let keys = Object.keys(parameters);
        let queryItems= keys.map(k=>`${k}=${parameters[k]}`);
         return queryItems.join('&');
    }
});