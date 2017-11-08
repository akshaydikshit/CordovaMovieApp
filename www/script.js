$(document).on('pagecreate', '#home', function(){      
    var url = '<a class="vglnk" href="http://api.themoviedb.org/3/" rel="nofollow"><span>http</span><span>://</span><span>api</span><span>.</span><span>themoviedb</span><span>.</span><span>org</span><span>/</span><span>3</span><span>/</span></a>',
        mode = 'search/movie?query=',
        movieName = '&query='+encodeURI('Batman'),        
        key = '&api_key=f03e4e580d1208dc0cbda6812224517d';        
      
    $.ajax({
        url: url + mode + key + movieName ,
        dataType: "jsonp",
        async: true,
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    });         
});
  
$(document).on('pagebeforeshow', '#headline', function(){      
    $('#movie-data').empty();
    $.each(movieInfo.result, function(i, row) {
        if(row.id == movieInfo.id) {
            $('#movie-data').append('<li><img src="<a class="vglnk" href="https://image.tmdb.org/t/p/w300_and_h450_bestv2'+row.poster_path+" rel="nofollow"><span>https</span><span>://</span><span>image</span><span>.</span><span>tmdb</span><span>.</span><span>org</span><span>/</span><span>t</span><span>/</span><span>p</span><span>/</span><span>w300</span><span>_</span><span>and</span><span>_</span><span>h450</span><span>_</span><span>bestv2</span><span>'+</span><span>row</span><span>.</span><span>poster</span><span>_</span><span>path</span><span>+</span></a>'"></li>');
            $('#movie-data').append('<li>Title: '+row.original_title+'</li>');
            $('#movie-data').append('<li>Release date'+row.release_date+'</li>');
            $('#movie-data').append('<li>Popularity : '+row.popularity+'</li>');   
            $('#movie-data').append('<li>Popularity : '+row.vote_average+'</li>');             
            $('#movie-data').listview('refresh');            
        }
    });    
});
  
$(document).on('tap', '#movie-list li a', function(){  
    movieInfo.id = $(this).attr('data-id');
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#headline", { transition: "slide", changeHash: false } );
});
  
var movieInfo = {
    id : null,
    result : null
}
  
var ajax = {  
    parseJSONP:function(result){  
        movieInfo.result = result.results;
        $.each(result.results, function(i, row) {
            console.log(JSON.stringify(row));
            $('#movie-list').append('<li><a href="" data-id="' + row.id + '"><img src="<a class="vglnk" href="https://image.tmdb.org/t/p/w300_and_h450_bestv2'+row.poster_path+'"/" rel="nofollow"><span>https</span><span>://</span><span>image</span><span>.</span><span>tmdb</span><span>.</span><span>org</span><span>/</span><span>t</span><span>/</span><span>p</span><span>/</span><span>w300</span><span>_</span><span>and</span><span>_</span><span>h450</span><span>_</span><span>bestv2</span><span>'+</span><span>row</span><span>.</span><span>poster</span><span>_</span><span>path</span><span>+'"/</span></a>><h3>' + row.title + '</h3><p>' + row.vote_average + '/10</p></a></li>');
        });
        $('#movie-list').listview('refresh');
    }
}   